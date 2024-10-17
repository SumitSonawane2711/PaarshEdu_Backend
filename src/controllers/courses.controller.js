// controllers/coursesController.js
import { Category,Course, Instructor } from '../models/course.model.js'; // Adjust the import path as needed
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { asyncHandler } from '../utils/asyncHandler.js';

// create a courses
export const createCourse = async (req,res) => {
  
    const {title,description,price,instructorId,categoryId,duration,language,level,type,longdescription} = req.body;

     // Validate required fields
     if (!title || !description || !price || !instructorId || !categoryId) {
      throw new ApiError(400, 'All fields are required');
     }
    
 // Check if files were uploaded
 if (!req.files || !req.files['courseImage']) {
      throw new ApiError(400, 'Course images are required');
 }

 let CourseLocalPath;
 if(req.files && Array.isArray(req.files.courseImage )&& req.files.courseImage.length > 0){
  CourseLocalPath = req.files.courseImage[0].path
 }
 
 if(!CourseLocalPath){
     throw new ApiError(400, "course file is required")
 }

 const courseImagePath = await uploadOnCloudinary(CourseLocalPath)

    const course = await Course.create({
      title,
      description,
      price,
      instructorId,
      imageUrl : courseImagePath.url,
      categoryId,
      duration,
      language,
      level,
      type,
      longdescription
  });

  // 8.check for user creation
  if(!course) {
    throw new ApiError(500, "Something went wrong while creating the course")
}

// 9.return resposne
return res.status(201).json(
    new ApiResponse(200,course,"course created Successfully")
)
  
}

// Fetch all Courses
export const courses = async (req, res) => {
  const courses = await Course.findAll();

  if(!courses) {
    throw new ApiError(500, "Something went wrong while fetching the courses")
}
     return res.status(200).json(
          new ApiResponse(200, 'Products retrieved successfully',
               courses)
     );
 
}

//fetch course by id
export const getCourseById = asyncHandler(async(req,res)=>{
  const {courseId} = req.params;

  // Find the course by ID
  const course = await Course.findByPk(courseId);

  // Check if the course exists
  if(!course){
    throw new ApiError(500, "Something went wrong while updating the course")
  }

  // Return the response
  return res.status(200).json(
    new ApiResponse(200,"course is fetch successfully",course,)
  );  
})

// Fetch courses by category
export const getCoursesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const courses = await Course.findAll({
      where: { categoryId },
      include: [Category] // Optional: include category details
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

//create a category
export const createCategory = asyncHandler(async (req,res)=>{

  const {description,name} = req.body;
  

     //Validate required fields
     if (!name || !description) {
      throw new ApiError(400, 'All fields are required');
     }

    const category = await Category.create({
      name,
      description,
    });

    // 8.check for user creation
    if(!category) {
      throw new ApiError(500, "Something went wrong while creating the category")
    }

    // 9.return resposne
    return res.status(201).json(
    new ApiResponse(200,category,"category created Successfully")
    )
  }
)

// Fetch all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

//Update category
export const updateCategory = asyncHandler(async (req, res) => {
  
  const {id,name,description} = req.body;

  // Find the course by ID
  const category = await Category.findByPk(id);

  // Check if the course exists
  if (!category) {
    return res.status(404).json({ message: 'category not found' });
  }

  // Update the category
  const updatedCategory = await category.update({
    name :name || category.name,
    description: description || category.description,
});

if(!updatedCategory){
  throw new ApiError(500, "Something went wrong while updating the course")

}

  // Return the response
  return res.status(200).json(
    new ApiResponse(200,updatedCategory,"course updated Successfully")
  );

});

//Delete Category by Id
export const deleteCategoryById = asyncHandler(async (req,res)=>{
  const { categoryId } = req.params; // Adjusted to match the route parameter
  
  // Find the course by ID
  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new ApiError(404, `category not found error ${categoryId}`);
  }

  // Find the product by ID and delete it
  const deletedcategory = await category.destroy();
  
  if (!deletedcategory) {
       throw new ApiError(404, 'category not found');
  }

  return res.status(200).json(
       new ApiResponse(200, 'category deleted successfully')
  );

})

// Update an existing course
export const updateCourse = asyncHandler(async (req, res) => {
  
  const {id,title,description,price,instructorId,categoryId,duration,language,level,type,longdescription} = req.body;

  // Find the course by ID
  const course = await Course.findByPk(id);

  // Check if the course exists
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  let courseImagePath = null;

  // Check if a new course image is provided
  if (req.files && Array.isArray(req.files.courseImage) && req.files.courseImage.length > 0) {
    const CourseLocalPath = req.files.courseImage[0].path;
    
    // Upload the image to Cloudinary
    uploadedImage  = await uploadOnCloudinary(CourseLocalPath);
    courseImagePath = uploadedImage.url
  }

  // Update the course
  const updatedCourse = await course.update({
    title,
    description,
    price,
    instructorId,
    imageUrl : courseImagePath || course.imageUrl,
    categoryId,
    duration,
    language,
    level,
    type,
    longdescription
});

if(!updatedCourse){
  throw new ApiError(500, "Something went wrong while updating the course")

}

  // Return the response
  return res.status(200).json(
    new ApiResponse(200,updatedCourse,"course updated Successfully")
  );
});

// delete course
export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params; // Adjusted to match the route parameter

  // Find the course by ID
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  // Find the product by ID and delete it
  const deletedCourse = await course.destroy();
  
  if (!deletedCourse) {
       throw new ApiError(404, 'course not found');
  }

  return res.status(200).json(
       new ApiResponse(200, 'course deleted successfully')
  );
});

//get instructor
export const getInstructor = async (req, res) => {
  const instructor = await Instructor.findAll();

  if(!instructor) {
    throw new ApiError(500, "Something went wrong while fetching the instructor")
}
     return res.status(200).json(
          new ApiResponse(200, 'instructor fetch successfully',
               instructor)
     );
  
}

// add instructor
export const createInstructor = asyncHandler(async (req,res)=>{

  const {name,email} = req.body;

     // Validate required fields
     if (!name || !email) {
      throw new ApiError(400, 'All fields are required');
     }

    const instructor = await Instructor.create({
      name,
      email,
    });

    // 8.check for user creation
    if(!instructor) {
      throw new ApiError(500, "Something went wrong while creating the instructor")
    }

    // 9.return resposne
    return res.status(201).json(
    new ApiResponse(200,instructor,"instructor created Successfully")
    )
  }
)

//delete instructor
export const deleteInstructor = asyncHandler(async (req, res) => {
  const { instructorId } = req.params; // Adjusted to match the route parameter

  // Find the course by ID
  const instructor = await Instructor.findByPk(instructorId);

  if (!instructor) {
    throw new ApiError(404, 'Instructor not found');
  }

  // Find the product by ID and delete it
  const deletedInstructor = await instructor.destroy();
  
  if (!deletedInstructor) {
       throw new ApiError(404, 'instructor not found');
  }

  return res.status(200).json(
       new ApiResponse(200, 'instructor deleted successfully')
  );
});

//edit instructor
export const updateInstructor = asyncHandler(async (req, res) => {
  
  const {id,name,email} = req.body;
  

  // Find the Instructor by ID
  const instructor = await Instructor.findByPk(id);

  // Check if the Instructor exists
  if (!instructor) {
    return res.status(404).json({ message: 'instructor not found' });
  }
   
  // Update the Instructor
  const updatedInstructor = await instructor.update({
    name,
    email,
});

if(!updatedInstructor){
  throw new ApiError(500, "Something went wrong while updating the Instructor")
}

  // Return the response
  return res.status(200).json(
    new ApiResponse(200,updatedInstructor,"Instructor updated Successfully")
  );

});

