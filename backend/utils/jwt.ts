import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, role: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the .env file");
  }

  return jwt.sign({ id: userId, role }, secret, {
    expiresIn: '7d',
  });
};
