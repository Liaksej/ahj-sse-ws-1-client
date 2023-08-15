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

    console.log("we message");
  });

  ws.addEventListener("error", (event) => {
    console.log(event);

    console.log("we error");
  });

  const chat = document.querySelector(".chat");
  const chatMessage = document.querySelector(".chat-message");
  const chatSend = document.querySelector(".chat-send");
}

app();
