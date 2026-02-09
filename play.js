const whitelist = [
  "fatty balc",
  "ninety hallway",
  "mud",
  "rninety",
  "amill",
  "below cargo hatch",
  "container",
  "udesk",
  "pc",
  "control",
  "beepers",
  "connector stairs",
  "animus dp",
  "ani default",
  "games hatch",
  "lounge hatch",
  "lobby breach",
  "lobby walls",
  "warehouse breach",
  "ninety window",
  "gen",
  "fruit",
  "bottom cargo hatch",
  "gen boost",
  "mud door",
  "elbow",
  "control door",
];
const blacklist = [
  "cement",
  "i",
  "meeting hatch",
  "waterfall hallway",
  "assembly corner",
  "lobby door",
  "kitchen",
  "assembly headglitch",
  "assembly pixel",
  "assembly head glitch",
  "kitchen",
];
document.addEventListener("DOMContentLoaded", (e) => {
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }
  function isImageCentered(element, tolerance = 200) {
    const rect = element.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const screenCenterX = window.innerWidth / 2;
    return Math.abs(imgCenterX - screenCenterX) <= tolerance;
  }
  function animateColor(start, end, duration) {
    let startTime = null;
    function animate(time) {
      if (!startTime) startTime = time;
      let progress = Math.min((time - startTime) / duration, 1);
      const r = Math.round(lerp(start[0], end[0], progress));
      const g = Math.round(lerp(start[1], end[1], progress));
      const b = Math.round(lerp(start[2], end[2], progress));
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
  animateColor([121, 108, 92], [102, 94, 117], 1000);
  const vol = localStorage.getItem("volume") || 1;
  const music = new Audio("audio/Nando Wando - Rush!.wav");
  music.volume = vol;
  music.loop = true;
  music.play();
  const countdownSfx = new Audio("audio/countdown.wav");
  const fine = new Audio("audio/fine.mp3");
  const bad = new Audio("audio/bad.mp3");
  const notTag = new Audio("audio/notTag.mp3");
  const bar = document.getElementById("timerFill");
  const go = new Audio("audio/go.wav");
  const click = new Audio("audio/click.wav");
  const best = new Audio("audio/best.mp3");
  click.volume = vol;
  go.volume = vol * 0.5;
  bad.volume = vol;
  notTag.volume = vol;
  best.volume = vol;
  fine.volume = vol;
  countdownSfx.volume = vol * 0.5;
  const number = document.getElementById("number");
  const guessImg = document.getElementById("guessImage");
  let currentCount = 3;
  runExample();
  number.style.transform = "translate(-500%, 0%)";
  async function runExample() {
    await delay(1000);
    number.style.transform = "translate(-500%, 0%)";
    number.style.transition = "transform 0.5s ease-in-out";
    number.style.transform = "translate(-50%, 0%)";
  }
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  guessImg.style.border = "10px solid #5831a1";
  number.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    if (isImageCentered(number)) {
      countdownSfx.play();
      number.style.transform = "translate(600%, 0%)";
    } else {
      currentCount--;
      if (currentCount > 0) {
        const imageMap = {
          2: "images/two.png",
          1: "images/one.png",
        };
        number.src = imageMap[currentCount];
        number.style.transition = "none";
        number.style.transform = "translate(-650%, 0%)";
        number.offsetHeight;
        number.style.transition = "transform 0.5s ease-in-out";
        number.style.transform = "translate(-50%, 0%)";
      } else {
        let removeCount = arr.length - 25;

        for (let i = 0; i < removeCount; i++) {
          current = Math.floor(Math.random() * arr.length);
          arr.splice(current, 1);
        }
        handleCountdownComplete();
      }
    }
  });
  guessImg.addEventListener("transitionstart", (e) => {
    go.play();
  });
  function saveScore(mode, time) {
    if (scores[mode] === null || time < scores[mode]) {
      scores[mode] = time;

      localStorage.setItem("scores", JSON.stringify(scores));
    }
  }
  const params = new URLSearchParams(window.location.search);
  const map = params.get("map");
  const mode = params.get("mode");
  let arr = [];
  let callouts = [];
  let current = 0;
  fetch(map)
    .then((res) => res.text())
    .then((text) => {
      arr = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line)
        .map((line) => {
          line = line.slice(1, -1);
          const items = line.split(",").map((s) => s.trim());
          return items;
        });
    });
  const texter = document.getElementById("texter");
  const whatsLeft = document.getElementById("left");
  const tag = document.getElementById("tags");
  let percentage = 0;
  function handleCountdownComplete() {
    document.getElementById("skip").style.opacity = 1;
    document.getElementById("report").style.opacity = 1;
    texter.value = "";
    texter.focus();
    requestAnimationFrame(gameLoop);
    document.getElementById("timer").style.opacity = 1;
    texter.style.opacity = 1;
    tag.style.opacity = 1;
    number.style.display = "none";
    animateColor([102, 94, 117], [136, 107, 191], 1000);
    current = Math.floor(Math.random() * arr.length);
    guessImg.src = arr[current][0];
    guessImg.onload = () => {
      guessImg.classList.add("show");
    };
    callouts = [];
    tag.innerText = "";
    const texterRect = texter.getBoundingClientRect();
    tag.style.top = texterRect.bottom + 10 + "px";
    for (let i = 0; i < arr[current].length - 1; i++) {
      callouts[i] = arr[current][i + 1];
      const span = document.createElement("span");
      if (i === 0 || whitelist.includes(callouts[i])) {
        span.style.color = "#ffd166";
        span.textContent = callouts[i] + "    -3s";
      } else if (blacklist.includes(callouts[i])) {
        span.style.color = "#ff3c3c";
        span.textContent = callouts[i] + "    +1.5s";
      } else {
        span.textContent = callouts[i] + "    -0.5s";
      }
      tag.appendChild(span);
      tag.appendChild(document.createElement("br"));
    }
  }
  let lastTick = 0;
  const tickRate = 10;
  function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTick;
    if (deltaTime >= tickRate) {
      tick();
      lastTick = currentTime;
    }
    requestAnimationFrame(gameLoop);
  }
  bar.style.width = "0px";
  function tick() {
    bar.style.width = Math.round(percentage * 18.3333333) + "px";
    percentage += 0.015;
    whatsLeft.textContent =
      arr.length +
      " left.\n Current score: " +
      percentage.toFixed(2) +
      " seconds";
    if (percentage > 60) {
      //lost
    }
    if (arr.length === 0) {
      //win
      saveScore(map.substring(5, map.length - 4), percentage);
    }
  }
  texter.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (texter.placeholder == "Press Enter") {
        arr.splice(current, 1);
        texter.value = "";
        texter.focus();
        tag.style.filter = "blur(10px)";
        texter.placeholder = "type guess here";
        current = Math.floor(Math.random() * arr.length);
        guessImg.src = arr[current][0];
        guessImg.onload = () => {
          guessImg.classList.add("show");
        };
        callouts = [];
        tag.innerText = "";
        tag.innerHTML = "";
        const texterRect = texter.getBoundingClientRect();
        tag.style.top = texterRect.bottom + 10 + "px";
        for (let i = 0; i < arr[current].length - 1; i++) {
          callouts[i] = arr[current][i + 1];
          const span = document.createElement("span");
          if (i === 0 || whitelist.includes(callouts[i])) {
            span.style.color = "#ffd166";
            span.textContent = callouts[i] + "    -3s";
          } else if (blacklist.includes(callouts[i])) {
            span.style.color = "#ff3c3c";
            span.textContent = callouts[i] + "    +1.5s";
          } else {
            span.textContent = callouts[i] + "    -0.5s";
          }
          tag.appendChild(span);
          tag.appendChild(document.createElement("br"));
        }
      } else {
        if (callouts.includes(texter.value.toLowerCase().trim())) {
          tag.style.filter = "blur(0px)";
          texter.placeholder = "Press Enter";
          if (
            callouts.indexOf(texter.value.toLowerCase().trim()) == 0 ||
            whitelist.includes(texter.value.toLowerCase().trim())
          ) {
            percentage -= 3;
            best.play();
          } else if (blacklist.includes(texter.value.toLowerCase().trim())) {
            percentage += 1.5;
            bad.play();
          } else {
            percentage += 0.5;
            fine.play();
          }
        } else {
          notTag.play();
        }
      }
      texter.value = "";
    }
  });
  document.getElementById("skip").addEventListener("click", (e) => {
    const click1 = new Audio("audio/bad.mp3");
    click1.volume = vol;
    click1.play();
    if (texter.placeholder == "Press Enter") {
      percentage += 10;
      arr.splice(current, 1);
      texter.value = "";
      texter.focus();
      tag.style.filter = "blur(10px)";
      texter.placeholder = "type guess here";
      current = Math.floor(Math.random() * arr.length);
      guessImg.src = arr[current][0];
      guessImg.onload = () => {
        guessImg.classList.add("show");
      };
      callouts = [];
      tag.innerText = "";
      tag.innerHTML = "";
      const texterRect = texter.getBoundingClientRect();
      tag.style.top = texterRect.bottom + 10 + "px";
      for (let i = 0; i < arr[current].length - 1; i++) {
        callouts[i] = arr[current][i + 1];
        const span = document.createElement("span");
        if (i === 0 || whitelist.includes(callouts[i])) {
          span.style.color = "#ffd166";
          span.textContent = callouts[i] + "    -3s";
        } else if (blacklist.includes(callouts[i])) {
          span.style.color = "#ff3c3c";
          span.textContent = callouts[i] + "    +1.5s";
        } else {
          span.textContent = callouts[i] + "    -0.5s";
        }
        tag.appendChild(span);
        tag.appendChild(document.createElement("br"));
      }
    } else {
      tag.style.filter = "blur(0px)";
      texter.placeholder = "Press Enter";
      texter.focus();
    }
    texter.value = "";
  });
  const reportBtn = document.getElementById("report");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("reportModal");
  const closeReport = document.getElementById("closeReport");
  reportBtn.addEventListener("click", () => {
    click.play();
    overlay.classList.add("show");
    modal.classList.add("show");
  });

  closeReport.addEventListener("click", () => {
    click.play();
    let body =
      document.getElementById("newTag").value +
      "|" +
      document.querySelector('input[name="quality"]:checked').value +
      "|" +
      document.getElementById("issueReport").value +
      "|" +
      arr[current];
    console.log(body);
    //send email here
    document.getElementById("fine").checked = true;
    document.getElementById("newTag").value = "";
    document.getElementById("issueReport").value = "";
    overlay.classList.remove("show");
    modal.classList.remove("show");
  });

  overlay.addEventListener("click", closeModal);

  function closeModal() {
    overlay.classList.remove("show");
    modal.classList.remove("show");
  }
  const canvas = document.getElementById("dotCanvas");
  const ctx = canvas.getContext("2d");
  const dots = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let i = 0; i < 100; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 25,
      alpha: 0,
    });
  }
  function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((dot) => {
      dot.x += dot.dx / 1;
      dot.y += dot.dy / 1;
      if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
      if (number.style.display === "none") {
        dot.alpha += 0.01;
        if (dot.alpha > 1) dot.alpha = 1;
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(88, 49, 161, " + dot.alpha + ")";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
});
