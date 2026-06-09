(function () {
  "use strict";
  window.LDW_GAMES = window.LDW_GAMES || [];

  function ensureStyle() {
    if (document.getElementById("ldw-game-dna-style")) return;
    var s = document.createElement("style");
    s.id = "ldw-game-dna-style";
    s.textContent = [
      ".gdna{display:flex;flex-direction:column;gap:18px;max-width:640px;margin:0 auto;}",
      ".gdna-caption{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;",
        "font-size:.9rem;font-weight:600;color:var(--on-surface-variant);}",
      ".gdna-rule{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;",
        "border-radius:999px;border:1px solid var(--outline-variant);",
        "background:var(--surface-container-high);}",
      ".gdna-rule .gdna-dot{width:9px;height:9px;border-radius:50%;}",
      ".gdna-rule--at .gdna-dot{background:var(--primary-container);border:1px solid var(--primary);}",
      ".gdna-rule--gc .gdna-dot{background:var(--primary);}",
      ".gdna-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}",
      ".gdna-stats{display:flex;gap:10px;}",
      ".gdna-stat{display:flex;flex-direction:column;gap:2px;padding:8px 16px;border-radius:var(--radius-sm);",
        "background:var(--surface-container-high);min-width:78px;}",
      ".gdna-stat__v{font-size:1.35rem;font-weight:700;line-height:1;color:var(--on-surface);",
        "font-variant-numeric:tabular-nums;}",
      ".gdna-stat__l{font-size:.72rem;font-weight:600;letter-spacing:.03em;text-transform:uppercase;",
        "color:var(--on-surface-variant);}",
      ".gdna-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}",
      "@media (max-width:430px){.gdna-grid{grid-template-columns:repeat(3,1fr);}}",
      ".gdna-card{position:relative;aspect-ratio:3/4;padding:0;border:none;background:transparent;",
        "cursor:pointer;font:inherit;perspective:760px;border-radius:var(--radius-sm);}",
      ".gdna-card:focus-visible{outline:2px solid var(--primary);outline-offset:3px;}",
      ".gdna-card:disabled{cursor:default;}",
      ".gdna-inner{position:absolute;inset:0;transition:transform .42s cubic-bezier(.4,.05,.2,1);",
        "transform-style:preserve-3d;}",
      ".gdna-card.is-up .gdna-inner,.gdna-card.is-matched .gdna-inner{transform:rotateY(180deg);}",
      ".gdna-face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;",
        "border-radius:var(--radius-sm);backface-visibility:hidden;-webkit-backface-visibility:hidden;}",
      ".gdna-front{background:var(--surface-container-high);border:1px solid var(--outline-variant);",
        "color:var(--on-surface-variant);}",
      ".gdna-front .material-symbols-rounded{font-size:30px;opacity:.7;}",
      ".gdna-card:not(:disabled):hover .gdna-front{border-color:var(--primary);color:var(--primary);",
        "background:var(--surface-variant);}",
      ".gdna-back{transform:rotateY(180deg);flex-direction:column;gap:2px;border:1px solid transparent;}",
      ".gdna-back .gdna-letter{font-family:var(--font-display,inherit);font-size:1.9rem;font-weight:700;line-height:1;}",
      ".gdna-back .gdna-name{font-size:.62rem;font-weight:600;letter-spacing:.04em;opacity:.85;}",
      ".gdna-back--at{background:var(--primary-container);color:var(--on-primary-container);}",
      ".gdna-back--gc{background:var(--primary);color:var(--on-primary);}",
      ".gdna-card.is-matched .gdna-back{border-color:var(--success);",
        "box-shadow:0 0 0 2px var(--success),0 6px 16px -8px var(--success);}",
      ".gdna-card.is-matched{animation:gdna-pop .34s ease;}",
      "@keyframes gdna-pop{0%{transform:scale(1);}45%{transform:scale(1.07);}100%{transform:scale(1);}}",
      ".gdna-status{min-height:1.4em;font-size:.95rem;font-weight:600;color:var(--on-surface-variant);text-align:center;}",
      ".gdna-status.is-win{color:var(--success);}",
      ".gdna-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:22px;",
        "border-radius:var(--radius);background:var(--primary-container);color:var(--on-primary-container);}",
      ".gdna-win__title{font-family:var(--font-display,inherit);font-size:1.3rem;font-weight:700;",
        "display:flex;align-items:center;gap:8px;text-align:center;}",
      ".gdna-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:999px;",
        "border:none;background:var(--primary);color:var(--on-primary);font:inherit;font-weight:600;",
        "cursor:pointer;transition:transform .15s ease,box-shadow .2s ease,opacity .2s ease;}",
      ".gdna-btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px -8px var(--primary);}",
      ".gdna-btn:focus-visible{outline:2px solid var(--on-primary-container);outline-offset:2px;}",
      ".gdna-btn:active{transform:translateY(0);}",
      "@media (prefers-reduced-motion:reduce){.gdna-inner{transition:none;}.gdna-card.is-matched{animation:none;}}"
    ].join("");
    document.head.appendChild(s);
  }

  /* base metadata: complement map + group + readable names */
  var COMPLEMENT = { A: "T", T: "A", G: "C", C: "G" };
  var GROUP = { A: "at", T: "at", G: "gc", C: "gc" };
  var BASE_NAME = {
    A: { en: "Adenine", zh: "腺嘌呤" },
    T: { en: "Thymine", zh: "胸腺嘧啶" },
    G: { en: "Guanine", zh: "鳥嘌呤" },
    C: { en: "Cytosine", zh: "胞嘧啶" }
  };

  window.LDW_GAMES.push({
    id: "dna-match",
    icon: "deblur",
    title: { en: "DNA Base-Pair Match", zh: "鹼基配對記憶" },
    blurb: { en: "Flip cards and pair complementary bases: A–T, G–C.", zh: "翻牌配對互補鹼基:A–T、G–C。" },
    mount: function (root, ctx) {
      ensureStyle();
      var t = ctx.t, esc = ctx.escapeHtml, lang = ctx.lang;

      var TX = {
        captionRule: { en: "Match complementary bases", zh: "配對互補鹼基" },
        moves: { en: "Moves", zh: "步數" },
        pairs: { en: "Pairs", zh: "配對" },
        face: { en: "Face-down card", zh: "未翻開的卡片" },
        showing: { en: "showing", zh: "顯示" },
        matched: { en: "matched", zh: "已配對" },
        flipPrompt: { en: "Flip two cards to find a complementary pair.", zh: "翻開兩張卡片,找出互補配對。" },
        nice: { en: "Complementary pair!", zh: "互補配對成功!" },
        nope: { en: "Not complementary — try again.", zh: "不是互補鹼基,再試一次。" },
        winTitle: { en: "Helix complete!", zh: "雙股螺旋完成!" },
        solved: { en: "Solved in N moves!", zh: "以 N 步完成!" },
        again: { en: "Play again", zh: "再玩一次" }
      };

      var TOTAL_PAIRS = 6;
      var deck = [];          /* array of { base } */
      var cards = [];         /* array of card DOM buttons */
      var firstIdx = null;
      var moves = 0;
      var matchedPairs = 0;
      var busy = false;
      var timers = [];

      function clearTimers() {
        for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
        timers = [];
      }

      function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
      }

      function buildDeck() {
        /* three A-T pairs => 3 A + 3 T ; three G-C pairs => 3 G + 3 C => 12 cards */
        var bases = [];
        var k;
        for (k = 0; k < 3; k++) { bases.push("A"); bases.push("T"); }
        for (k = 0; k < 3; k++) { bases.push("G"); bases.push("C"); }
        shuffle(bases);
        deck = bases.map(function (b) { return { base: b, matched: false }; });
      }

      /* ---- view ---- */
      function cardLabel(idx, state) {
        var base = deck[idx].base;
        var name = t(BASE_NAME[base]);
        if (state === "matched") return t(TX.matched) + " " + base + " · " + name;
        if (state === "up") return t(TX.showing) + " " + base + " · " + name;
        return t(TX.face) + " " + (idx + 1);
      }

      function renderCardInner(idx) {
        var card = cards[idx];
        var base = deck[idx].base;
        var grp = GROUP[base];
        var state = deck[idx].matched ? "matched" : (card.classList.contains("is-up") ? "up" : "down");
        var letterHtml = "";
        if (state !== "down") {
          letterHtml =
            '<span class="gdna-letter">' + esc(base) + "</span>" +
            '<span class="gdna-name">' + esc(t(BASE_NAME[base])) + "</span>";
        }
        card.innerHTML =
          '<span class="gdna-inner">' +
            '<span class="gdna-face gdna-front" aria-hidden="true">' +
              '<span class="material-symbols-rounded">biotech</span>' +
            "</span>" +
            '<span class="gdna-face gdna-back gdna-back--' + esc(grp) + '" aria-hidden="true">' +
              letterHtml +
            "</span>" +
          "</span>";
        card.setAttribute("aria-label", cardLabel(idx, state));
      }

      function setStatus(text, win) {
        statusEl.textContent = text;
        if (win) statusEl.classList.add("is-win");
        else statusEl.classList.remove("is-win");
      }

      function updateStats() {
        movesVal.textContent = String(moves);
        pairsVal.textContent = matchedPairs + " / " + TOTAL_PAIRS;
      }

      function isComplementary(a, b) {
        return COMPLEMENT[a] === b;
      }

      function onCardActivate(idx) {
        if (busy) return;
        if (deck[idx].matched) return;
        var card = cards[idx];
        if (card.classList.contains("is-up")) return; /* already the first pick */

        card.classList.add("is-up");
        renderCardInner(idx);

        if (firstIdx === null) {
          firstIdx = idx;
          return;
        }

        /* second pick completes a move */
        moves += 1;
        var a = firstIdx, b = idx;
        firstIdx = null;
        updateStats();

        if (isComplementary(deck[a].base, deck[b].base)) {
          deck[a].matched = true;
          deck[b].matched = true;
          cards[a].classList.remove("is-up");
          cards[b].classList.remove("is-up");
          cards[a].classList.add("is-matched");
          cards[b].classList.add("is-matched");
          cards[a].disabled = true;
          cards[b].disabled = true;
          renderCardInner(a);
          renderCardInner(b);
          matchedPairs += 1;
          updateStats();
          if (matchedPairs === TOTAL_PAIRS) {
            win();
          } else {
            setStatus(t(TX.nice), false);
          }
        } else {
          busy = true;
          setStatus(t(TX.nope), false);
          var tm = setTimeout(function () {
            cards[a].classList.remove("is-up");
            cards[b].classList.remove("is-up");
            renderCardInner(a);
            renderCardInner(b);
            busy = false;
          }, 700);
          timers.push(tm);
        }
      }

      function win() {
        var msg = t(TX.solved).replace("N", String(moves));
        setStatus(msg, true);
        winWrap.innerHTML =
          '<p class="gdna-win__title">' +
            '<span class="material-symbols-rounded" aria-hidden="true">celebration</span>' +
            esc(t(TX.winTitle)) +
          "</p>" +
          '<p>' + esc(msg) + "</p>" +
          '<button type="button" class="gdna-btn" id="gdnaAgain">' +
            '<span class="material-symbols-rounded" aria-hidden="true">restart_alt</span>' +
            esc(t(TX.again)) +
          "</button>";
        winWrap.hidden = false;
        var againBtn = winWrap.querySelector("#gdnaAgain");
        if (againBtn) {
          againBtn.addEventListener("click", reset);
          againBtn.focus();
        }
      }

      function reset() {
        clearTimers();
        firstIdx = null;
        moves = 0;
        matchedPairs = 0;
        busy = false;
        buildDeck();
        winWrap.hidden = true;
        winWrap.innerHTML = "";
        for (var i = 0; i < cards.length; i++) {
          cards[i].classList.remove("is-up", "is-matched");
          cards[i].disabled = false;
          renderCardInner(i);
        }
        updateStats();
        setStatus(t(TX.flipPrompt), false);
      }

      /* ---- build static shell once ---- */
      root.innerHTML =
        '<div class="gdna">' +
          '<div class="gdna-caption">' +
            esc(t(TX.captionRule)) +
            '<span class="gdna-rule gdna-rule--at"><span class="gdna-dot"></span>A–T</span>' +
            '<span class="gdna-rule gdna-rule--gc"><span class="gdna-dot"></span>G–C</span>' +
          "</div>" +
          '<div class="gdna-bar">' +
            '<div class="gdna-stats">' +
              '<div class="gdna-stat"><span class="gdna-stat__v" id="gdnaMoves">0</span>' +
                '<span class="gdna-stat__l">' + esc(t(TX.moves)) + "</span></div>" +
              '<div class="gdna-stat"><span class="gdna-stat__v" id="gdnaPairs">0 / 6</span>' +
                '<span class="gdna-stat__l">' + esc(t(TX.pairs)) + "</span></div>" +
            "</div>" +
          "</div>" +
          '<div class="gdna-grid" id="gdnaGrid"></div>' +
          '<p class="gdna-status" id="gdnaStatus" role="status" aria-live="polite"></p>' +
          '<div class="gdna-win" id="gdnaWin" hidden></div>' +
        "</div>";

      var grid = root.querySelector("#gdnaGrid");
      var movesVal = root.querySelector("#gdnaMoves");
      var pairsVal = root.querySelector("#gdnaPairs");
      var statusEl = root.querySelector("#gdnaStatus");
      var winWrap = root.querySelector("#gdnaWin");

      buildDeck();
      for (var i = 0; i < deck.length; i++) {
        (function (idx) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "gdna-card";
          btn.addEventListener("click", function () { onCardActivate(idx); });
          cards.push(btn);
          grid.appendChild(btn);
          renderCardInner(idx);
        })(i);
      }
      updateStats();
      setStatus(t(TX.flipPrompt), false);

      return function teardown() {
        clearTimers();
      };
    }
  });
})();
