import { app } from "./app.js";
import "dotenv/config";
import { env } from "./src/config/env.js";

app.listen(env.PORT, (err) => {
  if (err) console.error(err);
  else console.log(`SERVER RUNNING ON PORT: ${env.PORT}`);
});
