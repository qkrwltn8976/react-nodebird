const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  // POST /post
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello" },
    { id: 3, content: "hello" },
  ]);
});

router.post("/", (req, res) => {
  // DELETE /post
  res.json({ id: 1, content: "hello" });
});

module.exports = router;
