INSERT INTO customers (first_name, last_name, phone, email, address) VALUES
('deneme', 'deneme', '123456789', 'john@example.com', 'New York'),
('Jane', 'Smith', '987654321', 'jane@example.com', 'Los Angeles'),
('Michael', 'Brown', '456789123', 'michael@example.com', 'Chicago'),
('Emily', 'Davis', '789123456', 'emily@example.com', 'Houston'),
('can', 'ckrkc', '321654987', 'ccccc@example.com', 'Miami');

INSERT INTO trainings (training_name, training_date, trainer, description) VALUES
('Database Management', '2025-06-10', 'Alice Johnson', 'Advanced database administration techniques'),
('Python Programming', '2025-07-15', 'Bob Williams', 'Introduction to Python for beginners'),
('Cyber Security', '2025-08-05', 'Charlie Miller', 'Understanding cybersecurity threats and solutions'),
('Cloud Computing', '2025-09-20', 'Diana Rogers', 'Exploring cloud services and deployment'),
('AI & Machine Learning', '2025-10-10', 'Edward Scott', 'Fundamentals of artificial intelligence');

INSERT INTO suppliers (name, phone, email, address) VALUES
('Tech Supply', '5551234567', 'tech@supply.com', 'San Francisco'),
('Food Wholesale', '5559876543', 'food@supply.com', 'Dallas'),
('Stationery Hub', '5554567890', 'stationery@supply.com', 'Seattle'),
('Fashion Trends', '5557891234', 'fashion@supply.com', 'Denver'),
('Home Essentials', '5553216549', 'home@supply.com', 'Boston');

INSERT INTO orders (customer_id, order_date, total_amount, status, description) VALUES
(1, '2025-06-01', 1250.75, 'shipped', 'Express delivery requested'),
(2, '2025-06-02', 500.00, 'completed', 'Customer requested invoice'),
(3, '2025-06-03', 890.30, 'preparing', 'Special packaging required'),
(4, '2025-06-04', 320.50, 'shipped', 'Urgent order'),
(5, '2025-06-05', 1400.00, 'preparing', 'Gift wrapping needed');

INSERT INTO product_categories (name, description) VALUES
('Electronics', 'Computers, phones, and accessories'),
('Food', 'Daily groceries and snacks'),
('Stationery', 'Notebooks, pens, office supplies'),
('Clothing', 'Men, women, and children apparel'),
('Home & Living', 'Furniture, decoration, and kitchenware');

INSERT INTO products (category_id, name, description, stock_quantity, unit_price) VALUES
(3, 'Smartphone', 'Latest model with high-end features', 50, 799.99),
(2, 'Organic Honey', '500g pure honey', 100, 25.50),
(1, 'Pen Set', '10-piece premium quality pens', 200, 15.00),
(5, 'Jeans', 'Comfortable and stylish denim jeans', 75, 49.90),
(4, 'Sofa', 'Modern design with soft fabric', 10, 1200.00);

INSERT INTO order_products (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 799.99),
(2, 2, 5, 25.50),
(3, 3, 10, 15.00),
(4, 4, 2, 49.90),
(5, 5, 1, 1200.00);

INSERT INTO purchases (supplier_id, purchase_date, total_amount, description) VALUES
(1, '2025-06-10', 25000.00, 'Bulk electronics order'),
(3, '2025-06-11', 5000.50, 'Food supplies'),
(3, '2025-06-12', 1200.75, 'Stationery replenishment'),
(4, '2025-06-13', 7500.30, 'Clothing inventory update'),
(5, '2025-06-14', 9800.60, 'Furniture supply order');

INSERT INTO purchase_products (purchase_id, product_id, quantity, unit_price) VALUES
(1, 1, 10, 750.00),
(1, 2, 50, 22.00),
(2, 3, 100, 12.50),
(3, 4, 30, 45.00),
(4, 5, 5, 1150.00);

INSERT INTO financial_records (date, amount, type, source_type, source_id, description) VALUES
('2025-06-15', 799.99, 'income', 'order', 1, 'Smartphone sale'),
('2025-06-16', 3500.00, 'income', 'order', 2, 'Bulk honey order'),
('2025-06-17', 2000.00, 'expense', 'salary', NULL, 'Employee salary payments'),
('2025-06-18', 1100.00, 'expense', 'insurance', NULL, 'Insurance payments'),
('2025-06-19', 500.00, 'income', 'manual', NULL, 'Additional revenue');

INSERT INTO budget (id, total) VALUES
(TRUE, 75000.00);

INSERT INTO employees (first_name, last_name, national_id, phone, email, address, position, hire_date) VALUES
('Alice', 'Johnson', '12345678901', '5551112233', 'alice@example.com', 'New York', 'Software Developer', '2023-01-10'),
('Bob', 'Smith', '98765432109', '5552223344', 'bob@example.com', 'Los Angeles', 'Sales Representative', '2023-02-15'),
('Charlie', 'Brown', '32165498745', '5553334455', 'charlie@example.com', 'Chicago', 'Accountant', '2022-11-20'),
('Diana', 'Miller', '78932165478', '5554445566', 'diana@example.com', 'Houston', 'HR Specialist', '2022-10-05'),
('Edward', 'Wilson', '15975385246', '5555556677', 'edward@example.com', 'Miami', 'Warehouse Manager', '2024-03-01');

INSERT INTO employee_salaries (employee_id, salary_date, paid_amount, description) VALUES
(1, '2025-06-01', 5000.00, 'May salary paid'),
(2, '2025-06-02', 4800.00, 'May salary paid'),
(3, '2025-06-03', 4700.00, 'May salary paid'),
(4, '2025-06-04', 4900.00, 'May salary paid'),
(5, '2025-06-05', 4500.00, 'May salary paid');

INSERT INTO employee_insurances (employee_id, insurance_no, start_date, end_date, insurance_type, description) VALUES
(1, 'INS123456', '2023-01-10', NULL, 'Full-time', 'Active'),
(2, 'INS987654', '2023-02-15', NULL, 'Full-time', 'Active'),
(3, 'INS321654', '2022-11-20', NULL, 'Full-time', 'Active'),
(4, 'INS789321', '2022-10-05', NULL, 'Full-time', 'Active'),
(5, 'INS159753', '2024-03-01', NULL, 'Full-time', 'Active');

INSERT INTO employee_statuses (employee_id, status, start_date, description) VALUES
(1, 'active', '2023-01-10', 'Working full-time'),
(2, 'active', '2023-02-15', 'Permanent employee'),
(3, 'on_leave', '2025-06-10', 'Annual vacation'),
(4, 'resigned', '2025-05-15', 'Seeking new job opportunities'),
(5, 'active', '2024-03-01', 'Still working');

INSERT INTO job_applications (first_name, last_name, position, application_date, status, notes) VALUES
('Emma', 'Johnson', 'Software Engineer', '2025-06-05', 'under_review', 'Resume being reviewed'),
('Liam', 'Smith', 'Sales Executive', '2025-06-10', 'interview', 'First round completed'),
('Olivia', 'Brown', 'Accountant', '2025-06-15', 'rejected', 'Not a good fit for role'),
('Noah', 'Davis', 'Warehouse Assistant', '2025-06-20', 'hired', 'Start date confirmed'),
('Sophia', 'Wilson', 'HR Coordinator', '2025-06-25', 'under_review', 'Second interview scheduled');

INSERT INTO leaves (employee_id, start_date, end_date, leave_type, description) VALUES
(3, '2025-06-10', '2025-06-20', 'annual', 'Vacation'),
(2, '2025-06-15', '2025-06-20', 'sick', 'Medical leave'),
(4, '2025-05-01', '2025-06-01', 'maternity', 'Extended leave'),
(5, '2025-06-05', '2025-06-10', 'annual', 'Personal time off'),
(1, '2025-06-25', '2025-06-30', 'annual', 'Family visit');

INSERT INTO employee_trainings (employee_id, training_id, attended) VALUES
(1, 1, TRUE),
(2, 2, TRUE),
(3, 3, TRUE),
(4, 4, FALSE),
(5, 5, TRUE);

INSERT INTO performance_reviews (employee_id, date, score, comment) VALUES
(1, '2025-06-10', 9, 'Excellent performance'),
(2, '2025-06-11', 8, 'Very good but room for improvement'),
(3, '2025-06-12', 7, 'Reliable and disciplined'),
(4, '2025-06-13', 6, 'Needs to improve teamwork'),
(5, '2025-06-14', 9, 'Great contribution to recent projects');