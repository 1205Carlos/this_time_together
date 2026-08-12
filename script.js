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

// Sustituye esta URL por la dirección específica de Spotify/YouTube/Apple Music
// que quieras usar para "La Diferencia" de Enjambre.
const SONG_URL = "https://www.youtube.com/results?search_query=Enjambre+La+Diferencia";
$("#listenBtn").addEventListener("click", () => {
  window.open(SONG_URL, "_blank", "noopener,noreferrer");
});

// Accesibilidad básica: cerrar carta con Escape.
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && !letterOverlay.hidden) closeLetter();
});
