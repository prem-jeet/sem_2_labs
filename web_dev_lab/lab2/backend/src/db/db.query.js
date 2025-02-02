export const initInsuranceOptionsQuery = `
    CREATE TABLE IF NOT EXISTS insurance_options(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
    ) 
`;

export const initUserDatabaseQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    )
`;

export const initUserInsuranceQuery = `
    CREATE TABLE IF NOT EXISTS insurances(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_policy TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (selected_policy) REFERENCES insurance_options(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;

export const insuranceOptionsQuery = `SELECT * FROM insurance_options`;

export const getInsuranceQuery = `SELECT * FROM INSURANCES WHERE user_id = ?`;
