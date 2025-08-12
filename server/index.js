const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
// Load .env from project root or server directory
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Static frontend
const publicDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(publicDir));

// Supabase client (values must be provided via .env)
const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
  console.error('Presence check:', {
    hasUrl: Boolean(SUPABASE_URL),
    hasKey: Boolean(SUPABASE_ANON_KEY),
  });
  process.exit(1);
}

// Public client for read operations
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin client for write operations (bypasses RLS). Do NOT expose service key to clients.
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY);

// Fetch products from table "products" and adapt to frontend shape
app.get('/api/products', async (req, res) => {
  try {
    const { category, q } = req.query;

    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (q && q.trim() !== '') {
      query = query.ilike('name', `%${q}%`);
    }

    const { data, error } = await query.order('id', { ascending: true });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const now = Date.now();
    const products = (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price ?? 0),
      originalPrice: null,
      image: p.image_url || '',
      rating: 4.5, // placeholder until ratings are implemented
      reviewCount: 0,
      category: p.category || 'general',
      isNew: p.created_at ? now - new Date(p.created_at).getTime() < 1000 * 60 * 60 * 24 * 30 : false,
      isSale: false,
      description: p.description || ''
    }));
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: error.message });
    const p = data;
    const now = Date.now();
    const product = {
      id: p.id,
      name: p.name,
      price: Number(p.price ?? 0),
      originalPrice: null,
      image: p.image_url || '',
      rating: 4.5,
      reviewCount: 0,
      category: p.category || 'general',
      isNew: p.created_at ? now - new Date(p.created_at).getTime() < 1000 * 60 * 60 * 24 * 30 : false,
      isSale: false,
      description: p.description || ''
    };
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create order with items
app.post('/api/orders', async (req, res) => {
  try {
    const { customer = {}, items = [], shipping_fee = 0 } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order items are required' });
    }

    // Fetch product names and prices to ensure correctness
    const productIds = items.map((it) => it.product_id);
    const { data: dbProducts, error: prodErr } = await supabase
      .from('products')
      .select('id, name, price')
      .in('id', productIds);
    if (prodErr) return res.status(400).json({ error: prodErr.message });

    const idToProduct = new Map(dbProducts.map((p) => [p.id, p]));

    const normalizedItems = items.map((it) => {
      const p = idToProduct.get(it.product_id);
      const unit_price = Number((it.unit_price ?? p?.price) ?? 0);
      const quantity = Number(it.quantity ?? 1);
      const total_price = unit_price * quantity;
      return {
        product_id: it.product_id,
        product_name: p?.name ?? String(it.product_id),
        quantity,
        unit_price,
        total_price
      };
    });

    const itemsTotal = normalizedItems.reduce((sum, it) => sum + it.total_price, 0);
    const total_amount = itemsTotal + Number(shipping_fee ?? 0);

    const order_number = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(
      10000 + Math.random() * 89999
    )}`;

    const orderRow = {
      order_number,
      customer_name: customer.name || null,
      customer_phone: customer.phone || null,
      customer_email: customer.email || null,
      customer_address: customer.address || null,
      customer_state: customer.state || null,
      customer_city: customer.city || null,
      customer_postal_code: customer.postal_code || null,
      customer_notes: customer.notes || null,
      total_amount,
      shipping_fee: Number(shipping_fee ?? 0),
      status: 'pending'
    };

    const { data: orderInsert, error: orderErr } = await supabaseAdmin
      .from('orders')
      .insert(orderRow)
      .select('id, order_number')
      .single();
    if (orderErr) return res.status(400).json({ error: orderErr.message });

    const order_id = orderInsert.id;
    const itemRows = normalizedItems.map((it) => ({ ...it, order_id }));
    const { error: itemsErr } = await supabaseAdmin.from('order_items').insert(itemRows);
    if (itemsErr) return res.status(400).json({ error: itemsErr.message });

    res.status(201).json({
      order: {
        id: order_id,
        order_number,
        total_amount,
        shipping_fee: Number(shipping_fee ?? 0)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Supabase env loaded:', { hasUrl: Boolean(SUPABASE_URL), hasKey: Boolean(SUPABASE_ANON_KEY) });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, supabase: { hasUrl: Boolean(SUPABASE_URL), hasKey: Boolean(SUPABASE_ANON_KEY) } });
});


