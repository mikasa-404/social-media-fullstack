import {verifyToken} from "../middlewares/auth.js";
import express from "express";
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.js";

const router =express.Router();

router.get("/:id", verifyToken, getUser); //get info about a user
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;