import { Router } from "express";
import database from "../db/db.js";
import { insuranceOptionsQuery } from "../db/db.query.js";
import ApiResponse from "../utils/apiResponse.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const insuranceRouter = Router();

insuranceRouter.get("/available", (req, res) => {
  const optionsQuery = database.prepare(insuranceOptionsQuery);
  const userInsurances = database
    .prepare(`SELECT selected_policy FROM INSURANCES WHERE USER_ID = ?`)
    .all(req.userId)
    .map(({ selected_policy }) => selected_policy);
  console.log({ userInsurances });

  const options = optionsQuery.all();

  const filteredOptions = options.filter(
    (option) => !userInsurances.includes(option.id)
  );

  return res.json(new ApiResponse(200, { options: filteredOptions }));
});

insuranceRouter.get("/bought", verifyUserMiddleware, (req, res) => {
  const optionsQuery = database.prepare(insuranceOptionsQuery);
  const options = optionsQuery.all();

  return res.json(new ApiResponse(200, { options }));
});

export default insuranceRouter;
