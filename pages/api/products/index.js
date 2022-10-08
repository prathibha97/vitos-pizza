/* eslint-disable consistent-return */
import dbConnect from '../../../lib/mongo';
import Product from '../../../models/Product';

const handler = async (req, res) => {
  const { method, cookies } = req;
  const { token } = cookies;
  await dbConnect();
  if (method === 'GET') {
    try {
      const allProducts = await Product.find({});
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('You are not authenticated');
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
