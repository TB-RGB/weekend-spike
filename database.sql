CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    access_level INTEGER DEFAULT 1
);

CREATE TABLE venue_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    capacity INTEGER,
    website VARCHAR(200) UNIQUE,
    instagram VARCHAR(200) UNIQUE,
    account_id INTEGER REFERENCES users(id)
);

CREATE TABLE band_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE show_reports (
    id SERIAL PRIMARY KEY,
    band_id INTEGER REFERENCES band_info(id),
    venue_id INTEGER REFERENCES venue_info(id),
    show_date DATE,
    door_time TIME WITH TIME ZONE,
    age_restrictions VARCHAR(10),
    total_tickets_sold INTEGER,
    total_presale_sold INTEGER,
    total_beer_sold INTEGER,
    total_liquor_sold INTEGER,
    total_other_sold INTEGER
);

CREATE TABLE venue_show_manifest (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venue_info(id),
    show_id INTEGER REFERENCES show_reports(id)
);

CREATE TABLE band_show_manifest (
    id SERIAL PRIMARY KEY,
    band_id INTEGER REFERENCES band_info(id),
    show_id INTEGER REFERENCES show_reports(id)
);


-- Insert data into users table
INSERT INTO users (username, password, access_level) VALUES
('john_doe', 'hashed_password_1', 2),
('jane_smith', 'hashed_password_2', 1),
('admin_user', 'hashed_password_3', 3);

-- Insert data into venue_info table
INSERT INTO venue_info (name, capacity, website, instagram, account_id) VALUES
('The Rock Arena', 5000, 'www.therockarena.com', '@therockarena', 1),
('Jazz Club 88', 200, 'www.jazzclub88.com', '@jazzclub88', 2),
('Meadow Amphitheater', 10000, 'www.meadowamphitheater.com', '@meadowamphitheater', 3);

-- Insert data into band_info table
INSERT INTO band_info (name) VALUES
('The Rolling Stones'),
('Jazz Quartet'),
('Electronica');

-- Insert data into show_reports table
INSERT INTO show_reports (band_id, venue_id, show_date, door_time, age_restrictions, total_tickets_sold, total_presale_sold, total_beer_sold, total_liquor_sold, total_other_sold) VALUES
(1, 1, '2024-07-15', '19:00', '18+', 4500, 3000, 2000, 1500, 500),
(2, 2, '2024-08-01', '20:00', '21+', 180, 100, 150, 200, 50),
(3, 3, '2024-09-10', '18:00', 'All ages', 8000, 6000, 3500, 2500, 1000);

-- Insert data into venue_show_manifest table
INSERT INTO venue_show_manifest (venue_id, show_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insert data into band_show_manifest table
INSERT INTO band_show_manifest (band_id, show_id) VALUES
(1, 1),
(2, 2),
(3, 3);