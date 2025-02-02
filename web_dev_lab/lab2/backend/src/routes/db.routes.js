import { Router } from "express";
import database from "../db/db.js";
import { insuranceOptionsQuery } from "../db/db.query.js";
import ApiResponse from "../utils/apiResponse.js";

const dbRouter = Router();

dbRouter.get("/insurances/options", (req, res) => {
  const optionsQuery = database.prepare(insuranceOptionsQuery);
  const options = optionsQuery.all();
  console.log(options);
  return res.json(new ApiResponse(200, options));
});


dbRouter.get("/insurances/options", (req, res) => {
    const optionsQuery = database.prepare(insuranceOptionsQuery);
    const options = optionsQuery.all();
    console.log(options);
    return res.json(new ApiResponse(200, options));
  });
  
export default dbRouter;
