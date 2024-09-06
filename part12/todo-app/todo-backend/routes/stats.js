const express = require("express");
const router = express.Router();
const redis = require("../redis");

router.get("/", async (_, res) => {
  console.log("hello");
  let added_todos = 0;
  let added = await redis.getAsync("added_todos");
  if (added) {
    added_todos = added;
  }
  res.send({ added_todos });
});

module.exports = router;
