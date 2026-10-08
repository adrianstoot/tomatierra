// Minimalist presentation metadata & test questions for Puesta a Tierra (PAT)
// Based on REBT ITC-BT-18, CTE DB-SUA 8, UNE-EN 62561 & NTE-IEP

const PRESENTATION = {
  title: "PUESTA A TIERRA (PAT) • Instalaciones y Control de Calidad",
  subject: "REBT ITC-BT-18 • CTE DB-SUA 8 • UNE-EN 62561 • Código Técnico",
  totalSlides: 15,
  chapters: [
    { id: 1, name: "1. Principios y Esquemas Reglamentarios", range: [1, 4], slideStart: 1 },
    { id: 2, name: "2. Grapas Mecánicas y Picas Verticales", range: [5, 7], slideStart: 5 },
    { id: 3, name: "3. Soldadura Aluminotérmica (Exotérmica)", range: [8, 11], slideStart: 8 },
    { id: 4, name: "4. Cimentación, Equipotencialidad y Arquetas", range: [12, 15], slideStart: 12 }
  ],
  slides: [
    {
      id: 1,
      image: "slides/slide-01.png",
      title: "Esquema Funcional y Principio Básico de la Puesta a Tierra",
      subtitle: "REBT ITC-BT-18 • Masas, Bornes, Canalizaciones y Conductores",
      chapterId: 1,
      chapterName: "1. Principios y Esquemas Reglamentarios",
      normative: "REBT ITC-BT-18 • UNE 20460-5-54",
      tags: ["Esquema Funcional", "Masa (M)", "Borne Principal (B)", "Unión Equipotencial", "Electrodo (T)"],
      summary: "Diagrama normativo fundamental de la ITC-BT-18. Define las partes esenciales: Masa (M) conectada mediante conductor de protección (1); Borne Principal de Tierra (B) que centraliza las conexiones; Canalización metálica principal de agua (P) unida mediante conductor equipotencial principal (2); Conductor de tierra o línea de enlace con el electrodo (3); Conductor de equipotencialidad suplementaria (4) conectando masas a elementos conductores extraños (C); y Toma de tierra o electrodo en el terreno (T)."
    },
    {
      id: 2,
      image: "slides/slide-02.png",
      title: "Esquema General de Puesta a Tierra y Secciones Reglamentarias",
      subtitle: "Dimensionamiento de LET, LPT, DLPT y Puente de Comprobación",
      chapterId: 1,
      chapterName: "1. Principios y Esquemas Reglamentarios",
      normative: "REBT ITC-BT-18 Tabla 1 • ITC-BT-26 Pto. 3.4",
      tags: ["Secciones Mínimas", "LET", "LPT >= 16 mm²", "DLPT >= 6 mm²", "Puente Seccionador"],
      summary: "Esquema unifilar con especificación de secciones mínimas reglamentarias: Línea de Enlace con Tierra (LET) según ITC-BT-18 Tabla 1 (mínimo 35 mm² de Cu desnudo enterrado); Línea Principal de Tierra (LPT) con sección mínima S_mín >= 16 mm² de cobre aislado (ITC-BT-26 Pto. 3.4); Derivación de Línea Principal de Tierra (DLPT) con S_mín >= 6 mm² o igual a la sección de la derivación individual. Incorpora el puente de comprobación o seccionador para aislamiento y medición con telurómetro."
    },
    {
      id: 3,
      image: "slides/slide-03.png",
      title: "Esquema Unifilar del Circuito de Protección en Edificio de Viviendas",
      subtitle: "Distribución desde el Anillo de Cimentación hasta las Viviendas",
      chapterId: 1,
      chapterName: "1. Principios y Esquemas Reglamentarios",
      normative: "REBT ITC-BT-18 • ITC-BT-26 • NTE-IEP",
      tags: ["Edificio Viviendas", "Anillo Cu 35 mm²", "Picas 2 m", "Ascensor 6 mm²", "Baños 4 mm²"],
      summary: "Esquema integral de distribución de tierra en bloque residencial: Anillo perimetral de conductor de cobre desnudo de 35 mm² enterrado en tierra bajo zapatas, con picas verticales de acero cobreado de 2 m soldadas aluminotérmicamente; Línea de Enlace con Tierra (35 mm²) hacia el punto de puesta a tierra y seccionador; Línea Principal de Tierra hacia el embarrado de centralización de contadores de luz; Derivaciones hacia ascensor (6 mm²), centralización de agua (4 mm²), grupo de presión (4 mm²), servicios comunes (6 mm²) y viviendas con red equipotencial en baños (4 mm²), cocina (6 mm²), tomas de fuerza (2,5 mm²) y alumbrado (1,5 mm²)."
    },
    {
      id: 4,
      image: "slides/slide-04.png",
      title: "Cadena de Conexión Eléctrica y Red de Tierra en Baja Tensión",
      subtitle: "Del Centro de Transformación a la Vivienda: CGP, LGA y PAT",
      chapterId: 1,
      chapterName: "1. Principios y Esquemas Reglamentarios",
      normative: "REBT ITC-BT-11 • ITC-BT-12 • ITC-BT-14 • ITC-BT-18",
      tags: ["Centro Transformación", "CGP", "LGA", "Contadores", "Arqueta PAT", "CGMP"],
      summary: "Infraestructura eléctrica completa enlazada con la red de puesta a tierra: Acometida aérea/subterránea desde red de distribución en BT con conector estanco; Caja General de Protección (CGP); Línea General de Alimentación (LGA) con interruptor general de maniobra; Centralización de contadores; Anillo de p.a.t. con picas verticales en el terreno; Arqueta registrable con seccionador de tierra; Borne principal y derivaciones individuales hacia el Cuadro General de Mando y Protección (CGMP) de cada usuario."
    },
    {
      id: 5,
      image: "slides/slide-05.png",
      title: "Grapa Mecánica de Conexión con Perno en U para Pica y Conductor",
      subtitle: "Unión Pica de Acero Cobreado y Cable de Cobre Multifilar",
      chapterId: 2,
      chapterName: "2. Grapas Mecánicas y Picas Verticales",
      normative: "UNE-EN 62561-1 • UNE-EN 62561-2",
      tags: ["Grapa en U", "Latón Forjado", "Pica Acero Cobreado", "Cable Cobre Desnudo"],
      summary: "Detalle tridimensional de conexión desmontable por compresión mecánica. Compuesta por cuerpo de latón/bronce forjado de alta resistencia mecánica a la corrosión y abarcon roscado en 'U' de acero inoxidable o latón naval con tuercas hexagonales. Abraza firmemente la cabeza de la pica de acero cobreado y presiona los cordones de cable de cobre desnudo pasantes asegurando una presión de contacto constante y baja resistividad óhmica."
    },
    {
      id: 6,
      image: "slides/slide-06.png",
      title: "Soldadura Aluminotérmica en 'T' Conforme (Fusión Molecular)",
      subtitle: "Control de Calidad: Fusión Molecular Cobre-Cobre sin Defectos",
      chapterId: 3,
      chapterName: "3. Soldadura Aluminotérmica (Exotérmica)",
      normative: "UNE-EN 62561-1 • IEEE 837 • REBT ITC-BT-18",
      tags: ["Soldadura Aluminotérmica", "Fusión Conforme", "Sin Rechupes", "Cobre Puro"],
      summary: "Ejemplo de unión aluminotérmica conforme y aprobada en control de calidad. La reacción exotérmica reductora (3CuO + 2Al -> 3Cu + Al2O3 + calor a >2000 °C) produce una masa de cobre de extrema pureza que funde molecularmente los cables de cobre trenzados en nudo en T. Presenta superficie homogénea, brillo metálico cobrizo, redondeada, sin inclusiones de escoria de alúmina ni porosidad por humedad, garantizando igual o menor resistencia eléctrica que el conductor nativo."
    },
    {
      id: 7,
      image: "slides/slide-07.png",
      title: "Grapa de Apriete Pica-Conductor de Doble Tornillo de Alta Presión",
      subtitle: "Abrazadera Mecánica Bimetálica con Mordaza Estriada",
      chapterId: 2,
      chapterName: "2. Grapas Mecánicas y Picas Verticales",
      normative: "UNE-EN 62561-1 • REBT ITC-BT-18 Pto. 3.1",
      tags: ["Grapa Doble Tornillo", "Mordaza Estriada", "Par de Apriete", "Conexión Mecánica"],
      summary: "Grapa de apriete mecánico modelo XM-615 de latón fundido con dos tornillos pasantes de acero cincado/inoxidable. Dispone de asiento curvo para alojar la pica vertical y ranura transversal para prensar el conductor de cobre horizontal de 35 a 50 mm². Diseñada para resistir esfuerzos de tracción mecánica e intemperie cuando no se utiliza soldadura aluminotérmica, requiriendo verificación de par de apriete mediante llave dinamométrica."
    },
    {
      id: 8,
      image: "slides/slide-08.png",
      title: "Soldadura Aluminotérmica en Cruz en Zanja de Cimentación",
      subtitle: "Unión Tetrapolar del Anillo de Cobre Desnudo en Obra Real",
      chapterId: 3,
      chapterName: "3. Soldadura Aluminotérmica (Exotérmica)",
      normative: "REBT ITC-BT-18 • NTE-IEP • Control de Ejecución",
      tags: ["Unión en Cruz", "Nudo Tetrapolar", "Zanja Cimentación", "Anillo Enterrado"],
      summary: "Fotografía de ejecución real en obra: unión en cruz de 4 ramas de cable de cobre desnudo trenzado sobre el terreno natural del fondo de la zanja. Se observa el botón central de cobre fundido perfectamente solidificado que une de manera indivisible las ramas de la malla perimetral. Esta unión queda definitivamente enterrada bajo la solera o zapata, por lo que su durabilidad debe superar los 50 años sin mantenimiento."
    },
    {
      id: 9,
      image: "slides/slide-09.png",
      title: "Molde de Grafito Desmontable para Soldadura Aluminotérmica",
      subtitle: "Anatomía del Molde: Crisol, Tobera de Colada y Cámara de Fusión",
      chapterId: 3,
      chapterName: "3. Soldadura Aluminotérmica (Exotérmica)",
      normative: "UNE-EN 62561-1 • Especificaciones Técnicas del Fabricante",
      tags: ["Molde de Grafito", "Crisol", "Tobera de Colada", "Tenaza de Cierre"],
      summary: "Sección ilustrativa de un molde de grafito de alta pureza y grano fino para soldadura exotérmica. Consta de dos mitades mecanizadas con cavidad cilíndrica vertical para la pica y ranura horizontal para el cable. En la parte superior se sitúa la tolva/crisol donde se deposita el disco metálico y la carga de polvo de soldadura (óxido de cobre + aluminio), comunicada por la tobera de colada con la cámara de soldadura. Se manipula mediante pinzas/tenazas de apriete con empuñadura aislante."
    },
    {
      id: 10,
      image: "slides/slide-10.png",
      title: "Hincado de Pica de Acero Cobreado en Pozo de Tierra en Obra",
      subtitle: "Instalación en Excavación y Conexión de Conductor con Bucle de Dilatación",
      chapterId: 2,
      chapterName: "2. Grapas Mecánicas y Picas Verticales",
      normative: "UNE-EN 62561-2 • REBT ITC-BT-18",
      tags: ["Hincado de Pica", "Pozo de Tierra", "Bucle Dilatación", "Acero Cobreado 250 µm"],
      summary: "Fotografía de campo mostrando el hincado vertical de una pica cilíndrica de acero con recubrimiento de cobre electrolítico de 250 µm mínimos. En la cabeza se observa la grapa mecánica de conexión a la que se fija el cable de cobre desnudo, dotado de un bucle de holgura o compensación térmica para absorber posibles asentamientos mecánicos del terreno o dilataciones sin tensionar la unión ni la cabeza del electrodo."
    },
    {
      id: 11,
      image: "slides/slide-11.png",
      title: "Defectología en Soldadura Aluminotérmica: Rechupes y Cavidades",
      subtitle: "Criterio de Rechazo: Porosidad por Humedad o Falta de Precalentamiento",
      chapterId: 3,
      chapterName: "3. Soldadura Aluminotérmica (Exotérmica)",
      normative: "Criterios de Aceptación/Rechazo IEEE 837 • UNE-EN 62561",
      tags: ["Soldadura Defectuosa", "Rechupe", "Porosidad", "No Conformidad", "Humedad"],
      summary: "Caso real de NO CONFORMIDAD en control de calidad: soldadura aluminotérmica con cavidad interna o rechupe pronunciado en la parte superior. Este defecto se produce típicamente por presencia de agua/humedad en los cables de cobre, omisión del secado/precalentamiento con soplete del molde de grafito antes del disparo, o pérdida de estanqueidad entre las valvas del molde. Esta unión debe ser rechazada, cortada y repetida íntegramente."
    },
    {
      id: 12,
      image: "slides/slide-12.png",
      title: "Cimentación con Zapatas, Riostras y Conexión Equipotencial a Armadura",
      subtitle: "Bucle Perimetral de Cobre y Unión a las Armaduras de Acero Corrugado",
      chapterId: 4,
      chapterName: "4. Cimentación, Equipotencialidad y Arquetas",
      normative: "CTE DB-SUA 8 • NTE-IEP • REBT ITC-BT-18",
      tags: ["Zapatas y Riostras", "Conexión a Armadura", "Acero Corrugado", "Equipotencialidad"],
      summary: "Render 3D de cimentación completa por zapatas aisladas y vigas riostras. El anillo de puesta a tierra recorre perimetralmente las zanjas por el exterior. En los puntos clave, el conductor de cobre asciende e ingresa a las arquetas de registro. El detalle circular ampliado muestra la soldadura aluminotérmica o grapa homologada conectando el cable de cobre directamente al redondo de acero corrugado de la armadura del pilar/zapata, aprovechando la gran masa de hormigón en contacto con el terreno para dispersar corrientes."
    },
    {
      id: 13,
      image: "slides/slide-13.png",
      title: "Arqueta de Hormigón Prefabricado con Embarrado Colector Multiterminal",
      subtitle: "Pletina de Cobre Registrable para Conexión de Derivaciones de Tierra",
      chapterId: 4,
      chapterName: "4. Cimentación, Equipotencialidad y Arquetas",
      normative: "UNE 20460-5-54 • REBT ITC-BT-18",
      tags: ["Arqueta Prefabricada", "Embarrado Colector", "Pletina de Cobre", "Terminales"],
      summary: "Arqueta cuadrada de hormigón prefabricado con tapa partida de inspección. En su interior se aloja una pletina de cobre electrolítico macizo fijada sobre soportes aisladores. Dispone de múltiples tornillos con tuercas donde acometen los terminales de compresión de cobre estañado de los distintos conductores de protección, permitiendo la desconexión individualizada para mantenimiento, revisión y medida."
    },
    {
      id: 14,
      image: "slides/slide-14.png",
      title: "Sección Constructiva 3D de Arqueta con Puente de Comprobación y Pica",
      subtitle: "Detalle de Hincado, Puente Desmontable y Fondo Permeable sin Hormigonar",
      chapterId: 4,
      chapterName: "4. Cimentación, Equipotencialidad y Arquetas",
      normative: "REBT ITC-BT-18 Pto. 3.3 • UNE-EN 62561-5",
      tags: ["Sección 3D", "Arqueta de Registro", "Puente Desmontable", "Pica Hincada", "Fondo Permeable"],
      summary: "Corte axonométrico tridimensional de arqueta de registro enterrada. Destaca la tapa superficial estriada, la regleta o puente de comprobación metálico fijado a la pared para desconexión con herramientas, el cable de enlace curvado que desciende hacia la grapa bimetálica, y la pica vertical hincada en el terreno natural. Es preceptivo que el fondo de la arqueta permanezca en contacto con la tierra permeable (sin solera de hormigón estanco) para permitir el drenaje y la dispersión natural."
    },
    {
      id: 15,
      image: "slides/slide-15.png",
      title: "Centralización de Contadores: Regleta Equipotencial y Derivaciones",
      subtitle: "Entrada de LPT y Distribución de Conductores de Protección hacia Viviendas",
      chapterId: 4,
      chapterName: "4. Cimentación, Equipotencialidad y Arquetas",
      normative: "REBT ITC-BT-16 • ITC-BT-18 • ITC-BT-26",
      tags: ["Regleta Equipotencial", "LPT", "Derivaciones Viviendas", "Cuadro Centralización"],
      summary: "Fotografía real del interior del armario de distribución y centralización de contadores: en la parte superior se observa la regleta equipotencial (barra de cobre desnudo) a la que acomete la Línea Principal de Tierra (LPT) en tubo corrugado con cable amarillo-verde; de ella parten mediante bornes de apriete atornillados las derivaciones de tierra individuales de cada una de las viviendas y servicios del edificio hacia sus correspondientes contadores y cuadros de mando."
    }
  ],
  quiz: [
    {
      id: 1,
      question: "Según el REBT ITC-BT-18 (Tabla 1), ¿cuál es la sección mínima obligatoria para un conductor de tierra de cobre desnudo enterrado sin protección contra la corrosión?",
      options: [
        "16 mm²",
        "25 mm²",
        "35 mm²",
        "50 mm²"
      ],
      correct: 2,
      slideRef: 2,
      explanation: "La Tabla 1 de la ITC-BT-18 establece que para conductores de tierra de cobre protegidos contra la corrosión pero sin protección mecánica es de 25 mm², y enterrados directamente sin protección contra la corrosión la sección mínima es de 35 mm²."
    },
    {
      id: 2,
      question: "¿Cuál es la sección mínima de la Línea Principal de Tierra (LPT) en edificios de viviendas según la ITC-BT-26 (Pto. 3.4)?",
      options: [
        "S_mín >= 6 mm²",
        "S_mín >= 10 mm²",
        "S_mín >= 16 mm²",
        "S_mín >= 35 mm²"
      ],
      correct: 2,
      slideRef: 2,
      explanation: "La ITC-BT-26 punto 3.4 fija taxativamente que la Línea Principal de Tierra que enlaza el borne principal de tierra con los distintos embarrados de centralización tendrá una sección mínima no inferior a 16 mm² de cobre aislado con cubierta verde-amarillo."
    },
    {
      id: 3,
      question: "¿Cuál es la función reglamentaria principal del puente de comprobación o seccionador de tierra según la ITC-BT-18?",
      options: [
        "Permitir la desconexión rápida en caso de incendio en el centro de transformación",
        "Permitir separar la instalación interior del electrodo para medir la resistencia de tierra con telurómetro",
        "Actuar como fusible térmico frente a sobretensiones por rayos",
        "Equilibrar las tensiones de neutro y tierra en redes desequilibradas"
      ],
      correct: 1,
      slideRef: 14,
      explanation: "El puente de comprobación o seccionador debe situarse en lugar accesible para permitir abrir el circuito y desacoplar las masas y derivaciones del electrodo de tierra, posibilitando la medición exacta de la resistencia de difusión con el telurómetro."
    },
    {
      id: 4,
      question: "En una inspección de control de calidad de soldadura aluminotérmica, ¿qué defecto visual mostrado en la diapositiva 11 obliga al rechazo inmediato de la unión?",
      options: [
        "Ligero tono oscuro por presencia de grafito en la superficie",
        "Presencia de rechupe, poro o cavidad profunda por humedad residual o falta de precalentamiento",
        "Forma ligeramente abultada en el cordón de soldadura",
        "Marcas exteriores provocadas por las valvas del molde de grafito"
      ],
      correct: 1,
      slideRef: 11,
      explanation: "La cavidad o rechupe superficial/interno evidencia una desgasificación violenta debida a vapor de agua en los conductores o molde frío. Compromete la sección efectiva de contacto eléctrico y genera resistencia de transición inaceptable. Debe cortarse y rehacerse."
    },
    {
      id: 5,
      question: "¿Cuál es la principal ventaja técnica de la soldadura aluminotérmica frente a las grapas de apriete mecánico en tomas de tierra enterradas?",
      options: [
        "Es un procedimiento desmontable que permite cambios posteriores",
        "Genera una unión molecular homogénea cobre-cobre con idéntica conductividad y sin riesgo de corrosión galvánica",
        "No requiere ningún elemento auxiliar ni molde de grafito",
        "Se ejecuta a temperaturas inferiores a 100 °C para no destemplar el acero"
      ],
      correct: 1,
      slideRef: 6,
      explanation: "La soldadura aluminotérmica (exotérmica) produce una fusión molecular a más de 2000 °C entre los componentes, convirtiendo la unión en un único cuerpo metálico de cobre que no se afloja por vibraciones, no sufre par galvánico ni se sulfata con la humedad del suelo."
    },
    {
      id: 6,
      question: "Según el REBT, ¿cuál es el valor máximo admisible de tensión de contacto en locales húmedos o mojados (ej. cuartos de baño, exteriores)?",
      options: [
        "12 V",
        "24 V",
        "50 V",
        "230 V"
      ],
      correct: 1,
      slideRef: 3,
      explanation: "El REBT fija como tensión límite de seguridad convencional 50 V para locales secos y 24 V para locales conductores, húmedos o mojados. Esto condiciona la resistencia máxima admisible de tierra mediante la fórmula R <= U_c / I_Δn."
    },
    {
      id: 7,
      question: "Si la tensión de contacto límite en un local húmedo es 24 V y el interruptor diferencial principal es de 30 mA (0,03 A), ¿cuál es la resistencia máxima de tierra teórica admisible?",
      options: [
        "80 Ω",
        "150 Ω",
        "800 Ω",
        "1666 Ω"
      ],
      correct: 2,
      slideRef: 3,
      explanation: "R = U_c / I_Δn = 24 V / 0,03 A = 800 Ω. (Si el diferencial fuese de 300 mA, la resistencia máxima admisible sería de solo 24 / 0,3 = 80 Ω)."
    },
    {
      id: 8,
      question: "Según la norma UNE-EN 62561-2, ¿cuál es el espesor mínimo reglamentario del recubrimiento de cobre electrolítico en picas de acero cobreado?",
      options: [
        "50 micrómetros (µm)",
        "100 micrómetros (µm)",
        "250 micrómetros (µm)",
        "1 milímetro (mm)"
      ],
      correct: 2,
      slideRef: 10,
      explanation: "La norma UNE-EN 62561-2 y las prescripciones técnicas de distribución exigen un recubrimiento mínimo de cobre electrolítico de 250 µm para garantizar que la pica resista el hincado mecánico en suelos abrasivos sin perder la protección anticorrosión del núcleo de acero."
    },
    {
      id: 9,
      question: "En la red equipotencial suplementaria de un cuarto de baño (ITC-BT-27), ¿cuál es la sección mínima del conductor de protección que une tuberías y bañera metálica?",
      options: [
        "1,5 mm²",
        "2,5 mm² con protección mecánica o 4 mm² sin ella",
        "6 mm² obligatorios siempre",
        "16 mm²"
      ],
      correct: 1,
      slideRef: 3,
      explanation: "Según la ITC-BT-27 y el esquema de la diapositiva 3, la unión equipotencial suplementaria en cuartos de baño requiere un conductor de cobre de sección mínima de 4 mm² (o 2,5 mm² si va entubado con protección mecánica)."
    },
    {
      id: 10,
      question: "Según el CTE DB-SUA 8 y la NTE-IEP, ¿por qué debe conectarse la red de puesta a tierra a las armaduras de acero de la cimentación de hormigón armado?",
      options: [
        "Para evitar que el hormigón se agriete por dilatación térmica",
        "Para lograr una red equipotencial integral y reducir sustancialmente la resistencia de difusión total al terreno",
        "Para electrificar la estructura y repeler plagas de insectos",
        "Solo es obligatorio si el edificio no dispone de acometida de agua metálica"
      ],
      correct: 1,
      slideRef: 12,
      explanation: "La conexión a las armaduras de zapatas y riostras crea una gran malla equipotencial que iguala los potenciales de toda la estructura, reduce la resistencia global al aprovechar el volumen de hormigón en contacto con el suelo y previene tensiones de paso y contacto peligrosas."
    },
    {
      id: 11,
      question: "Al construir una arqueta de registro para pica de puesta a tierra, ¿qué condición constructiva en su fondo es imperativa según la buena práctica y la normativa?",
      options: [
        "Hormigonar el fondo con mortero hidrófugo sellado para evitar que entre barro",
        "Dejar el fondo permeable en contacto directo con el terreno natural para permitir el drenaje y la difusión de corrientes",
        "Pintar el fondo con resina epoxi aislante dieléctrica",
        "Rellenar la arqueta completamente de cemento rápido tras hincar la pica"
      ],
      correct: 1,
      slideRef: 14,
      explanation: "El fondo de la arqueta debe permanecer libre de hormigón, en contacto directo con la tierra permeable. Esto permite el drenaje de aguas de lluvia y evita que la cabeza del electrodo quede aislada en un recipiente impermeable."
    },
    {
      id: 12,
      question: "¿Cuál es la fórmula reglamentaria del REBT ITC-BT-18 (Pto. 3.2) para el cálculo teórico aproximado de la resistencia de una pica vertical hincada de longitud L en un terreno de resistividad ρ?",
      options: [
        "R = ρ / L",
        "R = 2 · ρ / L",
        "R = 0,8 · ρ / L",
        "R = ρ · L²"
      ],
      correct: 0,
      slideRef: 2,
      explanation: "El REBT ITC-BT-18 punto 3.2 establece para electrodos constituidos por picas verticales la fórmula simplificada: R = ρ / L (donde ρ es la resistividad en Ω·m y L la longitud hincada en metros)."
    },
    {
      id: 13,
      question: "Para un conductor de cobre enterrado horizontalmente formando un anillo cerrado de longitud total L (en metros), ¿cuál es la fórmula aproximada del REBT?",
      options: [
        "R = ρ / L",
        "R = 2 · ρ / L",
        "R = ρ / (2 · L)",
        "R = 0,8 · ρ / P"
      ],
      correct: 1,
      slideRef: 2,
      explanation: "Según la ITC-BT-18 punto 3.2, la fórmula orientativa para un conductor enterrado horizontalmente (anillo o zanja) es R = 2 · ρ / L, lo que refleja que a igual longitud, la pica vertical profunda alcanza estratos más conductores que la zanja superficial."
    },
    {
      id: 14,
      question: "¿Qué precaución imprescindible debe adoptarse con el molde de grafito antes de realizar la primera soldadura aluminotérmica en obra?",
      options: [
        "Sumergirlo en agua fría durante 10 minutos para enfriar las paredes",
        "Precalentarlo con soplete para eliminar toda la humedad residual y evitar rechupes o explosiones de vapor",
        "Engrasar las paredes internas con aceite de motor para desmoldar fácilmente",
        "Lijar la tobera de colada con papel abrasivo metálico"
      ],
      correct: 1,
      slideRef: 9,
      explanation: "El grafito es higroscópico y absorbe humedad atmosférica. Precalentar el molde a más de 120 °C con soplete antes del primer disparo expulsa el vapor de agua. Si no se hace, la reacción a 2000 °C vaporiza el agua instantáneamente, provocando poros, rechupes o proyección peligrosa de material fundido."
    },
    {
      id: 15,
      question: "En la centralización de contadores de un edificio (diapositiva 15), ¿cómo deben conectarse las derivaciones individuales de tierra a la regleta equipotencial?",
      options: [
        "Retorciendo todos los cables juntos y soldándolos con estaño",
        "Mediante bornes de conexión individuales atornillados o terminales prensados fijados mecánicamente a la barra de cobre",
        "Colocándolos directamente bajo una única arandela sin apretar para que puedan deslizarse",
        "Conectándolos en serie de un contador a otro"
      ],
      correct: 1,
      slideRef: 15,
      explanation: "Cada derivación individual debe conectarse a la regleta de cobre mediante borne independiente atornillado o terminal de compresión. Esto asegura que la desconexión de una vivienda por avería o mantenimiento no interrumpa la continuidad del resto de usuarios."
    },
    {
      id: 16,
      question: "¿A qué profundidad mínima aproximada se recomienda enterrar el anillo conductor de cobre en la zanja perimetral de cimentación según la NTE-IEP y REBT?",
      options: [
        "10 a 20 cm",
        "30 cm sobre la cota de acera",
        "Mínimo 50 a 80 cm para situarlo por debajo de la capa de heladas y de desecación superficial",
        "2 metros por debajo del nivel freático exclusivamente"
      ],
      correct: 2,
      slideRef: 8,
      explanation: "El tendido en zanja debe situarse al menos entre 0,5 y 0,8 m de profundidad (habitualmente en el fondo de la excavación de riostras a 0,8 m) para evitar la congelación del terreno en invierno y la desecación en verano, factores que disparan la resistividad del suelo."
    },
    {
      id: 17,
      question: "Al medir la resistencia de puesta a tierra con un telurómetro convencional de 3 bornes (E, P, C), ¿cuál es la disposición reglamentaria de las picas auxiliares?",
      options: [
        "Las dos picas auxiliares se clavan juntas pegadas a la arqueta",
        "Se colocan en línea recta alejadas de la toma (Pica de Potencial a ~20 m y Pica de Corriente a ~30-40 m)",
        "Las picas auxiliares se sumergen en un cubo con agua y sal",
        "Basta con una sola pica auxiliar a 1 metro de distancia"
      ],
      correct: 1,
      slideRef: 14,
      explanation: "El método de caída de potencial del telurómetro exige clavar la pica auxiliar de tensión (P) aproximadamente al 62% de la distancia total hasta la pica auxiliar de corriente (C), habitualmente a 20 m y 35-40 m de la toma, en línea recta y fuera de los conos de influencia."
    },
    {
      id: 18,
      question: "En una acometida de fontanería a un edificio con canalización metálica principal, ¿dónde y cómo se realiza su conexión al circuito de tierra según el REBT?",
      options: [
        "En el tejado mediante una abrazadera de plástico",
        "Aguas arriba de la llave de paso general, o con puente de continuidad sobre el contador de agua, conectado al Borne Principal de Tierra",
        "Directamente al neutro del transformador de distribución",
        "Está terminantemente prohibido conectar canalizaciones de agua a tierra"
      ],
      correct: 1,
      slideRef: 1,
      explanation: "La ITC-BT-18 exige la unión equipotencial principal de las canalizaciones metálicas de agua lo más cerca posible de su entrada al edificio, puenteando el contador de agua si este interrumpe la continuidad eléctrica metálica, unida con conductor de al menos la mitad de la sección de la LPT."
    }
  ]
};
