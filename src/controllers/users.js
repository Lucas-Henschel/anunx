import dbConnect from "../../src/utils/dbConnect";
import { cryto } from "../../src/utils/password";

const get = async (req, res) => {
  const db = await dbConnect();
  const collection = db.collection('users');

  const users = await collection.find({}).toArray();
  res.status(200).json({ success: true, users })
}

const post = async (req, res) => {
  const {
    name,
    email,
    password  
  } = req.body;

  const db = await dbConnect();
  const collection = db.collection('users');
  
  const passwordCrypto = await cryto(password);

  await collection.insertOne({
    name, 
    email,
    password: passwordCrypto,
  });

  res.status(201).json({ success: true })
}

export {
  get, 
  post,
}