const start = document.getElementById("start");
const disc = document.getElementById("disc");
const logo = document.getElementById("logo");
const clas = document.getElementById("clas");
const ari = document.getElementById("ari");
const goon = document.getElementById("goon");
const bino = document.getElementById("bino");
const oreg = document.getElementById("oreg");
const bord = document.getElementById("bord");
const theme = document.getElementById("theme");
const bank = document.getElementById("bank");
const kafe = document.getElementById("kafe");
const club = document.getElementById("club");
const chal = document.getElementById("chal");
const fort = document.getElementById("fort");
const lab = document.getElementById("lab");
const kanal = document.getElementById("kanal");
const sky = document.getElementById("sky");
const outback = document.getElementById("out");
const villa = document.getElementById("villa");
const lair = document.getElementById("lair");
const coast = document.getElementById("coast");
const cons = document.getElementById("cons");
const all = document.getElementById("all");
const maps = Array.from(document.querySelectorAll(".mappool"));
const volumeSlider = document.getElementById("volumeSlider");
const volumer = document.getElementsByClassName("volume");
const click = new Audio("audio/click.wav");
const music = new Audio("audio/Nando Wando - Super Proto.wav");
let map;
playList = "";
volumeSlider.value = localStorage.getItem("volume") || 0.5;
click.volume = localStorage.getItem("volume");
music.volume = localStorage.getItem("volume");
play = false;
music.loop = true;
document.addEventListener("pointerdown", function () {
  if (music.paused || music.duration == 0) music.play();
});
start.addEventListener("mouseenter", () => {
  start.src = "images/btnStartHover.svg";
});
logo.addEventListener("transitionend", () => {
  if (logo.style.transition == "transform 2s") {
    logo.style.transition = "transform 4s ease";
    start.style.transition = "transform 4s ease";
    disc.style.transition = "transform 4s ease";
  }
});
volumeSlider.addEventListener("input", function () {
  localStorage.setItem("volume", this.value);
  click.volume = this.value;
  music.volume = this.value;
});
gamemode = "none";
start.addEventListener("transitionend", () => {
  if (start.style.transform == "translateY(2099px)") {
    start.style.transition = "transform 0s ease";
    start.style.transform = "translateY(4000px)";
    tick1 = 0;
  }
  if (start.style.transform == "translateY(4000px)") {
    start.style.transition = "transform 4s ease";
  }
});
start.addEventListener("click", () => {
  click.play();
  if (music.paused || music.duration == 0) {
    music.play();
  }
  play = true;
  choose = false;
  map = "none";
  logo.style.transform = "translateY(-4000px)";
  start.style.transform = "translateY(4000px)";
  disc.style.transform = "translateY(4000px)";
});
let username;
let avatarHash;
let userId;
let avatarUrl;
disc.addEventListener("click", () => {
  click.play();
  window.location.href =
    "https://discord.com/oauth2/authorize?client_id=1470213618720047145&redirect_uri=https://dingus-callouts.vercel.app%2Fapi%2Fcallback&response_type=code&scope=identify";
});
(function populateUserInfo() {
  const storedUser = localStorage.getItem("discordUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    username = user.username;
    avatarHash = user.avatar;
    userId = user.id;
    avatarUrl = avatarHash
      ? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
    document.getElementById("discordAvatar").src = avatarUrl;
    document.getElementById("username").innerText = username;
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("avatarUrl", avatarUrl);
  }
})();
(function handleDiscordLogin() {
  const params = new URLSearchParams(window.location.search);
  const userData = params.get("user");
  if (userData) {
    const user = JSON.parse(decodeURIComponent(userData));
    localStorage.setItem("discordUser", JSON.stringify(user));
    window.history.replaceState({}, document.title, "/");
    username = user.username;
    avatarHash = user.avatar;
    userId = user.id;
    avatarUrl = avatarHash
      ? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
    userIdGlobal = userId;
    document.getElementById("discordAvatar").src = avatarUrl;
    document.getElementById("username").innerText = username;
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("avatarUrl", avatarUrl);
  }
})();
let allScores = JSON.parse(localStorage.getItem("scores")) || {};
let scores = userId
  ? allScores[userId] || {
      lab: 120,
      bord: 120,
      theme: 120,
      bank: 120,
      kafe: 120,
      club: 120,
      chal: 120,
      fort: 120,
      oreg: 120,
      kanal: 120,
      sky: 120,
      outback: 120,
      villa: 120,
      lair: 120,
      coast: 120,
      cons: 120,
      all: 120,
    }
  : {
      lab: 120,
      bord: 120,
      theme: 120,
      bank: 120,
      kafe: 120,
      club: 120,
      chal: 120,
      fort: 120,
      oreg: 120,
      kanal: 120,
      sky: 120,
      outback: 120,
      villa: 120,
      lair: 120,
      coast: 120,
      cons: 120,
      all: 120,
    };

let choose = false;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clas.width = window.innerWidth / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
start.addEventListener("mouseup", () => {
  start.src = "images/btnStartHover.svg";
});
start.addEventListener("mouseleave", () => {
  start.src = "images/btnStart.svg";
});
start.addEventListener("mousedown", () => {
  start.src = "images/btnStartPressed.svg";
});
disc.addEventListener("mouseenter", () => {
  disc.src = "images/btnDiscHover.png";
});
disc.addEventListener("mouseup", () => {
  disc.src = "images/btnDiscHover.png";
});
disc.addEventListener("mouseleave", () => {
  disc.src = "images/btnDisc.png";
});
disc.addEventListener("mousedown", () => {
  disc.src = "images/btnDiscPressed.png";
});

clas.addEventListener("mouseenter", () => {
  clas.src = "images/btnClassicHover.png";
});
clas.addEventListener("mouseup", () => {
  clas.src = "images/btnClassicHover.png";
});
clas.addEventListener("mouseleave", () => {
  clas.src = "images/btnClassic.png";
});
clas.addEventListener("mousedown", () => {
  clas.src = "images/btnClassicPressed.png";
});

ari.addEventListener("mouseenter", () => {
  ari.src = "images/btnAriHover.png";
});
ari.addEventListener("mouseup", () => {
  ari.src = "images/btnAriHover.png";
});
ari.addEventListener("mouseleave", () => {
  ari.src = "images/btnAri.png";
});
ari.addEventListener("mousedown", () => {
  ari.src = "images/btnAriPressed.png";
});

goon.addEventListener("mouseenter", () => {
  goon.src = "images/btnGoonterHover.png";
});
goon.addEventListener("mouseup", () => {
  goon.src = "images/btnGoonterHover.png";
});
goon.addEventListener("mouseleave", () => {
  goon.src = "images/btnGoonter.png";
});
goon.addEventListener("mousedown", () => {
  goon.src = "images/btnGoonterPressed.png";
});

bino.addEventListener("mouseenter", () => {
  bino.src = "images/btnBinoHover.png";
});
bino.addEventListener("mouseup", () => {
  bino.src = "images/btnBinoHover.png";
});
bino.addEventListener("mouseleave", () => {
  bino.src = "images/btnBino.png";
});
bino.addEventListener("mousedown", () => {
  bino.src = "images/btnBinoPressed.png";
});

const back = document.getElementById("back");
const userico = document.getElementsByClassName("user");
for (var i = 0; i < userico.length; i++) {
  userico[i].style.opacity = "1";
}
back.style.opacity = "0";
back.addEventListener("mouseenter", () => {
  if (back.style.opacity == "1") back.src = "images/backHover.png";
});
back.addEventListener("mouseup", () => {
  if (back.style.opacity == "1") back.src = "images/backHover.png";
});
back.addEventListener("mouseleave", () => {
  if (back.style.opacity == "1") back.src = "images/back.png";
});
back.addEventListener("mousedown", () => {
  if (back.style.opacity == "1") back.src = "images/backPressed.png";
});

clas.addEventListener("click", () => {
  gamemode = "classic";
  click.play();
});
back.addEventListener("click", () => {
  if (back.style.opacity == "1") click.play();
  if (map == "selecting") {
    bord.style.opacity = 0;
    theme.style.opacity = 0;
    bank.style.opacity = 0;
    kafe.style.opacity = 0;
    club.style.opacity = 0;
    chal.style.opacity = 0;
    fort.style.opacity = 0;
    lab.style.opacity = 0;
    oreg.style.opacity = 0;
    kanal.style.opacity = 0;
    sky.style.opacity = 0;
    outback.style.opacity = 0;
    villa.style.opacity = 0;
    lair.style.opacity = 0;
    coast.style.opacity = 0;
    cons.style.opacity = 0;
    all.style.opacity = 0;
    bord.style.transform = "scale(20)";
    theme.style.transform = "scale(20)";
    bank.style.transform = "scale(20)";
    kafe.style.transform = "scale(20)";
    club.style.transform = "scale(20)";
    chal.style.transform = "scale(20)";
    fort.style.transform = "scale(20)";
    lab.style.transform = "scale(20)";
    oreg.style.transform = "scale(20)";
    kanal.style.transform = "scale(20)";
    sky.style.transform = "scale(20)";
    outback.style.transform = "scale(20)";
    villa.style.transform = "scale(20)";
    lair.style.transform = "scale(20)";
    coast.style.transform = "scale(20)";
    cons.style.transform = "scale(20)";
    all.style.transform = "scale(20)";
    start.style.transition = "transform 0s ease";
    start.style.transform = "translateY(2500px)";
    //start.style.transition = "transform " + rand + "s ease-in, opacity " + rand + "s ease";
    choose = false;
    gamemode = "none";
    map = "none";
    tick1 = 0;
  } else {
    logo.style.transition = "transform 2s ease";
    start.style.transition = "transform 2s ease";
    disc.style.transition = "transform 2s ease";
    logo.style.transform = "translateY(0px)";
    start.style.transform = "translateY(0px)";
    disc.style.transform = "translateY(0px)";
    play = false;
    choose = false;
    map = "none";
    tick1 = 0;
    clas.style.transform = "translate(-100vw, -150%)";
    ari.style.transform = "translate(100vw, -150%)";
    goon.style.transform = "translate(100vw, 150%)";
    bino.style.transform = "translate(-100vw, 150%)";
    back.style.opacity = "0";
    for (var i = 0; i < userico.length; i++) {
      userico[i].style.opacity = "1";
    }
  }
});
oreg.addEventListener("transitionend", handleSlam);
bord.addEventListener("transitionend", handleSlam);
theme.addEventListener("transitionend", handleSlam);
bank.addEventListener("transitionend", handleSlam);
kafe.addEventListener("transitionend", handleSlam);
club.addEventListener("transitionend", handleSlam);
chal.addEventListener("transitionend", handleSlam);
fort.addEventListener("transitionend", handleSlam);
lab.addEventListener("transitionend", handleSlam);
kanal.addEventListener("transitionend", handleSlam);
sky.addEventListener("transitionend", handleSlam);
villa.addEventListener("transitionend", handleSlam);
lair.addEventListener("transitionend", handleSlam);
coast.addEventListener("transitionend", handleSlam);
cons.addEventListener("transitionend", handleSlam);
all.addEventListener("transitionend", handleSlam);
outback.addEventListener("transitionend", handleSlam);
oreg.style.transition = "";
clas.addEventListener("transitionend", (e) => {
  if (clas.style.transform == "translate(-100%, -100%)") {
    const hit = new Audio("audio/impact.mp3");
    hit.volume = localStorage.getItem("volume") * 0.75;
    hit.play();
  }
});
function handleSlam(e) {
  if (playList === "") {
    if (play && gamemode !== "none") {
      const a = new Audio("audio/hit.mp3");
      a.volume = volumeSlider.value * 0.25;
      a.play();
    }
  } else if (e.target.alt === "bord") {
    window.location.href = "play.html?map=" + playList + "&mode=" + gamemode;
  }
}
lab.addEventListener("mousedown", handleDown);
lab.addEventListener("mouseup", handleMouseUp);
lab.addEventListener("mouseleave", handleMouseLeave);
lab.addEventListener("mouseenter", handleMouseEnter);
lab.addEventListener("click", handleClick);
function handleDown(e) {
  const n = e.target.alt;
  e.target.src = "images/" + n + "3.png";
}
function handleMouseLeave(e) {
  const n = e.target.alt;
  e.target.src = "images/" + n + ".png";
}
function handleMouseUp(e) {
  const n = e.target.alt;
  e.target.src = "images/" + n + "2.png";
}
function handleMouseEnter(e) {
  const n = e.target.alt;
  e.target.src = "images/" + n + "2.png";
}
function handleClick(e) {
  click.play();
  if (e.target.alt !== "all") {
    playList = "keys/" + e.target.alt + ".txt";
  }
}
const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");
const dots = [];
tick1 = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
for (let i = 0; i < 100; i++) {
  let rng = Math.random() * 25;
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    radius: rng,
    size: rng,
  });
}
for (i = 0; i < maps.length; i++) {
  const el = maps[i];
  el.style.width = "13%";
  el.style.height = "13%";
  el.style.padding = "10px";
  el.style.opacity = 0;
  el.style.transform = "scale(20)";
  if (!play) el.style.pointerEvents = "default";
  else el.style.pointerEvents = "pointer";
  rand = ((17 - i) * 1) / 10 + 0.2;
  str = "transform " + rand + "s ease-in, opacity " + rand + "s ease";
  el.style.transition = str;
}
function animate() {
  if (back.style.opacity == "0") back.style.cursor = "default";
  else back.style.cursor = "pointer";
  if (playList !== "" && tick1 !== -1) {
    tick1 = -1;
    for (i = 0; i < maps.length; i++) {
      const el = maps[i];
      el.style.width = "13%";
      el.style.height = "13%";
      el.style.padding = "10px";
      el.style.opacity = 0;
      el.style.transform = "scale(20)";
      if (!play) el.style.pointerEvents = "default";
      else el.style.pointerEvents = "pointer";
      rand = ((17 - i) * 1) / 10 + 0.2;
      str = "transform " + rand + "s ease-in, opacity " + rand + "s ease";
      el.style.transition = str;
    }
  }
  if (gamemode !== "none" && tick1 !== 101) {
    tick1++;
    map = "none";
  }
  if (tick1 > 100) {
    map = "selecting";
  }
  if (start.getBoundingClientRect().top > "3099") {
    choose = true;
    clas.width = window.innerWidth / 2 - 50;
    bino.width = window.innerWidth / 2 - 50;
    goon.width = window.innerWidth / 2 - 50;
    ari.width = window.innerWidth / 2 - 50;

    clas.height = window.innerHeight / 2 - 100;
    bino.height = window.innerHeight / 2 - 100;
    goon.height = window.innerHeight / 2 - 100;
    ari.height = window.innerHeight / 2 - 100;
  } else {
    choose = false;
    if (start.style.transform == "translateY(2500px)") {
      start.style.transition = "transform 0.1s ease";
      start.style.transform = "translateY(2099px)";
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (play) {
    if (playList === "") {
      back.style.opacity = "1";
      for (var i = 0; i < userico.length; i++) {
        userico[i].style.opacity = "0";
      }
      if (gamemode !== "none") {
        clas.style.transform = "translate(-100vw, -150%)";
        ari.style.transform = "translate(100vw, -150%)";
        goon.style.transform = "translate(100vw, 150%)";
        bino.style.transform = "translate(-100vw, 150%)";
        if (map == "none") {
        } else {
          maps.forEach((el) => {
            el.style.opacity = 1;
            el.style.transform = "scale(1)";
            el.style.pointerEvents = "pointer";
          });
        }
      } else if (choose) {
        clas.style.transform = "translate(-100%, -100%)";
        ari.style.transform = "translate(0%, -100%)";
        goon.style.transform = "translate(0%, -0%)";
        bino.style.transform = "translate(-100%, -0%)";
      }
    } else {
      back.style.opacity = "0";
      for (var i = 0; i < userico.length; i++) {
        userico[i].style.opacity = "0";
      }
      music.volume *= 0.95;
    }
  }
  dots.forEach((dot) => {
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (play) {
      if (playList === "") {
        if (gamemode == "none") {
          if (dot.radius < dot.size * 100) dot.radius *= 1.025;
        }
      } else {
        dot.radius *= 1.025;
      }
    } else {
      if (dot.radius > dot.size) dot.radius /= 1.04;
    }
    if (map == "selecting") {
      if (dot.radius > dot.size) dot.radius /= 1.04;
    }
    if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#796c5c";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", () => {
  clas.style.transition = "transform 0s ease";
  bino.style.transition = "transform 0s ease";
  goon.style.transition = "transform 0s ease";
  ari.style.transition = "transform 0s ease";
});
document.addEventListener("mouseover", () => {
  clas.style.transition = "transform 0.5s ease-in";
  bino.style.transition = "transform 0.5s ease-in";
  goon.style.transition = "transform 0.5s ease-in";
  ari.style.transition = "transform 0.5s ease-in";
});
