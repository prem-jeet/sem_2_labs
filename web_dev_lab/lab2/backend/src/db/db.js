import { DatabaseSync } from "node:sqlite";
import {
  initInsuranceOptionsQuery,
  initUserDatabaseQuery,
  initUserInsuranceQuery,
} from "./db.query.js";

const database = new DatabaseSync(`${import.meta.dirname}/main.db`);
const shouldDeleteDB = true;
try {
  if (shouldDeleteDB) {
    database.exec(`
        DROP TABLE IF EXISTS insurances;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS insurance_options;
        `);
  }
  database.exec(initUserDatabaseQuery);
  database.exec(initInsuranceOptionsQuery);
  database.exec(initUserInsuranceQuery);
  console.log("Databases initialized successfully");

  const createInsuranceOPtions = `
  INSERT INTO insurance_options VALUES
    ('A', 'INSURANCE A'),
    ('B', 'INSURANCE B'),
    ('C', 'INSURANCE C')
  `;
  database.exec(createInsuranceOPtions);
} catch (err) {
  console.log("failed to initialize databases");
  console.error(err);
}
export default database;
