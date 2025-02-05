// ! insurance options table structure

export const initInsuranceOptionsQuery = `
    CREATE TABLE IF NOT EXISTS insurance_options(
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL
    ) 
`;

// ! user table structure
export const initUserDatabaseQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )
`;

// !  insurance table structure
export const initUserInsuranceQuery = `
    CREATE TABLE IF NOT EXISTS insurances(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_policy TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    claimed BOOLEAN DEFAULT false,
    FOREIGN KEY (selected_policy) REFERENCES insurance_options(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;

export const insuranceOptionsQuery = `SELECT * FROM insurance_options`;

export const getInsuranceQuery = `SELECT * FROM INSURANCES WHERE user_id = ?`;
