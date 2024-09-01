import mongoose from "mongoose";
import { Schema , model } from "mongoose";
const ProjectSchema = new mongoose.Schema({
  postedBy: { type: String , required: true },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  portfolioLink: {
    type: String,
    required: true,
    },
  videoLink: {
    type: String,
  },
  thumbnailImg: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Project || model('Project', ProjectSchema );