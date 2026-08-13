const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

const progressBar = $("#progressBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const progress = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

$$(".reveal").forEach(el => observer.observe(el));

$$("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = $(btn.dataset.scroll);
    target?.scrollIntoView({behavior:"smooth"});
  });
});

$$(".quality-card").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("open"));
});

const thinkBtn = $("#thinkBtn");
const thinkPanel = $("#thinkPanel");
thinkBtn.addEventListener("click", () => {
  thinkPanel.hidden = false;
  thinkBtn.hidden = true;
});

const yesBtn = $("#yesBtn");
const yesScene = $("#si");
yesBtn.addEventListener("click", () => {
  yesScene.hidden = false;
  makeCelebration();
  setTimeout(() => yesScene.scrollIntoView({behavior:"smooth"}), 100);
});

function makeCelebration(){
  const container = $("#celebration");
  container.innerHTML = "";
  const symbols = ["•","✦","❧","•","✧"];
  for(let i=0;i<22;i++){
    const item=document.createElement("span");
    item.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    item.style.left=`${Math.random()*100}%`;
    item.style.animationDuration=`${4+Math.random()*4}s`;
    item.style.animationDelay=`${Math.random()*1.2}s`;
    item.style.fontSize=`${12+Math.random()*16}px`;
    item.style.color=[ "#556B2F","#B76E4B","#C6A15B" ][Math.floor(Math.random()*3)];
    container.appendChild(item);
  }
}

const letterOverlay = $("#letterOverlay");
$("#letterBtn").addEventListener("click", () => {
  letterOverlay.hidden = false;
  document.body.style.overflow = "hidden";
});
$("#closeLetter").addEventListener("click", closeLetter);
letterOverlay.addEventListener("click", e => {
  if(e.target === letterOverlay) closeLetter();
});
function closeLetter(){
  letterOverlay.hidden = true;
  document.body.style.overflow = "";
}

$("#psBtn").addEventListener("click", () => {
  const ps = $("#psText");
  ps.hidden = !ps.hidden;
});



// Música de fondo.
// Coloca tu archivo en: assets/audio/es_verdad.mp3
const music = $("#backgroundMusic");
const musicFab = $("#musicFab");
const startBtn = $("#startBtn");

const MUSIC_VOLUME_NORMAL = 0.34;
const MUSIC_VOLUME_LOW = 0.16;
let musicStarted = false;
let targetVolume = MUSIC_VOLUME_NORMAL;
let volumeAnimationFrame = null;

music.volume = 0;

function fadeMusicTo(volume, duration = 1200) {
  if (!musicStarted || music.paused) return;
  if (volumeAnimationFrame) cancelAnimationFrame(volumeAnimationFrame);

  const initial = music.volume;
  const delta = volume - initial;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    music.volume = Math.max(0, Math.min(1, initial + delta * eased));
    if (progress < 1) volumeAnimationFrame = requestAnimationFrame(step);
    else volumeAnimationFrame = null;
  };

  volumeAnimationFrame = requestAnimationFrame(step);
}

async function startBackgroundMusic() {
  if (musicStarted) return;
  try {
    music.volume = 0;
    await music.play();
    musicStarted = true;
    musicFab.classList.add("ready");
    musicFab.classList.remove("paused");
    musicFab.setAttribute("aria-pressed", "true");
    fadeMusicTo(targetVolume, 2600);
  } catch (error) {
    console.info("La música no pudo iniciarse todavía:", error);
  }
}

startBtn?.addEventListener("click", startBackgroundMusic);

musicFab?.addEventListener("click", async () => {
  if (!musicStarted) {
    await startBackgroundMusic();
    return;
  }

  if (music.paused) {
    try {
      await music.play();
      musicFab.classList.remove("paused");
      musicFab.setAttribute("aria-pressed", "true");
      music.volume = 0;
      fadeMusicTo(targetVolume, 900);
    } catch (error) {
      console.info("No se pudo reanudar la música:", error);
    }
  } else {
    const initial = music.volume;
    const start = performance.now();
    const duration = 500;

    const fadeOut = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      music.volume = initial * (1 - progress);
      if (progress < 1) requestAnimationFrame(fadeOut);
      else {
        music.pause();
        musicFab.classList.add("paused");
        musicFab.setAttribute("aria-pressed", "false");
      }
    };

    requestAnimationFrame(fadeOut);
  }
});

const musicVolumeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    if (entry.target.dataset.musicVolume === "low") {
      targetVolume = MUSIC_VOLUME_LOW;
      fadeMusicTo(targetVolume, 1600);
    }

    if (entry.target.dataset.musicVolume === "normal") {
      targetVolume = MUSIC_VOLUME_NORMAL;
      fadeMusicTo(targetVolume, 1600);
    }
  });
}, { threshold: 0.45 });

$$("[data-music-volume]").forEach(section => musicVolumeObserver.observe(section));

// Accesibilidad básica: cerrar carta con Escape.
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && !letterOverlay.hidden) closeLetter();
});

// Sección 7: toca la foto superior para apartarla y mostrar la siguiente.
const julioStack = $("#julioPhotoStack");
const julioTapHint = $("#julioTapHint");

if (julioStack) {
  const julioPhotos = $$(".tap-photo", julioStack);
  let julioCurrent = 0;

  function updateJulioStack() {
    julioPhotos.forEach((photo, index) => {
      photo.classList.toggle("is-top", index === julioCurrent);
    });
    if (julioCurrent >= julioPhotos.length - 1) {
      julioStack.classList.add("finished");
      if (julioTapHint) julioTapHint.textContent = "última foto ♡";
    }
  }

  function showNextJulioPhoto() {
    if (julioCurrent >= julioPhotos.length - 1) return;
    julioPhotos[julioCurrent].classList.add("is-gone");
    julioCurrent += 1;
    updateJulioStack();
  }

  julioPhotos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
      if (index === julioCurrent) showNextJulioPhoto();
    });
  });

  julioTapHint?.addEventListener("click", showNextJulioPhoto);
  updateJulioStack();
}
