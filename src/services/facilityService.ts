// import { Facility } from '../models/facilityModel';

// export const createFacility = async (data: {
//   name: string;
//   description: string;
//   pricePerHour: number;
//   location: string;
// }) => {
//   const facility = new Facility({
//     ...data,
//   });
//   return await facility.save();
// };

// export const updateFacility = async (
//   facilityId: string,
//   updateData: Partial<{
//     name: string;
//     description: string;
//     pricePerHour: number;
//     location: string;
//   }>,
// ) => {
//   const updatedFacility = await Facility.findByIdAndUpdate(
//     facilityId,
//     updateData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   if (!updatedFacility) {
//     throw new Error('Facility not found');
//   }

//   return updatedFacility;
// };

// export const deleteFacility = async (facilityId: string) => {
//   const deletedFacility = await Facility.findByIdAndDelete(facilityId);

//   if (!deletedFacility) {
//     throw new Error('Facility not found');
//   }

//   return deletedFacility;
// };

// export const getAllFacilities = async () => {
//   return await Facility.find();
// };

import { Facility } from '../models/facilityModel';

export const createFacility = async (data: {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
}) => {
  try {
    const facility = new Facility({ ...data });
    return await facility.save();
  } catch (error) {
    throw error;
  }
};

export const updateFacility = async (
  facilityId: string,
  updateData: Partial<{
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
  }>,
) => {
  try {
    const updatedFacility = await Facility.findByIdAndUpdate(
      facilityId,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedFacility) {
      throw new Error('Facility not found');
    }

    return updatedFacility;
  } catch (error) {
    throw error; // Throwing the error so that it can be caught by the global error handler
  }
};

export const deleteFacility = async (facilityId: string) => {
  try {
    const deletedFacility = await Facility.findByIdAndDelete(facilityId);

    if (!deletedFacility) {
      throw new Error('Facility not found');
    }

    return deletedFacility;
  } catch (error) {
    throw error; // Throwing the error so that it can be caught by the global error handler
  }
};

export const getAllFacilities = async () => {
  try {
    return await Facility.find();
  } catch (error) {
    throw error; // Throwing the error so that it can be caught by the global error handler
  }
};
