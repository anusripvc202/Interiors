-- CREATE LUXE INTERIORS DATABASE SCHEMA
CREATE DATABASE IF NOT EXISTS luxe_interiors_db;
USE luxe_interiors_db;

-- Drop tables in order of foreign key dependencies to ensure a clean slate
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS designer_profiles;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- bcrypt encrypted hash
    role ENUM('client', 'designer') DEFAULT 'client',
    preferred_style VARCHAR(255) NULL, -- only for role='client'
    style_id VARCHAR(50) NULL, -- only for role='client'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DESIGNER PROFILES TABLE
CREATE TABLE designer_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    designer_code VARCHAR(50) UNIQUE NOT NULL, -- used for login matching (e.g. 'aria-chen')
    role_title VARCHAR(255) NOT NULL,
    avatar_url LONGTEXT NULL,
    city VARCHAR(100) NOT NULL,
    style_specialty VARCHAR(255) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    experience VARCHAR(50) NOT NULL,
    starting_rate INT NOT NULL,
    bio TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BOOKINGS TABLE
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_notes TEXT NULL,
    space_type VARCHAR(255) NOT NULL,
    designer_id INT NOT NULL, -- links to users(id) of the designer
    date VARCHAR(100) NOT NULL,
    time VARCHAR(50) NOT NULL,
    status ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    cost VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INDEX KEYS FOR PERFORMANCE OPTIMIZATION
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_booking_client_email ON bookings(client_email);
CREATE INDEX idx_booking_designer_id ON bookings(designer_id);

-- ==========================================
-- PRE-SEEDING DEMO DATA
-- Default password is 'password' hashed with bcrypt: '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46'
-- ==========================================

-- Insert Users (1 client, 4 original designers, 11 new designers)
INSERT INTO users (id, name, email, password, role, preferred_style, style_id) VALUES
(1, 'Eleanor Vance', 'client@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'client', 'Japandi Minimalism', 'japandi'),
(2, 'Aria Chen', 'aria@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(3, 'Julian Mercer', 'julian@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(4, 'Sophia Vance', 'sophia@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(5, 'Marcus Sterling', 'marcus@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(6, 'Amaze Interiors', 'amaze@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(7, 'Elaan Interiors', 'elaan@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(8, 'Studio Marigold', 'studiomarigold@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(9, 'Design Quest', 'designquest@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(10, 'Imagino Interiors', 'imagino@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(11, 'Linkspace', 'linkspace@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(12, 'Panache de Interiors', 'panache@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(13, 'Vinay Interiors', 'vinay@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(14, 'Arches Designers', 'arches@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(15, 'Opulent Interiors', 'opulent@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(16, 'Elite Luxe', 'eliteluxe@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL);

-- Insert Designer profiles linking to the users
INSERT INTO designer_profiles (user_id, designer_code, role_title, avatar_url, city, style_specialty, rating, reviews_count, experience, starting_rate, bio) VALUES
(2, 'aria-chen', 'Principal Designer & Partner', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 'Bangalore', 'Japandi Minimalism', 4.90, 38, '8+ Years', 15000, 'Aria blends Japanese functionality with Scandinavian cozy elements to create restful, modern residential spaces.'),
(3, 'julian-mercer', 'Principal Architect', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', 'Mumbai', 'Modern Luxury', 5.00, 52, '12+ Years', 25000, 'Julian is renowned for creating striking, upscale environments using fine metals, Italian marbles, and integrated smart lighting.'),
(4, 'sophia-vance', 'Senior Curation Specialist', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 'Delhi', 'Classic Parisian', 4.80, 29, '6 Years', 14000, 'Sophia blends historical elegance with modern styling, focusing on ornate wall moldings, vintage mirrors, and bold colors.'),
(5, 'marcus-sterling', 'Senior Architectural Stylist', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', 'Bangalore', 'Mid-Century Organic', 4.70, 41, '9+ Years', 16000, 'Marcus focuses on mid-century aesthetics, bringing warm walnut woods, clean biophilic integration, and retro styling to spaces.'),
(6, 'amaze-interiors', 'Interior Design Specialist', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', 'Jubilee Hills', 'Japandi Minimalism', 5.00, 11, '8 Years', 12000, 'Located at Apurupa Towers, Amaze Interiors specializes in creating highly functional modular residential spaces, custom cabinetry, and kitchen setups in Jubilee Hills. Phone: +91 90306.'),
(7, 'elaan-interiors', 'Luxury Space Architect', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 'Jubilee Hills', 'Modern Luxury', 4.30, 16, '10+ Years', 22000, 'Located at Suite no 1, Elaan Interiors design premium and luxury spaces for residential, commercial, and hospitality projects. Website: https://elaan-interior.com/, Phone: +91 77802.'),
(8, 'studio-marigold', 'Principal Interior Designer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', 'Jubilee Hills', 'Classic Parisian', 5.00, 21, '9 Years', 16000, 'Based at Pavani House, Studio Marigold specializes in home interiors, premium modular kitchens, and residential building contracting with historical elegance. Website: http://studiomarigold.com/, Phone: +91 93470.'),
(9, 'design-quest', 'Creative Curation Specialist', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', 'Jubilee Hills', 'Mid-Century Organic', 4.80, 19, '7 Years', 14000, 'Located at 2nd floor, QHUB, Design Quest focuses on mid-century aesthetics, warm walnut woods, and biophilic integration.'),
(10, 'imagino-interiors', 'Sleek Layout Architect', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', 'Jubilee Hills', 'Japandi Minimalism', 4.80, 19, '6 Years', 15000, 'Located at 8/3, 229/D, Imagino Interiors bridges minimalism and functional warmth. Website: https://www.imaginointeriors.com/, Phone: +91 95338.'),
(11, 'linkspace', 'Principal Architectural Designer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 'Jubilee Hills', 'Modern Luxury', 5.00, 24, '12 Years', 25000, 'Located at Aliy Manzil, Linkspace delivers comprehensive end-to-end luxury architectural design and planning. Phone: +91 95027.'),
(12, 'panache-de-interiors', 'Lead Curation Stylist', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', 'Jubilee Hills', 'Mid-Century Organic', 4.90, 17, '8 Years', 18000, 'Located at Plot no.12, Panache de Interiors specializes in high-end biophilic and mid-century teak layouts. Website: https://panachedeinteriors.com/, Phone: +91 90590.'),
(13, 'vinay-interiors', 'Principal Interior Designer', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', 'Banjara Hills', 'Japandi Minimalism', 5.00, 28, '12 Years', 15000, 'Based at H. No. 8-2, Vinay Interiors delivers premium modular kitchens and residential makeovers focusing on clean lines. Website: https://vinayinteriors1.blogspot.com/, Phone: +91 98667.'),
(14, 'arches-designers', 'Lead Architect & Designer', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80', 'Banjara Hills', 'Modern Luxury', 4.80, 25, '11 Years', 20000, 'Located at G24, Sharadha Apartments, Arches Designers blends luxury residential architectures with bespoke high-end interiors. Phone: +91 90000.'),
(15, 'opulent-interiors', 'Creative Design Partner', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80', 'Banjara Hills', 'Classic Parisian', 5.00, 10, '6 Years', 17000, 'Located at 8-2-120, Road No. 2, Opulent Interiors focuses on vintage elegance, crown moldings, and custom luxurious settings. Website: https://opulentinteriorsdesign.in/.'),
(16, 'elite-luxe', 'Senior Architectural Stylist', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', 'Banjara Hills', 'Mid-Century Organic', 5.00, 13, '8 Years', 19000, 'Located near the Tata Motors showroom, Elite Luxe creates warm biophilic residential spaces with mid-century organic teak and walnut woodworks.');

-- Insert Bookings (2 for client Eleanor Vance, 1 extra)
INSERT INTO bookings (client_name, client_email, client_phone, client_notes, space_type, designer_id, date, time, status, cost) VALUES
('Eleanor Vance', 'client@luxe.com', '+91 98765 43210', 'Master suite layout focus.', 'Living Room', 2, 'Jun 18, 2026', '02:00 PM', 'Scheduled', '₹4,32,000'),
('Eleanor Vance', 'client@luxe.com', '+91 98765 43210', 'Italian marble selections consultation.', 'Gourmet Kitchen', 3, 'Jul 05, 2026', '11:30 AM', 'Completed', '₹9,72,000'),
('Kabir Malhotra', 'kabir@outlook.com', '+91 98765 00112', 'Retro teak sideboard spacing.', 'Bedroom Sanctuary', 2, 'Jun 20, 2026', '03:30 PM', 'Scheduled', '₹3,00,000');
