/* Caja Digital · comportamiento de la página (sin backend, sin dependencias) */
(function () {
  "use strict";
  var C = window.CAJA_CONFIG;
  if (!C) { return; }

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(msg) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  }
  function icon(id) {
    return '<svg class="ico" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }

  /* --- Datos de contacto --- */
  var map = {
    ubicacion: C.ubicacion,
    horario: C.horario,
    correo: C.correo,
    whatsappVisible: C.whatsappVisible,
    notaPrecios: C.notaPrecios
  };
  $$("[data-cfg]").forEach(function (el) {
    var v = map[el.getAttribute("data-cfg")];
    if (v !== undefined) { el.textContent = v; }
  });

  $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + C.correo; });

  /* --- Botones de WhatsApp con mensaje precargado --- */
  function setWaLinks() {
    $$("[data-wa]").forEach(function (a) {
      a.href = waLink(a.getAttribute("data-wa") || C.mensajeGeneral);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  setWaLinks();

  /* --- Clientes (se oculta si hay menos de minClientes) --- */
  var band = $("#clientes");
  var clientes = C.clientes || [];
  if (clientes.length < (C.minClientes || 3)) {
    band.hidden = true;
  } else {
    var html = clientes.map(function (c) {
      var visual = c.logo
        ? '<img src="' + esc(c.logo) + '" alt="' + esc(c.nombre) + '" loading="lazy" width="120" height="34">'
        : '<span class="ic">' + icon(c.icono || "kitchen") + "</span>" + esc(c.nombre);
      return '<div class="l">' + visual + "</div>";
    }).join("");
    if (C.mostrarMarcadorLogo) {
      html += '<div class="l add"><span class="ic">' + icon("plus") + "</span>Tu logo</div>";
    }
    $("#lg").innerHTML = html;
  }

  /* --- Pestañas accesibles (con flechas del teclado) --- */
  function tabs(list, onSelect) {
    var btns = $$("[role=tab]", list);
    function select(i, focus) {
      btns.forEach(function (b, j) {
        b.setAttribute("aria-selected", i === j ? "true" : "false");
        b.tabIndex = i === j ? 0 : -1;
      });
      if (focus) { btns[i].focus(); }
      onSelect(i);
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(i); });
      b.addEventListener("keydown", function (e) {
        var k = e.key, n = btns.length;
        if (k === "ArrowRight") { e.preventDefault(); select((i + 1) % n, true); }
        if (k === "ArrowLeft") { e.preventDefault(); select((i - 1 + n) % n, true); }
      });
    });
    select(0);
  }

  /* --- Visor de menús: demo interactiva + ejemplos de diseño --- */
  var mnBox = $("#mn");
  var menus = C.menus || [];
  var live = C.menuInteractivo && C.menuInteractivo.url ? C.menuInteractivo : null;
  var mnReset = null; // se define abajo; se llama al entrar a la pestaña "Menú digital"
  var mnOn = false;   // true mientras la pestaña "Menú digital" está visible
  if (mnBox && menus.length) {
    var mi = live ? -1 : 0, pi = 0, touchX = null;
    mnBox.innerHTML =
      '<div class="mn-chips" role="group" aria-label="Elige un menú de ejemplo">' +
      (live ? '<button class="tb mn-live" type="button" data-i="-1" aria-pressed="false">Menú interactivo ' +
        '<span class="mn-badge"><i class="mn-dot" aria-hidden="true"></i>En vivo</span></button>' : "") +
      '<div class="mn-more">' +
      (live ? '<span class="mn-sep" aria-hidden="true"></span><span class="mn-lbl">Más estilos de diseño</span>' : "") +
      menus.map(function (m, i) {
        return '<button class="tb" type="button" data-i="' + i + '" aria-pressed="false">' + esc(m.nombre) + "</button>";
      }).join("") + "</div></div>" +
      '<div class="mn-book">' +
      '<button class="mn-arr" type="button" data-d="-1" aria-label="Página anterior">' + icon("chev-l") + "</button>" +
      '<div class="mn-page"><img width="480" height="720" decoding="async" alt="">' +
      (live ? '<div class="mn-frame"><iframe width="390" height="800" loading="lazy" title="Demo de menú digital interactivo"></iframe></div>' : "") + "</div>" +
      '<button class="mn-arr" type="button" data-d="1" aria-label="Página siguiente">' + icon("chev-r") + "</button>" +
      "</div>" +
      '<div class="mn-count" aria-live="polite"></div>';
    var mnImg = $(".mn-page img", mnBox);
    var mnFrame = $(".mn-page iframe", mnBox);
    var mnCount = $(".mn-count", mnBox);
    var mnChips = $$(".mn-chips .tb", mnBox);
    if (live) {
      /* El iframe se renderiza con viewport de celular (390 px) y se reduce con scale
         para que quepa en el marco: factor = ancho del marco / 390, nunca mayor a 1. */
      var mnWrap = $(".mn-frame", mnBox);
      var fitFrame = function () {
        var w = mnWrap.clientWidth, h = mnWrap.clientHeight;
        if (!w || !h) { return; }
        var k = Math.min(1, w / 390);
        mnFrame.style.height = (h / k) + "px";
        mnFrame.style.transform = "scale(" + k + ")";
      };
      if (window.ResizeObserver) { new ResizeObserver(fitFrame).observe(mnWrap); }
      else { window.addEventListener("resize", fitFrame); }
      $("#mnOpen").innerHTML =
        '<a href="' + esc(live.url) + '" target="_blank" rel="noopener">Abrir en pantalla completa</a>' +
        (live.qr ? '<figure class="mn-qr"><img src="' + esc(live.qr) + '" width="90" height="90" loading="lazy" alt="Código QR para abrir la demo en tu celular"><figcaption>Escanéalo con tu celular</figcaption></figure>' : "");
    }
    var paintMenu = function () {
      var isLive = mi < 0, m = isLive ? null : menus[mi];
      mnBox.classList.toggle("live", isLive);
      mnChips.forEach(function (b) {
        b.setAttribute("aria-pressed", parseInt(b.getAttribute("data-i"), 10) === mi ? "true" : "false");
      });
      if (mnOn) {
        var d = isLive ? live : demos[2];
        if (d) {
          $("#it").textContent = d.titulo;
          $("#cap").textContent = d.frase;
          $("#bl").innerHTML = d.puntos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
          $("#demoWa").setAttribute("data-wa", "Hola, quiero ver una demo de: " + d.titulo + ".");
          setWaLinks();
        }
        $("#mnOpen").hidden = !isLive;
        $("#mnNote").hidden = isLive || !live;
      }
      if (isLive) {
        if (mnOn && !mnFrame.getAttribute("src")) { mnFrame.src = live.url; } // se carga solo la primera vez que se ve
        mnCount.textContent = "Demo en vivo · toca y agrega platillos";
        return;
      }
      var n = m.paginas.length;
      mnImg.src = m.paginas[pi];
      mnImg.alt = "Menú de ejemplo de " + m.nombre + ", página " + (pi + 1) + " de " + n;
      mnCount.textContent = "Página " + (pi + 1) + " de " + n;
      if (n > 1) { new Image().src = m.paginas[(pi + 1) % n]; }
    };
    var turn = function (d) {
      if (mi < 0) { return; }
      var n = menus[mi].paginas.length;
      pi = (pi + d + n) % n;
      paintMenu();
    };
    mnReset = function () { mnOn = true; mi = live ? -1 : 0; pi = 0; paintMenu(); };
    mnChips.forEach(function (b) {
      b.addEventListener("click", function () {
        mi = parseInt(b.getAttribute("data-i"), 10);
        pi = 0;
        paintMenu();
      });
    });
    $("#mnLive").addEventListener("click", function (e) {
      e.preventDefault();
      mi = -1; pi = 0;
      paintMenu();
    });
    $$(".mn-arr", mnBox).forEach(function (b) {
      b.addEventListener("click", function () { turn(parseInt(b.getAttribute("data-d"), 10)); });
    });
    var pageBox = $(".mn-page", mnBox);
    pageBox.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    pageBox.addEventListener("touchend", function (e) {
      if (touchX === null) { return; }
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) >= 40) { turn(dx < 0 ? 1 : -1); }
    });
    paintMenu();
  }

  /* --- Míralo en acción --- */
  var screens = $$(".scr");
  var demos = C.demos || [];
  demos.forEach(function (d, i) {
    if (d.imagen && screens[i]) {
      screens[i].innerHTML = '<img src="' + esc(d.imagen) + '" alt="' + esc(d.titulo) + '" loading="lazy">';
    }
  });
  tabs($("#tabs"), function (i) {
    screens.forEach(function (s, j) { s.classList.toggle("on", i === j); });
    mnOn = i === 2 && mnReset !== null;
    $("#mnOpen").hidden = true;
    $("#mnNote").hidden = true;
    var d = demos[i];
    if (!d) { return; }
    $("#it").textContent = d.titulo;
    $("#cap").textContent = d.frase;
    $("#bl").innerHTML = d.puntos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    $("#demoWa").setAttribute("data-wa", "Hola, quiero ver una demo de: " + d.titulo + ".");
    setWaLinks();
    if (mnOn) { mnReset(); } // al entrar a "Menú digital" siempre empieza en "Menú interactivo"
  });

  /* --- Paquetes y precios --- */
  var paquetes = C.paquetes || [];
  var tabsBox = $("#ptabs");
  tabsBox.innerHTML = paquetes.map(function (p) {
    return '<button class="tb" role="tab" type="button">' + esc(p.servicio) + "</button>";
  }).join("");
  tabs(tabsBox, function (i) {
    var grupo = paquetes[i];
    $("#pr").innerHTML = grupo.items.map(function (k) {
      var cot = k.precio === "Cotiza";
      var msg = cot
        ? 'Hola, quiero una cotización de "' + k.nombre + '" (' + grupo.servicio + ")."
        : 'Hola, me interesa el paquete "' + k.nombre + '" de ' + grupo.servicio + ".";
      return '<div class="pk' + (k.popular ? " pop" : "") + '">' +
        (k.popular ? '<span class="bd">Más popular</span>' : "") +
        "<h4>" + esc(k.nombre) + "</h4>" +
        '<div class="am">' + (cot ? "" : "<small>Desde</small>") + "<b>" + esc(k.precio) + "</b></div>" +
        "<ul>" + k.puntos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn" data-wa="' + esc(msg) + '" href="#contacto">' + (cot ? "Pedir cotización" : "Cotizar este paquete") + "</a></div>";
    }).join("");
    setWaLinks();
  });
})();
