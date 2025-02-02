import { Router } from "express";
import database from "../db/db.js";
import { insuranceOptionsQuery } from "../db/db.query.js";
import ApiResponse from "../utils/apiResponse.js";

const insuranceRouter = Router();

insuranceRouter.get("/options", (req, res) => {
  const optionsQuery = database.prepare(insuranceOptionsQuery);
  const options = optionsQuery.all();

  return res.json(new ApiResponse(200, {options}));
});


export default insuranceRouter;
