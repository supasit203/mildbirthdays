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
    quote: "บางวันเราอาจไม่สมบูรณ์แบบ แต่เราพอดีสำหรับกันและกันเสมอ"
  },
  {
    type: "quote",
    quote: "ขอบคุณที่เป็นแสงสว่างให้ทุกวันของฉัน"
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

  if (index === 0) {
    playBackgroundMusic();
  }

  if (index < scenes.length - 1 && scene.type !== 'quote') {
    const baseDelay = 6000;
    setTimeout(() => showScene(index + 1), baseDelay);
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

  // Black hole
  const bh = document.createElement('div');
  bh.className = 'blackhole';
  bh.innerHTML = '<div class="disk"></div><div class="glow"></div><div class="horizon"></div>';
  cosmosRoot.appendChild(bh);
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

document.addEventListener('click', () => {
  if (!window.hasInteracted) {
    window.hasInteracted = true;
    showScene(0);
  }
});

setTimeout(() => {
  if (!window.hasInteracted) {
    window.hasInteracted = true;
    showScene(0);
  }
}, 3000);