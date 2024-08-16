import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { facilityValidation } from '../validation/facultyValidation';
import {
  createFacilityController,
  deleteFacilityController,
  getAllFacilitiesController,
  updateFacilityController,
} from '../controllers/facilityController';

const router = Router();

router.post(
  '/facility',
  authMiddleware,
  adminMiddleware,
  validateRequest(facilityValidation),
  createFacilityController,
);
router.put('/facility/:id', updateFacilityController);
router.delete('/facility/:id', deleteFacilityController);
router.get('/facility', getAllFacilitiesController);

export default router;
