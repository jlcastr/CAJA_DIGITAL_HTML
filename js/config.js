/* ============================================================
   Caja Digital · contenido editable
   Cambia aquí los datos de contacto, precios, clientes y demos.
   Todos los valores marcados como EJEMPLO deben reemplazarse
   antes de publicar. No necesitas tocar index.html ni main.js.
   ============================================================ */
window.CAJA_CONFIG = {

  /* --- Contacto (EJEMPLO) --- */
  // WhatsApp con lada de país, sin "+" ni espacios. México: 52 + 10 dígitos.
  whatsapp: "7621115764",
  whatsappVisible: "762 111 5764",
  correo: "hola@cajadigital.mx",
  ubicacion: "Tu ciudad, Estado",
  horario: "Lunes a sábado · 9:00 a 19:00",

  /* --- Mensajes que se precargan en WhatsApp --- */
  mensajeGeneral: "Hola, quiero cotizar un servicio de Caja Digital.",

  /* --- Nota debajo de los paquetes (EJEMPLO: quítala al poner precios reales) --- */
  notaPrecios: "Precios de ejemplo en pesos mexicanos. Cada proyecto se confirma con una cotización sin compromiso.",

  /* --- Clientes ---
     icono: kitchen | diamond | glass | book
     logo: ruta de una imagen (ej. "img/clientes/taqueria.webp"); si se deja vacío se usa el ícono.
     La sección se oculta sola si hay menos de "minClientes" clientes. */
  minClientes: 3,
  mostrarMarcadorLogo: true, // casilla punteada "Tu logo"; ponlo en false al tener clientes reales
  clientes: [
    { nombre: "Taquería", icono: "kitchen", logo: "" },
    { nombre: "Joyería",  icono: "diamond", logo: "" },
    { nombre: "Salón",    icono: "glass",   logo: "" },
    { nombre: "Papelería", icono: "book",   logo: "" }
  ],

  /* --- "Míralo en acción" ---
     imagen: ruta de una captura real (ej. "img/capturas/pos.webp"). Si se deja vacía
     se muestra la maqueta por defecto. */
  demos: [
    { titulo: "Vende más rápido", frase: "Cobra, imprime tickets y consulta las ventas del día.",
      puntos: ["Ticket al instante", "Corte de caja diario", "Compatible con impresora y lector"], imagen: "" },
    { titulo: "Controla tu inventario", frase: "Sabe cuánto tienes y qué se está acabando.",
      puntos: ["Avisos de pocas piezas", "Entradas y salidas", "Reportes para tu contador"], imagen: "" },
    { titulo: "Menú con pedidos por QR", frase: "Tus clientes escanean, ven el menú y piden desde su celular.",
      puntos: ["Se actualiza en minutos", "QR para cada mesa", "Pedidos directo a cocina"], imagen: "" },
    { titulo: "Invitación para compartir", frase: "Tus invitados la abren desde WhatsApp y confirman asistencia.",
      puntos: ["Confirmación de asistencia", "Mapa del lugar", "Cuenta regresiva al evento"], imagen: "" }
  ],

  /* --- Paquetes y precios (EJEMPLO) ---
     popular: true marca el paquete con "Más popular".
     precio "Cotiza" muestra el botón "Pedir cotización". */
  paquetes: [
    { servicio: "Invitaciones", items: [
      { nombre: "Básica", precio: "$600", puntos: ["Diseño con tus datos", "Mapa del lugar", "Enlace para compartir"] },
      { nombre: "Con confirmación", precio: "$1,100", popular: true, puntos: ["Todo lo de Básica", "Confirmación de asistencia", "Lista de invitados"] },
      { nombre: "Premium", precio: "$1,800", puntos: ["Todo lo anterior", "Música y galería de fotos", "Cuenta regresiva al evento"] }
    ]},
    { servicio: "Menús digitales", items: [
      { nombre: "Menú QR", precio: "$900", puntos: ["Menú con tus platillos", "Código QR para las mesas", "Cambios de precios"] },
      { nombre: "Con pedidos", precio: "$2,200", popular: true, puntos: ["Todo lo de Menú QR", "Pedidos desde el celular", "Aviso directo a cocina"] },
      { nombre: "Completo", precio: "$3,800", puntos: ["Todo lo anterior", "Reportes de ventas", "Soporte mensual"] }
    ]},
    { servicio: "Sistemas de venta", items: [
      { nombre: "Punto de venta", precio: "$4,500", puntos: ["Ventas y tickets", "Corte de caja diario", "Capacitación incluida"] },
      { nombre: "Con inventario", precio: "$8,500", popular: true, puntos: ["Todo lo anterior", "Inventario y alertas", "Reportes de ventas"] },
      { nombre: "A tu medida", precio: "Cotiza", puntos: ["Sistema hecho para tu negocio", "Análisis de tus procesos", "Soporte y mejoras"] }
    ]},
    { servicio: "Reparación", items: [
      { nombre: "Diagnóstico", precio: "$200", puntos: ["Revisión del equipo", "Presupuesto claro", "Sin compromiso"] },
      { nombre: "Mantenimiento", precio: "$450", popular: true, puntos: ["Limpieza interna", "Optimización del sistema", "Revisión de componentes"] },
      { nombre: "Reparación", precio: "$700", puntos: ["Cambio de piezas", "Recuperación de datos", "Garantía por escrito"] }
    ]}
  ]
};
