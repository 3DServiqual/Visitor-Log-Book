import { engine } from "express-handlebars";

export default function configureExpress(app) {
  // Set up global variables accessible in all views
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

  // Set up Handlebars helpers
  app.engine(
    "handlebars",
    engine({
      helpers: {
        // Example helper
        formatDate: function (date) {
          return new Date(date).toLocaleDateString();
        },
      },
    })
  );
}
