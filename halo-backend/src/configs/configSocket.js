require("dotenv").config();

const configSocket = (server) => {
  var clients = [];
  const URL = process.env.URL_CLIENT;
  const io = require("socket.io")(server, {
    cors: {
      origin: URL,
      credentials: true,
    },
  });
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  io.on("connection", (socket) => {
    socket.on("storeClientInfo", (data) => {
      if (data && data.customId) {
        const existingClientIndex = clients.findIndex(
          (client) => client.customId === data.customId
        );

        if (existingClientIndex !== -1) {
          clients[existingClientIndex] = {
            customId: data.customId,
            clientId: socket.id,
          };
        } else {
          var clientInfo = {
            customId: data.customId,
            clientId: socket.id,
          };
          clients.push(clientInfo);
        }

        console.log(clients);
      }
    });
    socket.on("sendtest", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let resendData = data.user;
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket.to(clients[index].clientId).emit("refresh", resendData, () => {
            // console.log("Sender:", sender);
            // console.log("Receiver:", receiver);
            console.log("ResendData:", resendData);
            console.log("test success");
          });
        } else {
          console.log("test error");
        }
      }
    });
    socket.on("cancelSendFriend", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let resendData = data.user;
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket
            .to(clients[index].clientId)
            .emit("cancelSend", resendData, () => {
              // console.log("Sender:", sender);
              // console.log("Receiver:", receiver);
              console.log("ResendData:", resendData);
            });
        } else {
          console.log("test error");
        }
      }
    });
    socket.on("cancelAddFriend", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let resendData = data.user;
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket
            .to(clients[index].clientId)
            .emit("cancelAdd", resendData, () => {
              // console.log("Sender:", sender);
              // console.log("Receiver:", receiver);
              console.log("ResendData:", resendData);
            });
        } else {
          console.log("test error");
        }
      }
    });
    socket.on("confirmFriend", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let resendData = data.user;
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket
            .to(clients[index].clientId)
            .emit("confirmAdd", resendData, () => {
              // console.log("Sender:", sender);
              // console.log("Receiver:", receiver);
              console.log("ResendData:", resendData);
            });
        } else {
          // console.log("test error");
        }
      }
    });
    socket.on("deleteFriend", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let resendData = data.user;
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket.to(clients[index].clientId).emit("delete", resendData, () => {
            // console.log("Sender:", sender);
            // console.log("Receiver:", receiver);
            console.log("ResendData:", resendData);
          });
        } else {
          console.log("test error");
        }
      }
    });

    //Chat Socket
    socket.on("sendMessenger", (data) => {
      let sender = data.sender;
      let receiver = data.receiver;
      let textReceive = data.text;
      let createdAtReceive = data.createdAt;
      const dataResend = {
        text: textReceive,
        createdAt: createdAtReceive,
      };
      if (clients && clients.length > 0) {
        let index = clients.findIndex(
          (item) => item.customId.localeCompare(receiver) === 0
        );
        if (index !== -1) {
          socket
            .to(clients[index].clientId)
            .emit("receiveMessenger", dataResend, () => {
              // console.log("Sender:", sender);
              // console.log("Receiver:", receiver);
              // console.log("Text:", text);
            });
        } else {
          console.log("test error");
        }
      }
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log(`${socket.id}  user disconnected`);
    });
  });
};
export default configSocket;
