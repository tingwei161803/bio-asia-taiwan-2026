(function () {
  "use strict";
  window.LDW_GAMES = window.LDW_GAMES || [];

  function ensureStyle() {
    if (document.getElementById("ldw-game-quiz-style")) return;
    var s = document.createElement("style");
    s.id = "ldw-game-quiz-style";
    s.textContent = [
      ".gquiz{display:flex;flex-direction:column;gap:18px;max-width:640px;margin:0 auto;color:var(--on-surface);font:inherit}",
      ".gquiz__head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}",
      ".gquiz__progress{font-size:.82rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--on-surface-variant)}",
      ".gquiz__score{display:inline-flex;align-items:center;gap:6px;font-size:.86rem;font-weight:700;color:var(--on-primary-container);background:var(--primary-container);border-radius:999px;padding:6px 14px}",
      ".gquiz__score .material-symbols-rounded{font-size:18px}",
      ".gquiz__bar{height:8px;border-radius:999px;background:var(--surface-variant);overflow:hidden}",
      ".gquiz__bar-fill{height:100%;border-radius:999px;background:var(--primary);transition:width .35s ease}",
      ".gquiz__card{background:var(--surface-container);border:1px solid var(--outline-variant);border-radius:var(--radius-lg);padding:24px;display:flex;flex-direction:column;gap:18px}",
      ".gquiz__q{font-size:1.18rem;font-weight:700;line-height:1.4;margin:0}",
      ".gquiz__options{display:flex;flex-direction:column;gap:10px}",
      ".gquiz__opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;font:inherit;font-size:1rem;line-height:1.4;color:var(--on-surface);background:var(--surface-container-high);border:2px solid var(--outline-variant);border-radius:var(--radius);padding:14px 16px;cursor:pointer;transition:border-color .18s,background .18s,transform .12s}",
      ".gquiz__opt:hover:not([disabled]){background:var(--surface-variant);border-color:var(--primary);transform:translateY(-1px)}",
      ".gquiz__opt:focus-visible{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px var(--primary-container)}",
      ".gquiz__opt[disabled]{cursor:default}",
      ".gquiz__opt--correct{border-color:var(--success);background:var(--surface-container-high)}",
      ".gquiz__opt--correct .gquiz__mark,.gquiz__opt--correct .gquiz__opt-txt{color:var(--success)}",
      ".gquiz__opt--correct{font-weight:700}",
      ".gquiz__opt--wrong{border-color:var(--error)}",
      ".gquiz__opt--wrong .gquiz__mark,.gquiz__opt--wrong .gquiz__opt-txt{color:var(--error)}",
      ".gquiz__opt--dim{opacity:.6}",
      ".gquiz__mark{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;font-size:20px;color:var(--on-surface-variant)}",
      ".gquiz__opt-txt{flex:1 1 auto}",
      ".gquiz__letter{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;font-size:.8rem;font-weight:700;background:var(--surface-variant);color:var(--on-surface-variant)}",
      ".gquiz__explain{display:flex;gap:10px;align-items:flex-start;border-left:3px solid var(--primary);background:var(--primary-container);color:var(--on-primary-container);border-radius:var(--radius-sm);padding:14px 16px;font-size:.95rem;line-height:1.5}",
      ".gquiz__explain .material-symbols-rounded{font-size:20px;flex:0 0 auto;margin-top:1px}",
      ".gquiz__actions{display:flex;justify-content:flex-end}",
      ".gquiz__btn{display:inline-flex;align-items:center;gap:8px;font:inherit;font-weight:700;font-size:1rem;color:var(--on-primary);background:var(--primary);border:none;border-radius:999px;padding:12px 22px;cursor:pointer;transition:transform .12s,box-shadow .18s,opacity .18s}",
      ".gquiz__btn:hover{transform:translateY(-1px);box-shadow:0 4px 14px var(--primary-container)}",
      ".gquiz__btn:focus-visible{outline:none;box-shadow:0 0 0 4px var(--primary-container)}",
      ".gquiz__btn .material-symbols-rounded{font-size:20px}",
      ".gquiz__result{text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center}",
      ".gquiz__result-emoji{font-size:3rem;line-height:1}",
      ".gquiz__result-score{font-size:1.6rem;font-weight:800;margin:0}",
      ".gquiz__result-score b{color:var(--primary)}",
      ".gquiz__result-msg{margin:0;color:var(--on-surface-variant);font-size:1rem;line-height:1.5}"
    ].join("");
    document.head.appendChild(s);
  }

  var QUESTIONS = [
    {
      q: { en: "Which bases pair together in a DNA double helix?", zh: "DNA 雙螺旋中，哪些鹼基會互相配對？" },
      options: [
        { en: "A–T and G–C", zh: "A–T 與 G–C" },
        { en: "A–G and C–T", zh: "A–G 與 C–T" },
        { en: "A–C and G–T", zh: "A–C 與 G–T" },
        { en: "A–A and G–G", zh: "A–A 與 G–G" }
      ],
      answer: 0,
      explain: {
        en: "Adenine pairs with thymine (A–T) and guanine pairs with cytosine (G–C). This complementary base pairing lets DNA copy itself faithfully.",
        zh: "腺嘌呤與胸腺嘧啶配對（A–T），鳥嘌呤與胞嘧啶配對（G–C）。這種互補配對讓 DNA 能準確複製自己。"
      }
    },
    {
      q: { en: "In biotech, what does “CDMO” stand for?", zh: "在生技領域，“CDMO” 代表什麼？" },
      options: [
        { en: "Contract Development and Manufacturing Organization", zh: "委託開發暨製造服務（受託研發生產機構）" },
        { en: "Clinical Data Monitoring Office", zh: "臨床數據監測辦公室" },
        { en: "Central Drug Marketing Operation", zh: "中央藥品行銷營運" }
      ],
      answer: 0,
      explain: {
        en: "A CDMO is a Contract Development and Manufacturing Organization — a partner companies hire to develop and produce drugs, a fast-growing segment at the expo.",
        zh: "CDMO 是「委託開發暨製造服務機構」，企業委託其開發並生產藥品，也是展會中快速成長的一塊領域。"
      }
    },
    {
      q: { en: "An “exosome” is best described as…", zh: "「外泌體（exosome）」最貼切的描述是？" },
      options: [
        { en: "A tiny extracellular vesicle cells use to communicate", zh: "細胞用來互相溝通的微小細胞外囊泡" },
        { en: "A type of white blood cell", zh: "一種白血球" },
        { en: "An enzyme that digests fats", zh: "一種分解脂肪的酵素" },
        { en: "The nucleus of a stem cell", zh: "幹細胞的細胞核" }
      ],
      answer: 0,
      explain: {
        en: "Exosomes are nanoscale extracellular vesicles that ferry proteins and RNA between cells — a hot area for diagnostics and drug delivery.",
        zh: "外泌體是奈米級的細胞外囊泡，能在細胞間傳遞蛋白質與 RNA，是診斷與藥物遞送的熱門領域。"
      }
    },
    {
      q: { en: "In which city does BIO Asia–Taiwan 2026 take place?", zh: "2026 亞洲生技大會（BIO Asia–Taiwan）在哪個城市舉辦？" },
      options: [
        { en: "Taipei (Nangang Exhibition Center)", zh: "台北（南港展覽館）" },
        { en: "Tokyo", zh: "東京" },
        { en: "Singapore", zh: "新加坡" },
        { en: "Seoul", zh: "首爾" }
      ],
      answer: 0,
      explain: {
        en: "The expo is held in Taipei at the Nangang Exhibition Center, the island’s flagship venue for large international shows.",
        zh: "展會在台北南港展覽館舉行，這是台灣舉辦大型國際展覽的旗艦場地。"
      }
    },
    {
      q: { en: "What is the theme of BIO Asia–Taiwan 2026?", zh: "2026 亞洲生技大會的主題是什麼？" },
      options: [
        { en: "Asian Inspiration, Global Impact", zh: "亞洲啟發，全球影響（Asian Inspiration, Global Impact）" },
        { en: "Healthier Together", zh: "攜手邁向更健康" },
        { en: "Innovation Without Borders", zh: "創新無國界" }
      ],
      answer: 0,
      explain: {
        en: "The 2026 theme is “Asian Inspiration, Global Impact,” highlighting how innovation from Asia reaches patients worldwide.",
        zh: "2026 年的主題是「Asian Inspiration, Global Impact（亞洲啟發，全球影響）」，凸顯亞洲創新如何造福全球病患。"
      }
    },
    {
      q: { en: "A “biosimilar” is…", zh: "「生物相似藥（biosimilar）」是什麼？" },
      options: [
        { en: "A highly similar version of an approved biologic medicine", zh: "與已核准生物藥高度相似的版本" },
        { en: "An identical chemical copy of a small-molecule pill", zh: "小分子藥丸的完全相同化學複製品" },
        { en: "A placebo used in clinical trials", zh: "臨床試驗中使用的安慰劑" },
        { en: "A brand-new, never-approved drug class", zh: "全新且從未核准的藥物類別" }
      ],
      answer: 0,
      explain: {
        en: "A biosimilar is a biologic that is highly similar to — with no clinically meaningful differences from — an already-approved reference biologic.",
        zh: "生物相似藥是與已核准參考生物藥「高度相似」、且臨床上無有意義差異的生物製劑。"
      }
    },
    {
      q: { en: "“Precision medicine” mainly tailors treatment based on…", zh: "「精準醫療」主要依據什麼來量身打造治療？" },
      options: [
        { en: "An individual’s genes and biomarkers", zh: "個人的基因與生物標記" },
        { en: "The patient’s home address", zh: "病患的居住地址" },
        { en: "The phase of the moon", zh: "月亮的盈虧" },
        { en: "The doctor’s personal preference", zh: "醫師的個人偏好" }
      ],
      answer: 0,
      explain: {
        en: "Precision medicine uses a person’s genes, biomarkers, and lifestyle to choose the therapy most likely to work for them.",
        zh: "精準醫療運用個人的基因、生物標記與生活型態，挑選最可能對該病患有效的療法。"
      }
    }
  ];

  function buildResultMeta(score, total) {
    var ratio = score / total;
    if (ratio === 1) return { emoji: "🏆", msg: { en: "Perfect score — you’re ready for the expo floor!", zh: "滿分 — 你已經準備好逛展了！" } };
    if (ratio >= 0.7) return { emoji: "🎉", msg: { en: "Great work — strong biotech instincts!", zh: "表現很棒 — 生技直覺很強！" } };
    if (ratio >= 0.4) return { emoji: "👍", msg: { en: "Nice effort — a quick replay will sharpen it.", zh: "不錯的嘗試 — 再玩一次會更熟練。" } };
    return { emoji: "🌱", msg: { en: "Everyone starts somewhere — give it another go!", zh: "每個人都是從這裡開始 — 再挑戰一次吧！" } };
  }

  window.LDW_GAMES.push({
    id: "quiz",
    icon: "quiz",
    title: { en: "Biotech Quick Quiz", zh: "生技快問快答" },
    blurb: { en: "Test your biotech & expo knowledge.", zh: "測測你的生技與展會知識。" },
    mount: function (root, ctx) {
      ensureStyle();
      var t = ctx.t, esc = ctx.escapeHtml;
      var total = QUESTIONS.length;

      var index = 0;
      var score = 0;
      var answered = false;

      var LETTERS = ["A", "B", "C", "D"];

      function clear() {
        while (root.firstChild) root.removeChild(root.firstChild);
      }

      function focusEl(el) {
        if (!el) return;
        try { el.focus(); } catch (e) {}
      }

      function renderQuestion() {
        answered = false;
        var q = QUESTIONS[index];
        clear();

        var progressTxt = t({ en: "Question", zh: "題目" }) + " " + (index + 1) + " / " + total;
        var scoreTxt = t({ en: "Score", zh: "得分" }) + " " + score;
        var pct = Math.round((index / total) * 100);

        var optsHtml = "";
        for (var i = 0; i < q.options.length; i++) {
          optsHtml +=
            '<button class="gquiz__opt" type="button" data-i="' + i + '">' +
              '<span class="gquiz__letter" aria-hidden="true">' + esc(LETTERS[i] || "") + "</span>" +
              '<span class="gquiz__opt-txt">' + esc(t(q.options[i])) + "</span>" +
            "</button>";
        }

        root.innerHTML =
          '<div class="gquiz" role="group" aria-label="' + esc(t({ en: "Biotech quiz question", zh: "生技測驗題目" })) + '">' +
            '<div class="gquiz__head">' +
              '<span class="gquiz__progress">' + esc(progressTxt) + "</span>" +
              '<span class="gquiz__score"><span class="material-symbols-rounded" aria-hidden="true">stars</span>' + esc(scoreTxt) + "</span>" +
            "</div>" +
            '<div class="gquiz__bar" role="presentation"><div class="gquiz__bar-fill" style="width:' + pct + '%"></div></div>' +
            '<div class="gquiz__card">' +
              '<p class="gquiz__q">' + esc(t(q.q)) + "</p>" +
              '<div class="gquiz__options">' + optsHtml + "</div>" +
            "</div>" +
          "</div>";

        var btns = root.querySelectorAll(".gquiz__opt");
        for (var b = 0; b < btns.length; b++) {
          btns[b].addEventListener("click", onAnswer);
        }
      }

      function onAnswer(ev) {
        if (answered) return;
        answered = true;
        var btn = ev.currentTarget;
        var chosen = parseInt(btn.getAttribute("data-i"), 10);
        var q = QUESTIONS[index];
        var correct = q.answer;
        if (chosen === correct) score += 1;

        var btns = root.querySelectorAll(".gquiz__opt");
        for (var i = 0; i < btns.length; i++) {
          var bi = parseInt(btns[i].getAttribute("data-i"), 10);
          btns[i].setAttribute("disabled", "disabled");
          var letter = btns[i].querySelector(".gquiz__letter");
          if (bi === correct) {
            btns[i].className = "gquiz__opt gquiz__opt--correct";
            if (letter) {
              letter.className = "gquiz__mark material-symbols-rounded";
              letter.textContent = "check_circle";
            }
            btns[i].setAttribute("aria-label", t(q.options[bi]) + " — " + t({ en: "correct answer", zh: "正確答案" }));
          } else if (bi === chosen) {
            btns[i].className = "gquiz__opt gquiz__opt--wrong";
            if (letter) {
              letter.className = "gquiz__mark material-symbols-rounded";
              letter.textContent = "cancel";
            }
          } else {
            btns[i].className = "gquiz__opt gquiz__opt--dim";
          }
        }

        // update running score chip
        var chip = root.querySelector(".gquiz__score");
        if (chip) {
          chip.innerHTML =
            '<span class="material-symbols-rounded" aria-hidden="true">stars</span>' +
            esc(t({ en: "Score", zh: "得分" }) + " " + score);
        }

        var card = root.querySelector(".gquiz__card");
        if (card) {
          var isLast = index === total - 1;
          var nextLabel = isLast
            ? t({ en: "See results", zh: "查看結果" })
            : t({ en: "Next", zh: "下一題" });
          var nextIcon = isLast ? "flag" : "arrow_forward";

          var ex = document.createElement("div");
          ex.className = "gquiz__explain";
          ex.setAttribute("role", "note");
          ex.innerHTML =
            '<span class="material-symbols-rounded" aria-hidden="true">lightbulb</span>' +
            "<span>" + esc(t(q.explain)) + "</span>";
          card.appendChild(ex);

          var actions = document.createElement("div");
          actions.className = "gquiz__actions";
          actions.innerHTML =
            '<button class="gquiz__btn" type="button">' +
              "<span>" + esc(nextLabel) + "</span>" +
              '<span class="material-symbols-rounded" aria-hidden="true">' + esc(nextIcon) + "</span>" +
            "</button>";
          card.appendChild(actions);

          var nextBtn = actions.querySelector(".gquiz__btn");
          nextBtn.addEventListener("click", function () {
            if (index < total - 1) {
              index += 1;
              renderQuestion();
            } else {
              renderResult();
            }
          });
          focusEl(nextBtn);
        }
      }

      function renderResult() {
        clear();
        var meta = buildResultMeta(score, total);
        var scoreLine =
          esc(t({ en: "You scored", zh: "你的得分" })) +
          " <b>" + score + " / " + total + "</b>";

        root.innerHTML =
          '<div class="gquiz">' +
            '<div class="gquiz__bar" role="presentation"><div class="gquiz__bar-fill" style="width:100%"></div></div>' +
            '<div class="gquiz__card gquiz__result">' +
              '<div class="gquiz__result-emoji" aria-hidden="true">' + esc(meta.emoji) + "</div>" +
              '<p class="gquiz__result-score">' + scoreLine + "</p>" +
              '<p class="gquiz__result-msg">' + esc(t(meta.msg)) + "</p>" +
              '<div class="gquiz__actions" style="justify-content:center">' +
                '<button class="gquiz__btn" type="button">' +
                  '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
                  "<span>" + esc(t({ en: "Play again", zh: "再玩一次" })) + "</span>" +
                "</button>" +
              "</div>" +
            "</div>" +
          "</div>";

        var againBtn = root.querySelector(".gquiz__btn");
        if (againBtn) {
          againBtn.addEventListener("click", function () {
            index = 0;
            score = 0;
            renderQuestion();
          });
          focusEl(againBtn);
        }
      }

      try {
        renderQuestion();
      } catch (e) {
        clear();
        root.textContent = t({ en: "Quiz unavailable.", zh: "測驗暫時無法使用。" });
      }

      return function teardown() {
        clear();
      };
    }
  });
})();
