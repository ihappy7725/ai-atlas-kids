/* =========================================================
   AI ATLAS 키즈 · 화면 동작
   ========================================================= */

/* 어른용 AI ATLAS 주소 (Netlify 주소를 넣으면 부모님 가이드 아래에 링크가 보여요) */
const ADULT_URL = "";

const state = { play: "all", free: false, nologin: false, ko: false, fav: false };
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const getPlay = id => PLAYS.find(p => p.id === id);

/* ---------- 저장 (안 되면 메모리로) ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let favs = store.get("kids-favs", []);
let gateOn = store.get("kids-gate", true);

/* ---------- 작은 알림 ---------- */
function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("is-on"), 1800);
}

/* ---------- 로고 (여러 아이콘 서버를 차례로, 실패하면 놀이 그림) ---------- */
function logoNext(img, failed) {
  const list = img.dataset.c.split(" ");
  if (!failed && img.naturalWidth > 16) { img.classList.add("is-ok"); return; }
  const i = +(img.dataset.i || 0) + 1;
  if (i < list.length) { img.dataset.i = i; img.src = list[i]; return; }
  img.remove();
}
function logoHTML(t) {
  const c = [`https://www.google.com/s2/favicons?domain=${t.host}&sz=128`, `https://icons.duckduckgo.com/ip3/${t.host}.ico`];
  return `<span class="logo" aria-hidden="true"><img class="logo__play" src="${getPlay(t.play).icon}" alt="">
    <img class="logo__img" src="${c[0]}" data-c="${c.join(" ")}" alt="" loading="lazy" referrerpolicy="no-referrer" onload="logoNext(this)" onerror="logoNext(this,1)"></span>`;
}

/* ---------- 놀이 타일 ---------- */
function renderTiles() {
  const count = id => TOOLS.filter(t => id === "all" || t.play === id).length;
  $("tiles").innerHTML =
    `<button type="button" class="tile tile--all" data-play="all" aria-pressed="${state.play === "all"}" style="--c:#7a6cff">
      <span class="tile__img"><img src="img/ati.png" alt=""></span>
      <strong>전부 다!</strong><small>AI 친구 ${count("all")}명</small>
    </button>` +
    PLAYS.map(p => `
    <button type="button" class="tile" data-play="${p.id}" aria-pressed="${state.play === p.id}" style="--c:${p.color}">
      <span class="tile__img"><img src="${p.icon}" alt=""></span>
      <strong>${p.name}</strong><small>${p.say}</small>
    </button>`).join("");
}

/* ---------- 더 골라 보기 토글 ---------- */
const TOGGLES = [
  { id: "free",    label: "무료만",       emoji: "🆓" },
  { id: "nologin", label: "로그인 없이",  emoji: "🔓" },
  { id: "ko",      label: "한국어",       emoji: "💬" },
  { id: "fav",     label: "내 스티커북",  emoji: "⭐" }
];
function renderToggles() {
  $("toggles").innerHTML = TOGGLES.map(g => `
    <button type="button" class="toggle" data-toggle="${g.id}" aria-pressed="${state[g.id]}">
      <span aria-hidden="true">${g.emoji}</span>${g.label}
    </button>`).join("");
}

/* ---------- 카드 ---------- */
const TAGS = {
  nologin: ["🔓", "로그인 없이"],
  ko:      ["💬", "한국어"],
  en:      ["🔤", "영어로 배워요"],
  parent:  ["👨‍👩‍👧", "부모님과 함께"],
  noads:   ["🚫", "광고 없음"],
  cam:     ["📷", "카메라 사용"],
  mic:     ["🎤", "마이크 사용"]
};
const PRICE = { free: ["무료", "free"], mix: ["무료 + 유료", "mix"], paid: ["유료", "paid"] };
const key = t => t.name;

function cardHTML(t, i) {
  const p = getPlay(t.play);
  const faved = favs.includes(key(t));
  const [priceText, priceCls] = PRICE[t.price];
  return `
  <article class="card" style="--c:${p.color};--i:${i}" data-key="${esc(key(t))}">
    <button type="button" class="star-btn" data-fav="${esc(key(t))}" aria-pressed="${faved}" aria-label="${faved ? "스티커북에서 빼기" : "스티커북에 붙이기"}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2-4.6-4.4 6.3-.9z"/></svg>
    </button>
    <div class="card__top">
      ${logoHTML(t)}
      <div class="card__names">
        <h3>${esc(t.name)}${t.star ? `<span class="best">아티 추천</span>` : ""}</h3>
        <small>${esc(t.sub)}</small>
      </div>
    </div>
    <p class="card__kid">${esc(t.kid)}</p>
    <div class="card__chips">
      <span class="age">${t.age}살부터</span>
      <span class="price price--${priceCls}">${priceText}</span>
      <span class="play-chip">${p.name}</span>
    </div>
    <ul class="card__tags">${t.tags.map(g => `<li><span aria-hidden="true">${TAGS[g][0]}</span>${TAGS[g][1]}</li>`).join("")}</ul>
    <details class="card__parent">
      <summary>부모님 메모</summary>
      <p>${esc(t.parent)}</p>
    </details>
    <button type="button" class="btn btn--go" data-go="${esc(key(t))}">놀러 가기 <span aria-hidden="true">🚀</span></button>
  </article>`;
}

function filtered() {
  return TOOLS.filter(t =>
    (state.play === "all" || t.play === state.play) &&
    (!state.free || t.price === "free") &&
    (!state.nologin || t.tags.includes("nologin")) &&
    (!state.ko || t.tags.includes("ko")) &&
    (!state.fav || favs.includes(key(t)))
  ).sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
}

function renderCards() {
  const list = filtered();
  const p = getPlay(state.play);
  $("listTitle").innerHTML = state.fav ? "⭐ 내 스티커북" : (p ? `${esc(p.name)} 친구들` : "모든 AI 친구들");
  $("listTitle").insertAdjacentHTML("beforeend", ` <small>${list.length}명</small>`);
  if (!list.length) {
    $("cards").innerHTML = `
      <div class="empty">
        <img src="img/ati.png" alt="">
        <h3>${state.fav ? "아직 스티커가 없어요" : "앗, 딱 맞는 친구가 없어요"}</h3>
        <p>${state.fav ? "마음에 드는 카드의 ⭐를 눌러 스티커북에 붙여 봐!" : "골라 둔 버튼을 몇 개 꺼 볼까?"}</p>
        <button type="button" class="btn btn--soft" data-reset>처음부터 다시 보기</button>
      </div>`;
    return;
  }
  $("cards").innerHTML = list.map(cardHTML).join("");
}

function render() { renderTiles(); renderToggles(); renderCards(); updateFavCount(); }

function updateFavCount() {
  const el = document.querySelector(".fav-count");
  el.textContent = favs.length;
  el.hidden = !favs.length;
}

/* ---------- 어른 확인 ---------- */
let gateTool = null;
function openGate(t) {
  if (!gateOn) { window.open(t.url, "_blank", "noopener"); return; }
  gateTool = t;
  const a = 11 + Math.floor(Math.random() * 9), b = 3 + Math.floor(Math.random() * 6), ans = a * b;
  const wrong = new Set();
  while (wrong.size < 2) { const w = ans + (Math.floor(Math.random() * 5) + 1) * (Math.random() < .5 ? -1 : 1) * b; if (w > 0 && w !== ans) wrong.add(w); }
  const options = [ans, ...wrong].sort(() => Math.random() - .5);
  $("gateGo").innerHTML = `<b>${esc(t.name)}</b> 사이트로 이동해요.`;
  $("gateQ").textContent = `${a} × ${b} = ?`;
  $("gateAnswers").innerHTML = options.map(n => `<button type="button" data-ans="${n}" data-ok="${n === ans}">${n}</button>`).join("");
  $("gate").hidden = false;
  document.body.classList.add("no-scroll");
  $("gateAnswers").querySelector("button").focus();
}
function closeGate() {
  $("gate").hidden = true;
  document.body.classList.remove("no-scroll");
  gateTool = null;
}

/* ---------- 아티 말풍선 ---------- */
const ATI_LINES = [
  "안녕! 나는 아티야.<br>오늘은 뭐 하고 놀까?",
  "그림 놀이에서는<br>AI가 내 그림을 맞혀!",
  "AI에게 내 이름이랑<br>주소는 비밀이야 🤫",
  "마음에 들면 ⭐를 눌러<br>스티커북에 붙여 봐!",
  "AI도 가끔 틀려.<br>이상하면 어른께 물어봐!",
  "블롭 오페라 해 봤어?<br>젤리들이 노래해! 🎵"
];
let atiIdx = 0;
function atiTalk() {
  atiIdx = (atiIdx + 1) % ATI_LINES.length;
  const b = $("atiBubble");
  b.classList.remove("pop"); void b.offsetWidth;
  b.innerHTML = ATI_LINES[atiIdx];
  b.classList.add("pop");
  $("ati").classList.remove("hop"); void $("ati").offsetWidth;
  $("ati").classList.add("hop");
}

/* ---------- 약속 · 부모님 가이드 ---------- */
function renderStatic() {
  $("promises").innerHTML = PROMISES.map((p, i) => `
    <li class="promise-card" style="--i:${i}">
      <span class="promise-card__num">${i + 1}</span>
      <span class="promise-card__emoji" aria-hidden="true">${p.emoji}</span>
      <strong>${p.title}</strong>
      <p>${p.body}</p>
    </li>`).join("");
  $("limits").innerHTML = AGE_LIMITS.map(r => `<tr><th scope="row">${r.name}</th><td><b>${r.age}</b></td><td>${r.note}</td></tr>`).join("");
  $("updated").textContent = UPDATED;
  document.querySelectorAll(".updated").forEach(el => el.textContent = UPDATED);
  $("gateToggle").checked = gateOn;
  const more = document.querySelector(".parents__more");
  if (ADULT_URL) $("adultLink").href = ADULT_URL; else more.hidden = true;
}

/* ---------- 색종이 (약속 버튼) ---------- */
function confetti(x, y) {
  const colors = ["#ff7a8a", "#ffb020", "#22c08a", "#3aa0ff", "#a17cff", "#ff8a3d"];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement("span");
    s.className = "confetti";
    const ang = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 140;
    s.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 60}px;--r:${Math.random() * 720 - 360}deg`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

/* ---------- 이벤트 ---------- */
document.addEventListener("click", e => {
  const tile = e.target.closest("[data-play]");
  if (tile) {
    state.play = tile.dataset.play; state.fav = false;
    render();
    document.getElementById("listTitle").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const tg = e.target.closest("[data-toggle]");
  if (tg) { state[tg.dataset.toggle] = !state[tg.dataset.toggle]; render(); return; }
  if (e.target.closest("[data-reset]")) { Object.assign(state, { play: "all", free: false, nologin: false, ko: false, fav: false }); render(); return; }
  if (e.target.closest("[data-show-fav]")) { e.preventDefault(); state.fav = true; state.play = "all"; render(); $("listTitle").scrollIntoView({ behavior: "smooth", block: "start" }); return; }

  const fav = e.target.closest("[data-fav]");
  if (fav) {
    const k = fav.dataset.fav;
    const on = !favs.includes(k);
    favs = on ? favs.concat(k) : favs.filter(x => x !== k);
    store.set("kids-favs", favs);
    fav.setAttribute("aria-pressed", String(on));
    fav.setAttribute("aria-label", on ? "스티커북에서 빼기" : "스티커북에 붙이기");
    if (on) { const r = fav.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2); }
    toast(on ? "⭐ 스티커북에 붙였어요!" : "스티커를 뗐어요");
    updateFavCount();
    if (state.fav) renderCards();
    return;
  }
  const go = e.target.closest("[data-go]");
  if (go) { openGate(TOOLS.find(t => key(t) === go.dataset.go)); return; }

  const ans = e.target.closest("[data-ans]");
  if (ans) {
    if (ans.dataset.ok === "true") {
      const t = gateTool; closeGate();
      window.open(t.url, "_blank", "noopener");
    } else {
      ans.classList.add("is-wrong");
      toast("다시 한 번! 어른에게 물어봐요");
    }
    return;
  }
  if (e.target.id === "gate") closeGate();
});
$("gateClose").addEventListener("click", closeGate);
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("gate").hidden) closeGate(); });
$("ati").addEventListener("click", atiTalk);
$("gateToggle").addEventListener("change", e => {
  gateOn = e.target.checked; store.set("kids-gate", gateOn);
  toast(gateOn ? "어른 확인 문제를 켰어요" : "어른 확인 문제를 껐어요");
});
$("promiseBtn").addEventListener("click", e => {
  const r = e.currentTarget.getBoundingClientRect();
  confetti(r.left + r.width / 2, r.top);
  toast("🤙 약속 완료! 이제 신나게 놀아 볼까?");
  document.querySelectorAll(".promise-card").forEach(c => c.classList.add("is-done"));
});

/* 스크롤 등장 */
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: .15 });
  document.querySelectorAll(".head, .promise-card, .guide__card").forEach(el => { el.classList.add("rv"); io.observe(el); });
}

renderStatic();
render();
reveal();
