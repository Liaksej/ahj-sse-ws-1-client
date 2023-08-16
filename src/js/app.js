// import { DomAndEvents } from "./DomAndEvents";

function app() {
  // const domAndEvents = new DomAndEvents();
  // domAndEvents.onClickCreateButton();
  // domAndEvents.onClickUpdateButton();
  // domAndEvents.onClickRemoveButton();
  // domAndEvents.onLoadPage();
  // domAndEvents.onClickRow();
  // domAndEvents.onClickStatus();
  const ws = new WebSocket("ws://localhost:8081/ws");

  const chat = document.querySelector(".chat");
  const chatMessage = document.querySelector(".chat-message");
  const chatSend = document.querySelector(".chat-send");

  chatSend.addEventListener("click", (event) => {
    event.preventDefault();
    const message = chatMessage.value;

    if (!message.trim()) return;

    ws.send(message);

    chatMessage.value = "";
  });

  ws.addEventListener("open", (event) => {
    console.log(event);

    console.log("we open");
  });

  ws.addEventListener("close", (event) => {
    console.log(event);

    console.log("we close");
  });

  ws.addEventListener("message", (event) => {
    console.log(event);

    const data = JSON.parse(event.data);
    const { chat: messages } = data;

    messages.forEach((message) => {
      chat.appendChild(document.createTextNode(message + "\n"));
    });

    console.log("we message");
  });

  ws.addEventListener("error", (event) => {
    console.log(event);

    console.log("we error");
  });
}

app();
