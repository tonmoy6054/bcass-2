import { Request, Response } from 'express';
import {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
} from '../services/facilityService';
import catchAsync from '../utils/catchAsync';

export const createFacilityController = catchAsync(
  async (req: Request, res: Response) => {
    const facility = await createFacility(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility added successfully',
      data: facility,
    });
  },
);

export const updateFacilityController = catchAsync(
  async (req: Request, res: Response) => {
    const facilityId = req.params.id;
    const updateData = req.body;

    const updatedFacility = await updateFacility(facilityId, updateData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: updatedFacility,
    });
  },
);

export const deleteFacilityController = catchAsync(
  async (req: Request, res: Response) => {
    const facilityId = req.params.id;

    const deletedFacility = await deleteFacility(facilityId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility deleted successfully',
      data: deletedFacility,
    });
  },
);

export const getAllFacilitiesController = catchAsync(
  async (req: Request, res: Response) => {
    const facilities = await getAllFacilities();

    if (facilities.length === 0) {
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
      message: 'Facilities retrieved successfully',
      data: facilities,
    });
  },
);
