// === [NEW] สร้างหัวใจลอยแบบสุ่ม ===
const heartContainer = document.getElementById('heartContainer');
const heartCount = 12;

for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement('div');
  heart.className = 'heart';

  const left = Math.random() * 100;
  heart.style.left = `${left}%`;

  const duration = 20 + Math.random() * 20;
  heart.style.setProperty('--duration', `${duration}s`);

  const delay = Math.random() * 10;
  heart.style.animationDelay = `${delay}s`;

  heartContainer.appendChild(heart);
}

const scenes = [
  {
    type: "quote",
    quote: "คืนนี้… ฉันอยากพาเธอไปดูจักรวาลของฉัน"
  },
  {
    type: "quote",
    quote: "ตรงกลางจักรวาลนี้คือดวงอาทิตย์… เหมือนหัวใจฉันที่มีเธออยู่ตรงกลาง"
  },
  {
    type: "quote",
    quote: "32 ปีที่โลกหมุนเวียน วันนี้มีฉันหมุนรอบเธอเสมอ"
  },
  {
    type: "quote",
    quote: "เราอาจไม่สมบูรณ์แบบ… แต่เราพอดีสำหรับกันและกัน"
  },
  {
    type: "quote",
    quote: "ขอบคุณที่เป็นแสงสว่างให้ทุกวันของฉัน"
  },
  {
    type: "quote",
    quote: "26/09/2025 สุขสันต์วันเกิดนะที่รัก ขอให้ปีนี้ใจสว่างกว่าเดิม"
  },
  {
    type: "final",
    quote: "ฉันไม่เคยคิดว่าตัวเองจะรักใครขนาดนี้...\n\nจนมาเจอเธอ\n\nวันนี้... ฉันขอเธอเป็นคนเดียวของฉัน\ntill the end of my breath."
  }
];

const sceneContainer = document.getElementById('scene');
let currentIndex = 0;

function showScene(index) {
  const scene = scenes[index];
  sceneContainer.innerHTML = '';
  sceneContainer.className = 'scene';

  if (scene.type === "quote") {
    const quote = document.createElement('p');
    quote.className = 'quote';
    sceneContainer.appendChild(quote);

    typeText(quote, scene.quote, 65).then(() => {
      quote.style.opacity = '1';
      quote.style.transform = 'translateY(0)';
      const dwell = 2500; // extra time to read after typing finishes
      if (index < scenes.length - 1) {
        setTimeout(() => showScene(index + 1), dwell);
      }
    });
    return;
  } else if (scene.type === "final") {
    sceneContainer.innerHTML = '';
    sceneContainer.classList.add('final-screen');

    const h1 = document.createElement('h1');
    h1.textContent = "ฉันรักเธอ";
    sceneContainer.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = scene.quote.replace(/\n/g, '<br>');
    sceneContainer.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = "เปิดของขวัญสุดท้าย ❤️";
    btn.addEventListener('click', () => {
      window.open('https://drive.google.com/file/d/YOUR_FINAL_VIDEO_ID/preview', '_blank');
    });
    sceneContainer.appendChild(btn);

    playFinalAudio();
    return;
  }

}

function playBackgroundMusic() {
  const audio = new Audio('assets/audio/background.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log("User interaction required for audio"));
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
  });
}

function playFinalAudio() {
  const audio = new Audio('assets/audio/voice-message.mp3');
  audio.volume = 0.5;
  audio.play().catch(e => console.log("User interaction required"));
}

function typeText(element, text, speed = 60) {
  return new Promise(resolve => {
    element.innerHTML = '';
    const chars = Array.from(text);
    let i = 0;
    const tick = () => {
      if (i < chars.length) {
        const ch = chars[i];
        element.innerHTML += ch === '\n' ? '<br>' : ch;
        i++;
        const delay = ch === ' ' ? speed * 0.6 : speed;
        setTimeout(tick, delay);
      } else {
        resolve();
      }
    };
    tick();
  });
}

// Shooting stars
const shootingLayer = document.getElementById('shooting');
function spawnShootingStar() {
  if (!shootingLayer) return;
  const star = document.createElement('div');
  star.className = 'shooting-star';
  const startX = Math.random() * window.innerWidth * 0.8;
  const startY = Math.random() * window.innerHeight * 0.4;
  const dx = 300 + Math.random() * 400;
  const dy = 180 + Math.random() * 280;
  const dur = 1.2 + Math.random() * 0.8;
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  star.style.setProperty('--dx', `${dx}px`);
  star.style.setProperty('--dy', `${dy}px`);
  star.style.setProperty('--duration', `${dur}s`);
  shootingLayer.appendChild(star);
  setTimeout(() => star.remove(), dur * 1000 + 200);
}

setInterval(() => {
  if (document.hidden) return;
  if (Math.random() < 0.7) spawnShootingStar();
}, 3500);

function updateSolarScale() {
  const cosmosRoot = document.getElementById('cosmos');
  if (!cosmosRoot) return;
  // Responsive scale based on viewport
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const base = Math.min(vw, vh);
  const scale = Math.max(0.6, Math.min(1, base / 800));
  cosmosRoot.style.setProperty('--solarScale', scale);
}

function renderCosmos() {
  const cosmosRoot = document.getElementById('cosmos');
  if (!cosmosRoot) return;
  cosmosRoot.innerHTML = '';

  // Nebula layer
  const nebula = document.createElement('div');
  nebula.className = 'nebula';
  cosmosRoot.appendChild(nebula);

  // Milky Way band
  const milky = document.createElement('div');
  milky.className = 'milkyway';
  cosmosRoot.appendChild(milky);

  const solar = document.createElement('div');
  solar.className = 'solar';

  const sun = document.createElement('div');
  sun.className = 'sun';
  solar.appendChild(sun);

  const makeOrbit = (diameter, speed, size, gradient, extrasCb) => {
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    orbit.style.width = `${diameter}px`;
    orbit.style.height = `${diameter}px`;
    orbit.style.setProperty('--speed', `${speed}s`);
    orbit.style.borderRadius = '50%';
    orbit.style.pointerEvents = 'none';

    const planet = document.createElement('div');
    planet.className = 'planet';
    planet.style.transform = 'translate(-50%, -50%)';

    const body = document.createElement('div');
    body.className = 'body';
    body.style.setProperty('--size', `${size}px`);
    body.style.setProperty('--gradient', gradient);

    planet.appendChild(body);

    if (typeof extrasCb === 'function') {
      extrasCb(planet, body, orbit);
    }
    orbit.appendChild(planet);
    return orbit;
  };

  // Mercury
  solar.appendChild(makeOrbit(160, 8, 8, 'linear-gradient(135deg, #c9c9c9, #9e9e9e)'));
  // Venus
  solar.appendChild(makeOrbit(210, 12, 12, 'linear-gradient(135deg, #ffd399, #e8a86f)'));
  // Earth + Moon
  solar.appendChild(makeOrbit(260, 16, 13, 'linear-gradient(135deg, #6bb1ff, #2e86de)', (planet, body) => {
    const moonOrbit = document.createElement('div');
    moonOrbit.className = 'moon-orbit';
    moonOrbit.style.width = '36px';
    moonOrbit.style.height = '36px';
    moonOrbit.style.setProperty('--speed', '4s');

    const moon = document.createElement('div');
    moon.className = 'moon';
    moon.style.setProperty('--size', '4px');

    moonOrbit.appendChild(moon);
    planet.appendChild(moonOrbit);
  }));
  // Mars
  solar.appendChild(makeOrbit(310, 20, 10, 'linear-gradient(135deg, #ff9f6b, #d86a3e)'));
  // Jupiter
  solar.appendChild(makeOrbit(380, 26, 22, 'linear-gradient(135deg, #f5d7a1, #d1a46e)'));
  // Saturn + ring
  solar.appendChild(makeOrbit(460, 32, 20, 'linear-gradient(135deg, #f3e3b3, #cbb07a)', (planet, body) => {
    const ring = document.createElement('div');
    ring.className = 'ring';
    ring.style.width = '46px';
    ring.style.height = '46px';
    planet.style.zIndex = '1';
    planet.appendChild(ring);
  }));
  // Uranus
  solar.appendChild(makeOrbit(540, 38, 16, 'linear-gradient(135deg, #a7e3e8, #86cbd1)'));
  // Neptune
  solar.appendChild(makeOrbit(620, 44, 16, 'linear-gradient(135deg, #8bb5ff, #507ddb)'));

  cosmosRoot.appendChild(solar);

  // Spaceships
  spawnShip(cosmosRoot, false, 45, 0);
  spawnShip(cosmosRoot, true, 52, 8);

  // Interactive Black hole will be created separately
}

function spawnShip(root, reverse = false, durationSec = 48, delaySec = 0) {
  const ship = document.createElement('div');
  ship.className = reverse ? 'ship reverse' : 'ship';
  ship.style.setProperty('--duration', `${durationSec}s`);
  ship.style.setProperty('--delay', `${delaySec}s`);
  ship.style.top = `${15 + Math.random() * 55}%`;
  ship.style.setProperty('--scale', `${0.9 + Math.random() * 0.5}`);
  const body = document.createElement('div');
  body.className = 'ship-body';
  const flame = document.createElement('div');
  flame.className = 'ship-flame';
  const trail = document.createElement('div');
  trail.className = 'trail';
  body.style.setProperty('--scale', ship.style.getPropertyValue('--scale'));
  ship.appendChild(trail);
  ship.appendChild(flame);
  ship.appendChild(body);
  root.appendChild(ship);

  // recycle after one pass
  setTimeout(() => {
    ship.remove();
    // respawn with new random top and delay
    spawnShip(root, reverse, durationSec, Math.random() * 10);
  }, (durationSec + delaySec) * 1000);
}

// Render cosmos background immediately
renderCosmos();

// Interactive Black Hole - Full Screen Background
function createInteractiveBlackHole() {
  const container = document.getElementById('blackhole-container');
  if (!container) return;

  const blackhole = document.createElement('div');
  blackhole.className = 'blackhole-interactive';
  
  const canvas = document.createElement('canvas');
  canvas.className = 'blackhole-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const center = document.createElement('div');
  center.className = 'blackhole-center';
  center.setAttribute('tabindex', '0');
  center.innerHTML = '<span>ENTER</span>';

  const hint = document.createElement('div');
  hint.className = 'start-hint';
  hint.textContent = 'แตะหน้าจอหรือกด ENTER เพื่อเริ่ม';
  
  blackhole.appendChild(canvas);
  blackhole.appendChild(center);
  blackhole.appendChild(hint);
  container.appendChild(blackhole);

  // Black hole animation
  const ctx = canvas.getContext('2d');
  const maxOrbit = Math.min(window.innerWidth, window.innerHeight) * 0.3;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  let stars = [];
  let collapse = false;
  let expanse = false;
  let startTime = Date.now();

  function setDPI(canvas, dpi) {
    const scaleFactor = dpi / 96;
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    const ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
  }

  function rotate(cx, cy, x, y, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }

  setDPI(canvas, 192);

  function Star() {
    const rands = [];
    rands.push(Math.random() * (maxOrbit/2) + 1);
    rands.push(Math.random() * (maxOrbit/2) + maxOrbit);
    
    this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
    this.x = centerX;
    this.y = centerY + this.orbital;
    this.yOrigin = centerY + this.orbital;
    // Slower angular speed for calmer rotation
    this.speed = (Math.random() * 1.0 + 0.6) * Math.PI / 180; // 0.6 to 1.6 deg/frame-equivalent
    this.rotation = 0;
    this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
    this.id = stars.length;
    this.collapseBonus = this.orbital - (maxOrbit * 0.7);
    if (this.collapseBonus < 0) this.collapseBonus = 0;
    
    stars.push(this);
    this.color = `rgba(255,255,255,${1 - (this.orbital / 255)})`;
    this.hoverPos = centerY + (maxOrbit/2) + this.collapseBonus;
    this.expansePos = centerY + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);
    this.prevR = this.startRotation;
    this.prevX = this.x;
    this.prevY = this.y;
  }

  Star.prototype.draw = function() {
    const tFactor = (Date.now() - startTime) / 140; // slowed from 50 -> 140
    if (!expanse) {
      this.rotation = this.startRotation + tFactor * this.speed;
      if (!collapse) {
        if (this.y > this.yOrigin) this.y -= 2.5;
        if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 10;
      } else {
        if (this.y > this.hoverPos) this.y -= (this.hoverPos - this.y) / -5;
        if (this.y < this.hoverPos - 4) this.y += 2.5;
      }
    } else {
      this.rotation = this.startRotation + tFactor * (this.speed / 2);
      if (this.y > this.expansePos) this.y -= Math.floor(this.expansePos - this.y) / -140;
    }

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    const oldPos = rotate(centerX, centerY, this.prevX, this.prevY, -this.prevR);
    ctx.moveTo(oldPos[0], oldPos[1]);
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);
    ctx.translate(-centerX, -centerY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();

    this.prevR = this.rotation;
    this.prevX = this.x;
    this.prevY = this.y;
  };

  function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
      stars[i].draw();
    }

    requestAnimationFrame(loop);
  }

  function init() {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 2000; i++) {
      new Star();
    }
    loop();
  }

  // Event listeners
  const startShow = () => {
    collapse = false;
    expanse = true;
    center.classList.add('open');
    setTimeout(() => {
      const containerEl = document.getElementById('blackhole-container');
      if (containerEl) {
        containerEl.classList.add('dimmed');
      }
      const cosmosRoot = document.getElementById('cosmos');
      cosmosRoot.classList.add('visible');

      if (!window.hasInteracted) {
        window.hasInteracted = true;
        playBackgroundMusic();
        showScene(0);
        spawnShip(cosmosRoot, false, 45, 0);
        spawnShip(cosmosRoot, true, 52, 8);
      }
    }, 600);
  };


  center.addEventListener('click', startShow);
  blackhole.addEventListener('click', (e) => {
    if (e.target === blackhole) startShow();
  });

  // เพิ่ม keydown event สำหรับ Enter เพื่อเริ่มโชว์ (รองรับทั้ง document และ window)
  function handleEnterStart(e) {
    if (!window.hasInteracted && (e.key === 'Enter' || e.keyCode === 13)) {
      console.log('Enter pressed, starting show');
      startShow();
    }
  }
  document.addEventListener('keydown', handleEnterStart);

  center.addEventListener('mouseover', function() {
    if (!expanse) collapse = true;
  });

  center.addEventListener('mouseout', function() {
    if (!expanse) collapse = false;
  });

  // Show black hole center after a delay
  setTimeout(() => {
    center.classList.add('show');
    hint.classList.add('show');
    center.focus();
  }, 1000);

  init();
}

// Create interactive black hole
createInteractiveBlackHole();

// Update solar system scale on resize, without re-rendering everything
window.addEventListener('resize', () => {
  updateSolarScale();
  // Note: The black hole canvas is not responsive to resize.
  // Making it fully responsive would require re-initializing the canvas
  // and all the star positions, which is a more significant change.
});

// Set initial scale
updateSolarScale();