// routes/courses.js
import express from 'express';
import { courses, createCategory, createCourse, createInstructor, deleteCategoryById, deleteCourse, deleteInstructor, getAllCategories, getCourseById, getCoursesByCategory, getInstructor, updateCategory, updateCourse, updateInstructor } from '../controllers/courses.controller.js'; 
import {upload} from '../middleware/multer.middleware.js'

const router = express.Router();

//get all courses
router.get('/', courses);
router.get('/getCourseById/:courseId',getCourseById)
router.get('/catagories/:categoryId', getCoursesByCategory);
router.post('/createCourse',upload.fields([{name:'courseImage',maxCount:1}]),createCourse)
router.post('/updateCourse',upload.fields([{name:'courseImage',maxCount:1}]),updateCourse)
router.post('/deleteCourse/:courseId',deleteCourse)

//routes for instructor
router.post('/createInstructor',createInstructor)
router.get('/instructor',getInstructor)
router.post('/deleteinstructor/:instructorId',deleteInstructor)
router.post('/updateInstructor',updateInstructor)

//routes for categories
router.get('/catagories', getAllCategories);
router.post('/createCategory',createCategory)
router.post('/updateCategory',updateCategory)
router.post('/delete-categories/:categoryId',deleteCategoryById)

export default router;
