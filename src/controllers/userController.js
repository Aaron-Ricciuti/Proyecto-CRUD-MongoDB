import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../../config.js";
import { isGoodPassword } from "../utils/validators.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(204).json({ message: "There are no users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res
        .status(400)
        .json({ message: `user with email: ${email} already exists` });
    }
    await userData.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const validate = async (req, res) => {
    try{
        if(!(req.body.email && req.body.password)){
            return res.status(400).json({ message: "There's a missing field" })
        }

        const userFound = await User.findOne({ email: req.body.email })

        if(!userFound){
            return res.status(400).json({ message: "User or password is incorrect" })
        }
        
        if(bcrypt.compareSync(req.body.password, userFound.password)){
            const payload = {
                userId: userFound._id,
                userEmail: userFound.email
            }
            const token = jwt.sign(payload, SECRET, {expiresIn: "1h"})
            const role = userFound.role;
            return res.status(200).json({ message: "Logged in", token, role, user: {id: userFound._id, email: userFound.email} })
        } else {
            return res.status(400).json({message: "User or password are incorrect"})
        }
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
};

export const deleteUser = async (req, res) => {
    try {
      const _id = req.params.id;
      const userExist = await User.findOne({ _id });

      if(!userExist){
        return res.status(404).json({ message: " User not found"});
      }
      await User.findByIdAndDelete(_id)

      return res.status(200).json({ message: "User deleted succesfully"});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await User.findOne({ _id })

    if(!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ... rest } = req.body;

    if(password){
      if(!isGoodPassword(password)){
        return res.status(400).json({
          message: "Password must be between 6 and 12 characters, with at least one number, one upercase letter and one lowercase leter"
        })
      }
      rest.password = bcrypt.hashSync(password, 10)
    }

    const updateUser = await User.findByIdAndUpdate({ _id }, rest, {
      new: true,
      });

      return res.status(201).json (updateUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error});
    }
};