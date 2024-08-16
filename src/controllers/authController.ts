import { Request, Response } from 'express';
import * as authService from '../services/authService';
import catchAsync from '../utils/catchAsync';

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.signUp(req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: user,
  });
});
