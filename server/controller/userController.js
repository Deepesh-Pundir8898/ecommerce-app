import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../config/jwtToken.js";


// register a user
export const createUser = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const findUser = await userModel.findOne({email:email});

    if(!findUser){
        const newUser =await userModel.create(req.body); 
        res.status(200).json({
            message: "User created successfully",
            success:true
        });
    }else{
        throw new Error("User Already Exists")
    }
    
})


// login a user
export const loginUserCtrl = asyncHandler(async(req,res)=>{
    const {email ,password} = req.body;
    
    const findUser = await userModel.findOne({email});
    console.log(findUser)
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credentials")
    }
})


// Update a User

export const updateAUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const findUser = await userModel.findById(id);
        if(findUser){
            const updatedUser = await userModel.findByIdAndUpdate(id,req.body,{new:true})
            res.json({
                message: "User updated successfully",
                success:true,
                user:updatedUser
            })
        }
        else{
            throw new Error("User Not Found")
        }

    } catch (error) {
        throw new Error(error);
    }
    
})
// Get All Users

export const getAllUser = asyncHandler(async(req,res)=>{
    try {
        const getUsers =await userModel.find();
        res.json(getUsers);
        
    } catch (error) {
        throw new Error(error)
    }
})

// Get a single User

export const getSingleUser = asyncHandler(async(req,res)=>{
    try {
        const getUser =await userModel.findById(req.params.id);
        res.json(getUser);
    }catch(error){
        throw new Error(error);
    }
})

// delete a user

export const deleteUser = asyncHandler(async(req,res)=>{
    try {
        const deleteUser =await userModel.findByIdAndDelete(req.params.id);
        res.json({
            message: "User Deleted Successfully",
            success:true,
            status: 200,
            deleteUser:deleteUser
        });
    }catch(error){
        throw new Error(error);
    }
})

