(function () {
  "use strict";
  window.LDW_GAMES = window.LDW_GAMES || [];

  function ensureStyle() {
    if (document.getElementById("ldw-game-reaction-style")) return;
    var s = document.createElement("style");
    s.id = "ldw-game-reaction-style";
    s.textContent = [
      ".greact{display:flex;flex-direction:column;gap:14px;font:inherit;color:var(--on-surface);}",
      ".greact-hud{display:flex;flex-wrap:wrap;gap:10px;align-items:stretch;}",
      ".greact-stat{flex:1 1 120px;display:flex;flex-direction:column;gap:2px;padding:10px 14px;",
        "background:var(--surface-container-high);border:1px solid var(--outline-variant);",
        "border-radius:var(--radius-sm);min-width:0;}",
      ".greact-stat-label{font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;",
        "color:var(--on-surface-variant);}",
      ".greact-stat-value{font-size:1.5rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums;}",
      ".greact-stat-value.is-warn{color:var(--error);}",
      ".greact-arena{position:relative;height:320px;overflow:hidden;border-radius:var(--radius-lg);",
        "background:var(--surface-container);border:1px solid var(--outline-variant);",
        "touch-action:manipulation;-webkit-user-select:none;user-select:none;}",
      ".greact-arena.is-idle{display:flex;align-items:center;justify-content:center;}",
      ".greact-hint{max-width:78%;text-align:center;color:var(--on-surface-variant);",
        "font-size:.95rem;line-height:1.45;pointer-events:none;}",
      ".greact-target{position:absolute;width:54px;height:54px;margin:-27px 0 0 -27px;padding:0;",
        "display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;",
        "border-radius:999px;font-size:26px;line-height:1;",
        "transform:scale(0);opacity:0;transition:transform .14s ease,opacity .14s ease;",
        "box-shadow:0 2px 8px rgba(0,0,0,.22);}",
      ".greact-target.is-in{transform:scale(1);opacity:1;}",
      ".greact-target.is-out{transform:scale(.2);opacity:0;}",
      ".greact-target.is-good{background:var(--primary-container);color:var(--on-primary-container);}",
      ".greact-target.is-good.is-hit{background:var(--success);color:var(--on-primary);transform:scale(1.45);opacity:0;}",
      ".greact-target.is-bad{background:var(--surface-container-high);color:var(--on-surface);",
        "border:2px solid var(--error);}",
      ".greact-target.is-bad.is-hit{background:var(--error);color:var(--on-primary);",
        "transform:scale(.4) rotate(12deg);opacity:0;}",
      ".greact-target:hover{transform:scale(1.08);}",
      ".greact-target:focus-visible{outline:3px solid var(--tertiary);outline-offset:2px;}",
      ".greact-arena.is-shake{animation:greact-shake .26s ease;}",
      "@keyframes greact-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}",
        "75%{transform:translateX(5px);}}",
      ".greact-overlay{position:absolute;inset:0;display:flex;flex-direction:column;gap:12px;",
        "align-items:center;justify-content:center;text-align:center;padding:20px;",
        "background:var(--surface-container);}",
      ".greact-overlay-title{font-size:1.05rem;color:var(--on-surface-variant);}",
      ".greact-overlay-score{font-size:2.6rem;font-weight:800;color:var(--primary);line-height:1;",
        "font-variant-numeric:tabular-nums;}",
      ".greact-overlay-note{font-size:.9rem;color:var(--on-surface-variant);}",
      ".greact-controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}",
      ".greact-btn{display:inline-flex;align-items:center;gap:8px;cursor:pointer;",
        "padding:10px 22px;border:none;border-radius:999px;font:inherit;font-weight:600;",
        "background:var(--primary);color:var(--on-primary);",
        "transition:transform .12s ease,box-shadow .12s ease,filter .12s ease;}",
      ".greact-btn:hover{filter:brightness(1.06);box-shadow:0 3px 10px rgba(0,0,0,.22);}",
      ".greact-btn:active{transform:translateY(1px);}",
      ".greact-btn:focus-visible{outline:3px solid var(--tertiary);outline-offset:2px;}",
      ".greact-btn:disabled{cursor:default;filter:none;box-shadow:none;opacity:.5;}",
      ".greact-legend{display:flex;flex-wrap:wrap;gap:14px;font-size:.85rem;",
        "color:var(--on-surface-variant);}",
      ".greact-legend span{display:inline-flex;align-items:center;gap:6px;}",
      ".greact-chip{display:inline-flex;align-items:center;justify-content:center;",
        "width:22px;height:22px;border-radius:999px;font-size:13px;}",
      ".greact-chip.good{background:var(--primary-container);color:var(--on-primary-container);}",
      ".greact-chip.bad{background:var(--surface-container-high);color:var(--on-surface);",
        "border:1px solid var(--error);}",
      "@media (max-width:480px){.greact-arena{height:300px;}.greact-target{width:60px;height:60px;",
        "margin:-30px 0 0 -30px;font-size:28px;}}",
      "@media (prefers-reduced-motion:reduce){.greact-target,.greact-target.is-hit{transition:opacity .1s ease;",
        "transform:none;}.greact-arena.is-shake{animation:none;}}"
    ].join("");
    document.head.appendChild(s);
  }

  window.LDW_GAMES.push({
    id: "reaction",
    icon: "bolt",
    title: { en: "Catch the Molecule", zh: "抓住分子" },
    blurb: {
      en: "Tap the targets, dodge the contaminants — beat the clock.",
      zh: "點中目標、避開污染物,跟時間賽跑。"
    },
    mount: function (root, ctx) {
      ensureStyle();
      var t = ctx.t, esc = ctx.escapeHtml, lang = ctx.lang;

      var ROUND_SECONDS = 30;
      var SPAWN_MS = 700;
      var LIFE_MIN = 900;
      var LIFE_MAX = 1300;
      var BAD_CHANCE = 0.25;
      var GOOD_GLYPHS = ["🧬", "⚛️"]; // DNA, atom
      var BAD_GLYPH = "☣️"; // biohazard

      var L = {
        start: { en: "Start", zh: "開始" },
        again: { en: "Play again", zh: "再玩一次" },
        time: { en: "Time", zh: "時間" },
        score: { en: "Score", zh: "分數" },
        sec: { en: "s", zh: "秒" },
        idleHint: {
          en: "Press Start. Tap molecules (+1), avoid biohazards (−1). 30 seconds.",
          zh: "按開始。點中分子 +1,避開生物危害 −1。共 30 秒。"
        },
        done: { en: "Time!", zh: "時間到!" },
        doneNote: {
          en: "Great reflexes — try again to beat your score.",
          zh: "反應真快 — 再挑戰一次刷新分數。"
        },
        good: { en: "Molecule +1", zh: "分子 +1" },
        bad: { en: "Biohazard −1", zh: "生物危害 −1" },
        catchGood: { en: "Catch the molecule", zh: "抓住分子" },
        avoidBad: { en: "Avoid the biohazard", zh: "避開生物危害" }
      };

      // ----- state -----
      var score = 0;
      var timeLeft = ROUND_SECONDS;
      var running = false;
      var spawnTimer = null;
      var countTimer = null;
      var lifeTimers = [];   // { id, node } pairs for active targets
      var destroyed = false;

      function clearLifeTimers() {
        for (var i = 0; i < lifeTimers.length; i++) {
          clearTimeout(lifeTimers[i].id);
        }
        lifeTimers = [];
      }

      function stopRound() {
        running = false;
        if (spawnTimer !== null) { clearInterval(spawnTimer); spawnTimer = null; }
        if (countTimer !== null) { clearInterval(countTimer); countTimer = null; }
        clearLifeTimers();
      }

      // ----- DOM scaffold -----
      root.innerHTML =
        '<div class="greact">' +
          '<div class="greact-hud">' +
            '<div class="greact-stat">' +
              '<span class="greact-stat-label">' + esc(t(L.time)) + "</span>" +
              '<span class="greact-stat-value" data-greact="time">' +
                esc(String(ROUND_SECONDS)) + esc(t(L.sec)) + "</span>" +
            "</div>" +
            '<div class="greact-stat">' +
              '<span class="greact-stat-label">' + esc(t(L.score)) + "</span>" +
              '<span class="greact-stat-value" data-greact="score">0</span>' +
            "</div>" +
          "</div>" +
          '<div class="greact-arena is-idle" data-greact="arena" aria-live="polite"></div>' +
          '<div class="greact-controls">' +
            '<button type="button" class="greact-btn" data-greact="start">' +
              esc(t(L.start)) + "</button>" +
            '<div class="greact-legend" aria-hidden="true">' +
              "<span><span class=\"greact-chip good\">" + esc(GOOD_GLYPHS[0]) + "</span>" +
                esc(t(L.good)) + "</span>" +
              "<span><span class=\"greact-chip bad\">" + esc(BAD_GLYPH) + "</span>" +
                esc(t(L.bad)) + "</span>" +
            "</div>" +
          "</div>" +
        "</div>";

      var arena = root.querySelector('[data-greact="arena"]');
      var timeEl = root.querySelector('[data-greact="time"]');
      var scoreEl = root.querySelector('[data-greact="score"]');
      var startBtn = root.querySelector('[data-greact="start"]');

      function renderTime() {
        timeEl.textContent = String(timeLeft) + t(L.sec);
        if (timeLeft <= 5) timeEl.classList.add("is-warn");
        else timeEl.classList.remove("is-warn");
      }
      function renderScore() {
        scoreEl.textContent = String(score);
      }

      function showIdleHint() {
        arena.classList.add("is-idle");
        arena.innerHTML = '<p class="greact-hint">' + esc(t(L.idleHint)) + "</p>";
      }

      function flashArena() {
        arena.classList.remove("is-shake");
        // force reflow so the animation can replay
        void arena.offsetWidth;
        arena.classList.add("is-shake");
      }

      function spawnOne() {
        if (!running || destroyed) return;
        var isBad = Math.random() < BAD_CHANCE;
        var glyph = isBad
          ? BAD_GLYPH
          : GOOD_GLYPHS[Math.floor(Math.random() * GOOD_GLYPHS.length)];

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "greact-target " + (isBad ? "is-bad" : "is-good");
        btn.setAttribute("aria-label", isBad ? t(L.avoidBad) : t(L.catchGood));
        btn.textContent = glyph;

        // place within padded bounds (target radius ~27px)
        var pad = 34;
        var w = arena.clientWidth || 320;
        var h = arena.clientHeight || 320;
        var x = pad + Math.random() * Math.max(1, w - pad * 2);
        var y = pad + Math.random() * Math.max(1, h - pad * 2);
        btn.style.left = x.toFixed(1) + "px";
        btn.style.top = y.toFixed(1) + "px";

        var lifeRec = { id: null, node: btn };

        function removeTarget(hit) {
          // remove this target's life timer record
          for (var i = 0; i < lifeTimers.length; i++) {
            if (lifeTimers[i] === lifeRec) { lifeTimers.splice(i, 1); break; }
          }
          if (lifeRec.id !== null) { clearTimeout(lifeRec.id); lifeRec.id = null; }
          if (hit) btn.classList.add("is-hit");
          else btn.classList.remove("is-in"), btn.classList.add("is-out");
          var node = btn;
          var rmId = setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
          }, 200);
          // track removal timer too so teardown can clear it
          lifeTimers.push({ id: rmId, node: node });
        }

        btn.addEventListener("click", function () {
          if (!running || destroyed) return;
          if (btn.classList.contains("is-hit") || btn.classList.contains("is-out")) return;
          if (isBad) {
            score = Math.max(0, score - 1);
            flashArena();
          } else {
            score = score + 1;
          }
          renderScore();
          removeTarget(true);
        });

        arena.appendChild(btn);
        lifeTimers.push(lifeRec);
        // enter animation on next frame
        var inId = setTimeout(function () {
          if (!destroyed && btn.parentNode) btn.classList.add("is-in");
        }, 20);
        lifeTimers.push({ id: inId, node: btn });

        // natural expiry
        var life = LIFE_MIN + Math.random() * (LIFE_MAX - LIFE_MIN);
        lifeRec.id = setTimeout(function () {
          if (destroyed) return;
          if (!btn.classList.contains("is-hit")) removeTarget(false);
        }, life);
      }

      function endRound() {
        stopRound();
        // clear any leftover target nodes
        var nodes = arena.querySelectorAll(".greact-target");
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
        }
        timeLeft = 0;
        renderTime();
        arena.classList.remove("is-idle");
        arena.innerHTML =
          '<div class="greact-overlay">' +
            '<div class="greact-overlay-title">' + esc(t(L.done)) + "</div>" +
            '<div class="greact-overlay-score">' + esc(String(score)) + "</div>" +
            '<div class="greact-overlay-note">' + esc(t(L.doneNote)) + "</div>" +
          "</div>";
        startBtn.disabled = false;
        startBtn.textContent = t(L.again);
        startBtn.focus();
      }

      function startRound() {
        if (running || destroyed) return;
        stopRound();
        score = 0;
        timeLeft = ROUND_SECONDS;
        running = true;
        renderScore();
        renderTime();
        startBtn.disabled = true;
        arena.classList.remove("is-idle");
        arena.innerHTML = "";

        countTimer = setInterval(function () {
          if (destroyed) return;
          timeLeft = timeLeft - 1;
          if (timeLeft <= 0) {
            renderTime();
            endRound();
            return;
          }
          renderTime();
        }, 1000);

        spawnOne();
        spawnTimer = setInterval(function () {
          if (destroyed) return;
          spawnOne();
        }, SPAWN_MS);
      }

      startBtn.addEventListener("click", startRound);

      // initial idle view
      renderScore();
      renderTime();
      showIdleHint();

      return function teardown() {
        destroyed = true;
        stopRound();
        // belt-and-suspenders: clear any removal/enter timers still pending
        clearLifeTimers();
      };
    }
  });
})();
