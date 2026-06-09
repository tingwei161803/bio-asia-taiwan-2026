/* =========================================================================
   data/data.js  ·  BIO Asia–Taiwan / 亞洲生技大展
   The single data file for the whole multi-page site.
   Loaded on every page; shell.js + app.js read these two globals.

   Content compiled from public sources (official site, press releases and
   trade media). Figures for 2026 are organiser projections; 2025 figures are
   reported actuals. Non-official fan-made overview — verify against the
   official site for the final programme.
   ========================================================================= */

window.SITE_META = {
  title:    { en: "BIO Asia–Taiwan", zh: "亞洲生技大展" },
  subtitle: {
    en: "Asian Inspiration, Global Impact · July 15–19, 2026 · Taipei",
    zh: "亞洲創新・全球影響· 2026/7/15–19 · 台北南港"
  }
};

window.SITE_PAGES = [

  /* ============================ HOME / HUB ============================ */
  {
    slug: "home",
    layout: "hub",
    icon: "home",
    title:    { en: "BIO Asia–Taiwan 2026", zh: "2026 亞洲生技大展" },
    subtitle: {
      en: "“Asian Inspiration, Global Impact” — one of the world’s top three biotech conventions returns to Taipei Nangang, July 15–19, 2026.",
      zh: "「亞洲創新・全球影響」— 位列全球三大生技盛會，2026/7/15–19 重返台北南港展覽館。"
    },
    stats: [
      { value: 2200,  label: { en: "Exhibition Booths",   zh: "展覽攤位規模" } },
      { value: 100,   label: { en: "Global Speakers",     zh: "國際重量級講者" } },
      { value: 20,    label: { en: "Country Pavilions",   zh: "國家主題館" } },
      { value: 10000, label: { en: "Partnering Meetings", zh: "商機媒合會議" } },
      { value: 5,     label: { en: "Conference Days",      zh: "大會天數 (7/15–19)" } }
    ]
  },

  /* ============================ ABOUT (article) ============================ */
  {
    slug: "about",
    layout: "article",
    icon: "info",
    title:    { en: "About the Event", zh: "關於大會" },
    subtitle: {
      en: "What BIO Asia–Taiwan is, the 2026 theme, who runs it, and last year in numbers.",
      zh: "亞洲生技大會是什麼、 2026 主題、主辦承辦單位，以及上屆數據回顧。"
    },
    sections: [
      {
        id: "overview",
        heading: { en: "About the Event", zh: "關於大會" },
        blocks: [
          { type: "p", text: {
            en: "BIO Asia–Taiwan (the Asia Biotech Conference & Exhibition series) is the region’s flagship biotechnology gathering, jointly organised by the Taiwan Bio Industry Organization (Taiwan BIO) and the global Biotechnology Innovation Organization (BIO). It pairs a high-level international conference with one of Asia’s largest biotech exhibitions.",
            zh: "「亞洲生技大會」(BIO Asia–Taiwan)是亞洲旗艦級的生技盛會，由台灣生技產業協會(Taiwan BIO)與全球生技創新組織(BIO)聯手主辦，將高規格國際論壇與亞洲最大規模之一的生技展覽合而為一。"
          } },
          { type: "p", text: {
            en: "Taiwan’s health authorities have described BIO Asia–Taiwan as having grown into one of the world’s top three biotechnology conventions, connecting Asian innovation with global capital, regulation and supply chains.",
            zh: "台灣衛生主管機關曾表示，亞洲生技大會已成長為全球三大生技盛會之一，串起亞洲創新與全球資本、法規與供應鏈。"
          } },
          { type: "ul", items: {
            en: ["Dates: July 15–19, 2026 (exhibition July 16–19)", "Venue: Taipei Nangang Exhibition Center, TaiNEX 1 & 2", "Hours: 10:00–18:00 (final day closes 17:00)", "Theme: “Asian Inspiration, Global Impact”"],
            zh: ["期間：2026/7/15–19(展覽 7/16–19)", "地點：台北南港展覽館 1 館 & 2 館(TaiNEX 1 & 2)", "時間：10:00–18:00(最後一日至 17:00)", "主題：「亞洲創新・全球影響」"]
          } }
        ]
      },
      {
        id: "theme",
        heading: { en: "2026 Theme", zh: "2026 主題" },
        blocks: [
          { type: "h3", text: { en: "Asian Inspiration, Global Impact", zh: "亞洲創新・全球影響" } },
          { type: "p", text: {
            en: "The 2026 theme highlights the integrative power of innovation together with AI — connecting Asia with global networks, investment, regulation and supply chains. Programming runs across drug discovery, precision medicine, cell and gene therapy, smart healthcare and biomanufacturing.",
            zh: "2026 主題強調「創新 × AI」的整合力量，串接亞洲與全球的人脈、投資、法規與供應鏈；議程涵蓋新藥開發、精準醫療、細胞與基因治療、智慧醫療與生物製造。"
          } },
          { type: "quote", text: {
            en: "Innovation together with AI connects Asia to the world — across networks, investment, regulation and supply chains.",
            zh: "以創新搭配 AI，讓亞洲與全球接軌 — 人脈、投資、法規與供應鏈。"
          } }
        ]
      },
      {
        id: "why",
        heading: { en: "Why Attend", zh: "為何參與" },
        blocks: [
          { type: "ul", items: {
            en: [
              "Source partners across 2,200+ booths and 20+ country pavilions",
              "Book one-on-one partnering — 10,000+ business meetings expected",
              "Hear 100+ distinguished speakers, including Nobel laureates",
              "Scout deal flow at Demo Day and the Investment Summit",
              "Track regulation and policy across 20+ countries"
            ],
            zh: [
              "在 2,200+ 攤位、 20+ 國家主題館中尋找合作夥伴",
              "預約一對一商機媒合 — 預期逾 10,000 場會議",
              "聆聽 100+ 國際重量級講者，含諾貝爾獎得主",
              "在 Demo Day 與投資高峰會物色投資標的",
              "掌握 20+ 國家的法規與產業政策動向"
            ]
          } }
        ]
      },
      {
        id: "host",
        heading: { en: "Organisers", zh: "主辦與承辦" },
        blocks: [
          { type: "p", text: {
            en: "Co-organised by Taiwan BIO and the global BIO. Conference leadership includes Conference Chairman Johnsee Lee and Taiwan BIO Chairman LC Liu. The exhibition is operated by Chan Chao International.",
            zh: "由台灣生技產業協會(Taiwan BIO)與全球 BIO 共同主辦；大會主席李鍾熙(Johnsee Lee)，Taiwan BIO 理事長 LC Liu。展覽部分由展昭國際企業股份有限公司承辦。"
          } },
          { type: "ul", items: {
            en: ["Co-organisers: Taiwan BIO + Biotechnology Innovation Organization (BIO)", "Exhibition operator: Chan Chao International", "Enquiries: 02-2659-6000 · CustomerService@chanchao.com.tw"],
            zh: ["共同主辦：Taiwan BIO + 全球生技創新組織(BIO)", "展覽承辦：展昭國際企業", "洽詢：02-2659-6000 · CustomerService@chanchao.com.tw"]
          } }
        ]
      },
      {
        id: "review",
        heading: { en: "2025 in Review", zh: "上屆回顧 (2025)" },
        blocks: [
          { type: "p", text: {
            en: "The 2025 edition (July 24–27) set records, underlining the scale that 2026 builds on.",
            zh: "2025 屆(7/24–27)創下多項紀錄，也是 2026 年繼續推高的基礎。"
          } },
          { type: "ul", items: {
            en: [
              "850+ exhibitors across a record 2,200+ booths",
              "~140,000 exhibition visits from 50 countries",
              "600+ international delegates; delegations from 19 countries",
              "3,000+ conference registrants; 8,800 partnering invitations",
              "3 major forums, 7 Regional Collaboration Forums, 13 Satellite Symposia, 2 Demo Days"
            ],
            zh: [
              "850+ 家參展商，攤位數創紀錄逾 2,200 個",
              "來自 50 國、近 14 萬人次參觀",
              "600+ 國際貴賓，含 19 國代表團",
              "3,000+ 大會註冊；8,800 場商機媒合邀約",
              "3 大主題論壇、 7 場區域合作論壇、 13 場衛星研討會、 2 場 Demo Day"
            ]
          } }
        ]
      }
    ]
  },

  /* ============================ HIGHLIGHTS (bento) ============================ */
  {
    slug: "highlights",
    layout: "bento",
    icon: "auto_awesome",
    title:    { en: "Exhibition Highlights", zh: "展覽亮點" },
    subtitle: {
      en: "The themed pavilions and focus areas that shape the show floor.",
      zh: "構成展場的主題專館與重點領域。"
    },
    tiles: [
      { size: "lg", accent: true, icon: "neurology", value: "AI × Bio",
        title: { en: "AI-Driven Innovation", zh: "AI 驅動創新" },
        body:  { en: "The 2026 throughline — AI woven through drug design, trials and data-driven decisions.", zh: "2026 貫穿主軸 — AI 融入藥物設計、臨床試驗與數據決策。" } },
      { size: "md", icon: "biotech",
        title: { en: "Precision Medicine", zh: "精準醫療" },
        body:  { en: "Genomics, diagnostics and companion therapies.", zh: "基因體、診斷與伴隨式診療。" } },
      { size: "sm", icon: "vaccines",
        title: { en: "Cell & Gene Therapy", zh: "細胞與基因治療" },
        body:  { en: "Regenerative medicine pipelines.", zh: "再生醫學產業管線。" } },
      { size: "tall", icon: "factory",
        title: { en: "CDMO / CRO", zh: "委託研發製造" },
        body:  { en: "Contract development and manufacturing — the engine room of the supply chain, from preclinical services to fill-finish.", zh: "委託開發與製造 — 供應鏈的引擎室，從臨床前服務到填裝。" } },
      { size: "wide", icon: "public", value: "20+",
        title: { en: "Country Pavilions", zh: "國家主題館" },
        body:  { en: "Overseas pavilions on 4F bring delegations and partners from 20+ countries.", zh: "4 樓海外專館集結 20+ 國代表團與合作夥伴。" } },
      { size: "sm", icon: "medication",
        title: { en: "Biosimilars", zh: "生物相似藥" },
        body:  { en: "Affordable biologics at scale.", zh: "規模化、可負擔的生物製劑。" } },
      { size: "md", icon: "monitor_heart",
        title: { en: "Smart & Precision Health", zh: "智慧與精準健康" },
        body:  { en: "Digital health, wearables and connected diagnostics.", zh: "數位健康、穿戴裝置與聯網診斷。" } },
      { size: "sm", icon: "science",
        title: { en: "Biotech Services", zh: "生技服務" },
        body:  { en: "Instruments, reagents and lab services.", zh: "儀器、試劑與實驗室服務。" } }
    ]
  },

  /* ============================ FORUMS (gallery) ============================ */
  {
    slug: "forums",
    layout: "gallery",
    icon: "forum",
    title:    { en: "Forums & Partnering", zh: "論壇與商機媒合" },
    subtitle: {
      en: "The conference programme — forums, summits, symposia and matchmaking. Tap a card for detail. Final agenda per the official site.",
      zh: "大會議程 — 論壇、高峰會、研討會與商機媒合。點卡片看詳情；最終議程依官方公告。"
    },
    categories: [
      { key: "forum",       en: "Forums",          zh: "主題論壇" },
      { key: "matchmaking", en: "Partnering",      zh: "商機媒合" },
      { key: "program",     en: "Special Programs", zh: "特別企劃" }
    ],
    items: [
      {
        slug: "innovation-forum", category: "forum",
        title:   { en: "Innovation Forum", zh: "創新論壇" },
        summary: { en: "Technology advancement across the drug-development chain.", zh: "跨藥物開發點的技術進展。" },
        tags: ["Drug Design", "Clinical", "AI"],
        overview: { en: "Covers drug design, preclinical testing, clinical trials, manufacturing and supply chains, and data-driven decision-making — the technical heart of the conference.", zh: "涵蓋藥物設計、臨床前測試、臨床試驗、製造與供應鏈，以及數據驅動決策 — 大會的技術核心。" }
      },
      {
        slug: "investment-summit", category: "forum",
        title:   { en: "Investment Summit", zh: "投資高峰會" },
        summary: { en: "Where capital meets the pipeline.", zh: "資本與產業管線的交會點。" },
        tags: ["VC", "IPO", "M&A"],
        overview: { en: "Focuses on capital deployment: venture building, cross-border investment, IPO strategies, early-stage fundraising and M&A.", zh: "聚焦資本部署：創業育成、跨境投資、IPO 策略、早期募資與併購。" }
      },
      {
        slug: "regional-collaboration", category: "forum",
        title:   { en: "Regional Collaboration Forum", zh: "區域合作論壇" },
        summary: { en: "Regulatory alignment across 20+ countries.", zh: "跨 20+ 國的法規與政策協調。" },
        tags: ["Regulation", "Policy", "APAC"],
        overview: { en: "Brings together participants from 20+ countries on regulatory alignment and industrial policy across the Asia-Pacific.", zh: "集結 20+ 國代表，討論亞太的法規協調與產業政策。" }
      },
      {
        slug: "exosome-symposium", category: "program",
        title:   { en: "Exosome Applications Symposium", zh: "外泌體應用研討會" },
        summary: { en: "Academic, clinical and industry perspectives.", zh: "學術、臨床與產業觀點。" },
        tags: ["Exosome", "Regenerative"],
        overview: { en: "A specialised symposium on exosome applications, spanning academic research, clinical translation and industry use cases.", zh: "聚焦外泌體應用的專題研討會，跨學術研究、臨床轉譯與產業應用。" }
      },
      {
        slug: "satellite-symposia", category: "program",
        title:   { en: "Satellite Symposia", zh: "衛星研討會" },
        summary: { en: "Deep-dive sessions hosted by partners.", zh: "由合作夥伴主辦的深入場次。" },
        tags: ["Sessions", "Partners"],
        overview: { en: "A track of partner-hosted deep-dive sessions; the 2025 edition featured 13 satellite symposia across therapeutic and technology themes.", zh: "由合作夥伴主辦的深入場次；2025 屆計有 13 場，涵蓋多項治療與技術主題。" }
      },
      {
        slug: "demo-day", category: "matchmaking",
        title:   { en: "Demo Day", zh: "Demo Day 新創發表" },
        summary: { en: "Startups pitch to investors and partners.", zh: "新創向投資人與夥伴提案。" },
        tags: ["Startups", "Pitch"],
        overview: { en: "Curated startup showcases pitching to investors and strategic partners; the 2025 edition ran two Demo Days.", zh: "精選新創向投資人與戰略夥伴提案的舞台；2025 屆舉辦兩場 Demo Day。" }
      },
      {
        slug: "partnering-meetings", category: "matchmaking",
        title:   { en: "One-on-One Partnering", zh: "一對一商機媒合" },
        summary: { en: "10,000+ business meetings expected in 2026.", zh: "2026 預期逾 10,000 場會議。" },
        tags: ["BD", "Licensing"],
        overview: { en: "The online partnering system lets attendees pre-book one-on-one meetings; 2026 projects 10,000+ business matchmaking meetings (8,800 invitations were booked in 2025).", zh: "線上媒合系統讓與會者預約一對一會議；2026 預期逾 10,000 場商機媒合(2025 已預約 8,800 場邀約)。" }
      },
      {
        slug: "student-programs", category: "program",
        title:   { en: "Student Programs", zh: "學生參與計劃" },
        summary: { en: "Bringing the next generation onto the floor.", zh: "讓下一代踏進產業現場。" },
        tags: ["Talent", "Education"],
        overview: { en: "Dedicated participation programs that connect students and early-career researchers with the industry and the show floor.", zh: "專為學生與初階研究者設計的參與計劃，串接產業與展場。" }
      },
      {
        slug: "site-visit", category: "program",
        title:   { en: "Site Visit Programs", zh: "實地參訪計劃" },
        summary: { en: "Guided visits to facilities and clusters.", zh: "導覽參訪設施與產業聚落。" },
        tags: ["Tours", "Clusters"],
        overview: { en: "Organised tours to biotech facilities and innovation clusters; the 2025 edition included two site-visit programs.", zh: "安排參訪生技設施與創新聚落的導覽行程；2025 屆含兩個參訪計劃。" }
      }
    ]
  },

  /* ============================ SCHEDULE (timeline) ============================ */
  {
    slug: "schedule",
    layout: "timeline",
    icon: "calendar_month",
    title:    { en: "Programme at a Glance", zh: "議程一覽" },
    subtitle: {
      en: "Day-by-day highlights, July 15–19, 2026. Indicative only — confirm sessions and times on the official site.",
      zh: "2026/7/15–19 逐日亮點；僅供參考 — 各場次與時間請以官方為準。"
    },
    events: [
      { date: { en: "Tue, Jul 15", zh: "7/15 週三" },
        title: { en: "Conference Opens · Innovation Forum", zh: "大會開幕・創新論壇" },
        body:  { en: "Opening ceremony and keynotes kick off the week; the Innovation Forum opens the technical track.", zh: "開幕典禮與主題演講揭開一週盛會；創新論壇推出技術議程。" } },
      { date: { en: "Wed, Jul 16", zh: "7/16 週四" },
        title: { en: "Exhibition Opens · Investment Summit", zh: "展覽開展・投資高峰會" },
        body:  { en: "The show floor opens (10:00–18:00) as the Investment Summit convenes capital and pipelines.", zh: "展場開展(10:00–18:00)；投資高峰會集結資本與產業管線。" } },
      { date: { en: "Thu, Jul 17", zh: "7/17 週五" },
        title: { en: "Regional Collaboration · Demo Day", zh: "區域合作論壇・Demo Day" },
        body:  { en: "Regulators and policymakers from 20+ countries convene; startups pitch at Demo Day.", zh: "20+ 國法規與政策代表齊聚；新創於 Demo Day 提案。" } },
      { date: { en: "Fri, Jul 18", zh: "7/18 週六" },
        title: { en: "Satellite Symposia · Site Visits", zh: "衛星研討會・參訪行程" },
        body:  { en: "Partner-hosted deep dives run alongside guided site-visit programs.", zh: "合作夥伴主辦的深入場次，搭配導覽參訪計劃。" } },
      { date: { en: "Sat, Jul 19", zh: "7/19 週日" },
        title: { en: "Final Day", zh: "最後一日" },
        body:  { en: "The week wraps up; the exhibition closes at 17:00 on the final day.", zh: "盛會收尾；展覽於最後一日 17:00 閉幕。" } }
    ]
  },

  /* ============================ EXHIBITORS (table) ============================ */
  {
    slug: "exhibitors",
    layout: "table",
    icon: "storefront",
    title:    { en: "Exhibitor Directory", zh: "參展單位" },
    subtitle: {
      en: "A sample of confirmed exhibitors — search, sort, and filter by category. Partial list; see the official directory for all companies.",
      zh: "部分已確認參展商 — 可搜尋、排序並依類別篩選。為部分名單，完整名單請見官方。"
    },
    columns: [
      { key: "name",     label: { en: "Company",  zh: "公司" },   type: "text" },
      { key: "category", label: { en: "Category", zh: "類別" },   type: "tag", filter: true },
      { key: "focus",    label: { en: "Focus",    zh: "領域" },   type: "text" }
    ],
    rows: [
      { name: "PharmaEssentia Corp.",            category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Long-acting interferon", zh: "長效干擾素新藥" } },
      { name: "Golden Biotechnology Corp.",      category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Antrodia-derived new drugs", zh: "牛樟芝新藥" } },
      { name: "Foresee Pharmaceuticals Co.",     category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Long-acting injectables", zh: "長效注射劑" } },
      { name: "Orient Pharma Co.",               category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Controlled-release formulations", zh: "緩釋控釋劑型" } },
      { name: "Botanicure Co.",                  category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Botanical new drugs", zh: "植物新藥" } },
      { name: "Elixiron Immunotherapeutics",     category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Immuno-oncology", zh: "免疫腫瘤新藥" } },
      { name: "Boyen Therapeutics, Inc.",        category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Novel drug discovery", zh: "新藥開發" } },
      { name: "Taho Pharmaceuticals Ltd.",       category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Generics & formulation", zh: "學名藥與新劑型" } },
      { name: "Immunadd Inc.",                   category: { en: "Pharma & Drugs",     zh: "製藥與新藥" },     focus: { en: "Immunotherapy", zh: "免疫療法" } },
      { name: "AP Biosciences Inc.",             category: { en: "Biologics & CDMO",   zh: "生物製劑與 CDMO" }, focus: { en: "Antibody biologics", zh: "抗體生物藥" } },
      { name: "HanchorBio Inc.",                 category: { en: "Biologics & CDMO",   zh: "生物製劑與 CDMO" }, focus: { en: "Fusion-protein biologics", zh: "融合蛋白生物藥" } },
      { name: "Jowin Biopharma, Inc.",           category: { en: "Biologics & CDMO",   zh: "生物製劑與 CDMO" }, focus: { en: "Biologics CDMO", zh: "生物製劑 CDMO" } },
      { name: "Leadgene Biomedical, Inc.",       category: { en: "Biotech Service",    zh: "生技服務" },         focus: { en: "Antibodies & diagnostics", zh: "抗體與診斷試劑" } },
      { name: "Link-Best Bioscience Co.",        category: { en: "Biotech Service",    zh: "生技服務" },         focus: { en: "Biotech services", zh: "生技服務" } },
      { name: "Echo Chemical Co.",               category: { en: "Biotech Service",    zh: "生技服務" },         focus: { en: "Chemicals & reagents", zh: "化學與試劑" } },
      { name: "WCC Biomedical Co.",              category: { en: "Devices & Equipment", zh: "醫材與設備" },    focus: { en: "Biomedical materials", zh: "生醫材料" } },
      { name: "Innojet Technology Co.",          category: { en: "Devices & Equipment", zh: "醫材與設備" },    focus: { en: "Process equipment", zh: "製程設備" } },
      { name: "Wendy International Ltd.",         category: { en: "Devices & Equipment", zh: "醫材與設備" },    focus: { en: "Lab instruments", zh: "實驗儀器" } },
      { name: "MycoMagic Biotechnology Co.",     category: { en: "Precision Health",   zh: "精準健康" },         focus: { en: "Medicinal fungi", zh: "藥用真菌" } },
      { name: "Yu-Did Bio-Tech Corporation",     category: { en: "Precision Health",   zh: "精準健康" },         focus: { en: "Functional health", zh: "機能保健" } }
    ]
  },

  /* ============================ VENUE (map) ============================ */
  {
    slug: "venue",
    layout: "map",
    icon: "location_on",
    title:    { en: "Venue & Getting There", zh: "場地與交通" },
    subtitle: {
      en: "Taipei Nangang Exhibition Center and nearby transit & hotels. Tap a place to locate it.",
      zh: "台北南港展覽館與鄰近交通、住宿。點選地點在地圖上定位。"
    },
    places: [
      { slug: "tainex1", lat: 25.0556, lng: 121.6178,
        name: { en: "TaiNEX 1 (Hall 1, 4F)", zh: "南港展覽館 1 館(4F)" },
        body: { en: "Main exhibition venue — No.1, Jingmao 2nd Rd., Nangang.", zh: "展覽主場地 — 南港區經貿二路 1 號。" } },
      { slug: "tainex2", lat: 25.0535, lng: 121.6149,
        name: { en: "TaiNEX 2", zh: "南港展覽館 2 館" },
        body: { en: "Conference and additional exhibition space.", zh: "大會與部分展區空間。" } },
      { slug: "mrt", lat: 25.0553, lng: 121.6181,
        name: { en: "MRT Taipei Nangang Exhibition Center", zh: "捷運南港展覽館站" },
        body: { en: "Bannan Line (BL) & Wenhu Line (BR) — directly connected.", zh: "板南線與文湖線 — 與展館直接接駁。" } },
      { slug: "nangang", lat: 25.0533, lng: 121.6069,
        name: { en: "Nangang Station (THSR/TRA/MRT)", zh: "南港車站(高鐵/台鐵/捷運)" },
        body: { en: "High Speed Rail, TRA and metro interchange, ~1 stop away.", zh: "高鐵、台鐵與捷運轉乘，約一站之隔。" } },
      { slug: "hotel-courtyard", lat: 25.0593, lng: 121.6160,
        name: { en: "Nearby Hotels (Nangang)", zh: "鄰近住宿(南港)" },
        body: { en: "Several business hotels sit within walking/short-ride distance; check the official hotel list.", zh: "多間商務旅宿位於步行/短程車程內；請參考官方住宿名單。" } }
    ]
  },

  /* ============================ FAQ ============================ */
  {
    slug: "faq",
    layout: "faq",
    icon: "help",
    title:    { en: "Visitor FAQ", zh: "參觀常見問題" },
    subtitle: {
      en: "Practical answers for planning your visit. Verify specifics on the official site.",
      zh: "規劃參觀的實用解答；細節請以官方為準。"
    },
    qa: [
      { q: { en: "When is the exhibition open?", zh: "展覽開放時間？" },
        a: { en: "The exhibition runs July 16–19, 2026, 10:00–18:00 (the final day closes at 17:00). The conference runs July 15–19.", zh: "展覽為 2026/7/16–19，10:00–18:00(最後一日至 17:00)；大會為 7/15–19。" } },
      { q: { en: "How do I register to visit?", zh: "如何登記入場？" },
        a: { en: "Pre-register online and enter with your confirmation/badge. Check the official site for the registration window and any qualification requirements.", zh: "請線上預先登記，憑證/識別證入場。登記期間與資格要求請以官方公告為準。" } },
      { q: { en: "Can children under 12 enter?", zh: "12 歲以下兒童可入場嗎？" },
        a: { en: "For safety reasons, children under 12 are not permitted in the exhibition halls.", zh: "基於安全考量，12 歲以下兒童不開放進入展館。" } },
      { q: { en: "How do I get to the venue?", zh: "如何前往場地？" },
        a: { en: "Take the metro to Taipei Nangang Exhibition Center station (Bannan/Wenhu lines), which connects directly to the venue. High Speed Rail and TRA arrive at nearby Nangang Station.", zh: "搭捷運至「南港展覽館站」(板南/文湖線)，與展館直連；高鐵、台鐵可至鄰近南港車站。" } },
      { q: { en: "Is there parking?", zh: "現場有停車場嗎？" },
        a: { en: "Parking is available at and around the exhibition center, but public transit is strongly recommended during the event.", zh: "展館及周邊設有停車場，但展期期間強烈建議搭乘大眾運輸。" } },
      { q: { en: "How can my company exhibit?", zh: "公司想參展該怎麼辦？" },
        a: { en: "Contact the exhibition operator, Chan Chao International, at 02-2659-6000 or CustomerService@chanchao.com.tw.", zh: "請洽展覽承辦單位展昭國際：02-2659-6000 或 CustomerService@chanchao.com.tw。" } },
      { q: { en: "How do I book partnering meetings?", zh: "如何預約商機媒合？" },
        a: { en: "Use the conference’s online partnering system to pre-book one-on-one meetings ahead of the event.", zh: "透過大會的線上媒合系統，於會前預約一對一會議。" } },
      { q: { en: "Do forums require separate registration?", zh: "論壇需要另外報名嗎？" },
        a: { en: "Conference forums and symposia generally require registration, and some are paid. See the official programme for details.", zh: "大會論壇與研討會多需註冊，部分需付費，請依官方議程公告。" } }
    ]
  }
];
