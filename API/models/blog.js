import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },

    userRef: {
      type: String,
      required: true,
    },
    avatar:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      
    },
    desc: {
      type: String,
      required: true,
      minLength: 5,
    },
    imageURLs: {
      type: Array,
    },
    userRef: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);
export default Blog;
