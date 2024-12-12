import express from "express";
import {upload} from "./upload.js"
import cors from 'cors'
import multer from "multer";

const app=express();
// middle ware 
app.use(cors());

// use to share json data 
app.use(express.json());

// upload single file data here 
app.post("/upload/file",upload.single("file"),(req,res)=>{
  return res.send({data:req.files})
});

// method to upload single file upload 
app.post("/upload/mutiplefiles",upload.array("files",4),(req,res)=>{
  console.log(req.files)
  return res.send({data:req.files})
});

// handling multer error 
app.use((err, req, res, next) => {
    console.log(err)
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
       return res.status(400).send({ error: 'File size exceeds limit' });
      } else {
       return res.status(400).send({ error: err.message });
      }
    } else if (err) {
      // Handle other errors
      return res.status(400).send({ error: err.message });
    } else {
      next();
    }
  });






app.listen(5000,()=>{
    console.log("server is started ")
});