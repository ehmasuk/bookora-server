

import app from "./app/app.js";
import connectDb from "./db/connectDb.js";

const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`app is listening in port ${port}`);
    });
  })
  .catch((err) => console.log(err));
