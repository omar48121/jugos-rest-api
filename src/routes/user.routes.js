import { Router } from "express";
import { createUser, getUsers, authenticateUser } from "../controllers/users.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// proteger una ruta con verifyToken
// router.get('/users', verifyToken, getUsers);
router.get('/users', getUsers);
router.post('/register', createUser);
router.post('/login', authenticateUser);

export default router;