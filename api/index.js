const http = require("./src/app");
const { conn } = require("./src/db");


conn
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");

    const PORT = process.env.PORT || 3001;
    http.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database: ", err);
  });
