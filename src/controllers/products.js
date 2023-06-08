import fs from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';
import dbConnect from '../utils/dbConnect';

const post = async (req, res) => {
  const db = await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: true });
    }

    const { files } = data;

    const filesToRename = files instanceof Array
      ? files
      : [files]


    const filesToSave = [];

    filesToRename.forEach(file => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 99999999) + 1;
      const extension = path.extname(file.name);

      const filename = `${timestamp}_${random}${extension}`;

      const oldpath = path.join(__dirname, `../../../../../${file.path}`);
      const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`);

      filesToSave.push({
        name: filename,
        path: newpath,
      });

      fs.rename(oldpath, newpath, (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: true });
        }
      });
    })

    const {
      title,
      category,
      description,
      price,
      name,
      email,
      phone,
      userId,
      image,
      city,
      state,
    } = fields;

    const priceInt = Number(price);
    const collection = db.collection('products');

    const product = await collection.insertOne({
      title,
      category,
      description,
      price: priceInt,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      files: filesToSave,  
      city,
      state,
      created: Date.now(),
    });

    if (product) {
      res.status(201).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  })
}

const remove = async (req, res) => {
  const db = await dbConnect();
  const collection = db.collection('products');

  const id = req.body.id;
  const deleted = await collection.deleteMany({ id: id });

  if (deleted) {
    return res.status(200).json({ success: true })
  } else {
    return res.status(500).json({ success: false })
  }
}

export {
  post,
  remove,
}