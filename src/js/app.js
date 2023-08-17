import { DomElements } from "./DomElements";
import { User } from "./User";
import { NewMessage } from "./NewMessage";

function app() {
  const input = document?.querySelector('input[name="username"]');
  let username;

  document.querySelector(".form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input.value.trim()) return;

    username = input.value.trim();

    const sendListener = (event) => {
      event.preventDefault();
      const chatMessage = document.querySelector(".chat-message");
      const message = chatMessage.value;

      if (!message.trim()) return;

      ws.send(JSON.stringify(new NewMessage(message)));

      chatMessage.value = "";
    };

    const ws = new WebSocket("ws://localhost:8081/ws");

    ws.addEventListener("open", (event) => {
      console.log(event);

      ws.send(JSON.stringify(new User("new-user", username)));

      console.log("we open");
    });

    ws.addEventListener("close", (event) => {
      console.log(event);

      ws.send(JSON.stringify(new User("outgoing-user", username)));

      console.log("we close");
    });

    ws.addEventListener("message", (event) => {
      console.log(event);

      const data = JSON.parse(event.data);

      switch (data.type) {
        case "user-response":
          switch (data.status) {
            case "allowed":
              DomElements.chatCreator(data.username);

              DomElements.userListHandler(data.status, data.users);

              document
                .querySelector(".chat-send")
                .addEventListener("click", sendListener);
              break;
            case "denied":
              DomElements.showTooltip(
                "Такой пользователь уже существует",
                input,
              );
              break;
            case "outgoing-user":
              DomElements.userListHandler(data.status, data.username);
              break;
            case "incoming-user":
              DomElements.userListHandler(data.status, data.username);
              break;
          }
          break;
        case "message":
          if (data.chat) {
            const chat = document.querySelector(".chat");
            if (!chat) return;
            const messages = data.chat;

            messages.forEach((message) => {
              DomElements.messageBody(message, chat);
            });
          }
          break;
        default:
          break;
      }

      console.log("we message");
    });

    ws.addEventListener("error", (event) => {
      console.log(event);

      console.log("we error");
    });

    window.addEventListener("beforeunload", (event) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(new User("outgoing-user", username)));
      }
    });
  });
}

app();
