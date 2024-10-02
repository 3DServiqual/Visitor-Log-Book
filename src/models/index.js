import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VisitorLog = sequelize.define("VisitorLog", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reasonForVisit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visitorCardNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeIn: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  timeOut: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  signature: {
    type: DataTypes.TEXT, // Assuming the signature is stored as a base64 encoded string or similar
    allowNull: true,
  },
});

const ServerRoom = sequelize.define("ServerRoom", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reasonForVisit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeIn: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  timeOut: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  accompaniedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signature: {
    type: DataTypes.TEXT, // Assuming the signature is stored as a base64 encoded string or similar
    allowNull: true,
  },
});

const ItIntervention = sequelize.define("ItIntervention", {
  incidentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactPerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneOrFax: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workStarted: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  workCompleted: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  billable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  warranty: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  maintenance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  hardwareSoftwareName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  natureOfIntervention: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  actionsTaken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  delegatedStaffName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delegatedStaffTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delegatedStaffSignature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delegatedStaffDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  providerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerSignature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export { VisitorLog, ServerRoom, ItIntervention };
