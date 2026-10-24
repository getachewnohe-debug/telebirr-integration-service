const app = require("./app");
const { app: appConfig } = require("./config");

app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});
