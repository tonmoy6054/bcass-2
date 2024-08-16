import jwt from 'jsonwebtoken';

export const generateToken = (user: {
  _id: string;
  email: string;
  role: string;
}) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '10h',
    },
  );
};
