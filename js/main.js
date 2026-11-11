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
    var d = demos[i];
    if (!d) { return; }
    $("#it").textContent = d.titulo;
    $("#cap").textContent = d.frase;
    $("#bl").innerHTML = d.puntos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    $("#demoWa").setAttribute("data-wa", "Hola, quiero ver una demo de: " + d.titulo + ".");
    setWaLinks();
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
