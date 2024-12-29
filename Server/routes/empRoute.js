import express from 'express';
import { createMember, getEmployee } from '../controller/empController.js';

const router = express.Router();

router.post('/addEmployee', createMember);
router.get('/getEmployee', getEmployee);

export default router;