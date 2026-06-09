(function () {
  "use strict";
  window.LDW_GAMES = window.LDW_GAMES || [];

  function ensureStyle() {
    if (document.getElementById("ldw-game-term-style")) return;
    var s = document.createElement("style");
    s.id = "ldw-game-term-style";
    s.textContent =
      ".gterm{color:var(--on-surface);display:flex;flex-direction:column;gap:18px;}" +
      ".gterm-intro{margin:0;font-size:.98rem;line-height:1.6;color:var(--on-surface-variant);}" +
      ".gterm-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;}" +
      ".gterm-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;" +
        "background:var(--surface-container-high);border:1px solid var(--outline-variant);" +
        "font-size:.86rem;font-weight:600;color:var(--on-surface-variant);font-variant-numeric:tabular-nums;}" +
      ".gterm-chip b{color:var(--on-surface);font-weight:700;}" +
      ".gterm-status{min-height:1.2em;font-size:.88rem;font-weight:600;color:var(--on-surface-variant);}" +
      ".gterm-status--ok{color:var(--success);}" +
      ".gterm-status--bad{color:var(--error);}" +
      ".gterm-board{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start;}" +
      "@media(max-width:540px){.gterm-board{grid-template-columns:1fr;}}" +
      ".gterm-col{display:flex;flex-direction:column;gap:9px;min-width:0;}" +
      ".gterm-col-title{margin:0 2px 2px;font-size:.78rem;font-weight:700;letter-spacing:.06em;" +
        "text-transform:uppercase;color:var(--on-surface-variant);}" +
      ".gterm-btn{display:block;width:100%;text-align:left;font:inherit;cursor:pointer;" +
        "padding:13px 15px;border-radius:var(--radius-sm);border:1px solid var(--outline-variant);" +
        "background:var(--surface-container);color:var(--on-surface);line-height:1.45;" +
        "transition:background .15s ease,border-color .15s ease,color .15s ease,transform .12s ease,box-shadow .15s ease;}" +
      ".gterm-btn .gterm-term{font-weight:700;font-size:1rem;}" +
      ".gterm-btn .gterm-def{font-size:.9rem;color:var(--on-surface-variant);}" +
      ".gterm-btn:hover{background:var(--surface-container-high);border-color:var(--primary-container);transform:translateY(-1px);}" +
      ".gterm-btn:focus-visible{outline:2px solid var(--primary);outline-offset:2px;}" +
      ".gterm-btn--sel{background:var(--primary-container);border-color:var(--primary);color:var(--on-primary-container);}" +
      ".gterm-btn--sel .gterm-def{color:var(--on-primary-container);}" +
      ".gterm-btn--sel:hover{background:var(--primary-container);transform:none;}" +
      ".gterm-btn--matched{background:var(--surface-container-high);border-color:var(--success);" +
        "color:var(--on-surface-variant);cursor:default;opacity:.78;}" +
      ".gterm-btn--matched .gterm-term{color:var(--success);}" +
      ".gterm-btn--matched .gterm-check{color:var(--success);font-weight:700;}" +
      ".gterm-btn--wrong{background:var(--surface-container);border-color:var(--error);" +
        "color:var(--error);animation:gterm-shake .4s ease;}" +
      ".gterm-btn--wrong .gterm-def,.gterm-btn--wrong .gterm-term{color:var(--error);}" +
      "@keyframes gterm-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}" +
      ".gterm-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}" +
      ".gterm-win{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:16px 18px;" +
        "border-radius:var(--radius);background:var(--primary-container);color:var(--on-primary-container);" +
        "border:1px solid var(--primary);}" +
      ".gterm-win-msg{margin:0;font-weight:700;font-size:1.04rem;}" +
      ".gterm-again{font:inherit;font-weight:700;cursor:pointer;padding:11px 20px;border-radius:999px;" +
        "border:1px solid transparent;background:var(--primary);color:var(--on-primary);" +
        "transition:transform .12s ease,box-shadow .15s ease,opacity .15s ease;}" +
      ".gterm-again:hover{transform:translateY(-1px);box-shadow:var(--elev-1);opacity:.94;}" +
      ".gterm-again:focus-visible{outline:2px solid var(--on-primary-container);outline-offset:2px;}";
    document.head.appendChild(s);
  }

  window.LDW_GAMES.push({
    id: "term-match",
    icon: "join_inner",
    title: { en: "Biotech Term Match", zh: "生技術語配對" },
    blurb: { en: "Match each term to its definition.", zh: "把術語和定義配成一對。" },
    mount: function (root, ctx) {
      ensureStyle();
      var t = ctx.t, esc = ctx.escapeHtml;

      var TXT = {
        intro: { en: "Tap a term, then tap its matching definition. Wrong pairs flash red.",
                 zh: "先點一個術語,再點對應的定義。配錯會閃紅色。" },
        termsCol: { en: "Terms", zh: "術語" },
        defsCol: { en: "Definitions", zh: "定義" },
        triesLbl: { en: "Tries", zh: "嘗試" },
        matchedLbl: { en: "Matched", zh: "已配對" },
        ok: { en: "Matched!", zh: "配對成功!" },
        bad: { en: "Not a match — try again.", zh: "配對錯誤,再試一次。" },
        again: { en: "Play again", zh: "再玩一次" }
      };

      var PAIRS = [
        { id: "p1",
          term: { en: "CDMO", zh: "CDMO" },
          def: { en: "Contract Development & Manufacturing Organization — makes drugs for other companies.",
                 zh: "受託開發暨製造,替其他公司開發與生產藥品。" } },
        { id: "p2",
          term: { en: "CRO", zh: "CRO" },
          def: { en: "Contract Research Organization — runs trials and research as a service.",
                 zh: "受託研究機構,以委外方式執行試驗與研究。" } },
        { id: "p3",
          term: { en: "Exosome", zh: "外泌體" },
          def: { en: "A tiny extracellular vesicle cells use to communicate.",
                 zh: "細胞用來傳遞訊息的微小胞外囊泡。" } },
        { id: "p4",
          term: { en: "Biosimilar", zh: "生物相似藥" },
          def: { en: "A highly similar version of an approved biologic medicine.",
                 zh: "與已核准生物藥高度相似的後續產品。" } },
        { id: "p5",
          term: { en: "Precision Medicine", zh: "精準醫療" },
          def: { en: "Treatment tailored to a person's genes and biomarkers.",
                 zh: "依個人基因/生物標記量身打造的治療。" } },
        { id: "p6",
          term: { en: "Cell Therapy", zh: "細胞治療" },
          def: { en: "Treating disease with living cells.",
                 zh: "以活細胞治療疾病。" } }
      ];

      var timers = [];
      var leftBtns = {};
      var rightBtns = {};
      var state = { selSide: null, selId: null, attempts: 0, matched: {}, matchedCount: 0, busy: false, done: false };

      var statusEl = null, triesEl = null, matchedEl = null, winWrap = null, boardEl = null;

      function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
      }

      function clearTimers() {
        for (var i = 0; i < timers.length; i++) { clearTimeout(timers[i]); }
        timers = [];
      }

      function btnFor(side, id) {
        return side === "term" ? leftBtns[id] : rightBtns[id];
      }

      function setStatus(msg, kind) {
        if (!statusEl) return;
        statusEl.textContent = msg || "";
        statusEl.className = "gterm-status" + (kind ? " gterm-status--" + kind : "");
      }

      function refresh() {
        var id;
        for (id in leftBtns) {
          if (!leftBtns.hasOwnProperty(id)) continue;
          applyState(leftBtns[id], "term", id);
        }
        for (id in rightBtns) {
          if (!rightBtns.hasOwnProperty(id)) continue;
          applyState(rightBtns[id], "def", id);
        }
        if (triesEl) triesEl.textContent = String(state.attempts);
        if (matchedEl) matchedEl.textContent = state.matchedCount + " / " + PAIRS.length;
      }

      function applyState(btn, side, id) {
        if (!btn) return;
        var matched = !!state.matched[id];
        var selected = state.selSide === side && state.selId === id;
        btn.className = "gterm-btn" +
          (matched ? " gterm-btn--matched" : "") +
          (selected ? " gterm-btn--sel" : "");
        btn.disabled = matched;
        btn.setAttribute("aria-pressed", selected ? "true" : "false");
      }

      function select(side, id) {
        state.selSide = side;
        state.selId = id;
        setStatus("", "");
        refresh();
      }

      function clearSelection() {
        state.selSide = null;
        state.selId = null;
      }

      function onWrong(side, id) {
        state.busy = true;
        var a = btnFor(state.selSide, state.selId);
        var b = btnFor(side, id);
        if (a) { a.classList.remove("gterm-btn--sel"); a.classList.add("gterm-btn--wrong"); }
        if (b) b.classList.add("gterm-btn--wrong");
        setStatus(t(TXT.bad), "bad");
        var tm = setTimeout(function () {
          if (a) a.classList.remove("gterm-btn--wrong");
          if (b) b.classList.remove("gterm-btn--wrong");
          clearSelection();
          state.busy = false;
          refresh();
        }, 650);
        timers.push(tm);
      }

      function checkDone() {
        if (state.matchedCount < PAIRS.length) return;
        state.done = true;
        if (boardEl) boardEl.setAttribute("aria-disabled", "true");
        renderWin();
      }

      function handleClick(side, id) {
        if (state.busy || state.done) return;
        if (state.matched[id]) return;
        if (state.selSide === side && state.selId === id) { clearSelection(); refresh(); return; }
        if (state.selSide === null) { select(side, id); return; }
        if (state.selSide === side) { select(side, id); return; }

        var termId = side === "term" ? id : state.selId;
        var defId = side === "def" ? id : state.selId;
        state.attempts++;
        if (termId === defId) {
          state.matched[id] = true;
          state.matched[state.selId] = true;
          state.matchedCount++;
          clearSelection();
          setStatus(t(TXT.ok), "ok");
          refresh();
          checkDone();
        } else {
          onWrong(side, id);
          if (triesEl) triesEl.textContent = String(state.attempts);
        }
      }

      function makeBtn(side, pair) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "gterm-btn";
        b.setAttribute("aria-pressed", "false");
        if (side === "term") {
          b.setAttribute("aria-label", t(TXT.termsCol) + ": " + t(pair.term));
          b.innerHTML = '<span class="gterm-row"><span class="gterm-term">' +
            esc(t(pair.term)) + '</span><span class="gterm-check">&#10003;</span></span>';
          leftBtns[pair.id] = b;
        } else {
          b.setAttribute("aria-label", t(TXT.defsCol) + ": " + t(pair.def));
          b.innerHTML = '<span class="gterm-def">' + esc(t(pair.def)) + '</span>';
          rightBtns[pair.id] = b;
        }
        b.addEventListener("click", function () { handleClick(side, pair.id); });
        return b;
      }

      function renderWin() {
        if (!winWrap) return;
        winWrap.innerHTML = "";
        var msg = document.createElement("p");
        msg.className = "gterm-win-msg";
        msg.textContent = t({
          en: "All matched in " + state.attempts + " tries!",
          zh: "全部配對完成,共 " + state.attempts + " 次嘗試!"
        });
        var again = document.createElement("button");
        again.type = "button";
        again.className = "gterm-again";
        again.textContent = t(TXT.again);
        again.addEventListener("click", reset);
        winWrap.appendChild(msg);
        winWrap.appendChild(again);
        winWrap.hidden = false;
        again.focus();
      }

      function buildBoard() {
        leftBtns = {};
        rightBtns = {};
        boardEl.innerHTML = "";
        boardEl.removeAttribute("aria-disabled");

        var leftCol = document.createElement("div");
        leftCol.className = "gterm-col";
        var lh = document.createElement("h3");
        lh.className = "gterm-col-title";
        lh.textContent = t(TXT.termsCol);
        leftCol.appendChild(lh);
        var leftOrder = shuffle(PAIRS);
        for (var i = 0; i < leftOrder.length; i++) leftCol.appendChild(makeBtn("term", leftOrder[i]));

        var rightCol = document.createElement("div");
        rightCol.className = "gterm-col";
        var rh = document.createElement("h3");
        rh.className = "gterm-col-title";
        rh.textContent = t(TXT.defsCol);
        rightCol.appendChild(rh);
        var rightOrder = shuffle(PAIRS);
        for (var j = 0; j < rightOrder.length; j++) rightCol.appendChild(makeBtn("def", rightOrder[j]));

        boardEl.appendChild(leftCol);
        boardEl.appendChild(rightCol);
      }

      function reset() {
        clearTimers();
        state = { selSide: null, selId: null, attempts: 0, matched: {}, matchedCount: 0, busy: false, done: false };
        if (winWrap) { winWrap.hidden = true; winWrap.innerHTML = ""; }
        setStatus("", "");
        buildBoard();
        refresh();
      }

      // ----- initial render -----
      root.innerHTML = "";
      var wrap = document.createElement("div");
      wrap.className = "gterm";

      var intro = document.createElement("p");
      intro.className = "gterm-intro";
      intro.textContent = t(TXT.intro);

      var meta = document.createElement("div");
      meta.className = "gterm-meta";
      var triesChip = document.createElement("span");
      triesChip.className = "gterm-chip";
      triesChip.innerHTML = esc(t(TXT.triesLbl)) + ' <b id="x"></b>';
      triesEl = triesChip.querySelector("b");
      triesEl.textContent = "0";
      var matchedChip = document.createElement("span");
      matchedChip.className = "gterm-chip";
      matchedChip.innerHTML = esc(t(TXT.matchedLbl)) + ' <b></b>';
      matchedEl = matchedChip.querySelector("b");
      matchedEl.textContent = "0 / " + PAIRS.length;
      meta.appendChild(triesChip);
      meta.appendChild(matchedChip);

      statusEl = document.createElement("div");
      statusEl.className = "gterm-status";
      statusEl.setAttribute("role", "status");
      statusEl.setAttribute("aria-live", "polite");

      boardEl = document.createElement("div");
      boardEl.className = "gterm-board";

      winWrap = document.createElement("div");
      winWrap.className = "gterm-win";
      winWrap.hidden = true;

      wrap.appendChild(intro);
      wrap.appendChild(meta);
      wrap.appendChild(statusEl);
      wrap.appendChild(boardEl);
      wrap.appendChild(winWrap);
      root.appendChild(wrap);

      buildBoard();
      refresh();

      return function teardown() {
        clearTimers();
        leftBtns = {};
        rightBtns = {};
        if (root) root.innerHTML = "";
      };
    }
  });
})();
