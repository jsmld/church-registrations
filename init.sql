CREATE TABLE
  participants (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    marital_status VARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(20) NOT NULL,
    neighborhood VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    street_number INT (10) NOT NULL,
    complement VARCHAR(50),
    country VARCHAR(20) DEFAULT 'Brasil',
    children INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )