import dbConnect from '../../utils/dbConnect'
import { compare } from '../../utils/password'

const post = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const db = await dbConnect();
  const collection = db.collection('users');

  const user = await collection.find({ email }).toArray();

  if (!user) {
    return res.status(401).json({ success: false, message: 'invalid' });
  }

  const passIsCorrect = compare(password, user.password);

  if (passIsCorrect) {
    return res.status(200).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  return res.status(401).json({ success: false, message: 'invalid' });
}

export {
  post,
}