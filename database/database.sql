/*create database event_management;
use event_management;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, event_id)
); 

INSERT INTO events
(title, description, event_date, event_time, location, capacity)
VALUES
(
    'Web Development Workshop',
    'Learn HTML, CSS, JavaScript and modern web development.',
    '2026-08-19',
    '10:00:00',
    'Seminar Hall',
    100
),
(
    'Artificial Intelligence Seminar',
    'Introduction to Artificial Intelligence and Machine Learning.',
    '2026-08-20',
    '11:00:00',
    'Computer Lab',
    80
),
(
    'Cyber Security Awareness Program',
    'Learn about common cyber security threats and protection methods.',
    '2026-08-21',
    '14:00:00',
    'Auditorium',
    150
); */
#show tables;
#select * from users;

#USE event_management;
/*INSERT INTO users
(name, email, password, role)
VALUES
(
    'Administrator',
    'admin@gmail.com',
    'PASTE_BCRYPT_HASH_HERE',
    'admin'
);
#USE event_management;

UPDATE users
SET password = '$2b$10$GxRnQFkmHGihpAIW.EKiMu9AenMYndWrPe5qOzTAVgmgfHyDJKrMO'
WHERE id=2;*/
#update users set password = '$2b$10$GxRnQFkmHGihpAIW.EKiMu9AenMYndWrPe5qOzTAVgmgfHyDJKrMO' where role ='admin';
#select * from users;
#USE event_management;

USE event_management;

#delete from users where id=4;

SELECT *FROM users  where email="akula@gmail.com";
#DELETE FROM users 
#WHERE email = 'akula@gmail.com';