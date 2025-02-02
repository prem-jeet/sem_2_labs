import { Router } from "express";
import database from "../db/db.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const userRouter = Router();

userRouter.get("", (req, res) => {
  const query = database.prepare(
    "SELECT id,username,fullname,email FROM USERS"
  );
  const users = query.all();
  res.json(new ApiResponse(200, users));
});

// todo : fetch user insurances
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = database.prepare(
    `SELECT * FROM USERS JOIN INSURANCES WHERE USERS.ID LIKE ? AND USERS.ID == INSURANCES.USER_ID`
  );

  const insurances = query.all(id);

  return res.json(
    new ApiResponse(200, {
      insurances: insurances.map((data) => ({
        id: data.id,
        user_id: data.user_id,
        selected_policy: data.selected_policy,
        claimed: data.claimed,
      })),
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
