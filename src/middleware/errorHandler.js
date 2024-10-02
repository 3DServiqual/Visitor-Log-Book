import logger from "../config/logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode);

  // Attempt to render the error view, fall back to JSON response if view isn't found
  res.render(
    "error",
    {
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? err : {},
    },
    (renderError, html) => {
      if (renderError) {
        // If there's an error rendering the view, send a JSON response
        res.json({
          message: errorMessage,
          error: process.env.NODE_ENV === "development" ? err : {},
        });
      } else {
        res.send(html);
      }
    }
  );
}
