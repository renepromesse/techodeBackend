import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required:"the title is missing"
    },
    content:{
        type: String,
        required:"the content is missing"
    },
    author:{
        type: String
    },
    image:{
        type: String,
        required:"the image is missing"
    }
})

export default mongoose.model("Articles", articleSchema);