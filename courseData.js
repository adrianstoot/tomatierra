// Course Syllabus, Technical Notes, 3D Flashcards, and Site Checklist for Puesta a Tierra
// Developed for REBT ITC-BT-18, CTE DB-SUA 8 & UNE-EN 62561

const COURSE_MODULES = [
  {
    id: 1,
    title: "Módulo 1: Marco Normativo y Principios de Puesta a Tierra",
    code: "PAT_MOD_01",
    normativeRef: "REBT ITC-BT-18 • CTE DB-SUA 8 • UNE 20460-5-54",
    summary: "Bases físicas y reglamentarias de la protección contra contactos indirectos y derivaciones de corriente.",
    topics: [
      {
        title: "1.1 Objeto y Definición de la Puesta a Tierra",
        content: "La puesta a tierra tiene por objeto limitar la diferencia de potencial que en un momento dado pueda presentarse entre las masas metálicas y la tierra, asegurar la actuación eficaz de los dispositivos de corte automático de la alimentación (interruptores diferenciales y magnetotérmicos) y derivar a tierra las corrientes de defecto o de origen atmosférico sin provocar gradientes de potencial peligrosos para las personas."
      },
      {
        title: "1.2 Clasificación de Conductores y Elementos (ITC-BT-18)",
        content: `• <b>Toma de tierra / Electrodo (T):</b> Elemento metálico o conjunto de conductores enterrados en contacto íntimo con el terreno (picas, placas, cables en anillo).\n• <b>Conductor de Tierra / Línea de Enlace con Tierra (LET):</b> Conecta el electrodo con el borne principal de tierra o punto de puesta a tierra.\n• <b>Borne Principal de Tierra (B):</b> Barra metálica de cobre fijada en arqueta o cuadro donde confluyen la LET, la Línea Principal de Tierra (LPT) y los conductores de unión equipotencial principal.\n• <b>Línea Principal de Tierra (LPT):</b> Conductor aislado verde-amarillo que enlaza el borne principal con las centralizaciones de contadores (S_mín >= 16 mm²).\n• <b>Derivación de LPT (DLPT):</b> Conductor que une la LPT con el borne de tierra de cada cuadro individual (S_mín >= 6 mm²).\n• <b>Conductor de Protección (CP):</b> Distribución interior que une las masas de los receptores con el borne de tierra de la vivienda.\n• <b>Conductores de Unión Equipotencial:</b> Conectan elementos conductores extraños (tuberías metálicas de agua, gas, climatización, estructura metálica) al sistema de tierra.`
      },
      {
        title: "1.3 Tensiones Límite de Contacto y Seguridad",
        content: "El REBT establece dos tensiones límite de contacto admisibles convencionales para personas:\n• <b>U_c <= 50 V</b>: En locales secos y no conductores (viviendas, oficinas ordinarias).\n• <b>U_c <= 24 V</b>: En locales húmedos, mojados o conductores (cuartos de baño, piscinas, locales con suelo mojado, obras de construcción).\nLa resistencia máxima del electrodo de tierra debe cumplir: R_PAT <= U_c / I_Δn. Con un diferencial doméstico de 30 mA (0,03 A), en locales húmedos R <= 24 / 0,03 = 800 Ω; con diferencial de 300 mA (0,3 A), R <= 24 / 0,3 = 80 Ω."
      }
    ]
  },
  {
    id: 2,
    title: "Módulo 2: Dimensionamiento de Conductores y Secciones Mínimas",
    code: "PAT_MOD_02",
    normativeRef: "REBT ITC-BT-18 Tabla 1 • ITC-BT-26 • ITC-BT-27",
    summary: "Secciones reglamentarias de conductores según tipo de instalación, material y protección mecánica.",
    topics: [
      {
        title: "2.1 Tabla Oficial de Secciones Mínimas de Conductores de Tierra (ITC-BT-18)",
        content: `• <b>Cobre protegido mecánicamente:</b> 16 mm²\n• <b>Cobre protegido contra corrosión pero sin protección mecánica:</b> 25 mm²\n• <b>Cobre desnudo enterrado sin protección contra corrosión:</b> 35 mm²\n• <b>Acero galvanizado enterrado:</b> 50 mm²\n• <b>Línea Principal de Tierra (edificios de viviendas):</b> S_mín >= 16 mm² de cobre aislado con cubierta verde-amarillo (ITC-BT-26 Pto. 3.4).\n• <b>Derivaciones de la LPT:</b> S_mín >= 6 mm² o igual a la sección de la derivación individual si es superior.`
      },
      {
        title: "2.2 Red Equipotencial en Cuartos de Baño y Zonas Húmedas (ITC-BT-27)",
        content: "En locales con bañera o ducha, se debe disponer una red equipotencial suplementaria que una todas las partes conductoras accesibles (marcos metálicos de ventanas si están en contacto con estructura, tuberías de agua fría y caliente, desagües metálicos, radiadores) al conductor de protección:\n• Sección mínima: <b>4 mm²</b> si el conductor va sin tubo protector o <b>2,5 mm²</b> si va alojado bajo tubo rígido o corrugado."
      },
      {
        title: "2.3 Circuitos Interiores de Vivienda (ITC-BT-25)",
        content: `• C1 Alumbrado: 1,5 mm² Cu (CP 1,5 mm²)\n• C2 Tomas de uso general: 2,5 mm² Cu (CP 2,5 mm²)\n• C3 Cocina y Horno: 6 mm² Cu (CP 6 mm²)\n• C4 Lavadora, Lavavajillas y Termo: 4 mm² Cu (CP 4 mm²)\n• C5 Tomas de cuartos de baño y bases auxiliares de cocina: 2,5 mm² Cu (CP 2,5 mm²)\n• C6 Ascensor y Servicios Comunes: 6 mm² Cu.`
      }
    ]
  },
  {
    id: 3,
    title: "Módulo 3: Soldadura Aluminotérmica (Exotérmica) y Control de Calidad",
    code: "PAT_MOD_03",
    normativeRef: "UNE-EN 62561-1 • IEEE 837 • REBT ITC-BT-18",
    summary: "Procedimiento de unión molecular mediante reacción de polvo de óxido de cobre y aluminio.",
    topics: [
      {
        title: "3.1 Principio Químico de la Reacción Aluminotérmica",
        content: "La soldadura exotérmica es una reacción termoquímica de reducción del óxido de cobre mediante aluminio metálico en polvo finamente dividido:\n<b>3 CuO + 2 Al → 3 Cu + Al2O3 + Calor (> 2000 °C)</b>\nEl cobre líquido supercalentado desciende por la tobera hacia la cámara de soldadura del molde de grafito, fundiendo localmente los extremos de los cables de cobre o la cabeza de la pica. Al enfriarse, forma un nudo macizo de cobre de alta pureza con enlace molecular perfecto."
      },
      {
        title: "3.2 Anatomía del Molde de Grafito y Procedimiento Operativo",
        content: `1. <b>Limpieza y Secado:</b> Eliminar barro, grasa y óxido de los cables con cepillo de cerdas metálicas. Precalentar el molde con soplete (> 120 °C) para evaporar toda la humedad.\n2. <b>Posicionamiento:</b> Insertar los conductores y la pica en las cavidades del molde y bloquear las tenazas de presión.\n3. <b>Colocación del Disco:</b> Asentar el disco cóncavo de acero en el fondo del crisol para retener la carga hasta la ignición.\n4. <b>Vertido de la Carga:</b> Vaciar el cartucho de polvo de soldadura y espolvorear la pólvora de ignición (o cartucho electrónico) sobre el borde del crisol.\n5. <b>Cierre e Ignición:</b> Cerrar la tapa del molde y activar el disparador o chispero. La reacción dura menos de 2 segundos.\n6. <b>Desmolde y Limpieza:</b> Esperar 15-20 segundos a la solidificación, abrir las tenazas y limpiar la escoria vítrea de alúmina con rascador de madera o latón.`
      },
      {
        title: "3.3 Criterios de Aceptación y Defectología (Control de Calidad)",
        content: `• <b>CONFORME (Aceptada):</b> Unión con brillo cobrizo uniforme, cordón macizo sin cavidades, recubrimiento completo de los cordones trenzados y ausencia de alúmina atrapada en la masa conductora.\n• <b>NO CONFORME (Rechazo Inmediato):</b>\n  - <i>Rechupes y poros superficiales profundos:</i> Provocados por humedad en el conductor o molde frío (vaporización explosiva de agua).\n  - <i>Fuga de metal fundido:</i> Falta de ajuste entre valvas del molde o uso de diámetro de cable incorrecto.\n  - <i>Fusión incompleta:</i> Masa de cobre que no ha abrazado todos los hilos por falta de carga o disipación térmica prematura.\n  - <b>Acción correctora:</b> Toda soldadura defectuosa debe cortarse con cizalla y repetirse íntegramente.`
      }
    ]
  },
  {
    id: 4,
    title: "Módulo 4: Cimentación, Red Equipotencial, Arquetas y Medición",
    code: "PAT_MOD_04",
    normativeRef: "CTE DB-SUA 8 • NTE-IEP • UNE-EN 62561-5 • REBT ITC-BT-18",
    summary: "Integración del electrodo en la cimentación de hormigón armado, arquetas de registro y comprobación con telurómetro.",
    topics: [
      {
        title: "4.1 Puesta a Tierra en Cimentación (NTE-IEP y CTE)",
        content: "En edificios de nueva planta es obligatorio instalar en el fondo de las zanjas de cimentación un anillo cerrado de cable de cobre desnudo de sección no inferior a 35 mm² formando una malla perimetral. Dicho anillo debe conectarse mediante soldadura aluminotérmica o grapas bimetálicas a las armaduras inferiores de las zapatas y a los arranques de los pilares de hormigón armado, logrando una enorme superficie de contacto y reduciendo la impedancia a tierra."
      },
      {
        title: "4.2 Arquetas de Registro y Seccionamiento",
        content: `• Las arquetas deben colocarse en puntos estratégicos accesibles (mínimo 1 por edificio o según dimensiones del anillo perimetral).\n• Deben construirse de hormigón prefabricado o polietileno de alta resistencia con tapa registrable enrasada con el pavimento.\n• En su interior se sitúa el <b>puente de comprobación desmontable</b> fijado mediante tornillería accesible con llave ordinaria.\n• El fondo de la arqueta debe permanecer <b>abierto y permeable al terreno natural</b> (sin solera de mortero estanco) para evitar que la pica o el conductor queden aislados y permitir el drenaje de pluviales.`
      },
      {
        title: "4.3 Medición Protocolizada con Telurómetro (Método del 62%)",
        content: `1. <b>Apertura del seccionador:</b> Abrir el puente de comprobación para desvincular la red interior de la vivienda y evitar retornos peligrosos o medidas falseadas por tomas parásitas.\n2. <b>Conexión del Telurómetro (3 bornes):</b>\n   - Borne <b>E (Tierra / Verde):</b> Conectar a la cabeza de la pica o electrodo en la arqueta.\n   - Borne <b>P (Potencial / Amarillo):</b> Conectar a la pica auxiliar de tensión clavada a una distancia 'd' (aprox. 20 m).\n   - Borne <b>C (Corriente / Rojo):</b> Conectar a la pica auxiliar de corriente clavada a una distancia 'D' (aprox. 30 a 40 m) en línea recta con E y P.\n3. <b>Lectura y Validación:</b> La distancia óptima de P corresponde al 61,8% (~62%) de la distancia total D (fuera de las curvas de influencia de los electrodos). Verificar que el valor medido R_PAT sea inferior al límite reglamentario.`
      }
    ]
  }
];

const FLASHCARDS = [
  {
    id: 1,
    title: "Conductor de Tierra (LET) vs Línea Principal (LPT)",
    category: "Definiciones Normativas",
    front: "¿Qué diferencia existe entre la Línea de Enlace con Tierra (LET) y la Línea Principal de Tierra (LPT)?",
    back: "• <b>LET:</b> Conductor que une el electrodo enterrado (pica/anillo) con el borne principal de tierra o seccionador (ITC-BT-18: Cu 35 mm² desnudo).\n• <b>LPT:</b> Conductor aislado con cubierta verde-amarillo que discurre desde el borne principal hasta los embarrados de contadores (ITC-BT-26: S_mín >= 16 mm² Cu).",
    tag: "ITC-BT-18 / ITC-BT-26"
  },
  {
    id: 2,
    title: "Soldadura Exotérmica: Criterio de Aceptación",
    category: "Control de Calidad",
    front: "¿Qué aspecto visual distingue una soldadura aluminotérmica conforme de una no conforme?",
    back: "• <b>Conforme:</b> Superficie lisa, redondeada, con brillo metálico cobrizo uniforme, sin poros ni escoria visible, cubriendo por completo todos los hilos.\n• <b>No Conforme (Rechazo):</b> Rechupes profundos, cavidades por humedad, aspecto esponjoso o pérdida de metal. Requiere corte y repetición obligatoria.",
    tag: "IEEE 837 / UNE-EN 62561"
  },
  {
    id: 3,
    title: "¿Por qué abrir el puente de comprobación para medir?",
    category: "Ensayos & Telurómetro",
    front: "¿Por qué es imprescindible abrir el seccionador o puente de comprobación antes de medir con el telurómetro?",
    back: "Si no se abre, el telurómetro mide en paralelo la tierra del edificio junto con las conexiones accidentales a neutro, tuberías públicas y otros edificios contiguos, arrojando un valor artificialmente bajo y falso. Además, previene descargas hacia el operario.",
    tag: "Método de Medida"
  },
  {
    id: 4,
    title: "Red Equipotencial en Cuartos de Baño (ITC-BT-27)",
    category: "Seguridad en Locales Húmedos",
    front: "¿Qué elementos deben enlazarse a la red equipotencial suplementaria en un baño y con qué sección mínima?",
    back: "Tuberías metálicas de agua fría y caliente, marcos metálicos en contacto con estructura, canalizaciones de calefacción y masas accesibles. La sección mínima es <b>4 mm²</b> (o 2,5 mm² bajo tubo protector).",
    tag: "REBT ITC-BT-27"
  },
  {
    id: 5,
    title: "Fórmulas de Resistencia según REBT (Picas y Anillo)",
    category: "Cálculo Eléctrico",
    front: "¿Cuáles son las fórmulas reglamentarias para calcular la resistencia teórica de una pica vertical y de un anillo enterrado?",
    back: "• Pica vertical: <b>R = ρ / L</b> (donde ρ es resistividad en Ω·m y L longitud de la pica en m).\n• Conductor enterrado en anillo: <b>R = 2 · ρ / L</b> (L = perímetro total del anillo en m).",
    tag: "REBT ITC-BT-18 Pto. 3.2"
  },
  {
    id: 6,
    title: "Conexión a las Armaduras de Cimentación",
    category: "CTE DB-SUA / Cimentaciones",
    front: "¿Por qué el CTE DB-SUA 8 y la NTE-IEP exigen unir el anillo de tierra a la armadura de las zapatas?",
    back: "Crea una malla equipotencial tridimensional en toda la cimentación que iguala potenciales de suelo y pilares, reduce drásticamente las tensiones de paso y aprovecha el hormigón enterrado para dispersar corrientes a tierra con una impedancia bajísima.",
    tag: "CTE DB-SUA 8"
  },
  {
    id: 7,
    title: "Espesor de Cobre en Picas de Acero Cobreado",
    category: "Materiales y Normas",
    front: "¿Qué espesor mínimo de capa de cobre electrolítico exige la norma UNE-EN 62561-2 en picas de acero-cobre?",
    back: "Exige un recubrimiento molecular mínimo de <b>250 µm (micrómetros)</b> de cobre electrolítico de 99,9% de pureza sobre núcleo de acero de alta resistencia para garantizar durabilidad frente a abrasión e hincado en suelos pedregosos.",
    tag: "UNE-EN 62561-2"
  },
  {
    id: 8,
    title: "Tensiones de Contacto Límite (24V vs 50V)",
    category: "Protección Contra Contactos",
    front: "¿Cómo condicionan las tensiones límite de contacto de 24 V y 50 V el valor admisible de resistencia de tierra?",
    back: "Mediante la ley de Ohm: <b>R_PAT <= U_c / I_Δn</b>.\n• En locales húmedos (24 V) con diferencial de 30 mA: R <= 24 / 0,03 = <b>800 Ω</b>.\n• Con diferencial general de 300 mA: R <= 24 / 0,3 = <b>80 Ω</b>.\n• En locales secos (50 V) con 300 mA: R <= 50 / 0,3 = <b>166 Ω</b>.",
    tag: "REBT Seguridad"
  }
];

const CHECKLIST_ITEMS = [
  {
    id: "chk-01",
    phase: "Fase 1: Replanteo y Fondo de Zanja",
    title: "Profundidad de enterramiento del anillo perimetral",
    description: "Verificar que el conductor de cobre desnudo de 35 mm² se sitúa a una profundidad mínima de entre 0,5 m y 0,8 m (fondo de zanja de riostras), por debajo de la cota de heladas.",
    standard: "REBT ITC-BT-18 / NTE-IEP",
    critical: true
  },
  {
    id: "chk-02",
    phase: "Fase 1: Replanteo y Fondo de Zanja",
    title: "Distancia mínima a canalizaciones de agua y gas",
    description: "Comprobar que la separación horizontal y vertical con canalizaciones enterradas de gas combustible es >= 0,5 m y con conducciones de agua >= 0,2 m.",
    standard: "REBT ITC-BT-18",
    critical: true
  },
  {
    id: "chk-03",
    phase: "Fase 2: Hincado de Picas y Conductores",
    title: "Espesor de recubrimiento y longitud de picas",
    description: "Revisar albaranes y marcado de las picas de acero cobreado: recubrimiento mínimo de 250 µm de cobre (UNE-EN 62561-2) y longitud >= 2,0 metros.",
    standard: "UNE-EN 62561-2",
    critical: true
  },
  {
    id: "chk-04",
    phase: "Fase 2: Hincado de Picas y Conductores",
    title: "Separación geométrica entre picas adyacentes",
    description: "Verificar que la distancia entre picas verticales hincadas sea como mínimo igual a su longitud clavada (evitar solapamiento de conos de resistencia de dispersión).",
    standard: "REBT ITC-BT-18 Pto. 3.2",
    critical: false
  },
  {
    id: "chk-05",
    phase: "Fase 2: Hincado de Picas y Conductores",
    title: "Sección del conductor de cobre desnudo",
    description: "Verificar con calibre o galga que el cable de cobre desnudo del anillo es de sección >= 35 mm² (mínimo 7 hilos cableados de 2,52 mm de diámetro).",
    standard: "REBT ITC-BT-18 Tabla 1",
    critical: true
  },
  {
    id: "chk-06",
    phase: "Fase 3: Soldaduras Exotérmicas y Conexiones",
    title: "Precalentamiento y limpieza de moldes de grafito",
    description: "Asegurar que los instaladores precalientan el molde de grafito con soplete (> 120 °C) antes de la primera soldadura de la jornada para expulsar la humedad.",
    standard: "Buenas Prácticas de Instalación",
    critical: true
  },
  {
    id: "chk-07",
    phase: "Fase 3: Soldaduras Exotérmicas y Conexiones",
    title: "Inspección visual de soldaduras aluminotérmicas",
    description: "Revisar cada nudo soldado al 100%: rechazar cualquier unión que presente rechupes, poros profundos, aspecto esponjoso o falta de fusión molecular.",
    standard: "IEEE 837 / Control Calidad",
    critical: true
  },
  {
    id: "chk-08",
    phase: "Fase 3: Soldaduras Exotérmicas y Conexiones",
    title: "Conexión a redondos de acero de cimentación",
    description: "Comprobar que el anillo de cobre está firmemente soldado o abarcado con grapa bimetálica a los redondos de armadura de zapatas y pilares antes del hormigonado.",
    standard: "CTE DB-SUA 8 / NTE-IEP",
    critical: true
  },
  {
    id: "chk-09",
    phase: "Fase 4: Arquetas, Embarrados y Medición",
    title: "Fondo permeable de arqueta de registro",
    description: "Inspeccionar que el fondo de la arqueta de hormigón está en contacto directo con el terreno permeable natural, sin solera de mortero ni sellado impermeable.",
    standard: "REBT ITC-BT-18",
    critical: false
  },
  {
    id: "chk-10",
    phase: "Fase 4: Arquetas, Embarrados y Medición",
    title: "Puente de comprobación seccionador accesible",
    description: "Verificar la existencia de la pletina seccionadora desmontable en arqueta, accesible con llave manual y con tornillería de latón/inoxidable protegida.",
    standard: "REBT ITC-BT-18 Pto. 3.3",
    critical: true
  },
  {
    id: "chk-11",
    phase: "Fase 4: Arquetas, Embarrados y Medición",
    title: "Identificación y sección de la Línea Principal (LPT)",
    description: "Comprobar que la LPT que sube a la centralización de contadores es de cobre aislado con cubierta verde-amarillo y sección mínima S >= 16 mm².",
    standard: "ITC-BT-26 Pto. 3.4",
    critical: true
  },
  {
    id: "chk-12",
    phase: "Fase 4: Arquetas, Embarrados y Medición",
    title: "Ensayo protocolizado de resistencia de tierra con telurómetro",
    description: "Realizar ensayo con telurómetro de 3 bornes (método de caída de potencial al 62%) con puente de comprobación abierto. Certificar valor R_PAT.",
    standard: "REBT ITC-BT-18 / UNE 20460",
    critical: true
  }
];

const SOIL_TYPES = [
  { name: "Terrenos pantanosos, fangos o turba", rho: 30, description: "Muy conductores, excelente disipación de corriente." },
  { name: "Limos, arcillas plásticas y tierra vegetal húmeda", rho: 50, description: "Suelos de muy baja resistividad. Ideales para tomas superficiales." },
  { name: "Margas, gredas y arcillas compactas", rho: 100, description: "Resistividad media-baja favorable en cimentación ordinaria." },
  { name: "Tierras de cultivo ordinarias y arcillas arenosas", rho: 150, description: "Resistividad moderada típica de zonas periurbanas." },
  { name: "Arenas arcillosas y aluviones de grano medio", rho: 250, description: "Resistividad moderada-alta. Requiere hincado de picas profundas." },
  { name: "Arenas silíceas, gravas secas y cantos rodados", rho: 1000, description: "Poco conductor. Requiere combinación de anillo amplio y picas múltiples." },
  { name: "Rocas agrietadas, calizas secas y pizarras", rho: 2000, description: "Terreno de alta resistividad. Exige red enmallada y mejora química o pozos profundos." },
  { name: "Granito compacto, rocas ígneas y cuarcitas", rho: 3000, description: "Extremadamente resistivo. Requiere pozos profundos o aditivos bentoníticos." }
];
