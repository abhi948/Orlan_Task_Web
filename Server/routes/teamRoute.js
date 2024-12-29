import express from 'express';
import { createTeam, getTeams } from '../controller/teamController.js';

const router = express.Router();

router.post('/team', createTeam);
router.get('/getTeam', getTeams);

export default router;

