-- Edit this file to change the database schema or seed data.
--
-- The server will automatically drop and recreate all tables on restart
-- when this file changes.

-- ============================================================================
-- Schema
-- ============================================================================

-- Menu items. Prices stored as integer cents to avoid float rounding issues.
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price_cents INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Orders start as 'pending', move to 'completed'.
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Line items. unit_price_cents is a snapshot of the product price at time of sale.
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price_cents INTEGER NOT NULL
);

-- ============================================================================
-- Seed data
-- ============================================================================

INSERT INTO products (name, sku, price_cents) VALUES
  ('Drip Coffee',          'drip-coffee',       250),
  ('Latte',                'latte',             550),
  ('Cappuccino',           'cappuccino',        550),
  ('Espresso',             'espresso',          350),
  ('Americano',            'americano',         400),
  ('Matcha Latte',         'matcha-latte',      600),
  ('Chai Latte',           'chai-latte',        550),
  ('Cold Brew',            'cold-brew',         450),
  ('Croissant',            'croissant',         375),
  ('Blueberry Muffin',     'blueberry-muffin',  400),
  ('Banana Bread',         'banana-bread',      350),
  ('Chocolate Chip Cookie', 'choc-chip-cookie', 300),
  ('Cinnamon Roll',        'cinnamon-roll',     450),
  ('Ceramic Mug',          'ceramic-mug',      1800),
  ('Tote Bag',             'tote-bag',         2200);

-- A few sample orders so the orders page isn't empty.
-- Product IDs match insertion order above (1=Drip Coffee, 2=Latte, etc.)
-- Prices are snapshotted from the products above.
INSERT INTO orders (status) VALUES
  ('completed'),
  ('completed'),
  ('completed');

INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents) VALUES
  (1, 3,  1, 550),  -- 2x Latte
  (1, 9,  1, 375),  -- 1x Croissant
  (2, 1,  1, 250),  -- 1x Drip Coffee
  (2, 6,  1, 600),  -- 1x Matcha Latte
  (2, 10, 2, 400),  -- 2x Blueberry Muffin
  (3, 8,  3, 450),  -- 3x Cold Brew
  (3, 13, 1, 450);  -- 1x Cinnamon Roll
