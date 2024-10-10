// routes/courses.js
import express from 'express';
import {register,login, users, deleteUser, updateUser} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', users);
//get all courses
router.post('/register', register);

// Login Route
router.post('/login',login);

router.post('/updateuser',updateUser)
router.post('/deleteuser/:userId',deleteUser)

export default router;
