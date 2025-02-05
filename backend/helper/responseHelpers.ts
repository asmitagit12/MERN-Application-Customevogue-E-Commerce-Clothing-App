import { Response } from 'express';

export const successResponse = (
  res: Response,
  message: string,
  data: any = null
) => {
  return res.status(200).json({
    status: 200,
    error: false,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    error: true,
    message,
    data,
  });
};
