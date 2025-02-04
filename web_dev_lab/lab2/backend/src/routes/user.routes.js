import { Router } from "express";
import database from "../db/db.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const userRouter = Router();

// todo : get user details
userRouter.post("", (req, res) => {
  const query = database.prepare(
    "SELECT id,username,fullname,email FROM USERS WHERE ID = ?"
  );
  const user = query.get(req.userId);
  res.json(new ApiResponse(200, user));
});

// todo : fetch user insurances
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = database.prepare(
    `SELECT 
    temp.id as id,
    selected_policy,
    name, description,user_id,claimed
    FROM (SELECT insurances.claimed, insurances.id as id, insurances.selected_policy, users.id as user_id FROM USERS JOIN INSURANCES WHERE USERS.ID LIKE ? AND USERS.ID == INSURANCES.USER_ID) AS temp
    JOIN insurance_options WHERE TEMP.selected_policy = insurance_options.id
    `
  );

  const insurances = query.all(id);
  console.log({ insurances });

  return res.json(
    new ApiResponse(200, {
      insurances,
    })
  );

  //   const getUserData = database.prepare(`SELECT * FROM USERS WHERE ID = ?`);
  //   const user = getUserData.get();
});

// todo : add insurance to user
userRouter.post("/:id", (req, res) => {
  const { id } = req.params;
  const user = database.prepare(`select * from users where id like ?`).get(id);
  if (!user) throw new ApiError(404, "unable to find user");
  const { selectedInsurances } = req.body;

  const query = database.prepare(`
          INSERT INTO INSURANCES (SELECTED_POLICY, USER_ID) VALUES (?,?)`);
  if (selectedInsurances.length) {
    for (let policy of selectedInsurances) query.run(policy, id * 1);
  }

  return res.json(new ApiResponse(201, [], "Policies added successfully"));
});

// todo : claim user insurance
userRouter.put("/:id/:insuranceId", (req, res) => {
  const { id, insuranceId } = req.params;
  const query = database.prepare(
    `UPDATE INSURANCES SET CLAIMED=TRUE WHERE USER_ID = ? AND ID = ?`
  );

  const out = query.run(id * 1, insuranceId * 1);

  res.json(new ApiResponse(200, [], "insurance claimed successfully"));
});

// todo : delete user insurance
userRouter.delete("/:id/:insuranceId", (req, res) => {
  const { id, insuranceId } = req.params;
  const query = database.prepare(
    `DELETE FROM INSURANCES WHERE USER_ID = ? AND ID = ?`
  );

  const out = query.run(id * 1, insuranceId * 1);

  res.json(new ApiResponse(200, [], "insurance deleted successfully"));
});
export default userRouter;
