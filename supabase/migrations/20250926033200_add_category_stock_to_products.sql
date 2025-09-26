-- Añadir columnas 'category' y 'stock' a la tabla 'products'
ALTER TABLE products
ADD COLUMN category TEXT,
ADD COLUMN stock INTEGER DEFAULT 0;
