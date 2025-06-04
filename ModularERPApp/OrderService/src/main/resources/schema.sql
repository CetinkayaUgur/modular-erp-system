CREATE TABLE if not exists customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists trainings (
    training_id SERIAL PRIMARY KEY,
    training_name VARCHAR(150),
    training_date DATE,
    trainer VARCHAR(100),
    description TEXT
);

CREATE TABLE if not exists suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id) ON DELETE SET NULL,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount NUMERIC(10,2),
    status VARCHAR(50) DEFAULT 'preparing', -- e.g., preparing, shipped, completed
    description TEXT
);

CREATE TABLE if not exists product_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE if not exists products (
    product_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES product_categories(category_id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    unit VARCHAR(50) DEFAULT 'piece', -- e.g., kg, liter, piece
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists order_products (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

CREATE TABLE if not exists purchases (
    purchase_id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount NUMERIC(10,2),
    description TEXT
);

CREATE TABLE if not exists purchase_products (
    id SERIAL PRIMARY KEY,
    purchase_id INT REFERENCES purchases(purchase_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

CREATE TABLE if not exists financial_records (
    record_id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    source_type VARCHAR(50), -- e.g., order, purchase, salary, manual
    source_id INT,
    description TEXT
);

CREATE TABLE if not exists budget (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id),
    total NUMERIC(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE if not exists employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(11) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    position VARCHAR(100),
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE if not exists employee_salaries (
    salary_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    salary_date DATE DEFAULT CURRENT_DATE,
    paid_amount NUMERIC(10,2) NOT NULL CHECK (paid_amount > 0),
    description TEXT
);

CREATE TABLE if not exists employee_insurances (
    insurance_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    insurance_no VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    insurance_type VARCHAR(100),
    description TEXT
);

CREATE TABLE if not exists employee_statuses (
    status_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- e.g., active, on_leave, resigned
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT
);

CREATE TABLE if not exists job_applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    position VARCHAR(100),
    application_date DATE,
    status VARCHAR(50), -- e.g., under_review, interview, rejected, hired
    notes TEXT
);

CREATE TABLE if not exists leaves (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    start_date DATE,
    end_date DATE,
    leave_type VARCHAR(50),
    description TEXT
);

CREATE TABLE if not exists employee_trainings (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    training_id INT REFERENCES trainings(training_id) ON DELETE CASCADE,
    attended BOOLEAN DEFAULT FALSE
);

CREATE TABLE if not exists performance_reviews (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    date DATE,
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    comment TEXT
);

truncate table customers restart identity cascade;
truncate table trainings restart identity cascade;
truncate table suppliers restart identity cascade;
truncate table orders restart identity cascade;
truncate table products restart identity cascade;
truncate table product_categories restart identity cascade;
truncate table order_products restart identity cascade;
truncate table purchases restart identity cascade;
truncate table purchase_products restart identity cascade;
truncate table financial_records restart identity cascade;
truncate table budget restart identity cascade;
truncate table employees restart identity cascade;
truncate table employee_salaries restart identity cascade;
truncate table employee_insurances restart identity cascade;
truncate table employee_statuses restart identity cascade;
truncate table job_applications restart identity cascade;
truncate table leaves restart identity cascade;
truncate table employee_trainings restart identity cascade;
truncate table performance_reviews restart identity cascade;




