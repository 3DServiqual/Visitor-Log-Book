import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sessions/sessions.db", // Assuming you want to use the same SQLite database for sessions
});

// async function dropAllSchemas() {
//   const queryInterface = sequelize.getQueryInterface();
//   await queryInterface.dropAllSchemas();
//   console.log("All schemas dropped successfully.");
// }

// // Call the function to drop all schemas
// dropAllSchemas().catch((err) => {
//   console.error("Error dropping schemas:", err);
// });

export default sequelize;
