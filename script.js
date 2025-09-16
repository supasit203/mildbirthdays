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
    type: "image",
    src: "assets/images/1.jpg",
    quote: "วันแรกที่เจอ... คุณยิ้มให้ฉันเหมือนกับว่าเราเคยรู้จักกันนานแล้ว"
  },
  {
    type: "image",
    src: "assets/images/2.jpg",
    quote: "ตอนที่เราอดข้าว แต่กินไอศกรีมด้วยกัน... คุณบอกว่า ‘ความสุขไม่ต้องแพง’"
  },
  {
    type: "image",
    src: "assets/images/3.jpg",
    quote: "วันที่คุณร้องไห้เพราะฉันลืมวันเกิด... แต่คุณก็ยังกอดฉันไว้"
  },
  {
    type: "image",
    src: "assets/images/4.jpg",
    quote: "ตอนฝนตก... เราเดินด้วยกันโดยไม่พูดอะไรเลย แต่ฉันรู้ว่าเราไม่ต้องพูด"
  },
  {
    type: "final",
    bg: "assets/images/final-bg.jpg",
    quote: "ฉันไม่เคยคิดว่าตัวเองจะรักใครขนาดนี้...\n\nจนมาเจอเธอ\n\nวันนี้... ฉันขอเธอเป็นคนเดียวของฉัน\ntill the end of my breath."
  }
];

const sceneContainer = document.getElementById('scene');
let currentIndex = 0;

function showScene(index) {
  const scene = scenes[index];
  sceneContainer.innerHTML = '';
  sceneContainer.className = 'scene';

  if (scene.type === "image") {
    const img = new Image();
    img.src = scene.src;
    img.alt = "Memory";
    img.classList.add('image');

    const quote = document.createElement('p');
    quote.className = 'quote';
    quote.textContent = scene.quote;

    sceneContainer.appendChild(img);
    sceneContainer.appendChild(quote);

    setTimeout(() => img.style.opacity = '1', 100);
    setTimeout(() => img.style.transform = 'translateY(0)', 100);
    setTimeout(() => quote.style.opacity = '1', 800);
    setTimeout(() => quote.style.transform = 'translateY(0)', 800);

  } else if (scene.type === "final") {
    document.body.style.background = 'none';
    sceneContainer.innerHTML = '';
    sceneContainer.classList.add('final-screen');
    sceneContainer.style.backgroundImage = `url(${scene.bg})`;

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

  if (index < scenes.length - 1) {
    setTimeout(() => {
      showScene(index + 1);
    }, scene.duration || 5000);
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

function renderCosmos() {
  const cosmosRoot = document.getElementById('cosmos');
  if (!cosmosRoot) return;
  cosmosRoot.innerHTML = '';

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