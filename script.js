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
    quote: "วันนี้… อยากพาที่รักไปดูจักรวาลของเค้า"
  },
  {
    type: "quote",
    quote: "ตรงกลางจักรวาลนี้คือดวงอาทิตย์… เหมือนหัวใจเค้าที่มีที่รักอยู่ตรงกลาง"
  },
  {
    type: "quote",
    quote: "3 ปีกว่าที่เราได้รู้จักกัน และอยู่เคียงข้างกัน"
  },
  {
    type: "quote",
    quote: "เราอาจไม่สมบูรณ์แบบ… แต่เราทั้งสองพอดีซึ่งกันและกัน"
  },
  {
    type: "quote",
    quote: "ขอบคุณที่เป็นแสงสว่างให้ทุกวันของเค้า"
  },
  {
    type: "quote",
    quote: "และวันนี้… อยากให้ที่รักได้รู้ว่า\nเค้ารักที่รักมากแค่ไหน"
  },
  {
    type: "final",
    quote: "สุขสันต์วันครบรอบ 32 ปีนะที่รัก\nขอให้มีสุขภาพร่างกายที่แข็งแรง\nมีความสุข เรียนจบหมอไวๆ\nสอบผ่านทุกวิชา ได้คะแนนดีๆ\nถูกรางวัลที่ 1 เป็นที่รักของเค้า\nตลอดไปนะครับ."
  }
];

const sceneContainer = document.getElementById('scene');
let currentIndex = 0;

// Runtime settings
const settings = {
  playSound: false // change to true if you add assets/audio/blip.mp3 and want typing sounds
};

// (production) Minimal runtime - keep quiet unless errors occur


function showScene(index) {
  const scene = scenes[index];
  sceneContainer.innerHTML = '';
  sceneContainer.className = 'scene';

  if (scene.type === "quote") {
    const quote = document.createElement('p');
    quote.className = 'quote';
    sceneContainer.appendChild(quote);

    // show immediately so per-character reveal is visible; add small translate-in
    quote.style.opacity = '1';
    quote.style.transform = 'translateY(0)';
    // Smart dwell: base + per-char scaling (capped)
    const baseDwell = 1200;
    const perChar = 55; // ms per character
    const maxDwell = 7000;

    typeText(quote, scene.quote, 75).then(() => {
      const computedDwell = Math.min(maxDwell, baseDwell + (scene.quote.length * perChar));
      if (index < scenes.length - 1) {
        setTimeout(() => showScene(index + 1), computedDwell);
      }
    });
    return;
  } else if (scene.type === "final") {
    // Auto-run final sequence: explode solar system into cake
    // Hide overlay decorations (but keep #cosmos visible so clones can be created)
    const hideBg = () => {
      const ids = ['heartContainer', 'shooting'];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      const sparkle = document.querySelector('.sparkle-overlay');
      if (sparkle) sparkle.style.display = 'none';
      const containerEl = document.getElementById('container');
      if (containerEl) containerEl.style.display = 'none';
      const blackhole = document.getElementById('blackhole-container');
      if (blackhole) {
        blackhole.classList.remove('dimmed');
      }
    };
    // Hide overlays now but keep cosmos until explodeSolarThenCake handles hiding it
    hideBg();
    explodeSolarThenCake(scene.quote);
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
    // show characters progressively; add 'typing' class to show cursor
    element.innerHTML = '';
    element.classList.add('typing');
    const chars = Array.from(text);
    let i = 0;

    const playBlip = () => {
      if (!settings.playSound) return;
      try {
        // reuse a tiny audio buffer (very short sound) - optional and may be blocked
        const blip = new Audio('assets/audio/blip.mp3');
        blip.volume = 0.08;
        blip.play().catch(() => {});
      } catch (e) {
        // ignore
      }
    };

    const tick = () => {
      if (i < chars.length) {
        const ch = chars[i];
        element.innerHTML += ch === '\n' ? '<br>' : ch;
        i++;
        if (ch !== ' ' && ch !== '\n') playBlip();
        const delay = ch === ' ' ? Math.max(30, speed * 0.6) : speed;
        setTimeout(tick, delay);
      } else {
        element.classList.remove('typing');
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

// Confetti / heart-fall generator for final celebration
function spawnConfetti(count = 24) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#ff6b9d', '#ffd36b', '#8ec5ff', '#a7e3e8', '#d6a4ff'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    // random starting position across the top
    const left = Math.random() * 100;
    el.style.left = `${left}vw`;
    // random rotation and tiny size variation
    el.style.width = `${8 + Math.random() * 8}px`;
    el.style.height = `${10 + Math.random() * 10}px`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = `${Math.random() > 0.5 ? '2px' : '50%'}`;
    el.style.animationDuration = `${3 + Math.random() * 3}s`;
    el.style.transform = `translateY(-20vh) rotate(${Math.random() * 360}deg)`;
    container.appendChild(el);

    // cleanup per element
    setTimeout(() => {
      el.remove();
    }, (parseFloat(el.style.animationDuration) + 0.5) * 1000 + 200);
  }

  // remove container after all
  setTimeout(() => container.remove(), 8000);
}

// Helper to animate a DOM element with transform and return a Promise when transition ends
function animateTransform(el, transform, duration = 700, easing = 'cubic-bezier(.22,1.2,.24,1)') {
  return new Promise(resolve => {
    el.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
    requestAnimationFrame(() => {
      el.style.transform = transform;
    });
    const cleanup = () => {
      el.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = (e) => { if (e.propertyName.includes('transform')) cleanup(); };
    el.addEventListener('transitionend', onEnd);
    // safety fallback
    setTimeout(cleanup, duration + 100);
  });
}

// spawn small explosion sparks at (x,y) in viewport coordinates
function spawnSparksAt(x, y, count = 8) {
  const sparks = [];
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'explosion-spark';
    const size = 4 + Math.random() * 6;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${x - size/2}px`;
    s.style.top = `${y - size/2}px`;
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    s.style.opacity = '1';
    document.body.appendChild(s);
    sparks.push(s);

    // animate via requestAnimationFrame for simple transform/opacity
    requestAnimationFrame(() => {
      s.style.transition = `transform ${600 + Math.random()*400}ms cubic-bezier(.22,1.2,.24,1), opacity ${600 + Math.random()*400}ms ease-out`;
      s.style.transform = `translate(${dx}px, ${dy}px) scale(${0.6 + Math.random()*0.9}) rotate(${Math.random()*360}deg)`;
      s.style.opacity = '0';
    });

    // cleanup
    setTimeout(() => { s.remove(); }, 1400 + Math.random() * 600);
  }
}

// [NEW] Spawn sun fragments for supernova effect
function spawnSunFragments(x, y, count = 50) {
  const fragmentPromises = [];
  for (let i = 0; i < count; i++) {
    const fragment = document.createElement('div');
    fragment.className = 'sun-fragment';
    document.body.appendChild(fragment);

    const size = 8 + Math.random() * 12; // Vary fragment size
    fragment.style.width = `${size}px`;
    fragment.style.height = `${size}px`;
    fragment.style.left = `${x - size / 2}px`;
    fragment.style.top = `${y - size / 2}px`;

    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 300; // Fragments fly further
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;    
    const duration = 1800 + Math.random() * 1200; // [FIX] Slower animation
    const rotation = Math.random() * 720 - 360; // Random rotation

    fragment.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    requestAnimationFrame(() => {
      fragment.style.transform = `translate(${dx}px, ${dy}px) scale(${0.5 + Math.random() * 1.5}) rotate(${rotation}deg)`;
      fragment.style.opacity = '0';
    });
    fragmentPromises.push(new Promise(resolve => setTimeout(() => { fragment.remove(); resolve(); }, duration + 100)));
  }
  return Promise.all(fragmentPromises);
}

// Map planets to cake layers and animate into place
function transitionSolarToCake() {
  const cosmosRoot = document.getElementById('cosmos');
  const cakeRoot = document.getElementById('cake-root');
  if (!cosmosRoot || !cakeRoot) return;

  // find all orbit planets currently in DOM
  const planets = Array.from(cosmosRoot.querySelectorAll('.solar .planet'));
  if (!planets.length) {
    // fallback: just show cake
    buildAndShowCake(cakeRoot);
    return;
  }

  // show cake root (hidden by default)
  cakeRoot.style.display = 'block';

  // animate clones of planets to center with slight random offsets (do not remove originals)
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const clones = [];
  const animPromises = planets.map((p, i) => {
    const rect = p.getBoundingClientRect();
    // create a visual clone to animate so we don't break the original layout
    const clone = p.cloneNode(true);
    clone.classList.add('planet-clone');
    // size/position clone exactly over the original
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = 9999;
    clone.style.pointerEvents = 'none';
    // reset transforms on clone
    clone.style.transform = 'translate(0,0)';
    document.body.appendChild(clone);
    clones.push(clone);

    const px = rect.left + rect.width / 2;
    const py = rect.top + rect.height / 2;
    const dx = centerX - px + (Math.random() * 40 - 20);
    const dy = centerY - py + (Math.random() * 60 - 30);

    return animateTransform(clone, `translate(${dx}px, ${dy}px) scale(0.4)`, 650);
  });

  Promise.all(animPromises).then(() => {
    // after clones converge, remove clones and gracefully hide the cosmos
    clones.forEach(c => c.remove());
    const cosmos = document.getElementById('cosmos');
    if (cosmos) {
      cosmos.style.transition = 'opacity 600ms ease';
      cosmos.style.opacity = '0';
      setTimeout(() => { cosmos.style.display = 'none'; }, 700);
    }
    buildAndShowCake(cakeRoot);
  });
}

function buildAndShowCake(cakeRoot, candleCount = 3, message = null) {
  if (!cakeRoot) return;
  cakeRoot.style.display = 'block';
  cakeRoot.style.opacity = '0';
  cakeRoot.innerHTML = '';

  // [NEW] Create cake with the new structure
  const cake = document.createElement('div'); // This is the actual cake element
  cake.className = 'cake';
  cake.innerHTML = `
    <div class="plate"></div>
    <div class="layer layer-bottom"></div>
    <div class="layer layer-middle"></div>
    <div class="layer layer-top"></div>
    <div class="icing"></div>
    <div class="drip drip1"></div>
    <div class="drip drip2"></div>
    <div class="drip drip3"></div>
    <div class="candle">
        <div class="flame"></div>
    </div>
  `;
  cakeRoot.appendChild(cake);

  // responsive scaling for cake (smaller screens -> reduce scale)
  const vw = Math.min(window.innerWidth, 900);
  const scale = Math.max(0.6, Math.min(1.5, vw / 550)); // [FIX] Adjusted divisor for better mobile scaling
  cakeRoot.style.setProperty('--cake-scale', scale.toString());

  let msgEl = null;
  if (message) {
    msgEl = document.createElement('div');
    msgEl.className = 'cake-message';
    const p = document.createElement('p');
    p.className = 'quote';
    msgEl.appendChild(p);
    cake.appendChild(msgEl); // [FIX] Move message inside the .cake element
  }

  requestAnimationFrame(() => {
    // cakeRoot.style.transition is now handled by the cake's own transition
    cakeRoot.style.opacity = '1';
    cake.classList.add('assembled');
  });

  setTimeout(() => {
    spawnConfetti(22);
    if (message && msgEl) {
      const p = msgEl.querySelector('.quote');
      typeText(p, message, 75);
    }
  }, 900);
}

function buildFinalImages() {
  const container = document.createElement('div');
  container.className = 'final-images-container';

  const imageUrls = [
    'assets/images/my-photo-1.jpg', // <-- [แก้ไข] เปลี่ยนไฟล์ .HEIC เป็น .jpg หรือ .png
    'assets/images/my-photo-3.jpg'  // <-- [แก้ไข] แนะนำให้ใช้ .jpg (ตัวพิมพ์เล็ก)
  ];

  imageUrls.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.className = `final-image ${index === 0 ? 'left' : 'right'}`;
    container.appendChild(img);
  });

  document.body.appendChild(container);

  // Animate them in
  setTimeout(() => {
    container.classList.add('visible');
  }, 1200); // Delay to sync with cake appearance
}

// Explode solar (sun + orbiters) then assemble cake with 9 lit candles and message
function explodeSolarThenCake(message) {
  const candleCount = 1;
  const cosmosRoot = document.getElementById('cosmos');
  const cakeRoot = document.getElementById('cake-root');

  if (!cosmosRoot || !cakeRoot) {
    buildAndShowCake(cakeRoot || document.body, candleCount, message);
    return;
  }

  const solar = cosmosRoot.querySelector('.solar');
  if (!solar) {
    buildAndShowCake(cakeRoot, candleCount, message);
    return;
  }

  const sun = solar.querySelector('.sun');
  const planets = Array.from(solar.querySelectorAll('.planet'));
  // We will handle the sun separately with fragments, so remove it from the 'items' for planet destruction
  const itemsToDestroy = planets;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // --- SUPERNOVA SEQUENCE ---

  // [FIX] Detect mobile to reduce particle count for performance
  const isMobile = window.innerWidth < 768;
  const sparkCount = isMobile ? 50 : 150;
  const fragmentCount = isMobile ? 20 : 50;

  // 1. Bright Flash
  const flash = document.createElement('div');
  flash.className = 'supernova-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1000);
  
  let sunExplosionPromise = Promise.resolve(); // Initialize with a resolved promise
  // 2. Shockwave & Particle Burst from Sun's center
  if (sun) {
    const sunRect = sun.getBoundingClientRect();
    const sunCenterX = sunRect.left + sunRect.width / 2;
    const sunCenterY = sunRect.top + sunRect.height / 2;

    const shockwave = document.createElement('div');
    shockwave.className = 'supernova-shockwave';
    shockwave.style.left = `${sunCenterX}px`;
    shockwave.style.top = `${sunCenterY}px`;
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 1000);

    // Massive particle burst
    spawnSparksAt(sunCenterX, sunCenterY, sparkCount);

    // NEW: Sun explodes into larger fragments
    sunExplosionPromise = spawnSunFragments(sunCenterX, sunCenterY, fragmentCount);
  }

  const planetDestructionPromises = itemsToDestroy.map(el => {
    return new Promise(resolve => {
      const rect = el.getBoundingClientRect();
      const clone = el.cloneNode(true);
      clone.classList.add('planet-clone');
      if (el.classList.contains('sun')) clone.classList.add('sun');
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      document.body.appendChild(clone);

      // Animate destruction
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.min(window.innerWidth, window.innerHeight) * (0.8 + Math.random() * 0.7); // Fly even further
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const duration = 1500 + Math.random() * 1000; // [FIX] Slower animation
      const scaleFactor = 2 + Math.random() * 3; // Scale up more
      const rotation = Math.random() * 1080 - 540; // More rotation

      clone.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in`;
      requestAnimationFrame(() => {
        clone.style.transform = `translate(${dx}px, ${dy}px) scale(${2 + Math.random() * 2}) rotate(${Math.random() * 720 - 360}deg)`;
        clone.style.opacity = '0';
      });

      setTimeout(() => {
        clone.remove();
        resolve();
      }, duration);
    });
  });

  const allDestructionPromises = [sunExplosionPromise, ...planetDestructionPromises];
  cosmosRoot.style.transition = 'opacity 1200ms ease-out';
  cosmosRoot.style.opacity = '0';
  const blackhole = document.getElementById('blackhole-container');
  if (blackhole) {
    blackhole.style.transition = 'opacity 1200ms ease-out';
    blackhole.style.opacity = '0';
  }

  Promise.all(allDestructionPromises).then(() => {
    setTimeout(() => {
      // Ensure cosmos and blackhole are fully hidden before cake appears
      cosmosRoot.style.display = 'none';
      if (blackhole) blackhole.style.display = 'none';

      buildAndShowCake(cakeRoot, candleCount, message);
      buildFinalImages(); // [NEW] Call function to build and show final images
    }, 500); // A brief moment of darkness before the cake appears
  });
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
  hint.textContent = 'คลิกที่วงกลมเพื่อเริ่ม';

  // ประกาศ startShow ก่อน bind event
  function startShow() {
    // ป้องกันการรันซ้ำซ้อน
    if (window.hasInteracted) return;
    window.hasInteracted = true;
    // console.log('startShow called'); // Commented out for cleanup
    expanse = true;
    center.classList.add('open');
    hint.classList.remove('show');
    setTimeout(() => {
      const containerEl = document.getElementById('blackhole-container');
      if (containerEl) {
        containerEl.classList.add('dimmed');
      }
      const cosmosRoot = document.getElementById('cosmos');
      if (cosmosRoot) {
        cosmosRoot.classList.add('visible');
        spawnShip(cosmosRoot, false, 45, 0);
        spawnShip(cosmosRoot, true, 52, 8);
      }
      try {
        playBackgroundMusic();
      } catch (e) {
        console.error('playBackgroundMusic error', e);
      }
      try {
        showScene(0);
      } catch (e) {
        console.error('showScene error', e);
      }
    }, 600);
  }

  // bind event (click/touch) for center and background
  center.addEventListener('click', startShow);
  center.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startShow();
  }, { passive: false });
  blackhole.addEventListener('click', startShow);
  blackhole.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startShow();
  }, { passive: false });

  // Fallback: also allow clicking/tapping the outer container in case
  // something overlays the interactive elements on some devices.
  container.addEventListener('click', startShow);
  container.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startShow();
  }, { passive: false });

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
      // ทำให้ดาวเคลื่อนไหวตามปกติ โดยไม่ต้องมีเอฟเฟกต์ตอนเอาเมาส์ไปชี้
      if (this.y > this.yOrigin) this.y -= 2.5;
      if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 10;
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

// Production: no debug UI

// Update solar system scale on resize, without re-rendering everything
window.addEventListener('resize', () => {
  updateSolarScale();
  // Note: The black hole canvas is not responsive to resize.
  // Making it fully responsive would require re-initializing the canvas
  // and all the star positions, which is a more significant change.
});

// Set initial scale
updateSolarScale();