const app = require("./app");
const cors = require("cors");
app.use(cors());

app.listen(3001, function () {
  console.log("Started http://localhost:3001/");
});