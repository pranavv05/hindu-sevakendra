-- Seed initial data for Hindu Seva Kendra

-- Insert admin user
INSERT OR IGNORE INTO users (name, email, phone, password, role, address) VALUES 
('Admin User', 'admin@hindusevakendra.org', '+91-9876543210', 'admin123', 'admin', 'Main Office, Delhi');

-- Insert service types
INSERT OR IGNORE INTO service_types (name, description, base_price, commission_rate) VALUES 
('Plumbing', 'Water pipe repairs, installations, and maintenance', 500.00, 2.0),
('Electrical', 'Electrical repairs, wiring, and installations', 600.00, 2.5),
('Cleaning', 'House cleaning, office cleaning, deep cleaning', 300.00, 1.5),
('Carpentry', 'Furniture repair, wood work, installations', 800.00, 2.0),
('Painting', 'Wall painting, home painting services', 1000.00, 2.5),
('AC Repair', 'Air conditioner repair and maintenance', 700.00, 3.0),
('Appliance Repair', 'Home appliance repair services', 400.00, 2.0);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value, description) VALUES 
('default_commission_rate', '2.0', 'Default commission rate percentage'),
('vendor_registration_fee', '500', 'Registration fee for new vendors'),
('platform_phone', '+91-1800-HINDU-SEVA', 'Platform contact number'),
('max_assignment_distance', '10', 'Maximum distance in KM for vendor assignment');

-- Insert sample users
INSERT OR IGNORE INTO users (name, email, phone, password, role, category, address, location_lat, location_lng) VALUES 
('Rajesh Kumar', 'rajesh@example.com', '+91-9876543211', 'user123', 'user', 'personal', 'Sector 15, Noida', 28.5355, 77.3910),
('Priya Sharma', 'priya@example.com', '+91-9876543212', 'user123', 'user', 'society', 'DLF Phase 1, Gurgaon', 28.4595, 77.0266),
('Tech Solutions Ltd', 'tech@example.com', '+91-9876543213', 'user123', 'user', 'factory', 'Industrial Area, Faridabad', 28.4089, 77.3178);

-- Insert sample vendors
INSERT OR IGNORE INTO users (name, email, phone, password, role, address, location_lat, location_lng) VALUES 
('Ramesh Plumber', 'ramesh@example.com', '+91-9876543214', 'vendor123', 'vendor', 'Lajpat Nagar, Delhi', 28.5665, 77.2431),
('Suresh Electrician', 'suresh@example.com', '+91-9876543215', 'vendor123', 'vendor', 'Karol Bagh, Delhi', 28.6519, 77.1909),
('Cleaning Services Co', 'cleaning@example.com', '+91-9876543216', 'vendor123', 'vendor', 'Connaught Place, Delhi', 28.6315, 77.2167);

-- Insert vendor details
INSERT OR IGNORE INTO vendors (user_id, service_type, id_proof, approval_status, registration_fee, fee_paid) VALUES 
(4, 'Plumbing', 'AADHAR-1234-5678-9012', 'approved', 500.00, TRUE),
(5, 'Electrical', 'AADHAR-2345-6789-0123', 'approved', 500.00, TRUE),
(6, 'Cleaning', 'AADHAR-3456-7890-1234', 'pending', 500.00, FALSE);
