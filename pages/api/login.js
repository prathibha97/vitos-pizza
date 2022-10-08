import cookie from 'cookie';

const handler = (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    const { username, password } = req.body;
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      res.setHeader(
        'Set-cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json('Successfull');
    } else {
      res.status(400).json('Invalid Credentials');
    }
  }
};

export default handler;
