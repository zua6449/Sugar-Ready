'use server'
import connectDB from "@/db/ConnectDB";
import Project from "@/models/Project";
import mongoose from "mongoose";
export const createProject = async(postedBy,title,category,description,portfolioLink,videoLink,thumbnailImg)=>{
    await connectDB();
    await Project.create({
        postedBy,
        title,
        category,
        description,
        portfolioLink,
        videoLink,
        thumbnailImg,
    })

}

export const fetchProject = async(postedBy)=>{
    await connectDB();
    let b = await Project.find({postedBy}).lean()
    if(b){
        return b
    }
}
export const DeletePost = async(_id)=>{
    await connectDB();
    await Project.deleteOne({_id})
}
export const EditPost = async(_id)=>{
    await connectDB();
    let post = await Project.findOne({_id}).lean()
    if(post){
        return post
    }
}

// Project page
