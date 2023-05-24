import express from "express";
import bodyParser from "body-parser"
import  { createArticle,readArticle,readMoreArticles, putExerciseArticles,readArticlesLimited,updateArticle, deleteArticle } from "../controllers/articles.js"

const router = express.Router();
router.use(bodyParser.json())


router.post("/save", createArticle);
router.get("/read/:reqId",readArticle)
router.get("/more",readMoreArticles)
router.get("/", readArticlesLimited)
router.put("/exercise",putExerciseArticles)
router.patch("/article/:articleId",updateArticle)
router.delete("/delete/:articleId", deleteArticle)

export default router;
