var express = require("express");
const ArticleController = require("../controllers/ArticleController");

var router = express.Router();

router.get("/", ArticleController.articleList);
router.get("/:id", ArticleController.articleDetail);
router.post("/", ArticleController.articleStore);
router.put("/:id", ArticleController.articleUpdate);
router.delete("/:id", ArticleController.articleDelete);

module.exports = router;