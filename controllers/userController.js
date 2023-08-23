import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

async function securePassword(password) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    return hashedPass;
  } catch (error) {
    console.log(error.message);
  }
}

async function createToken(id){
  try {
    return await jwt.sign({_id:id},process.env.JWT_SECRET)
  } catch (error) {
    console.log(error.message);
  }
}

export const registerUser = async (req, res) => {
  try {
    const isExist = await userModel.findOne({ email: req.body.email });
    if (!isExist) {
      const secure_pass = await securePassword(req.body.password);

      const newUser = new userModel({
        ...req.body,
        password: secure_pass,
        image: req.file.filename,
      });

      const data = await newUser.save();
      //jwt
      res.status(201).send({ success: true, data: data });
    } else {
      res.status(400).send({ success: false, message: "User already exist" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });


    if (user) {
   
      const matchPass = await bcryptjs.compare(String(password), user.password);

      if (matchPass) {

        const token = await createToken(user._id)
        
       return res.status(200).json({ success: true,  data:user, token });
      } else {
        res.status(404).json({ success: false, message: "Password Mismatch" });
      }
    } else {
      res.status(404).json({ success: false, message: "User Not exist" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};


export const myProfile = async (req,res) =>{
  const userId = req.user;
}