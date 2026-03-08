import express from 'express';
import { generateImage, getHistory } from '../controllers/imageController.js';
import { userAuth } from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post("/generate-image",userAuth,generateImage)
imageRouter.get("/history",userAuth,getHistory)

export default imageRouter