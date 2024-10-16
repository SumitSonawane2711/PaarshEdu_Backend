import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//get all users
export const users = async (req, res) => {
    const users = await User.findAll();

    if(!users){
      throw new ApiError(500,"Something went wrong while fetching users")
    }
    return res.status(200).json(
      new ApiResponse(200,'User fetch successfully',users)
    );
  }

// Register User
export const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//delete User
export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params; // Adjusted to match the route parameter
  
    // Find the course by ID
    const user = await User.findByPk(userId);
  
    if (!user) {
      throw new ApiError(404, 'user not found');
    }
  
    // Find the product by ID and delete it
    const deletedUser = await user.destroy();
    
    if (!deletedUser) {
         throw new ApiError(404, 'user not found');
    }
  
    return res.status(200).json(
         new ApiResponse(200, 'user deleted successfully')
    );
  });

//edit User
export const updateUser = asyncHandler(async (req, res) => {
    
    const {id,name,email,phone} = req.body;

    // Find the User by ID
    const user = await User.findByPk(id);
  
    // Check if the User exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //  console.log("User : ",user);
     
    // Update the User
    const updatedUser = await user.update({
      name,
      email,
      phone
  });
  
  if(!updatedUser){
    throw new ApiError(500, "Something went wrong while updating the User")
  }
  
    // Return the response
    return res.status(200).json(
      new ApiResponse(200,updatedUser,"User updated Successfully")
    );
  
  });  



