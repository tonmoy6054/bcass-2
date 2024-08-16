import { User, IUser } from '../models/userModel';

export const signUp = async (userData: IUser) => {
  try {
    const user = await User.create(userData);
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  } catch (error: any) {
    throw new Error('Error creating user: ' + error.message);
  }
};
