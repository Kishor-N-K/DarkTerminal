function goFullScreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

const USERNAME = "admin";
const PASSWORD = "1234";

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const sound = document.getElementById("typingSound");

let currentUser = "";

/* LOGIN */
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    goFullScreen(); // 👈 ADD THIS

    currentUser = user;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("terminalContainer").classList.remove("hidden");

    printLine("Access Granted ✅");
    printLine("Welcome " + currentUser);
  } else {
    alert("Access Denied ❌");
  }
}
/* PRINT WITH TYPING EFFECT */
function typeLine(text, element, i = 0) {
  if (i < text.length) {
    element.textContent += text[i];
    setTimeout(() => typeLine(text, element, i + 1), 20);
  }
}

function printLine(text) {
  const line = document.createElement("div");
  terminal.appendChild(line);
  typeLine(text, line);
  terminal.scrollTop = terminal.scrollHeight;
}

const fileSystem = {
  "/home/admin": {
    "notes.txt": "This is a secure file.",
    "secrets.txt": "The password is 1234 😏"
  }
};

/* COMMAND HANDLER */
let currentDir = "/home/admin";

function handleCommand(cmd) {
  const command = cmd.trim();

  if (command === "pwd") {
    printLine(currentDir);
  }

  else if (command === "ls") {
    printLine("projects  secrets.txt  system.log");
  }

  else if (command.startsWith("cd ")) {
    const dir = command.split(" ")[1];
    currentDir = currentDir + "/" + dir;
    printLine("Moved to " + currentDir);
  }

  else if (command === "help") {
    printLine("Commands: ls, cd, pwd, cat, clear, whoami");
  }
  else if (command === "matrix") {
  printLine("Entering matrix mode...");
}

else if (command === "sudo access") {
  printLine("Permission granted. You are root now.");
  currentDir = "/root";
}

else if (command === "reveal") {
  printLine("There is nothing here... or is there?");
}

  else {
    printLine("Command not found: " + command);
  }
}
/* INPUT */
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = input.value;

    printLine("> " + value);
    handleCommand(value);

    input.value = "";
  }

  // typing sound
  sound.currentTime = 0;
  sound.play();
});

/* MATRIX BACKGROUND */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);