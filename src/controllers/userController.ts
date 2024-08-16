import { Request, Response } from 'express';

import { loginUserSchema } from '../validation/userValidation';
import { z } from 'zod';
import catchAsync from '../utils/catchAsync';
import { loginUser } from '../services/userService';

export const login = catchAsync(async (req: Request, res: Response) => {
  // Validate the request body using zod schema
  const loginData = loginUserSchema.parse(req.body);

  // Authenticate the user and generate a token
  try {
    const { token, user } = await loginUser(
      loginData.email,
      loginData.password,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token,
      data: user,
    });
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
});
