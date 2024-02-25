import express from 'express'
import { checklogin, createuser, get } from '../controllers/page.js';

export const router = express.Router();

router.get('/',get);

router.post('/createuser',createuser)

router.post('/checklogin',checklogin)
