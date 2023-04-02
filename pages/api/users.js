import dbConnect from "../../src/utils/dbConnect";
import { cryto } from "../..//src/utils/password";
import UserModel from "../../src/models/users";

const users = async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      await dbConnect();
      res.status(200).json({ success: true })
      break;
    case 'POST':
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
      break;  
  }
}

export default users;