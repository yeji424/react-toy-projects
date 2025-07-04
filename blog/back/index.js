import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

import cors from "cors";
// 프론트, 백이 서로 쿠키 공유하면서 보안요구가 나타남
// 명시적인 url이 필요했음 : origin
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173", // 나중에 환경변수로
    credentials: true, // node에서 true로 설정하면 쿠키를 포함한 요청을 허용합니다 라는 뜻
  })
);

app.use(express.json()); // 전역으로 미들웨어 연결

// nodejs에서 쿠키를 파싱할 수 있게끔
import cookieParser from "cookie-parser";
app.use(cookieParser()); // 전역으로 사용 가능하도록 함

import mongoose from "mongoose";
import { userModel } from "./models/user.js";

const mongoUrl = `${process.env.MONGODB_URI.replace(
  "<user>",
  process.env.MONGODB_USER
).replace("<pass>", process.env.MONGODB_PASS)}/${
  process.env.MONGODB_NAME
}?retryWrites=true&w=majority&appName=Cluster0`;

const cookiesOption = {
  httpOnly: true, // JS에서 접근이 불가함
  maxAge: 1000 * 60 * 60 * 24,
  secure: process.env.NODE_ENV === "production", // HTTP 사용 시 true로 설정
  sameSite: "strict", // CSRF 공격 방지
  path: "/",
};

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB 연결됨");
  })
  .catch((e) => {
    console.log("MongoDB 연결 실패 ", e);
  });

import bcrypt from "bcryptjs";
const saltRounds = parseInt(process.env.JWT_SALT_ROUND, 10); // salt길이
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SCR_KEY;
const tokenLife = process.env.JWT_EXP;

// ---------------------------------------------

app.post("/register", async (req, res) => {
  console.log("백 ----", req.body);
  const { username, pwd } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.json({ msg: "이미 존재하는 사용자입니다." });
  }
  const userDoc = new userModel({
    username,
    pwd: bcrypt.hashSync(pwd, saltRounds),
  });
  const savedUser = await userDoc.save();

  res.status(201).json({
    user: {
      username: savedUser.username,
      _id: savedUser._id,
    },
  });
});
app.post("/login", async (req, res) => {
  try {
    const { username, pwd } = req.body;
    const userDoc = await userModel.findOne({ username });
    if (!userDoc) {
      return res.status(401).json({ error: "존재하지 않는 사용자입니다." });
    }
    // 암호해독
    const CheckPwd = bcrypt.compareSync(pwd, userDoc.pwd);
    if (!CheckPwd) {
      return res.status(401).json({ error: "비밀번호가 틀렸습니다.." });
    } else {
      // JWT 토큰 발급
      const { _id, username } = userDoc;
      const payload = { id: _id, username }; // 토큰화하기 위해 가져오는 것
      const token = jwt.sign(payload, secretKey, {
        expiresIn: tokenLife,
      });
      res.cookie("token", token, cookiesOption).json({
        id: userDoc._id,
        username,
      });
    }
  } catch (e) {
    console.error("SERVER ERROR | ", e);
    res.status(500).json({ error: "로그인 실패" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log("쿠키", token);
  if (!token) {
    return res.json({ error: "로그인 필요" });
  }

  jwt.verify(token, secretKey, (err, info) => {
    if (err) {
      return res.json({ error: "로그인 필요" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  const logoutToken = {
    ...cookiesOption,
    maxAge: 0,
  };
  res.cookie("token", "", logoutToken).json({ message: "로그아웃 되었음" });
});

// 게시글 작성
import multer from "multer";
import path from "path";
import fs from "fs";
import { postModel } from "./models/post.js";

// 프론트에서 정적 데이터 연결하라는 설정
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "uploads", filename));
});

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/postWrite", upload.single("files"), async (req, res) => {
  try {
    console.log(req.file); // 파일 정보
    console.log(req.body);
    const { token } = req.cookies;
    if (!token) {
      return res.json({ error: "로그인 필요" });
    }
    const userInfo = jwt.verify(token, secretKey); // 토큰 검증
    console.log(userInfo);
    const { title, summary, content } = req.body;
    const author = userInfo.username;
    const postData = {
      title,
      summary,
      content,
      cover: req.file ? req.file.path : null, // 업로드할 파일 경로
      author,
    };

    await postModel.create(postData);
    console.log("게시글 저장 완료");
    res.json({ message: "게시글 작성 완료" });
    // console.log("제목", title);
    // console.log("요약내용", summary);
    // console.log("내용", content);
  } catch (e) {
    console.log("게시글 작성 에러", e);
    return res.status(500).json({ error: "게시글 작성 실패" });
  }
});

app.get("/postList", async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 }).limit(3);
    res.json(posts);
  } catch (e) {
    console.log("게시글 가져오기 에러", e);
    return res.status(500).json({ error: "게시글 가져오기 실패" });
  }
});

app.get("/postDetail/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    res.json(post);
  } catch (e) {
    console.log("게시글 상세 조회 에러", e);
    return res.status(500).json({ error: "게시글 가져오기 실패" });
  }
});
app.listen(port, () => {
  console.log(`${port} 포트에서 돌고있음`);
});
