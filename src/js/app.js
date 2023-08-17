import { DomElements } from "./DomElements";

function app() {
  // chatSend?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const message = chatMessage.value;
  //
  //   if (!message.trim()) return;
  //
  //   ws.send(message);
  //
  //   chatMessage.value = "";
  // });

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

      ws.send(JSON.stringify({ type: "message", message }));

      chatMessage.value = "";
    };

    const ws = new WebSocket("ws://localhost:8081/ws");

    ws.addEventListener("open", (event) => {
      console.log(event);

      ws.send(JSON.stringify({ type: "new-user", username: username }));

      console.log("we open");
    });

    ws.addEventListener("close", (event) => {
      console.log(event);

      console.log("we close");
    });

    ws.addEventListener("message", (event) => {
      console.log(event);

      const data = JSON.parse(event.data);

      switch (data.type) {
        case "new-user-response":
          if (data.success === "allowed") {
            DomElements.chatCreator(data.username);
            document
              .querySelector(".chat-send")
              .addEventListener("click", sendListener);
          } else {
            DomElements.showTooltip("Такой пользователь уже существует", input);
          }
          break;
        case "message":
          if (data.chat) {
            const chat = document.querySelector(".chat");
            if (!chat) return;
            const messages = data.chat;

            messages.forEach((message) => {
              const elementForMessage = document.createElement("div");
              elementForMessage.classList.add("message");
              elementForMessage.textContent = message;
              chat.appendChild(elementForMessage);
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
  });
}

app();
