Database query Postgres:
-- 1. جدول العملاء
CREATE TABLE clients (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(50),
address TEXT,
created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول المنتجات
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
price NUMERIC(12,2) NOT NULL CHECK(price >= 0),
quantity INT NOT NULL DEFAULT 0,
created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول الفواتير
CREATE TABLE invoices (
id SERIAL PRIMARY KEY,
client_id INT NOT NULL,
invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
due_date DATE,
status VARCHAR(50) NOT NULL DEFAULT 'draft',
-- نحسب الإجمالي كقيمة عادة← لكن نفضل تخزينه هنا لتحسين الأداء
total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
created_at TIMESTAMPTZ DEFAULT NOW(),
FOREIGN KEY (client_id) REFERENCES clients(id)
ON DELETE RESTRICT
ON UPDATE CASCADE
);

-- 4. جدول عناصر الفاتورة (العناصر المرتبطة بكل فاتورة)
CREATE TABLE invoice_items (
id SERIAL PRIMARY KEY,
invoice_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL CHECK(quantity > 0),
unit_price NUMERIC(12,2) NOT NULL CHECK(unit_price >= 0),
total_price NUMERIC(14,2) NOT NULL GENERATED ALWAYS AS (quantity \* unit_price) STORED,
FOREIGN KEY (invoice_id) REFERENCES invoices(id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 5. إضافة Indexات لتحسين الأداء في عمليات البحث والجمع:
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX idx_invoice_items_product_id ON invoice_items(product_id);
