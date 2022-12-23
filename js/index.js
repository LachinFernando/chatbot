function openForm() {
  document.getElementById("msger").style.display = "block";
}

function closeForm() {
  document.getElementById("msger").style.display = "none";
}

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "YOU";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

async function botResponse(msgText) {
  const dataToSend = JSON.stringify({ "body": { "question": msgText } });
  await fetch('https://z82wblkmij.execute-api.us-east-1.amazonaws.com/answers/chatbot_api', {
    method: 'POST',
    body: dataToSend,
  }).then(response => response.json())
    .then(data => {
      appendMessage(BOT_NAME, BOT_IMG, "left", data.body);
    })
}

function get(selector, root = document) {
  return root.querySelector(selector);
}
