const express = require("express"),
  router = express.Router(),
  tagBoard = require("../controllers/tagboard"),
  auth = require("../middleware/auth");

router.get("/", auth.isAuthorized, tagBoard.getTagBoards);
router.post("/", auth.isAuthorized, tagBoard.createTagBoard);

router.put("/boardId", auth.isAuthorized, tagBoard.updateTagBoard);
router.delete(":/boardId", auth.isAuthorized, tagBoard.deleteTagBoard);

module.exports = router;
