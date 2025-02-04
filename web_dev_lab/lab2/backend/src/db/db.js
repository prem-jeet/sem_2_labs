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
    ('A', 'INSURANCE A', 'Lorem ipsum asd ll'),
    ('B', 'INSURANCE B', 'Lorem ipsum asd ll'),
    ('C', 'INSURANCE C', 'Lorem ipsum asd ll'),
     ('A1', 'INSURANCE A1', 'Lorem ipsum asd ll'),
    ('B1', 'INSURANCE B1', 'Lorem ipsum asd ll'),
    ('C1', 'INSURANCE C1', 'Lorem ipsum asd ll')
  `;
  database.exec(createInsuranceOPtions);
} catch (err) {
  console.log("failed to initialize databases");
  console.error(err);
}
export default database;
