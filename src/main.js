import "./style.css";

const messages = [];
const chatInput = document.querySelector("form#chat input#chat");
const messagesContainer = document.getElementById("messages");

const form = document.querySelector("form#chat");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = chatInput.value;
  chatInput.value = "";

  let msg = { role: "user", content };
  addMessage(msg);
  messages.push(msg);
  console.log({ messages });

  const res = await fetch("https://ai.hackclub.com/chat/completions", {
    method: "POST",
    body: JSON.stringify({ messages }),
    headers: { "Content-Type": "application/json" },
  });
  console.log({ res });
  const json = await res.json();

  msg = json.choices[0].message;
  addMessage(msg);
  messages.push(msg);

  console.log({ content, json });
});

function addMessage(message) {
  const el = document.createElement("p");
  el.classList.add("msg");
  el.textContent = message.content;
  if (message.role === "user") {
    el.style.marginLeft = "auto";
  } else {
    el.style.marginRight = "auto";
  }
  messagesContainer.appendChild(el);
}
