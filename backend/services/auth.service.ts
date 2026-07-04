import bcrypt from 'bcrypt';
import prisma from '../utils/db.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (data: any) => {
  const { fullName, email, password, role } = data;
  
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 2. Save user to database
  const user = await prisma.user.create({
    data: { fullName, email, password: hashedPassword, role }
  });

  return user;
};

export const loginUser = async (data: any) => {
  const { email, password } = data;
  
  // 1. Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  // 2. Generate token
  const token = generateToken(user.id, user.role);
  
  // 3. Remove password from the response object
  const { password: _, ...userData } = user;
  
  return { token, user: userData };
};
