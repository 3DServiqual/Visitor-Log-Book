import express from "express";
import {
  addVisitorLog,
  updateVisitorLog,
  getVisitorLogs,
  deleteAllVisitorLogs,
  getServerRoom,
  updateServerRoomLog,
  addServerRoomLog,
  deleteAllServerLogs,
  addItIntervention,
  updateItIntervention,
  getItInterventions,
  deleteAllItInterventions,
} from "../controllers/index.js";
const router = express.Router();

router.post("/visitor-log/add", addVisitorLog);
router.put("/visitor-log/update/:id", updateVisitorLog);
router.get("/", getVisitorLogs);
// Route to handle deletion of all visitor log entries
router.delete("/delete-all", deleteAllVisitorLogs);

router.post("/server-room/add", addServerRoomLog);
router.put("/server-room/update/:id", updateServerRoomLog);
router.get("/server-room", getServerRoom);

router.post("/it-intervention/add", addItIntervention);
router.put("/it-intervention/update/:id", updateItIntervention);
router.get("/it-intervention", getItInterventions);
//router.delete("/it-intervention", deleteAllItInterventions);

//router.delete("/server-room", deleteAllServerLogs);

export default router;
