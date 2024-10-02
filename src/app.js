import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import mime from "mime";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import configureExpress from "./config/express.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine setup
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         "style-src": ["'self'", "https://cdn.jsdelivr.net"],
//         "script-src": [
//           "'self'",
//           "https://unpkg.com",
//           "https://cdn.jsdelivr.net",
//           "'unsafe-eval'",
//         ],
//       },
//     },
//   })
// );
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      const mimeType = mime.lookup(path);
      res.setHeader("Content-Type", mimeType);
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Session setup
const SQLiteStoreSession = SQLiteStore(session);
app.use(
  session({
    store: new SQLiteStoreSession({
      dir: "./sessions",
      db: "sessions.db",
      concurrentDB: true,
      createDirIfNotExists: "true",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Configure Express
configureExpress(app);

// Routes
app.use("/", routes);

// Error handling
app.use(errorHandler);

export default app;
