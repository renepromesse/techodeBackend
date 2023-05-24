import express from "express"
import cors from "cors"
import welcome from "./controllers/welcome.js"
import articles from "./routes/articles.js";
import mongoose from "mongoose"



const server = express();
server.use(cors());


server.get("/api/v1/",welcome);

server.use("/api/v1/articles",articles);


const port = 6500;


const connectToMongoDb = ()=>{
    mongoose.connect("mongodb+srv://rene:renepromesse@cluster0.4ipplsz.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Failed to connect the database", err);
    })
}

server.listen(port, ()=>{
    console.log("server listening on port "+ port );
    connectToMongoDb();
})
