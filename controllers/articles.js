import { trusted } from "mongoose";
import ArticleModel from "../models/articleModel.js"


const createArticle = async (req, res)=>{
    try{
        // const data = req.body;
        const articleInstance = new ArticleModel({
            title: req.body.title,
            content:req.body.content,
            author:req.body.author || "Rene Promesse",
            image: req.body.image
        });
        
        let response = await articleInstance.save();
         res.status(200).json(
                {
                    message:"Data save Successfully",
                    error:null,
                    data:response
                }
            )

    }
    catch(err){
        console.log("error from createArticleController");
        res.status(500).json(
            {
                message:"Failed to save the data",
                error:"Failed to save",
                data:err
            }
        )
    }
}

const readArticle =async (req, res)=>{
    try{
        const blogId = req.params.reqId;
        const query = {_id:blogId};
        
        const result = await ArticleModel.find(query);  
        //ArticleModel.find({_id:blogId})
        if(result.length == 0){
            res.status(404).json({
                message:"Data fetched but nothing was found",
                error:"No data found",
                data:result
            })
        }else{
            res.status(200).json({
                message:"Data fetched successfully",
                error:null,
                data:result
            });
        }
        range

        // res.status(name);

    }
    catch(err){
        console.log("Error under readArticleOne")
        res.status(500).json({
            message:"Failed to read the article specified",
            error:"Internal error server",
            data:null
        })
    }
   

}
const readArticlesLimited = async(req, res) =>{
    try{
        const page = req.query.page || 1;
        const range = req.query.limit || 5;
    
        let limitation = range * page;    // 10 * 2 = 20
        let start = limitation - range;  // 20 - 10  = 10 
    
        let result = await ArticleModel.find({}).skip(start).limit(range)
        // here handle the situation when the resuls are empty
        res.status(200).json({
            message:"Data fetched successfully",
            error:null,
            data: result
        });
    }
    catch(err) {
        console.log("Error under readARticlesLimited")
        res.status(500).json({
            message:"Failed to read the articles specified",
            error:"Internal error server",
            data:null
        })
    }



}

const updateArticle =async (req,res)=>{
    const articleId = req.params.articleId;
    const updates = req.body;
    let found = await ArticleModel.find({_id:articleId});
    if(found.length ==0){
        res.status(404).json({
            message:"Article trying to update is not available",
            error:"Article not found",
            data:null
        });
    }else{
        let result = await ArticleModel.findOneAndUpdate(
            {_id:articleId},
            {$set:updates}
        )
        res.status(200).json({
            message:"Data updated successfully",
            error:null,
            data: result
        })
    }

}
const deleteArticle = async (req, res)=>{
    const articleId = req.params.articleId;
    let found = await ArticleModel.find({_id:articleId});
    if(found.length == 0){
        res.status(404).json({
            message:"Article trying to delete is not available",
            error:"Article not found",
            data:null
        });
    }else{

        let result = await ArticleModel.deleteOne({_id:articleId});

        res.status(200).json({
            message:"Article"+ articleId +" deleted successfully",
            error:null,
            data:result
        });
    }
}


const readMoreArticles = (req, res) =>{
    const start = req.query.start;
    let a = req.query.name
    res.send(req.query);
}

const putExerciseArticles = (req, res)=>{
    let queryId = req.query.id;
    let bodyData = req.body;
    res.send    ([queryId,bodyData]);
}



export { createArticle, readArticle, readMoreArticles, putExerciseArticles, readArticlesLimited,updateArticle, deleteArticle}