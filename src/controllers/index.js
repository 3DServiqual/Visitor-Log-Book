import { VisitorLog, ServerRoom, ItIntervention } from "../models/index.js";
import logger from "../config/logger.js";

// VisitorLog Controller
export const addVisitorLog = async (req, res, next) => {
  try {
    const {
      date,
      name,
      company,
      reasonForVisit,
      visitorCardNumber,
      timeIn,
      timeOut,
      signature,
    } = req.body;
    const logEntry = await VisitorLog.create({
      date,
      name,
      company,
      reasonForVisit,
      visitorCardNumber,
      timeIn,
      timeOut,
      signature,
    });
    res.status(201).json(logEntry);
  } catch (error) {
    logger.error("Error adding visitor log entry:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const getVisitorLogs = async (req, res, next) => {
  try {
    const logs = await VisitorLog.findAll({ raw: true });
    res.render("visitorLog", { logs }); // Render the view with the logs data
  } catch (error) {
    logger.error("Error fetching visitor logs:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const updateVisitorLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedLog = await VisitorLog.update(updatedData, {
      where: { id: id },
      returning: true,
    });

    if (updatedLog[0] === 0) {
      return res.status(404).json({ message: "Visitor log not found" });
    }

    res.status(200).json(updatedLog[1][0]);
  } catch (error) {
    logger.error("Error updating visitor log:", error);
    next(error);
  }
};

export const deleteAllVisitorLogs = async (req, res, next) => {
  try {
    await VisitorLog.destroy({
      where: {},
      truncate: true, // This will delete all entries
    });
    res.status(200).json({ message: "All visitor logs deleted successfully" });
  } catch (error) {
    logger.error("Error deleting visitor logs:", error);
    res.status(500).json({ message: "Error deleting visitor logs", error });
  }
};

// ServerRoom Controller
export const addServerRoomLog = async (req, res, next) => {
  try {
    const {
      date,
      name,
      company,
      reasonForVisit,
      timeIn,
      timeOut,
      accompaniedBy,
      signature,
    } = req.body;
    const serverRoomEntry = await ServerRoom.create({
      date,
      name,
      company,
      reasonForVisit,
      timeIn,
      timeOut,
      accompaniedBy,
      signature,
    });
    res.status(201).json(serverRoomEntry);
  } catch (error) {
    logger.error("Error adding visitor log entry:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const getServerRoom = async (req, res, next) => {
  try {
    const ServerRoomLogs = await ServerRoom.findAll({ raw: true });
    res.render("serverRoomLogBook", { ServerRoomLogs }); // Render the view with the logs data
  } catch (error) {
    logger.error("Error fetching visitor logs:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const updateServerRoomLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedLog = await ServerRoom.update(updatedData, {
      where: { id: id },
      returning: true,
    });

    if (updatedLog[0] === 0) {
      return res.status(404).json({ message: "Server Room log not found" });
    }

    res.status(200).json(updatedLog[1][0]);
  } catch (error) {
    logger.error("Error updating Server Room log:", error);
    next(error);
  }
};

export const deleteAllServerLogs = async (req, res, next) => {
  try {
    await ServerRoom.destroy({
      where: {},
      truncate: true, // This will delete all entries
    });
    res
      .status(200)
      .json({ message: "All Server Room visitor logs deleted successfully" });
  } catch (error) {
    logger.error("Error deleting Server Room visitor logs:", error);
    res
      .status(500)
      .json({ message: "Error deleting Server Room visitor logs", error });
  }
};

// ItIntervention Controller
export const addItIntervention = async (req, res, next) => {
  try {
    const {
      incidentId,
      date,
      companyName,
      contactPerson,
      phoneOrFax,
      workStarted,
      workCompleted,
      billable,
      warranty,
      maintenance,
      hardwareSoftwareName,
      natureOfIntervention,
      actionsTaken,
      delegatedStaffName,
      delegatedStaffTitle,
      delegatedStaffSignature,
      delegatedStaffDate,
      providerName,
      providerTitle,
      providerSignature,
      providerDate,
    } = req.body;

    const interventionEntry = await ItIntervention.create({
      incidentId,
      date,
      companyName,
      contactPerson,
      phoneOrFax,
      workStarted,
      workCompleted,
      billable: billable === "on",
      warranty: warranty === "on",
      maintenance: maintenance === "on",
      hardwareSoftwareName,
      natureOfIntervention,
      actionsTaken,
      delegatedStaffName,
      delegatedStaffTitle,
      delegatedStaffSignature,
      delegatedStaffDate,
      providerName,
      providerTitle,
      providerSignature,
      providerDate,
    });

    res.status(201).json(interventionEntry);
  } catch (error) {
    logger.error("Error adding IT intervention entry:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const getItInterventions = async (req, res, next) => {
  try {
    const interventions = await ItIntervention.findAll({ raw: true });
    res.render("itInterventionForm", { interventions }); // Render the view with the interventions data
  } catch (error) {
    logger.error("Error fetching IT interventions:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const updateItIntervention = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Log the request data for debugging
    logger.info("Updating IT intervention with ID:", id);
    logger.info("Updated data:", updatedData);

    const updatedIntervention = await ItIntervention.update(updatedData, {
      where: { id: id },
      returning: true,
    });

    // Log the result of the update operation
    logger.info("Update result:", updatedIntervention);

    if (updatedIntervention[0] === 0) {
      return res.status(404).json({ message: "IT Intervention not found" });
    }

    // Ensure the response data is correctly structured
    const responseData = updatedIntervention[1][0];
    logger.info("Response data:", responseData);

    res.status(200).json(responseData);
  } catch (error) {
    logger.error("Error updating IT intervention:", error);
    next(error);
  }
};

export const deleteAllItInterventions = async (req, res, next) => {
  try {
    await ItIntervention.destroy({
      where: {},
      truncate: true, // This will delete all entries
    });
    res
      .status(200)
      .json({ message: "All IT interventions deleted successfully" });
  } catch (error) {
    logger.error("Error deleting IT interventions:", error);
    res.status(500).json({ message: "Error deleting IT interventions", error });
  }
};
