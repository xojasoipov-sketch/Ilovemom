/* =====================================================================
   ONAJON — app.js
   Flow: Envelope → Intro titles → Hero → Story → Gallery → Wishes →
         Cake → Letter → Finale.  Everything reads from window.GIFT_CONFIG.
   ===================================================================== */
(function () {
  "use strict";

  const C = window.GIFT_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ------------------------------------------------------------------
     Derived data
  ------------------------------------------------------------------ */
  const birthdayDate = new Date((C.mother && C.mother.birthday) || Date.now());
  const birthYear = (C.mother && C.mother.birthYear) || birthdayDate.getFullYear();
  const AGE = Math.max(1, birthdayDate.getFullYear() - birthYear);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ------------------------------------------------------------------
     Particle engine (petals / dust / confetti+fireworks / hearts)
  ------------------------------------------------------------------ */
  class FX {
    constructor(canvas, mode) {
      this.c = canvas; this.ctx = canvas.getContext("2d"); this.mode = mode;
      this.p = []; this.running = false; this.raf = 0; this.last = 0; this.spawnAcc = 0;
      this.resize = this.resize.bind(this); this.tick = this.tick.bind(this);
      window.addEventListener("resize", this.resize, { passive: true });
      this.resize();
    }
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = this.c.getBoundingClientRect();
      this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
      this.c.width = this.w * dpr; this.c.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    start() { if (this.running || REDUCED) return; this.running = true; this.last = performance.now(); this.raf = requestAnimationFrame(this.tick); }
    stop() { this.running = false; cancelAnimationFrame(this.raf); }
    clear() { this.p.length = 0; this.ctx.clearRect(0, 0, this.w, this.h); }

    spawn(kind, x, y, opts = {}) {
      const base = { kind, x, y, life: 1, age: 0, ...opts };
      this.p.push(base);
    }
    ambient(dt) {
      // Universal soft fog — a slow, misty base atmosphere on every canvas
      // regardless of its main mode (inspired by Noomo ValenTime's fog world).
      this.fogAcc = (this.fogAcc || 0) + dt * 0.1 * (this.w / 900);
      while (this.fogAcc > 1) {
        this.fogAcc -= 1;
        this.spawn("fog", rand(-this.w * 0.15, this.w * 1.15), rand(this.h * 0.05, this.h * 0.95), {
          vx: rand(-5, 5), vy: rand(-3, 3), r: rand(90, Math.max(150, this.w * 0.28)), ttl: rand(18, 28),
        });
      }
      const rate = { petals: 0.9, dust: 1.6, hearts: 1.4 }[this.mode] || 0;
      if (!rate) return;
      this.spawnAcc += dt * rate * (this.w / 900);
      while (this.spawnAcc > 1) {
        this.spawnAcc -= 1;
        if (this.mode === "petals") this.spawn("petal", rand(-40, this.w + 40), -20, {
          vx: rand(-20, 20), vy: rand(30, 70), r: rand(5, 11), rot: rand(0, 6.28), vr: rand(-1.5, 1.5),
          hue: rand(340, 20), life: 1, ttl: rand(9, 14), sway: rand(0.5, 1.5), ph: rand(0, 6.28),
        });
        if (this.mode === "dust") this.spawn("dust", rand(0, this.w), rand(0, this.h), {
          vx: rand(-8, 8), vy: rand(-18, -6), r: rand(0.6, 2), ttl: rand(4, 8), ph: rand(0, 6.28),
        });
        if (this.mode === "hearts") this.spawn("heart", rand(0, this.w), this.h + 20, {
          vx: rand(-15, 15), vy: rand(-70, -35), r: rand(6, 16), ttl: rand(6, 10), ph: rand(0, 6.28), sway: rand(0.8, 1.6),
        });
      }
    }
    confettiBurst(x, y, n = 140) {
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2), s = rand(120, 520);
        this.spawn("confetti", x, y, {
          vx: Math.cos(a) * s, vy: Math.sin(a) * s - 200, r: rand(3, 7), rot: rand(0, 6.28), vr: rand(-8, 8),
          color: ["#d4a660", "#f6ead8", "#c9788f", "#7a2f3d", "#ffcf4d", "#fff"][i % 6], ttl: rand(2.5, 4.5), g: 520, drag: 0.985,
        });
      }
    }
    firework(x, y) {
      const hue = rand(0, 360);
      for (let i = 0; i < 90; i++) {
        const a = (i / 90) * Math.PI * 2 + rand(-0.05, 0.05), s = rand(90, 260);
        this.spawn("spark", x, y, { vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: rand(1.2, 2.6), hue, ttl: rand(1.2, 2.2), g: 140, drag: 0.975 });
      }
    }
    tick(now) {
      if (!this.running) return;
      const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      this.ambient(dt);
      for (let i = this.p.length - 1; i >= 0; i--) {
        const q = this.p[i]; q.age += dt;
        if (q.ttl && q.age > q.ttl) { this.p.splice(i, 1); continue; }
        if (q.g) q.vy += q.g * dt;
        if (q.drag) { q.vx *= q.drag; q.vy *= q.drag; }
        if (q.sway) q.x += Math.sin(q.age * q.sway + q.ph) * 20 * dt;
        q.x += q.vx * dt; q.y += q.vy * dt; if (q.vr) q.rot += q.vr * dt;
        const margin = 80 + (q.r || 0);
        if (q.y > h + margin || q.x < -margin || q.x > w + margin) { this.p.splice(i, 1); continue; }
        const t = q.ttl ? q.age / q.ttl : 0;
        const fade = t < 0.1 ? t / 0.1 : t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1;
        ctx.save(); ctx.globalAlpha = clamp(fade, 0, 1);
        if (q.kind === "petal") {
          ctx.translate(q.x, q.y); ctx.rotate(q.rot);
          ctx.fillStyle = `hsla(${q.hue}, 55%, 78%, 0.85)`;
          ctx.beginPath(); ctx.ellipse(0, 0, q.r, q.r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
        } else if (q.kind === "dust") {
          ctx.fillStyle = "rgba(212,166,96,0.9)"; ctx.shadowColor = "rgba(212,166,96,0.9)"; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
        } else if (q.kind === "heart") {
          ctx.translate(q.x, q.y); ctx.scale(q.r / 10, q.r / 10);
          ctx.fillStyle = "rgba(201,120,143,0.85)";
          ctx.beginPath(); ctx.moveTo(0, 4);
          ctx.bezierCurveTo(-10, -6, -6, -14, 0, -8); ctx.bezierCurveTo(6, -14, 10, -6, 0, 4); ctx.fill();
        } else if (q.kind === "confetti") {
          ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.fillStyle = q.color;
          ctx.fillRect(-q.r, -q.r * 0.6, q.r * 2, q.r * 1.2);
        } else if (q.kind === "spark") {
          ctx.fillStyle = `hsla(${q.hue}, 90%, 70%, 1)`; ctx.shadowColor = `hsla(${q.hue}, 90%, 60%, 1)`; ctx.shadowBlur = 10;
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
        } else if (q.kind === "fog") {
          const grad = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r);
          grad.addColorStop(0, "rgba(246,234,216,0.055)");
          grad.addColorStop(0.6, "rgba(212,166,96,0.03)");
          grad.addColorStop(1, "rgba(212,166,96,0)");
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  /* ------------------------------------------------------------------
     Music: <audio> file, with a generative Web Audio fallback
  ------------------------------------------------------------------ */
  const Music = (() => {
    const el = $("#audio"); const ui = $("#player"); const btn = $("#player-toggle");
    const cfg = C.music || {}; let mode = "none"; let playing = false; let gen = null; let userVolume = clamp(cfg.volume ?? 0.7, 0, 1);

    $("#player-title").textContent = cfg.title || "Musiqa";
    $("#player-artist").textContent = cfg.artist || "";

    function setUI(on) { playing = on; ui.classList.toggle("is-playing", on); btn.setAttribute("aria-pressed", String(on)); }
    function fadeTo(target, ms = 1500) {
      if (mode === "file") {
        const from = el.volume, start = performance.now();
        (function step(t) { const k = clamp((t - start) / ms, 0, 1); el.volume = from + (target - from) * k; if (k < 1) requestAnimationFrame(step); })(start);
      } else if (gen) gen.fadeTo(target, ms);
    }

    /* --- Generative: soft, slow piano-like pad in D♭ major --- */
    function createGenerative() {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      const ctx = new AC();
      const master = ctx.createGain(); master.gain.value = 0;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1600;
      const delay = ctx.createDelay(2); delay.delayTime.value = 0.42;
      const fb = ctx.createGain(); fb.gain.value = 0.38;
      const wet = ctx.createGain(); wet.gain.value = 0.35;
      lp.connect(master); lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      master.connect(ctx.destination);
      // Chords (Hz): Db – Bbm – Gb – Ab   (I – vi – IV – V)
      const CH = [[138.59, 174.61, 207.65, 277.18], [116.54, 138.59, 174.61, 233.08], [92.5, 138.59, 185.0, 233.08], [103.83, 129.63, 155.56, 207.65]];
      const MEL = [277.18, 311.13, 349.23, 415.3, 466.16, 554.37, 622.25, 698.46];
      let ci = 0, timer = 0, melTimer = 0, alive = true;
      const note = (f, t0, dur, vol, type = "triangle") => {
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + Math.min(1.2, dur * 0.3));
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); o.connect(g); g.connect(lp); o.start(t0); o.stop(t0 + dur + 0.05);
      };
      const chord = () => { if (!alive) return; const t = ctx.currentTime + 0.05; CH[ci].forEach((f, i) => note(f, t + i * 0.08, 4.2, 0.09)); ci = (ci + 1) % CH.length; };
      const melody = () => { if (!alive) return; if (Math.random() < 0.8) note(MEL[Math.floor(Math.random() * MEL.length)], ctx.currentTime + 0.02, rand(1.6, 2.8), 0.05, "sine"); melTimer = setTimeout(melody, rand(700, 1700)); };
      return {
        start() { ctx.resume(); chord(); timer = setInterval(chord, 4000); melody(); },
        stop() { clearInterval(timer); clearTimeout(melTimer); ctx.suspend(); },
        fadeTo(v, ms) { const t = ctx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(v * 0.9, t + ms / 1000); },
        kill() { alive = false; clearInterval(timer); clearTimeout(melTimer); ctx.close(); },
      };
    }

    async function tryFile() {
      if (!cfg.src) return false;
      return new Promise((resolve) => {
        const done = (ok) => { el.removeEventListener("canplay", onOk); el.removeEventListener("error", onErr); resolve(ok); };
        const onOk = () => done(true), onErr = () => done(false);
        el.addEventListener("canplay", onOk); el.addEventListener("error", onErr);
        el.src = cfg.src; el.load();
        setTimeout(() => done(el.readyState >= 3), 4000);
      });
    }

    async function begin() {
      if (mode !== "none") return;
      const ok = await tryFile();
      if (ok) {
        mode = "file"; el.volume = 0;
        try { await el.play(); fadeTo(userVolume, 2500); setUI(true); } catch { setUI(false); }
      } else {
        gen = createGenerative();
        if (gen) { mode = "gen"; gen.start(); gen.fadeTo(userVolume, 3000); setUI(true); $("#player-artist").textContent = "Yumshoq fortepiano (avto)"; }
      }
      ui.hidden = false; requestAnimationFrame(() => ui.classList.add("is-shown"));
    }
    function toggle() {
      if (mode === "file") { if (playing) { el.pause(); setUI(false); } else { el.play().then(() => setUI(true)).catch(() => {}); } }
      else if (mode === "gen" && gen) { if (playing) { gen.stop(); setUI(false); } else { gen.start(); setUI(true); } }
    }
    function duck(on) { fadeTo(on ? userVolume * 0.18 : userVolume, 700); }
    btn.addEventListener("click", toggle);
    return { begin, toggle, duck };
  })();

  /* ------------------------------------------------------------------
     Render content from config
  ------------------------------------------------------------------ */
  function render() {
    const m = C.mother || {}, env = C.envelope || {};
    $("#envelope-to").textContent = env.to || "Onajonga";
    $("#envelope-hint").textContent = env.hint || "Ochish uchun bosing";
    $("#envelope-seal").textContent = env.sealLetter || "♥";

    $("#hero-name").textContent = m.name || "Onajon";
    $("#hero-years").textContent = `${birthYear} — ${birthdayDate.getFullYear()}`;
    $("#hero-sub").textContent = `${AGE} yillik mehr, sabr va nur`;
    if (m.heroPhoto) $("#hero-photo").style.backgroundImage = `url("${m.heroPhoto}")`;

    $("#chapters").innerHTML = (C.chapters || []).map((ch, i) => `
      <article class="chapter" aria-label="${esc(ch.title)}">
        <figure class="chapter__figure">
          <span class="chapter__year-ghost" aria-hidden="true">${esc(ch.year)}</span>
          <div class="chapter__frame"><img src="${esc(ch.photo)}" alt="${esc(ch.title)} — ${esc(ch.year)}" loading="lazy" decoding="async"></div>
        </figure>
        <div class="chapter__text">
          <p class="chapter__num">${String(i + 1).padStart(2, "0")}-bob</p>
          <h3 class="chapter__title">${esc(ch.title)}</h3>
          <span class="chapter__year">${esc(ch.year)}</span>
          <p class="chapter__body">${esc(ch.text)}</p>
          ${ch.audio ? `<button class="chapter__listen" type="button" data-chapter="${i}" aria-label="${esc(ch.title)} bobini tinglash">
            <span class="chapter__listen-icon" aria-hidden="true">▶</span><span class="chapter__listen-label">Tinglash</span>
          </button>` : ""}
        </div>
      </article>`).join("");

    $("#wishes-grid").innerHTML = (C.wishes || []).map((w, i) => `
      <article class="wish reveal" style="--d:${(i % 3) * 120}ms">
        <span class="wish__quote" aria-hidden="true">“</span>
        <header class="wish__head">
          <span class="wish__avatar" aria-hidden="true">${esc((w.name || "?").trim().charAt(0).toUpperCase())}</span>
          <div><div class="wish__name">${esc(w.name)}</div><div class="wish__rel">${esc(w.relation || "")}</div></div>
        </header>
        <p class="wish__text">${esc(w.text)}</p>
        <footer class="wish__foot">
          <button class="wish__heart" type="button" aria-label="Yurak yuborish"><span class="ic">♥</span><span class="n">0</span></button>
          ${w.audio ? `<button class="wish__audio" type="button" data-src="${esc(w.audio)}">Ovozli tabrik</button>` : ""}
        </footer>
      </article>`).join("");

    const cake = C.cake || {};
    $("#cake-heading").textContent = cake.heading || "Orzu tuting";
    $("#cake-sub").textContent = cake.sub || "";
    $("#blow-text").textContent = cake.button || "Puflash";
    $("#cake-reveal-title").textContent = cake.reveal || "Tug'ilgan kuningiz muborak!";
    const candleCount = clamp(Math.round(AGE / 10) + 2, 3, 9);
    $("#candles").innerHTML = Array.from({ length: candleCount }, () => `<div class="candle"><span class="flame"></span><span class="smoke"></span></div>`).join("");

    const L = C.letter || {};
    $("#letter-greeting").textContent = L.greeting || "Aziz Onajon,";
    $("#letter-body").innerHTML = (L.body || []).map(() => `<p></p>`).join("");
    $("#letter-closing").textContent = L.closing || "";
    $("#letter-sign").textContent = (C.from && C.from.signature) || "";

    const F = C.finale || {};
    $("#finale-heading").textContent = F.heading || "Sizni yaxshi ko'ramiz";
    $("#finale-sub").textContent = F.sub || "";
    $("#finale-names").innerHTML = ((C.from && C.from.names) || []).map((n) => `<li>${esc(n)}</li>`).join("");
    $("#replay").textContent = F.replay || "Yana bir bor";
    $("#footer-year").textContent = birthdayDate.getFullYear();

    $("#dots").innerHTML = $$(".section[data-nav]").map((s) => `<a href="#${s.id}" data-label="${esc(s.dataset.nav)}" aria-label="${esc(s.dataset.nav)}"></a>`).join("");
  }

  /* ------------------------------------------------------------------
     Intro + flow
  ------------------------------------------------------------------ */
  const envelopeScreen = $("#envelope-screen"), envelope = $("#envelope"), introScreen = $("#intro-screen"), introLine = $("#intro-line"), main = $("#main");
  const fxEnvelope = new FX($("#fx-envelope"), "dust");
  let introToken = 0, introAudioInstance = null;

  async function playIntro() {
    const my = ++introToken; const lines = C.intro || [];
    introScreen.hidden = false; introScreen.classList.remove("is-hidden");
    if (C.introAudio) {
      introAudioInstance = new Audio(C.introAudio);
      Music.duck(true);
      introAudioInstance.play().catch(() => {});
    }
    for (const text of lines) {
      if (my !== introToken) return;
      introLine.textContent = text; introLine.classList.add("is-on");
      await wait(REDUCED ? 900 : 3100); if (my !== introToken) return;
      introLine.classList.remove("is-on"); await wait(REDUCED ? 150 : 900);
    }
    if (my === introToken) endIntro();
  }
  function endIntro() {
    introToken++;
    if (introAudioInstance) { introAudioInstance.pause(); introAudioInstance = null; }
    introScreen.classList.add("is-hidden");
    document.body.classList.remove("is-locked");
    setTimeout(() => { introScreen.hidden = true; }, 1500);
    window.scrollTo({ top: 0, behavior: "auto" });
    fxHero.start();
    setTimeout(() => Narrator.autoStart(), 1400);
  }
  function openEnvelope() {
    if (envelope.classList.contains("is-open")) return;
    envelope.classList.add("is-open");
    Music.begin();
    setTimeout(() => {
      envelopeScreen.classList.add("is-hidden"); fxEnvelope.stop();
      main.hidden = false; playIntro();
    }, REDUCED ? 300 : 1700);
  }
  envelope.addEventListener("click", openEnvelope);
  $("#intro-skip").addEventListener("click", endIntro);
  $("#replay").addEventListener("click", () => { document.body.classList.add("is-locked"); playIntro(); });

  /* ------------------------------------------------------------------
     Scroll: reveal, progress, active dot
  ------------------------------------------------------------------ */
  const fxHero = new FX($("#fx-hero"), "petals");
  const fxStory = new FX($("#fx-story"), "dust");
  const fxCake = new FX($("#fx-cake"), "none");
  const fxFinale = new FX($("#fx-finale"), "hearts");

  function initObservers() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal, .chapter, .paper").forEach((el) => io.observe(el));
    $$(".section__head").forEach((h) => $$(".reveal", h).forEach((el, i) => el.style.setProperty("--d", `${i * 140}ms`)));
    $$(".hero .reveal, .finale .reveal").forEach((el, i) => el.style.setProperty("--d", `${i * 180}ms`));

    const dots = $$("#dots a"); const sections = $$(".section[data-nav]");
    const active = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) dots.forEach((d) => d.classList.toggle("is-active", d.getAttribute("href") === `#${e.target.id}`)); });
    }, { threshold: 0.45 });
    sections.forEach((s) => active.observe(s));

    const fxIO = new IntersectionObserver((entries) => entries.forEach((e) => {
      const fx = { hero: fxHero, story: fxStory, finale: fxFinale, cake: fxCake }[e.target.id]; if (!fx) return;
      if (e.isIntersecting) fx.start(); else fx.stop();
    }), { threshold: 0.05 });
    ["hero", "story", "finale", "cake"].forEach((id) => fxIO.observe($(`#${id}`)));

    const bar = $("#progress-bar"); let ticking = false;
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; ticking = false; }); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    document.addEventListener("visibilitychange", () => { if (document.hidden) [fxHero, fxStory, fxCake, fxFinale].forEach((f) => f.stop()); });
  }

  /* ------------------------------------------------------------------
     Carousel (3D coverflow)
  ------------------------------------------------------------------ */
  const Carousel = (() => {
    const items = C.gallery || []; const stage = $("#carousel-stage"); const caption = $("#carousel-caption"); const dotsEl = $("#carousel-dots");
    const n = items.length; let idx = 0, timer = 0, paused = false, dragX = null;
    if (!n) return { init() {} };
    stage.innerHTML = items.map((g, i) => `<figure class="card" data-i="${i}" tabindex="-1"><img src="${esc(g.src)}" alt="${esc(g.caption || `Xotira ${i + 1}`)}" loading="lazy" decoding="async" draggable="false"><figcaption class="card__tag">${esc(g.caption || "")}</figcaption></figure>`).join("");
    dotsEl.innerHTML = items.map((_, i) => `<button type="button" aria-label="${i + 1}-rasm"></button>`).join("");
    const cards = $$(".card", stage), dots = $$("button", dotsEl);

    function layout() {
      const spacing = clamp(stage.clientWidth * 0.22, 90, 230);
      cards.forEach((card, i) => {
        let off = i - idx; if (off > n / 2) off -= n; if (off < -n / 2) off += n;
        const a = Math.abs(off), vis = a <= 3;
        card.style.transform = `translateX(${off * spacing}px) translateZ(${-a * 190}px) rotateY(${-off * 24}deg) rotate(${off * 1.5}deg)`;
        card.style.opacity = vis ? String(1 - a * 0.22) : "0"; card.style.zIndex = String(n - a); card.style.filter = a ? `brightness(${1 - a * 0.14})` : "";
        card.style.pointerEvents = vis ? "" : "none"; card.setAttribute("aria-hidden", String(off !== 0));
      });
      caption.textContent = items[idx].caption || ""; dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }
    const go = (d) => { idx = (idx + d + n) % n; layout(); };
    // Auto-plays continuously, even while hovered/focused — it only ever
    // pauses while the reader is actively dragging a card (see pointerdown
    // below), and restart() re-arms the countdown after any interaction.
    const restart = () => { clearInterval(timer); if (!REDUCED) timer = setInterval(() => { if (!paused) go(1); }, 4200); };

    function init() {
      layout(); restart(); window.addEventListener("resize", layout, { passive: true });
      $("#carousel-prev").addEventListener("click", () => { go(-1); restart(); });
      $("#carousel-next").addEventListener("click", () => { go(1); restart(); });
      dots.forEach((d, i) => d.addEventListener("click", () => { idx = i; layout(); restart(); }));
      const wrap = $("#carousel");
      document.addEventListener("visibilitychange", () => { paused = document.hidden; });
      wrap.tabIndex = 0;
      wrap.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { go(1); restart(); } if (e.key === "ArrowLeft") { go(-1); restart(); } if (e.key === "Enter") openLightbox(idx); });
      stage.addEventListener("pointerdown", (e) => { dragX = e.clientX; });
      stage.addEventListener("pointerup", (e) => {
        if (dragX === null) return; const dx = e.clientX - dragX; dragX = null;
        if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); restart(); return; }
        const card = e.target.closest(".card"); if (!card) return; const i = +card.dataset.i;
        if (i === idx) openLightbox(i); else { idx = i; layout(); restart(); }
      });
      stage.addEventListener("pointercancel", () => (dragX = null));
    }
    return { init };
  })();

  /* ------------------------------------------------------------------
     Lightbox
  ------------------------------------------------------------------ */
  const lb = $("#lightbox"), lbImg = $("#lightbox-img"), lbCap = $("#lightbox-caption");
  function showLightbox(src, caption) {
    lbImg.src = src; lbImg.alt = caption || ""; lbCap.textContent = caption || ""; lb.hidden = false; document.body.classList.add("is-locked"); $("#lightbox-close").focus();
  }
  function openLightbox(i) {
    const g = (C.gallery || [])[i]; if (!g) return;
    showLightbox(g.src, g.caption);
  }
  function closeLightbox() { lb.hidden = true; document.body.classList.remove("is-locked"); $("#carousel").focus({ preventScroll: true }); }
  $("#lightbox-close").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  /* ------------------------------------------------------------------
     Wishes: hearts + optional voice notes
  ------------------------------------------------------------------ */
  function initWishes() {
    let voice = null, voiceBtn = null;
    $("#wishes-grid").addEventListener("click", (e) => {
      const heart = e.target.closest(".wish__heart");
      if (heart) {
        const n = heart.querySelector(".n"); n.textContent = String(+n.textContent + 1); heart.classList.add("is-liked");
        const r = heart.getBoundingClientRect();
        for (let i = 0; i < 7; i++) {
          const s = document.createElement("span"); s.className = "burst"; s.textContent = ["♥", "💛", "🌸", "♥"][i % 4];
          s.style.left = `${r.left + r.width / 2}px`; s.style.top = `${r.top}px`;
          s.style.setProperty("--dx", `${rand(-80, 80)}px`); s.style.setProperty("--dy", `${rand(-140, -60)}px`);
          document.body.appendChild(s); setTimeout(() => s.remove(), 1300);
        }
        setTimeout(() => heart.classList.remove("is-liked"), 300);
      }
      const ab = e.target.closest(".wish__audio");
      if (ab) {
        if (voice && voiceBtn === ab) { voice.pause(); voice = null; ab.classList.remove("is-playing"); Music.duck(false); return; }
        if (voice) { voice.pause(); voiceBtn.classList.remove("is-playing"); }
        voice = new Audio(ab.dataset.src); voiceBtn = ab; ab.classList.add("is-playing"); Music.duck(true);
        voice.play().catch(() => { ab.classList.remove("is-playing"); Music.duck(false); });
        voice.addEventListener("ended", () => { ab.classList.remove("is-playing"); Music.duck(false); voice = null; });
      }
    });
  }

  /* ------------------------------------------------------------------
     Cake: hold to blow
  ------------------------------------------------------------------ */
  function initCake() {
    const btn = $("#blow-btn"), ring = $(".blow__ring circle"), controls = $(".cake__controls"), reveal = $("#cake-reveal"), ageEl = $("#cake-age");
    const candles = $$(".candle"); const HOLD = REDUCED ? 400 : 1800; let progress = 0, holding = false, raf = 0, last = 0, done = false;
    const setRing = () => { ring.style.strokeDashoffset = String(289 * (1 - progress)); };
    function loop(t) {
      const dt = (t - last) / 1000; last = t;
      progress = clamp(progress + (holding ? dt / (HOLD / 1000) : -dt * 1.2), 0, 1); setRing();
      if (progress >= 1) return finish();
      if (holding || progress > 0) raf = requestAnimationFrame(loop);
    }
    const start = (e) => {
      if (done) return; if (e.type === "keydown" && (e.repeat || !["Enter", " "].includes(e.key))) return; e.preventDefault();
      if (e.pointerId != null && btn.setPointerCapture) { try { btn.setPointerCapture(e.pointerId); } catch {} }
      holding = true; btn.classList.add("is-holding"); cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop);
    };
    const stop = () => { holding = false; btn.classList.remove("is-holding"); };
    btn.addEventListener("pointerdown", start); btn.addEventListener("keydown", start);
    ["pointerup", "pointerleave", "pointercancel", "keyup", "blur"].forEach((ev) => btn.addEventListener(ev, stop));

    async function finish() {
      if (done) return; done = true; stop(); btn.disabled = true;
      for (const c of candles) { c.classList.add("is-out"); await wait(REDUCED ? 30 : 140); }
      await wait(500);
      controls.classList.add("is-hidden"); reveal.classList.add("is-on");
      const rect = $("#cake").getBoundingClientRect(); const cx = fxCake.w / 2, cy = clamp(fxCake.h * 0.45, 100, fxCake.h);
      fxCake.start(); fxCake.confettiBurst(cx, cy, 180);
      let shots = 0; const fw = setInterval(() => { fxCake.firework(rand(fxCake.w * 0.15, fxCake.w * 0.85), rand(fxCake.h * 0.1, fxCake.h * 0.5)); if (++shots > 9) clearInterval(fw); }, 550);
      void rect;
      const t0 = performance.now(), dur = REDUCED ? 200 : 1800;
      (function count(t) { const k = clamp((t - t0) / dur, 0, 1); ageEl.textContent = String(Math.round(AGE * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(count); })(t0);
    }
  }

  /* ------------------------------------------------------------------
     Letter: typewriter
  ------------------------------------------------------------------ */
  function initLetter() {
    const paper = $("#paper"), ps = $$("#letter-body p"), body = (C.letter && C.letter.body) || []; let started = false;
    const io = new IntersectionObserver(async (entries) => {
      if (!entries.some((e) => e.isIntersecting) || started) return; started = true; io.disconnect();
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i], text = body[i] || ""; p.classList.add("caret");
        if (REDUCED) { p.textContent = text; } else {
          for (let k = 1; k <= text.length; k++) { p.textContent = text.slice(0, k); await wait(/[.,!?…]/.test(text[k - 1]) ? 220 : 22); }
        }
        p.classList.remove("caret"); await wait(300);
      }
      paper.classList.add("is-done");
    }, { threshold: 0.35 });
    io.observe(paper);
  }

  /* ------------------------------------------------------------------
     Album — "sochilib yotgan xotiralar" devori (deyarli barcha rasmlar)
  ------------------------------------------------------------------ */
  function initAlbum() {
    const items = C.album || []; const grid = $("#album-grid");
    if (!grid || !items.length) return;
    grid.innerHTML = items.map((a, i) => `
      <button class="albumsec__item" type="button" style="--tilt:${rand(-4, 4).toFixed(2)}deg" data-i="${i}" aria-label="Oilaviy xotira ${i + 1}">
        <img src="${esc(a.thumb)}" alt="Oilaviy xotira ${i + 1}" loading="lazy" decoding="async">
      </button>`).join("");
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".albumsec__item"); if (!btn) return;
      const a = items[+btn.dataset.i]; if (a) showLightbox(a.full, "");
    });
  }

  /* ------------------------------------------------------------------
     Floating photos — small polaroids drifting through the hero/finale
     atmosphere, picked at random from the family album on every visit.
  ------------------------------------------------------------------ */
  function initFloatingPhotos() {
    const items = C.album || []; if (!items.length || REDUCED) return;
    const fill = (sel, count) => {
      const layer = $(sel); if (!layer) return;
      const pool = items.slice().sort(() => Math.random() - 0.5).slice(0, count);
      layer.innerHTML = pool.map((a) => {
        const style = [
          `--fs:${Math.round(rand(56, 96))}px`, `--fx:${rand(4, 88).toFixed(1)}%`, `--fy:${rand(6, 82).toFixed(1)}%`,
          `--fd:${rand(24, 42).toFixed(1)}s`, `--delay:${rand(-30, 2).toFixed(1)}s`, `--dx:${rand(-40, 60).toFixed(0)}px`,
          `--r0:${rand(-10, 10).toFixed(1)}deg`, `--r1:${rand(-6, 6).toFixed(1)}deg`, `--r2:${rand(-8, 8).toFixed(1)}deg`,
          `--fo:${rand(0.26, 0.48).toFixed(2)}`,
        ].join(";");
        return `<div class="float-photo" style="${style}"><img src="${esc(a.thumb)}" alt="" loading="lazy"></div>`;
      }).join("");
    };
    fill("#float-hero", 6); fill("#float-finale", 6);
  }

  /* ------------------------------------------------------------------
     Narrator — orchestrates the whole guided "movie": intro → each
     chapter (auto-scrolling to it) → the letter, one after another,
     ducking the background music throughout. It starts on its own once
     the intro ends, and a persistent on-screen button lets the reader
     stop it at any point. Clicking a single "Tinglash" button takes
     over from that spot without restarting the whole tour.
  ------------------------------------------------------------------ */
  const Narrator = (() => {
    const chapters = C.chapters || [];
    const toggleBtn = $("#narrate-toggle"), tourStop = $("#tour-stop");
    const icon = toggleBtn ? $(".narrate-btn__icon", toggleBtn) : null;
    const label = toggleBtn ? $(".narrate-btn__label", toggleBtn) : null;
    let audio = null, chaining = false, currentChapter = -1;

    function setChapterUI(i, playing) {
      $$(".chapter__listen").forEach((b) => {
        const isThis = +b.dataset.chapter === i && playing;
        b.classList.toggle("is-playing", isThis);
        $(".chapter__listen-icon", b).textContent = isThis ? "❚❚" : "▶";
      });
    }
    function setToggleUI(playing) {
      if (!toggleBtn) return;
      toggleBtn.classList.toggle("is-playing", playing);
      icon.textContent = playing ? "❚❚" : "▶";
      label.textContent = playing ? "To'xtatish" : "Hikoyani tinglang";
    }
    function setTourStop(on) { if (tourStop) tourStop.hidden = !on; }

    function stop() {
      chaining = false; currentChapter = -1;
      if (audio) { audio.pause(); audio.onended = null; audio = null; }
      Music.duck(false);
      setChapterUI(-1, false); setToggleUI(false); setTourStop(false);
    }
    function playSrc(src, scrollEl, onEnd) {
      if (audio) { audio.pause(); audio.onended = null; }
      setTourStop(true);
      if (scrollEl) scrollEl.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
      Music.duck(true);
      audio = new Audio(src);
      audio.onended = onEnd;
      audio.play().catch(() => stop());
    }
    function playLetter() {
      const src = C.letter && C.letter.audio;
      currentChapter = -1; setChapterUI(-1, false); setToggleUI(false);
      if (!src) { stop(); return; }
      playSrc(src, $("#paper"), stop);
    }
    function playChapter(i, chain) {
      const ch = chapters[i];
      if (!ch || !ch.audio) { chain ? playLetter() : stop(); return; }
      chaining = chain; currentChapter = i;
      setChapterUI(i, true); setToggleUI(chain);
      playSrc(ch.audio, $$(".chapter")[i], () => {
        if (chain && i < chapters.length - 1) playChapter(i + 1, true);
        else if (chain) playLetter();
        else stop();
      });
    }

    toggleBtn && toggleBtn.addEventListener("click", () => { chaining ? stop() : playChapter(0, true); });
    tourStop && tourStop.addEventListener("click", stop);
    $("#chapters") && $("#chapters").addEventListener("click", (e) => {
      const btn = e.target.closest(".chapter__listen"); if (!btn) return;
      const i = +btn.dataset.chapter;
      if (audio && currentChapter === i) { stop(); return; }
      playChapter(i, false);
    });
    if (toggleBtn && !chapters.some((c) => c.audio)) toggleBtn.hidden = true;

    return { autoStart: () => playChapter(0, true), stop };
  })();

  /* ------------------------------------------------------------------
     Scroll-linked caption reveal (chapter titles/body unveil word-by-word
     as the reader scrolls past them — inspired by Noomo ValenTime's
     caption pacing, done here with plain CSS transforms, no WebGL).
  ------------------------------------------------------------------ */
  function initScrollText() {
    if (REDUCED) return;
    const targets = $$(".chapter__title, .chapter__body");
    if (!targets.length) return;
    targets.forEach((el) => {
      const words = el.textContent.split(/(\s+)/);
      el.innerHTML = words.map((w) => (w.trim() ? `<span class="sw">${esc(w)}</span>` : w)).join("");
      el._sw = $$(".sw", el);
    });
    let active = new Set(); let ticking = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) active.add(e.target); else active.delete(e.target); });
    }, { rootMargin: "10% 0px 10% 0px" });
    targets.forEach((el) => io.observe(el));

    function update() {
      ticking = false;
      const vh = window.innerHeight;
      active.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Use the block's own center (not just its top) so a short paragraph
        // that has already scrolled mostly into view reads as "revealed" —
        // landing here via a nav-dot jump must never show half-faded text.
        const center = rect.top + rect.height / 2;
        const start = vh * 0.88, end = vh * 0.5;
        const p = clamp((start - center) / (start - end), 0, 1);
        const words = el._sw; const n = Math.max(1, words.length);
        for (let i = 0; i < n; i++) {
          const stagger = 1.15;
          const wp = clamp(p * stagger - (i / n) * (stagger - 1), 0, 1);
          const w = words[i];
          w.style.opacity = String((0.12 + wp * 0.88).toFixed(3));
          w.style.filter = wp < 1 ? `blur(${((1 - wp) * 3).toFixed(2)}px)` : "";
          w.style.transform = wp < 1 ? `translateY(${((1 - wp) * 8).toFixed(2)}px)` : "";
        }
      });
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     Finale constellation — one soft star per family voice (from.names).
     Tap/click to light it; lighting all of them is the site's small
     closing "act of creation" (a 2D echo of Noomo's heart customizer).
  ------------------------------------------------------------------ */
  function initConstellation() {
    const names = (C.from && C.from.names) || [];
    const wrap = $("#constellation"), canvas = $("#constellation-canvas"), hint = $("#constellation-hint");
    if (!names.length || !wrap || !canvas) { if (hint) hint.hidden = true; return; }
    const ctx = canvas.getContext("2d");
    let stars = [], lit = new Array(names.length).fill(false), dpr = 1, chimeCtx = null;

    hint.textContent = "Har birini bosib, oila nurini yoqing";

    function heartPoint(t) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x, y };
    }
    function layout() {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, r.width * dpr); canvas.height = Math.max(1, r.height * dpr);
      canvas.style.width = `${r.width}px`; canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(r.width, r.height) / 38;
      const cx = r.width / 2, cy = r.height / 2 + r.height * 0.05;
      stars = names.map((n, i) => {
        const t = -Math.PI / 2 + (i / names.length) * Math.PI * 2;
        const p = heartPoint(t);
        return { x: cx + p.x * scale, y: cy + p.y * scale, name: n };
      });
      draw();
    }
    function draw() {
      const r = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      stars.forEach((s, i) => {
        const on = lit[i];
        const glowR = on ? 20 : 9;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        if (on) { grad.addColorStop(0, "rgba(255,224,153,0.95)"); grad.addColorStop(0.45, "rgba(212,166,96,0.7)"); grad.addColorStop(1, "rgba(212,166,96,0)"); }
        else { grad.addColorStop(0, "rgba(246,234,216,0.5)"); grad.addColorStop(1, "rgba(246,234,216,0)"); }
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = on ? "#fff3d6" : "rgba(246,234,216,0.65)";
        ctx.beginPath(); ctx.arc(s.x, s.y, on ? 4 : 2.6, 0, Math.PI * 2); ctx.fill();
      });
    }
    function chime(freq) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        chimeCtx = chimeCtx || new AC();
        const o = chimeCtx.createOscillator(), g = chimeCtx.createGain();
        o.type = "sine"; o.frequency.value = freq;
        const t = chimeCtx.currentTime;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.1, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
        o.connect(g); g.connect(chimeCtx.destination); o.start(t); o.stop(t + 1.2);
      } catch {}
    }
    function lightStar(i) {
      if (lit[i]) return; lit[i] = true; draw(); chime(392 + i * 55);
      const li = $$("#finale-names li")[i]; if (li) li.classList.add("is-lit");
      Music.duck(true); setTimeout(() => Music.duck(false), 350);
      if (lit.every(Boolean)) {
        hint.textContent = "Oilangizning nuri to'ldi ♥"; hint.classList.add("is-done");
        const r = wrap.getBoundingClientRect(); fxFinale.confettiBurst(r.width / 2, r.height * 0.35, 90);
      }
    }
    canvas.addEventListener("click", (e) => {
      const r = canvas.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
      let best = -1, bd = 32;
      stars.forEach((s, i) => { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; best = i; } });
      if (best >= 0) lightStar(best);
    });
    window.addEventListener("resize", layout, { passive: true });
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { layout(); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(wrap);
  }

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  function boot() {
    document.body.classList.add("is-locked");
    render(); initObservers(); Carousel.init(); initWishes(); initCake(); initLetter();
    initScrollText(); initConstellation(); initAlbum(); initFloatingPhotos();
    fxEnvelope.start();
    $$("img").forEach((img) => img.addEventListener("error", () => { img.style.background = "linear-gradient(160deg,#7a2f3d,#d98b6c)"; img.alt = "Rasm topilmadi"; }, { once: true }));
    // Dev shortcut: ?skip=1 jumps straight into the site (for testing)
    if (new URLSearchParams(location.search).get("skip") === "1") { envelope.classList.add("is-open"); envelopeScreen.classList.add("is-hidden"); main.hidden = false; endIntro(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
