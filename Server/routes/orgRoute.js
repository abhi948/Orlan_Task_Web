import express from 'express';
import { createOrganization, deleteOrg, getOrganizations } from '../controller/orgController.js';

const router = express.Router();

router.post('/organization', createOrganization);
router.get('/getorganizations', getOrganizations);
router.delete('/deleteOrganization/:id', deleteOrg);


export default router;

