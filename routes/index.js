// routes/index.js
const express = require('express');
const userRouter = require('./userRouter');
const searchRouter = require('./searchRouter');

const router = express.Router();

router.use('/', searchRouter);
router.use('/', userRouter);



module.exports = router;
