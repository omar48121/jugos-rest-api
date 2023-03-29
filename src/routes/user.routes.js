import { Router } from "express";
import { createUser, getUsers, authenticateUser } from "../controllers/users.controller.js";

const router = Router();

router.get('/users', getUsers);
router.post('/register', createUser);
router.post('/login', authenticateUser);

export default router;