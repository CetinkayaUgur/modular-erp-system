INSERT INTO users (username, password) VALUES
('can', '$2a$12$JhRGqe1GQmB1fjQ/WvNaFOlqRy.3yG52gZm1FSwQ5u2j5vySdQZbO'),
('deneme', '$2a$12$uzPrDSmtfyYfIavVQtU8TOdmxRdyobbT4cESKUponPKtCnSOPZZmO');

INSERT INTO customers (first_name, last_name, phone, email, address, registration_date, username) VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', '123 Main St', CURRENT_TIMESTAMP, 'can'),
('Jane', 'Smith', '9876543210', 'jane.smith@example.com', '456 Oak St', CURRENT_TIMESTAMP, 'deneme'),
('Emily', 'Johnson', '5551234567', 'emily.johnson@example.com', '789 Pine St', CURRENT_TIMESTAMP, 'can'),
('Michael', 'Brown', '5552345678', 'michael.brown@example.com', '101 Maple St', CURRENT_TIMESTAMP, 'deneme'),
('David', 'Williams', '5553456789', 'david.williams@example.com', '202 Birch St', CURRENT_TIMESTAMP, 'can'),
('Sarah', 'Jones', '5554567890', 'sarah.jones@example.com', '303 Cedar St', CURRENT_TIMESTAMP, 'deneme'),
('Robert', 'Miller', '5555678901', 'robert.miller@example.com', '404 Elm St', CURRENT_TIMESTAMP, 'can'),
('Jessica', 'Davis', '5556789012', 'jessica.davis@example.com', '505 Redwood St', CURRENT_TIMESTAMP, 'deneme'),
('Thomas', 'Garcia', '5557890123', 'thomas.garcia@example.com', '606 Fir St', CURRENT_TIMESTAMP, 'can'),
('Olivia', 'Martinez', '5558901234', 'olivia.martinez@example.com', '707 Willow St', CURRENT_TIMESTAMP, 'deneme');

INSERT INTO trainings (training_name, training_date, trainer, description) VALUES
('Leadership Skills', '2025-06-15', 'John Doe', 'Training on improving leadership skills for managers.'),
('Time Management', '2025-07-10', 'Jane Smith', 'Effective strategies for managing time in the workplace.'),
('Data Analysis', '2025-08-20', 'Emily Johnson', 'Understanding data and how to analyze it for decision making.'),
('Project Management', '2025-09-25', 'Michael Brown', 'Basic principles of project management for beginners.'),
('Customer Service Excellence', '2025-10-05', 'David Williams', 'How to deliver excellent customer service in all situations.'),
('Teamwork and Collaboration', '2025-11-15', 'Sarah Jones', 'Training on working effectively in teams and collaboration.'),
('Sales Strategies', '2025-12-10', 'Robert Miller', 'Effective strategies to increase sales and customer satisfaction.'),
('Marketing Fundamentals', '2026-01-10', 'Jessica Davis', 'Introduction to marketing principles and strategies.'),
('Negotiation Skills', '2026-02-25', 'Thomas Garcia', 'How to negotiate successfully in both business and personal life.'),
('Conflict Resolution', '2026-03-15', 'Olivia Martinez', 'Strategies to handle and resolve conflicts in the workplace.');

INSERT INTO suppliers (name, phone, email, address, registration_date, username) VALUES
('ABC Supplies', '5551234567', 'abc.supplier@example.com', '123 Supply St', CURRENT_TIMESTAMP, 'can'),
('XYZ Inc.', '5552345678', 'xyz.inc@example.com', '456 Warehouse St', CURRENT_TIMESTAMP, 'deneme'),
('Global Enterprises', '5553456789', 'global.enterprises@example.com', '789 Global Ave', CURRENT_TIMESTAMP, 'can'),
('Tech Supplies', '5554567890', 'tech.supplies@example.com', '101 Tech Rd', CURRENT_TIMESTAMP, 'deneme'),
('Green Resources', '5555678901', 'green.resources@example.com', '202 Eco St', CURRENT_TIMESTAMP, 'can'),
('Universal Goods', '5556789012', 'universal.goods@example.com', '303 Universal Blvd', CURRENT_TIMESTAMP, 'deneme'),
('Prime Materials', '5557890123', 'prime.materials@example.com', '404 Prime St', CURRENT_TIMESTAMP, 'can'),
('Quick Supply Co.', '5558901234', 'quick.supply@example.com', '505 Fast Lane', CURRENT_TIMESTAMP, 'deneme'),
('Ocean Traders', '5559012345', 'ocean.traders@example.com', '606 Ocean Dr', CURRENT_TIMESTAMP, 'can'),
('Future Innovations', '5550123456', 'future.innovations@example.com', '707 Innovation Blvd', CURRENT_TIMESTAMP, 'deneme');

INSERT INTO orders (customer_id, order_date, total_amount, status, description, username) VALUES
(1, '2025-06-10', 100.50, 'preparing', 'Order for office supplies.', 'can'),
(2, '2025-06-11', 250.75, 'preparing', 'Order for training materials.', 'deneme'),
(3, '2025-06-12', 500.00, 'shipped', 'Order for electronic components.', 'can'),
(4, '2025-06-13', 75.20, 'preparing', 'Order for books.', 'deneme'),
(5, '2025-06-14', 300.00, 'preparing', 'Order for office furniture.', 'can'),
(6, '2025-06-15', 150.00, 'shipped', 'Order for computer equipment.', 'deneme'),
(7, '2025-06-16', 200.10, 'delivered', 'Order for accessories.', 'can'),
(8, '2025-06-17', 85.30, 'preparing', 'Order for cleaning supplies.', 'deneme'),
(9, '2025-06-18', 450.00, 'shipped', 'Order for raw materials.', 'can'),
(10, '2025-06-19', 120.50, 'delivered', 'Order for furniture pieces.', 'deneme');


INSERT INTO product_categories (name, description, username) VALUES
('Electronics', 'Devices and gadgets.', 'can'),
('Furniture', 'Office and home furniture.', 'deneme'),
('Office Supplies', 'Stationery and office equipment.', 'can'),
('Clothing', 'Apparel and accessories.', 'deneme'),
('Books', 'Educational and recreational books.', 'can'),
('Cleaning Supplies', 'Products for maintaining cleanliness.', 'deneme'),
('Toys', 'Toy.', 'can'),
('Kitchenware', 'Utensils and appliances for kitchen.', 'deneme'),
('Sports Equipment', 'Gear and equipment for various sports.', 'can'),
('Tools', 'Hand tools and power tools.', 'deneme');

INSERT INTO products (category_id, name, description, unit, stock_quantity, unit_price, is_active, added_date, username) VALUES
(1, 'Laptop', 'High performance laptop', 'piece', 50, 1500.00, TRUE, CURRENT_TIMESTAMP, 'can'),
(1, 'Smartphone', 'Latest model smartphone', 'piece', 100, 700.00, TRUE, CURRENT_TIMESTAMP, 'deneme'),
(2, 'Office Chair', 'Ergonomic office chair', 'piece', 30, 120.00, TRUE, CURRENT_TIMESTAMP, 'can'),
(2, 'Desk', 'Wooden office desk', 'piece', 20, 250.00, TRUE, CURRENT_TIMESTAMP, 'deneme'),
(3, 'Notebook', 'Pack of 100 notebooks', 'pack', 500, 15.00, TRUE, CURRENT_TIMESTAMP, 'can'),
(3, 'Printer', 'All-in-one printer', 'piece', 10, 300.00, TRUE, CURRENT_TIMESTAMP, 'deneme'),
(4, 'T-shirt', 'Cotton t-shirt in various sizes', 'piece', 200, 25.00, TRUE, CURRENT_TIMESTAMP, 'can'),
(4, 'Jeans', 'Denim jeans, available in different sizes', 'piece', 150, 40.00, TRUE, CURRENT_TIMESTAMP, 'deneme'),
(5, 'Textbook', 'Mathematics textbook for high school students', 'piece', 100, 60.00, TRUE, CURRENT_TIMESTAMP, 'can'),
(5, 'Novel', 'Bestselling fiction novel', 'piece', 80, 20.00, TRUE, CURRENT_TIMESTAMP, 'deneme');

INSERT INTO order_products (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 2, 1500.00),
(1, 2, 3, 700.00),
(2, 3, 1, 120.00),
(2, 4, 1, 250.00),
(3, 5, 10, 15.00),
(3, 6, 5, 300.00),
(4, 7, 20, 25.00),
(4, 8, 10, 40.00),
(5, 9, 2, 60.00),
(5, 10, 5, 20.00);

INSERT INTO purchases (supplier_id, purchase_date, total_amount, description, username) VALUES
(1, '2025-06-10', 3000.00, 'Bulk purchase of laptops', 'can'),
(2, '2025-06-11', 2100.00, 'Bulk purchase of smartphones', 'deneme'),
(3, '2025-06-12', 1200.00, 'Purchase of office chairs', 'can'),
(4, '2025-06-13', 5000.00, 'Purchase of desks for new office', 'deneme'),
(5, '2025-06-14', 150.00, 'Purchase of notebooks for office use', 'can'),
(6, '2025-06-15', 1500.00, 'Purchase of printers for office', 'deneme'),
(7, '2025-06-16', 500.00, 'T-shirt bulk purchase', 'can'),
(8, '2025-06-17', 800.00, 'Purchase of jeans for office employees', 'deneme'),
(9, '2025-06-18', 600.00, 'Bulk purchase of textbooks', 'can'),
(10, '2025-06-19', 1000.00, 'Purchase of fiction novels for library', 'deneme');

INSERT INTO purchase_products (purchase_id, product_id, quantity, unit_price) VALUES
(1, 1, 50, 1500.00),
(2, 2, 100, 700.00),
(3, 3, 30, 120.00),
(4, 4, 20, 250.00),
(5, 5, 500, 15.00),
(6, 6, 10, 300.00),
(7, 7, 20, 25.00),
(8, 8, 30, 40.00),
(9, 9, 100, 60.00),
(10, 10, 80, 20.00);

INSERT INTO financial_records (date, amount, type, source_type, source_id, description, username) VALUES
('2025-06-10', 5000.00, 'income', 'sales', 1, 'Sales revenue from products', 'can'),
('2025-06-11', 1500.00, 'expense', 'purchase', 2, 'Cost of purchasing office chairs', 'deneme'),
('2025-06-12', 2000.00, 'income', 'sales', 3, 'Sales revenue from smartphones', 'can'),
('2025-06-13', 2500.00, 'expense', 'purchase', 4, 'Purchase of desks', 'deneme'),
('2025-06-14', 150.00, 'income', 'sales', 5, 'Revenue from notebooks', 'can'),
('2025-06-15', 300.00, 'expense', 'purchase', 6, 'Office printer purchase', 'deneme'),
('2025-06-16', 1000.00, 'income', 'sales', 7, 'T-shirt sales revenue', 'can'),
('2025-06-17', 800.00, 'expense', 'purchase', 8, 'Jeans purchase', 'deneme'),
('2025-06-18', 600.00, 'income', 'sales', 9, 'Textbook sales', 'can'),
('2025-06-19', 500.00, 'expense', 'purchase', 10, 'Purchase of fiction novels', 'deneme');

INSERT INTO budget (total, username) VALUES
(50000.00, 'can'),
(40000.00, 'deneme');

INSERT INTO employees (first_name, last_name, national_id, phone, email, address, position, hire_date, username) VALUES
('John', 'Doe', '12345678901', '555-1234', 'john.doe@example.com', '123 Main St, City', 'Software Engineer', '2020-01-15', 'can'),
('Jane', 'Smith', '23456789012', '555-5678', 'jane.smith@example.com', '456 Oak St, City', 'Product Manager', '2019-08-20', 'deneme'),
('Alice', 'Johnson', '34567890123', '555-8765', 'alice.johnson@example.com', '789 Pine St, City', 'Data Analyst', '2021-06-10', 'can'),
('Bob', 'Brown', '45678901234', '555-4321', 'bob.brown@example.com', '101 Maple St, City', 'HR Specialist', '2022-03-05', 'deneme'),
('Charlie', 'Davis', '56789012345', '555-1357', 'charlie.davis@example.com', '202 Birch St, City', 'Marketing Manager', '2020-11-10', 'can'),
('David', 'Miller', '67890123456', '555-2468', 'david.miller@example.com', '303 Cedar St, City', 'Financial Analyst', '2018-02-15', 'deneme'),
('Emma', 'Wilson', '78901234567', '555-8642', 'emma.wilson@example.com', '404 Elm St, City', 'Operations Manager', '2019-09-25', 'can'),
('Frank', 'Moore', '89012345678', '555-7531', 'frank.moore@example.com', '505 Birch St, City', 'Customer Support', '2021-04-12', 'deneme'),
('Grace', 'Taylor', '90123456789', '555-2468', 'grace.taylor@example.com', '606 Willow St, City', 'UI/UX Designer', '2022-05-17', 'can'),
('Henry', 'Anderson', '01234567890', '555-3690', 'henry.anderson@example.com', '707 Oak St, City', 'Business Analyst', '2020-12-04', 'deneme');

INSERT INTO employee_salaries (employee_id, salary_date, paid_amount, description) VALUES
(1, '2025-06-01', 3000.00, 'Monthly salary for May 2025'),
(2, '2025-06-01', 3200.00, 'Monthly salary for May 2025'),
(3, '2025-06-01', 2800.00, 'Monthly salary for May 2025'),
(4, '2025-06-01', 2700.00, 'Monthly salary for May 2025'),
(5, '2025-06-01', 3500.00, 'Monthly salary for May 2025'),
(6, '2025-06-01', 3300.00, 'Monthly salary for May 2025'),
(7, '2025-06-01', 3000.00, 'Monthly salary for May 2025'),
(8, '2025-06-01', 2200.00, 'Monthly salary for May 2025'),
(9, '2025-06-01', 2700.00, 'Monthly salary for May 2025'),
(10, '2025-06-01', 3100.00, 'Monthly salary for May 2025');

INSERT INTO employee_insurances (employee_id, insurance_no, start_date, end_date, insurance_type, description) VALUES
(1, 'INS123456', '2025-01-01', '2025-12-31', 'Health', 'Health insurance for the year 2025'),
(2, 'INS234567', '2025-02-01', '2025-12-31', 'Health', 'Health insurance for the year 2025'),
(3, 'INS345678', '2025-03-01', '2025-12-31', 'Life', 'Life insurance for the year 2025'),
(4, 'INS456789', '2025-04-01', '2025-12-31', 'Health', 'Health insurance for the year 2025'),
(5, 'INS567890', '2025-05-01', '2025-12-31', 'Accident', 'Accident insurance for the year 2025'),
(6, 'INS678901', '2025-06-01', '2025-12-31', 'Health', 'Health insurance for the year 2025'),
(7, 'INS789012', '2025-07-01', '2025-12-31', 'Health', 'Health insurance for the year 2025'),
(8, 'INS890123', '2025-08-01', '2025-12-31', 'Life', 'Life insurance for the year 2025'),
(9, 'INS901234', '2025-09-01', '2025-12-31', 'Accident', 'Accident insurance for the year 2025'),
(10, 'INS012345', '2025-10-01', '2025-12-31', 'Health', 'Health insurance for the year 2025');

INSERT INTO employee_statuses (employee_id, status, start_date, end_date, description) VALUES
(1, 'Active', '2025-01-01', NULL, 'Currently employed'),
(2, 'Active', '2025-01-01', NULL, 'Currently employed'),
(3, 'Inactive', '2025-02-01', '2025-05-01', 'On leave'),
(4, 'Active', '2025-03-01', NULL, 'Currently employed'),
(5, 'Active', '2025-04-01', NULL, 'Currently employed'),
(6, 'Inactive', '2025-05-01', '2025-06-01', 'On leave'),
(7, 'Active', '2025-06-01', NULL, 'Currently employed'),
(8, 'Active', '2025-07-01', NULL, 'Currently employed'),
(9, 'Inactive', '2025-08-01', '2025-09-01', 'On leave'),
(10, 'Active', '2025-09-01', NULL, 'Currently employed');

INSERT INTO job_applications (first_name, last_name, position, application_date, status, notes, username) VALUES
('Michael', 'Jackson', 'Software Engineer', '2025-05-01', 'Under review', 'Experienced with Java and Python', 'can'),
('Sarah', 'Lee', 'Product Manager', '2025-05-02', 'Interview scheduled', '5 years of product management experience', 'deneme'),
('Tom', 'Hanks', 'HR Specialist', '2025-05-03', 'Rejected', 'Not enough experience', 'can'),
('Emma', 'Watson', 'Customer Support', '2025-05-04', 'Under review', 'Customer service experience', 'deneme'),
('Robert', 'Pattinson', 'Marketing Manager', '2025-05-05', 'Interview scheduled', 'Expert in digital marketing', 'can'),
('Natalie', 'Portman', 'UI/UX Designer', '2025-05-06', 'Accepted', 'Strong portfolio', 'deneme'),
('Leo', 'DiCaprio', 'Data Analyst', '2025-05-07', 'Under review', 'Experienced in SQL and Python', 'can'),
('Scarlett', 'Johansson', 'Financial Analyst', '2025-05-08', 'Rejected', 'No relevant experience', 'deneme'),
('Will', 'Smith', 'Operations Manager', '2025-05-09', 'Interview scheduled', 'Operations expertise', 'can'),
('Chris', 'Evans', 'Business Analyst', '2025-05-10', 'Accepted', 'Excellent analytical skills', 'deneme');

INSERT INTO leaves (employee_id, start_date, end_date, leave_type, description) VALUES
(1, '2025-06-01', '2025-06-05', 'Vacation', 'Annual leave'),
(2, '2025-06-02', '2025-06-07', 'Sick', 'Illness'),
(3, '2025-06-03', '2025-06-08', 'Vacation', 'Annual leave'),
(4, '2025-06-04', '2025-06-09', 'Sick', 'Medical recovery'),
(5, '2025-06-05', '2025-06-10', 'Vacation', 'Annual leave'),
(6, '2025-06-06', '2025-06-11', 'Maternity', 'Maternity leave'),
(7, '2025-06-07', '2025-06-12', 'Sick', 'Flu'),
(8, '2025-06-08', '2025-06-13', 'Vacation', 'Annual leave'),
(9, '2025-06-09', '2025-06-14', 'Sick', 'Injury recovery'),
(10, '2025-06-10', '2025-06-15', 'Vacation', 'Annual leave');

INSERT INTO employee_trainings (employee_id, training_id, attended) VALUES
(1, 1, TRUE),
(2, 2, TRUE),
(3, 3, FALSE),
(4, 4, TRUE),
(5, 4, FALSE),
(6, 4, TRUE),
(7, 2, TRUE),
(8, 5, FALSE),
(9, 6, TRUE),
(10, 9, FALSE);

INSERT INTO performance_reviews (employee_id, date, score, comment) VALUES
(1, '2025-05-01', 8, 'Good performance throughout the year'),
(2, '2025-05-02', 7, 'Meets expectations, but could improve communication'),
(3, '2025-05-03', 6, 'Needs improvement in time management'),
(4, '2025-05-04', 9, 'Excellent work, keeps improving'),
(5, '2025-05-05', 7, 'Great results, but could take on more challenges'),
(6, '2025-05-06', 8, 'Reliable and efficient worker'),
(7, '2025-05-07', 6, 'Could be more proactive in meetings'),
(8, '2025-05-08', 5, 'Needs significant improvement in handling deadlines'),
(9, '2025-05-09', 8, 'Good communication skills, needs to focus more on technical aspects'),
(10, '2025-05-10', 7, 'Great potential, but needs to work on consistency');

