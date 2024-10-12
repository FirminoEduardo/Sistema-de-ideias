const express = require('express');
const { addComment } = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:id/comments', verifyToken, addComment);  // ID da ideia para comentar

module.exports = router;
