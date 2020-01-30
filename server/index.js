const app = require("./app");
const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/posts-db";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("posts-db database is connected");
    const port = app.get("port");
    app.listen(port, () => console.log(`server is running on port:${port}`));
  })
  .catch(err => console.log(err));
