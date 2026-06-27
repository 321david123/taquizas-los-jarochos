/* ============================================================
   TAQUIZAS LOS JAROCHOS — interactions
   ============================================================ */
(function () {
  "use strict";

  const mm = (q) => (typeof window.matchMedia === "function" ? window.matchMedia(q) : { matches: false });
  const prefersReduced = mm("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- Year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = "2026";

  /* ============================================================
     MENU DATA (real items + real prices)
     ============================================================ */
  const MENU = [
    { section: "Breakfast", es: "Desayuno", items: [
      { n: "Mexican Breakfast", d: "", p: "$11.49" },
      { n: "Huevos con Jamón", d: "Eggs with ham, rice, beans & corn tortillas", p: "$11.49" },
    ]},
    { section: "Appetizers", es: "Entradas", items: [
      { n: "Cheese Dip", d: "", p: "$6.24" },
      { n: "Guacamole", d: "", p: "$6.24" },
    ]},
    { section: "Seafood", es: "Mariscos", items: [
      { n: "Camarones al Mojo de Ajo", d: "Garlic shrimp with rice, salad, guacamole & corn tortillas", p: "$24.09" },
      { n: "Camarones a la Diabla", d: "Chipotle shrimp with rice, salad, avocado & tortillas", p: "$24.09" },
      { n: "Campechana", d: "Shrimp, octopus & crab with cocktail sauce and crackers", p: "$20.94" },
      { n: "Coctel de Camarón", d: "Shrimp cocktail with onions, cilantro, avocado, lime & cocktail sauce", p: "$17.79" },
      { n: "Tilapia a la Veracruzana", d: "Two fillets in Mexican sauce with rice, salad, guacamole & tortillas", p: "$20.94" },
      { n: "Tilapia a la Diabla", d: "Chipotle tilapia with rice, salad, avocado & tortillas", p: "$20.94" },
      { n: "Tilapia Empanizada", d: "Breaded tilapia with cocktail sauce", p: "$17.79" },
      { n: "Mojarra Frita", d: "Fried whole fish with rice, beans, salad, tortillas, sauce & mayo", p: "$17.79" },
      { n: "Tostadas de Camarones", d: "Shrimp tostadas with cilantro, onion, tomato & avocado", p: "$5.73" },
    ]},
    { section: "Platters", es: "Platillos", items: [
      { n: "El Jarocho", d: "Carne asada with vegetables, shrimp, cheese, salad, rice, beans & avocado", p: "$20.94" },
      { n: "Cajete Loco", d: "Carne enchilada, steak, chicken, cheese, garlic shrimp & roasted cactus", p: "$24.10" },
      { n: "Camarones El Jarocho", d: "Breaded shrimp with rice, salad, guacamole, chipotle dressing & tortillas", p: "$25.14" },
      { n: "Filete de Tilapia y Camarones al Ajillo", d: "Tilapia fillet & garlic shrimp with rice, salad & tortillas", p: "$24.09" },
      { n: "Carne Asada", d: "Grilled steak with rice, beans, cream, guacamole & tortillas", p: "$16.74" },
      { n: "Carne Enchilada", d: "Pork steak with rice, beans, quesadilla, roasted onion & chile", p: "$18.84" },
      { n: "Quesabirrias", d: "Three barbacoa tacos with cheese and consommé", p: "$15.69" },
      { n: "Quesadilla Suprema", d: "Grilled chicken with onions, peppers, chipotle sauce & guacamole", p: "$16.75" },
      { n: "Flautas de Pollo a la Mexicana", d: "Chicken flautas with rice, salad & avocado", p: "$14.64" },
      { n: "Alambre de Pastor", d: "Pork with pineapple, chorizo, ham, rice, beans & tortillas", p: "$20.94" },
      { n: "Tampiqueña Veracruzana", d: "Picadas, fried plantains & carne asada", p: "$19.89" },
      { n: "Tostada Suprema", d: "Chicken, shrimp, steak, beans, vegetables & guacamole", p: "$20.94" },
      { n: "Tostadas de Pollo a la Mexicana", d: "Three chicken tostadas with beans, cream, cheese, lettuce, tomato & avocado", p: "$10.45" },
      { n: "Taco Salad Supremo", d: "Rice, beans, chicken, shrimp, steak & avocado", p: "$20.94" },
      { n: "Torta Jarocha", d: "Beans, lettuce, onions, avocado, cheese, chicken, ham, sausage & mayo", p: "$15.60" },
      { n: "Tortas", d: "Steak, pork, chicken or ham with beans, lettuce, onions, cilantro & fries", p: "$12.54" },
      { n: "Burrito", d: "Steak or pork with rice, beans, cheese, onions, cilantro & fries", p: "$12.54" },
    ]},
    { section: "Fajitas", es: "Fajitas", items: [
      { n: "Fajita Hawaiiana", d: "Steak, sausage, chicken, bacon & shrimp with peppers, rice, beans, salad, guacamole & tortillas", p: "$21.90" },
      { n: "Fajita Mix", d: "Steak, chicken, shrimp & vegetables with rice, beans, salad, guacamole & tortillas", p: "$20.85" },
      { n: "Steak Fajita", d: "Steak fajita with vegetables, rice, beans, salad, guacamole & tortillas", p: "$19.89" },
    ]},
    { section: "Tacos", es: "Tacos", items: [
      { n: "Pollo (Chicken) Taco", d: "Onion, cilantro, lime & salsa", p: "$4.62" },
      { n: "Pastor (Pork) Taco", d: "Onion, cilantro, lime & salsa", p: "$4.62" },
      { n: "Asada (Steak) Taco", d: "Onion, cilantro, lime & salsa", p: "$4.62" },
    ]},
    { section: "Weekend Specials", es: "Especiales", items: [
      { n: "Caldo de Pescado y Camarones", d: "Tilapia fillet & shrimp broth with corn tortillas", p: "$20.94" },
      { n: "Pozole Rojo de Puerco", d: "Pork hominy in red sauce with salad, limes, chips, salsa & cream", p: "$14.64" },
    ]},
    { section: "Kids", es: "Niños", items: [
      { n: "Chicken Quesadilla", d: "", p: "$6.25" },
      { n: "Cheese Quesadilla", d: "With rice and beans", p: "$6.25" },
      { n: "Nuggets with Fries", d: "", p: "$6.25" },
    ]},
    { section: "Drinks", es: "Bebidas", items: [
      { n: "Horchata", d: "Rice and coconut water", p: "$6.25" },
      { n: "Jamaica", d: "Hibiscus water", p: "$6.25" },
      { n: "Pepsi", d: "", p: "$4.68" },
      { n: "Diet Pepsi", d: "", p: "$4.68" },
      { n: "Starry", d: "", p: "$4.68" },
      { n: "Orange Crush", d: "", p: "$4.68" },
    ]},
  ];

  /* ---------- Render menu tabs + panels ---------- */
  const tabsEl = $("#menuTabs");
  const panelsEl = $("#menuPanels");
  if (tabsEl && panelsEl) {
    MENU.forEach((group, i) => {
      const tab = document.createElement("button");
      tab.className = "menu__tab" + (i === 0 ? " active" : "");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.id = "tab-" + i;
      tab.setAttribute("aria-controls", "panel-" + i);
      tab.textContent = group.section;
      tabsEl.appendChild(tab);

      const panel = document.createElement("div");
      panel.className = "menu__panel" + (i === 0 ? " active" : "");
      panel.id = "panel-" + i;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + i);
      if (i !== 0) panel.hidden = true;

      const grid = document.createElement("div");
      grid.className = "menu__grid";
      group.items.forEach((it) => {
        const row = document.createElement("div");
        row.className = "menu__item";
        const desc = it.d ? `<p class="menu__item-desc">${it.d}</p>` : "";
        row.innerHTML = `
          <span class="menu__item-name">${it.n}</span>
          <span class="menu__item-price">${it.p}</span>
          ${desc}`;
        grid.appendChild(row);
      });
      panel.appendChild(grid);
      panelsEl.appendChild(panel);
    });

    const tabs = $$(".menu__tab", tabsEl);
    const panels = $$(".menu__panel", panelsEl);
    tabsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu__tab");
      if (!btn) return;
      const idx = tabs.indexOf(btn);
      tabs.forEach((t, j) => {
        t.classList.toggle("active", j === idx);
        t.setAttribute("aria-selected", j === idx ? "true" : "false");
      });
      panels.forEach((p, j) => {
        p.classList.toggle("active", j === idx);
        p.hidden = j !== idx;
      });
    });
    // keyboard arrow nav
    tabsEl.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const current = tabs.indexOf(document.activeElement);
      if (current === -1) return;
      const next = e.key === "ArrowRight" ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  }

  /* ============================================================
     NAV scroll state
     ============================================================ */
  const nav = $("#nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile overlay ---------- */
  const burger = $("#burger");
  const overlay = $("#overlay");
  const toggleMenu = (open) => {
    const isOpen = open ?? !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  };
  burger.addEventListener("click", () => toggleMenu());
  $$("#overlay a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) toggleMenu(false);
  });

  /* ============================================================
     OPEN-NOW + today highlight
     ============================================================ */
  // hours[day] = [openMin, closeMin] in minutes; close>1440 means crosses midnight; null = closed
  const HOURS = {
    0: [9 * 60, 27 * 60],   // Sun 9:00am – 3:00am next day
    1: null,                // Mon closed
    2: [10 * 60, 21 * 60],
    3: [10 * 60, 21 * 60],
    4: [10 * 60, 21 * 60],
    5: [9 * 60, 21 * 60],
    6: [9 * 60, 21 * 60],
  };
  (function openNow() {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    let isOpen = false;
    // today's window
    const t = HOURS[day];
    if (t && mins >= t[0] && mins < t[1]) isOpen = true;
    // spillover from previous day (e.g. Sunday 3am still "open" from prev window > 1440)
    const prev = HOURS[(day + 6) % 7];
    if (prev && prev[1] > 1440 && mins < prev[1] - 1440) isOpen = true;

    const badge = $("#openNow");
    if (badge && isOpen) badge.classList.add("show");

    const todayRow = $(`.hours__row[data-day="${day}"]`);
    if (todayRow) todayRow.classList.add("today");
  })();

  /* ============================================================
     Wait for deferred libs, then init animations
     ============================================================ */
  function initWhenReady() {
    if (window.Swiper && window.gsap) return init();
    let tries = 0;
    const id = setInterval(() => {
      tries++;
      if ((window.Swiper && window.gsap) || tries > 60) {
        clearInterval(id);
        init();
      }
    }, 60);
  }

  function init() {
    /* ---------- Lenis smooth scroll ---------- */
    let lenis = null;
    if (window.Lenis && !prefersReduced) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      if (window.gsap && window.ScrollTrigger) {
        lenis.on("scroll", ScrollTrigger.update);
      }
    }
    // anchor links -> lenis
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id === "#" || id === "#top") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -70 });
        else target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      });
    });

    /* ---------- Swiper: gallery ---------- */
    if (window.Swiper) {
      new Swiper(".gallery-swiper", {
        slidesPerView: 1.15,
        spaceBetween: 18,
        centeredSlides: false,
        grabCursor: true,
        loop: true,
        pagination: { el: ".gallery-swiper .swiper-pagination", clickable: true },
        breakpoints: {
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          900: { slidesPerView: 3.2, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 26 },
        },
      });
      new Swiper(".review-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: prefersReduced ? false : { delay: 5500, disableOnInteraction: false },
        pagination: { el: ".review-swiper .swiper-pagination", clickable: true },
      });
    }

    if (prefersReduced) {
      $$(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    /* ---------- GSAP reveals ---------- */
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // generic reveals
      $$(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 44, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      // hero title lines
      gsap.from("[data-hero-line]", {
        yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15,
      });
      gsap.from(".hero__script, .hero__sub, .hero__cta, .hero__badges", {
        y: 24, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.6,
      });

      // hero parallax — drive the wrapper, not the <img>.
      // The <img> already owns `transform` via the Ken-Burns CSS keyframes;
      // animating its transform here would fight that animation and cause jank.
      gsap.to(".hero__media", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // dish image parallax
      $$(".dish__media img").forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: img.closest(".dish"), start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* ---------- Counters ---------- */
      $$("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: end, duration: 1.6, ease: "power2.out",
              onUpdate: () => { el.textContent = prefix + Math.round(obj.v) + suffix; },
            });
          },
        });
      });

      // Lenis is wired to ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
      // above and scrolls the default window scroller, so no scrollerProxy is needed.
      // (A previous empty scrollerProxy(document.body, {}) corrupted trigger math.)
      ScrollTrigger.refresh();
    }

    /* ---------- Sticky mobile action bar ---------- */
    const bar = $("#actionBar");
    if (bar) {
      const heroH = () => (document.querySelector(".hero")?.offsetHeight || 600) * 0.6;
      const toggleBar = () => bar.classList.toggle("show", window.scrollY > heroH());
      toggleBar();
      window.addEventListener("scroll", toggleBar, { passive: true });
    }

    /* ---------- Magnetic primary CTAs (subtle) ---------- */
    if (mm("(pointer:fine)").matches) {
      $$(".btn--lg").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.18;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          btn.style.transform = `translate(${x}px, ${y - 2}px)`;
        });
        btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
      });
    }
  }

  initWhenReady();
})();
