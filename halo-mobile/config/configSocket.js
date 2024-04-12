import { REACT_APP_SOCKET_URL } from "../constants";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { friendRequest } from "../redux/userSlice";
import { cancelSendFriendRequest } from "../redux/userSlice";
import { cancelFriendRequest } from "../redux/userSlice";
import { confirmFriend } from "../redux/userSlice";
import { deleteFriend } from "../redux/userSlice";
const socket = io.connect(REACT_APP_SOCKET_URL);
const handleCustomClient = (data) => {
  socket.emit("storeClientInfo", data);
};
const handlerSendText = (data) => {
  socket.emit("sendtest", data);
};
const handlerCancelAddFriend = (data) => {
  socket.emit("cancelAddFriend", data);
};
const handlerConfirmFriend = (data) => {
  socket.emit("confirmFriend", data);
};
const handlerConfirmAddFriend = (dispatch) => {
  socket.on("confirmAdd", (call) => {
    dispatch(confirmFriend(call));
  });
};
const handlerCancelAdd = (dispatch) => {
  socket.on("cancelAdd", (call) => {
    dispatch(cancelFriendRequest(call));
  });
};
const handlerCancelSendFriend = (data) => {
  socket.emit("cancelSendFriend", data);
};
const handlerCancelSend = (dispatch) => {
  socket.on("cancelSend", (call) => {
    dispatch(cancelSendFriendRequest(call));
  });
};

const handlerDeleteFriend = (data) => {
  socket.emit("deleteFriend", data);
};
const handlerDelete = (dispatch) => {
  socket.on("delete", (call) => {
    dispatch(deleteFriend(call));
  });
};
const handlerRefreshAccount = (dispatch) => {
  socket.on("refresh", (call) => {
    dispatch(friendRequest(call));
  });
};
const handleOffReFreshAccount = () => {
  socket.off("refresh");
};

const senderMessenger = (data) => {
  socket.emit("sendMessenger", data);
};
const receiveMessenger = () => {
  socket.on("receiveMessenger", (call) => {
    return call;
  });
  console.log("Check");
};
export default socket;
export {
  handleCustomClient,
  handlerSendText,
  handlerRefreshAccount,
  handlerCancelSendFriend,
  handlerCancelSend,
  handleOffReFreshAccount,
  handlerCancelAddFriend,
  handlerCancelAdd,
  handlerConfirmFriend,
  handlerConfirmAddFriend,
  handlerDeleteFriend,
  handlerDelete,
  senderMessenger,
  receiveMessenger,
};
