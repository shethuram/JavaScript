const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

// General fallback replies

const replies = [
  "Interesting.",
  "Tell me more.",
  "I see.",
  "That makes sense.",
  "Alright.",
  "Got your point.",
  "Hmm.",
  "Sounds good.",
  "Okay, noted.",
  "Fair enough.",
  "Right.",
  "Understood.",
  "Cool.",
  "Nice.",
  "Alright then.",
  "Makes sense to me.",
  "Yeah, I get that.",
  "True.",
  "Okay, continue.",
  "I'm following."
];

// avoid recent repetition
let lastReplies = [];

function getRandomReply() {
  let available = replies.filter(r => !lastReplies.includes(r));

  if (available.length === 0) {
    lastReplies = [];
    available = replies;
  }

  const reply = available[Math.floor(Math.random() * available.length)];

  lastReplies.push(reply);
  if (lastReplies.length > 3) lastReplies.shift();  // remove first(LRU) reply

  return reply;
}

// Smart reply system

const smartReplies = {
  greeting: {
    keywords: ["hi", "hello", "hey"],
    responses: ["Hey!", "Hello there!", "Hi, how can I help?"]
  },
  help: {
    keywords: ["help", "issue", "problem"],
    responses: [
      "Tell me the issue.",
      "I'm here to help.",
      "What seems to be the problem?"
    ]
  },
  thanks: {
    keywords: ["thanks", "thank you", "bye"],
    responses: ["You're welcome!", "No problem!", "Anytime!"]
  },
  price: {
    keywords: ["price", "cost", "amount"],
    responses: [
      "Pricing depends on the service.",
      "Can you specify what you're looking for?"
    ]
  }
};

function getSmartReply(userText) {
  userText = userText.toLowerCase();

  for (let category in smartReplies) {
    const { keywords, responses } = smartReplies[category];

    for (let word of keywords) {
      if (userText.includes(word)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  return getRandomReply(); // fallback
}

// Utility
function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  msg.innerHTML = `
    ${text}
    <div class="time">${getTime()}</div>
  `;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator

function showTyping() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.id = "typing";
  typing.innerText = "Typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// Send message

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();

    const reply = getSmartReply(text);
    addMessage(reply, "bot");

  }, Math.random() * 1000 + 800);     // 800–1800ms delay
}

// Enter key support

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});