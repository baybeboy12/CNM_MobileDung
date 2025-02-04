import axiosClient from "./axiosClient";
import axios from "axios";
const chatApi = {
  sendMessenger: (data) => {
    const url = "/send-messenger";
    return axiosClient.post(url, data);
  },
  getAllChat: (data) => {
    const url = "/get-all-chat";
    return axiosClient.post(url, data);
  },
  getConversation: (data) => {
    const url = "/get-conversation";
    return axiosClient.post(url, data);
  },
};
export default chatApi;
