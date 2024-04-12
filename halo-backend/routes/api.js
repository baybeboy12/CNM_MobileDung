import express from "express";
import userController from "../controllers/userController";
import userService from "../services/userServices";
import friendController from "../controllers/friendController";
import chatController from "../controllers/chatController";
// import { checkCookie } from "../middleware/jwtMiddleware";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initAppRoutes = (app) => {
  //User Route
  router.post("/checkValidate", userController.handlerCheckValidate);
  router.post("/registry", userController.handlerRegistry);
  router.post("/login", userController.handleLogin);
  // router.get("/login-user", checkCookie, userController.handlerLoginUser);
  router.post("/searchByPhone", userController.handlerSearchByPhone);
  router.post("/update-user", userController.handlerUpdateUser);
  router.post("/change-password", userController.handlerChangePassword);
  router.post("/confirm-account", userController.handleConfirmAccount);
  router.post("/new-otp", userController.handlerNewOtp);
  router.post("/forgot-password", userController.handlerForgotPassword);
  router.post("/get-data", userController.handlerGetDataById);
  //Friend Route
  router.post("/friend-request", friendController.sendAddFriend);
  router.post("/cancel-add-friend", friendController.cancelSendAddFriend);
  router.post(
    "/cancel-add-friend-by-receiver",
    friendController.cancelFriendByReceiver
  );
  router.post("/confirm-friend-request", friendController.confirmAddFriend);
  router.post("/delete-friend", friendController.deleteFriend);
  // Chat Route
  router.post("/send-messenger", chatController.handlerSendMessenger);
  router.post("/get-all-chat", chatController.handlerGetAllChatPrivate);
  router.post("/get-conversation", chatController.handlerGetAllConversation);
  return app.use("/", router);
};
export default initAppRoutes;
