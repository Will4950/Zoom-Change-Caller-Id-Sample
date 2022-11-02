import dotenv from "dotenv/config"; // load .env
import logger from "./logger.js";
import { getAccessToken, getUsers, updateCallerId } from "./zoom.js";
import express from "express";

const port = process.env.PORT || 3000;
if (!process.env.accountID) logger.warn("accountID missing in .env");
if (!process.env.clientID) logger.warn("clientID missing in .env");
if (!process.env.clientSecret) logger.warn("clientSecret missing in .env");

const app = express();
app.set("query parser", "simple");

app.get("/:site/:e164", express.json(), async (req, res) => {
  // Get an access token for use in future requests
  const accessToken = await getAccessToken();
  if (!accessToken) {
    res.status(500).json({ error: "Unable to get access token" });
    return;
  }

  // Get a list of users for our site
  let users = await getUsers(accessToken, req.params.site, []);
  if (users.lenth <= 0) {
    res.status(404).json({ error: "No users" });
    return;
  }

  // Loop through the users and set the caller Id
  let resData = {
    num_users: users.length,
    success: [],
    failed: [],
  };
  for (let i in users) {
    if (await updateCallerId(accessToken, users[i].id, req.params.e164)) {
      resData.success.push(users[i].email);
    } else {
      resData.failed.push(users[i].email);
    }
  }

  res.status(200).json(resData);
});

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
