import { Router } from "express";
import { createUser, getUsers, authenticateUser, logoutUser } from "../controllers/users.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// proteger una ruta con verifyToken
// router.get('/users', verifyToken, getUsers);
router.get('/users', getUsers);
router.post('/register', createUser);
router.post('/login', authenticateUser);
router.post('/logout', logoutUser);

export default router;