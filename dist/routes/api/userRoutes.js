import { Router } from 'express';
const router = Router();
// WHEN I open API GET routes in Insomnia for users and thoughts
// THEN the data for each of these routes is displayed in a formatted JSON
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
export { router as userRouter };
