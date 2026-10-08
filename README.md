# PUESTA A TIERRA (PAT) • Instalaciones y Control de Calidad

Aplicación web interactiva de ingeniería para el estudio, cálculo, control de ejecución y autoevaluación de sistemas de **Puesta a Tierra (PAT)** en edificación e instalaciones industriales, basada en el **Reglamento Electrotécnico para Baja Tensión (REBT ITC-BT-18, ITC-BT-26, ITC-BT-27)**, el **Código Técnico de la Edificación (CTE DB-SUA 8)**, las normas **UNE-EN 62561**, **IEEE 837** y las normas tecnológicas de la edificación (**NTE-IEP**).

## 🚀 Enlace de Acceso Directo (GitHub Pages)
👉 **[https://adrianstoot.github.io/tomatierra/](https://adrianstoot.github.io/tomatierra/)**

---

## ⚡ Características Principales

1. **Visor de Diapositivas de Alta Definición**:
   - 15 diapositivas técnicas cubriendo la normativa, esquemas unifilares, conductores de protección, grapas mecánicas, soldaduras exotérmicas y arquetas.
   - **Visualización maximizada**: El área de diapositiva ocupa prácticamente el 100% del viewport vertical y horizontal.
   - Tira inferior de diapositivas (filmstrip) plegable y desplegable (tecla `B`).
   - Controles de ajuste dinámico de pantalla y visor de zoom interactivo en HD (tecla `Z`).

2. **Laboratorio 3D WebGL (Three.js)**:
   - **Arqueta y Seccionador de Tierra**: Sección constructiva de arqueta de hormigón con pica hincada en terreno permeable, puente de comprobación desmontable y cable de cobre desnudo.
   - **Cimentación con Anillo Perimetral**: Retícula de zapatas y riostras de hormigón armado con armadura interior visible, anillo perimetral cerrado de cobre y picas en los vértices.
   - **Soldadura Aluminotérmica (Exotérmica)**: Molde de grafito desmontable en sección, tobera de colada, crisol, unión molecular de conductores y simulación de chispas de ignición.

3. **Calculadora Oficial de Resistencia de Puesta a Tierra**:
   - Formulación reglamentaria de la **ITC-BT-18 Punto 3.2**:
     - Picas verticales: $R = \frac{\rho}{n \cdot L}$
     - Anillo / conductor horizontal enterrado: $R = \frac{2\rho}{L}$
     - Configuración mixta en paralelo: $R_{total} = \frac{R_{anillo} \cdot R_{picas}}{R_{anillo} + R_{picas}}$
   - Presets de resistividad del suelo ($\rho$) según la tabla oficial del REBT.
   - Verificación de seguridad según la tensión límite de contacto ($U_c \le 24\text{ V}$ en locales húmedos o $50\text{ V}$ en secos) y sensibilidad del interruptor diferencial ($I_{\Delta n} = 30\text{ mA}$ o $300\text{ mA}$).

4. **Autoevaluación Oficial (Tipo Test de 18 Preguntas)**:
   - Preguntas técnicas de alta exigencia basadas en la normativa oficial.
   - Retroalimentación inmediata con justificación técnica y enlace directo a la diapositiva correspondiente.

5. **Fichas Técnicas 3D (Flashcards)**:
   - Tarjetas giratorias tridimensionales con conceptos normativos esenciales.

6. **Checklist de Inspección en Obra (Control de Calidad)**:
   - 12 puntos de inspección crítica divididos en 4 fases de ejecución con guardado en `localStorage`.

---

## 💻 Ejecución Local

1. Descarga o clona este repositorio.
2. Haz doble clic en el archivo `abrir_app.bat` o abre `index.html` en cualquier navegador web moderno.
