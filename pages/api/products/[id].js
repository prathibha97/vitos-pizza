import dbConnect from '../../../lib/mongo';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { id },
  } = req;
  const { token } = cookies;

  await dbConnect();
  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'PUT') {
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
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('You are not authenticated');
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('Product deleted successfully!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
