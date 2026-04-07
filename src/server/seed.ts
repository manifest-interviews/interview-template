// Edit this file to change the seed data.
//
// The server will automatically drop and recreate all tables, then seed
// on restart when this file (or schema.sql) changes.

import { sql } from "./db";

export async function seed() {
  await sql`INSERT INTO products (name, sku, price_cents) VALUES
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
    ('Tote Bag',             'tote-bag',         2200)`;

  // A few sample orders so the orders page isn't empty.
  // Prices are snapshotted from the products above.
  await sql`INSERT INTO orders (status) VALUES
    ('completed'),
    ('completed'),
    ('completed')`;

  await sql`INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents) VALUES
    (1, 2, 2, 550),
    (1, 9, 1, 375),
    (2, 1, 1, 250),
    (2, 6, 1, 600),
    (2, 10, 2, 400),
    (3, 8, 3, 450),
    (3, 13, 1, 450)`;
}
