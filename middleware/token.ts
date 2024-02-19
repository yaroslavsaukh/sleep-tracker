import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  name: string;
  email: string;
}

const generateAccessToken = ({ _id, name, email }: User): string => {
  return jwt.sign(
    {
      _id,
      name,
      email,
      date: new Date(),
    },
    process.env.SECRET as string
  );
};

export default generateAccessToken;
