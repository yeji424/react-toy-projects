import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false, // 빈 값으로 올 수도 있잖슴
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // 선택 : 사용자명
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const postModel = model("Post", postSchema);
