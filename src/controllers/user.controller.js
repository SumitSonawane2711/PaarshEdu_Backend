import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//get all users
export const users = asyncHandler( async (req, res) => {
    const users = await User.findAll();

    if(!users){
      throw new ApiError(500,"Something went wrong while fetching users")
    }
    return res.status(200).json(
      new ApiResponse(200,'User fetch successfully',users)
    );
  })

// Register User
export const register =asyncHandler( async (req, res) => {
    const { name, email, phone, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new ApiError(409,"user with email or username already exists")
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

        if(!user) {
          throw new ApiError(500, "Something went wrong while registering the user")
      }
        
        //return resposne
        return res.status(201).json(
        new ApiResponse(200,"User registered Successfully",user)
        )    
})

// Login User
export const login =asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!(email || password)) {
      throw new ApiError(400, "username or password is required")
    }

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
        throw new ApiError(404, "User does not exist")
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new ApiError(401, "Invalid user credentials")
        }

         return res
          .status(200)
          .json(new ApiResponse(200,"User Logged In Successfully",user))
    
})

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
      new ApiResponse(200,"User updated Successfully",updatedUser)
    );
  
  });  



