import UserModel from "../../src/models/users";
import dbConnect from "../../src/utils/dbConnect";
import { cryto } from "../..//src/utils/password";

const get = async (req, res) => {
  await dbConnect();
  
  const users = await UserModel.find();
  res.status(200).json({ success: true, users })
}

const post = async (req, res) => {
  const {
    name,
    email,
    password  
  } = req.body;

  await dbConnect();

  const passwordCrypto = await cryto(password);

  const user = new UserModel({
    name, 
    email,
    password: passwordCrypto,
  });
  user.save();

  res.status(201).json({ success: true })
}

export {
  get, 
  post,
}