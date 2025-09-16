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
    }, 5000);
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