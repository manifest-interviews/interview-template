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
}
