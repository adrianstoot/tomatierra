// Main Application Logic for Puesta a Tierra (PAT) • REBT & CTE
// Comprehensive Pair Programming App with Maximized Slide Viewport

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // App State
  const state = {
    currentSlide: 0,
    totalSlides: PRESENTATION.totalSlides,
    currentView: 'slides',
    filmstripCollapsed: false,
    zoomLevel: 1,
    panX: 0,
    panY: 0,
    isPanning: false,
    panStartX: 0,
    panStartY: 0,
    // Quiz State
    quizIndex: 0,
    quizScore: 0,
    quizAnswers: {},
    quizSubmitted: false,
    // 3D Viewer Instance
    viewer3DInstance: null
  };

  // DOM Elements
  const mainSlideImg = document.getElementById('mainSlideImg');
  const slideNumEl = document.getElementById('currentSlideNum');
  const totalSlidesEl = document.getElementById('totalSlidesNum');
  const slideTitleEl = document.getElementById('slideTitleDisplay');
  const slideSubtitleEl = document.getElementById('slideSubtitleDisplay');
  const slideChapterTag = document.getElementById('slideChapterTag');
  const slideNormTag = document.getElementById('slideNormTag');
  const slideCounterBadge = document.getElementById('slideCounterBadge');
  
  const filmstripDrawer = document.getElementById('filmstripDrawer');
  const toggleFilmstripBtn = document.getElementById('toggleFilmstripBtn');
  const toggleFilmstripText = document.getElementById('toggleFilmstripText');
  const filmstripContainer = document.getElementById('filmstripContainer');

  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomFitBtn = document.getElementById('zoomFitBtn');

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxZoomRange = document.getElementById('lightboxZoomRange');
  const lightboxZoomVal = document.getElementById('lightboxZoomVal');
  const resetLightboxZoomBtn = document.getElementById('resetLightboxZoomBtn');

  // Quiz Modal Elements
  const quizModal = document.getElementById('quizModal');
  const openTestBtn = document.getElementById('openTestBtn');
  const closeQuizBtn = document.getElementById('closeQuizBtn');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizExplanationBox = document.getElementById('quizExplanationBox');
  const quizExplanationText = document.getElementById('quizExplanationText');
  const quizSlideLinkBtn = document.getElementById('quizSlideLinkBtn');
  const quizCurrentNum = document.getElementById('quizCurrentNum');
  const quizTotalNum = document.getElementById('quizTotalNum');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizResultsBox = document.getElementById('quizResultsBox');
  const quizFinalScore = document.getElementById('quizFinalScore');
  const quizScoreMsg = document.getElementById('quizScoreMsg');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  // View Panes & Nav Buttons
  const viewBtns = document.querySelectorAll('.view-mode-btn');
  const viewPanes = document.querySelectorAll('.view-pane');
  const chapterPillsContainer = document.getElementById('chapterPillsContainer');
  const chapterMobileSelect = document.getElementById('chapterMobileSelect');

  // ==============================================
  // 1. SLIDE PRESENTATION & VIEWPORT LOGIC
  // ==============================================

  function initFilmstrip() {
    if (!filmstripContainer) return;
    filmstripContainer.innerHTML = '';

    PRESENTATION.slides.forEach((slide, idx) => {
      const thumb = document.createElement('button');
      thumb.className = `flex-shrink-0 w-24 sm:w-28 h-14 rounded-lg overflow-hidden border-2 transition-all relative group ${
        idx === state.currentSlide ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105' : 'border-white/10 hover:border-amber-400/50 opacity-70 hover:opacity-100'
      }`;
      thumb.innerHTML = `
        <img src="${slide.image}" alt="Slide ${slide.id}" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute bottom-0.5 right-1 px-1 rounded bg-black/80 font-mono text-[9px] text-amber-300 font-bold">
          ${String(slide.id).padStart(2, '0')}
        </span>
      `;
      thumb.addEventListener('click', () => {
        goToSlide(idx);
      });
      filmstripContainer.appendChild(thumb);
    });
  }

  function renderSlide(index) {
    if (index < 0 || index >= state.totalSlides) return;
    state.currentSlide = index;
    const slide = PRESENTATION.slides[index];

    // Main Image
    if (mainSlideImg) {
      mainSlideImg.style.opacity = '0';
      mainSlideImg.style.transform = 'scale(0.98)';
      setTimeout(() => {
        mainSlideImg.src = slide.image;
        mainSlideImg.alt = slide.title;
        mainSlideImg.style.opacity = '1';
        mainSlideImg.style.transform = 'scale(1)';
      }, 120);
    }

    // Counters & Overlays
    const formattedNum = String(slide.id).padStart(2, '0');
    if (slideNumEl) slideNumEl.textContent = formattedNum;
    if (slideCounterBadge) slideCounterBadge.textContent = `${formattedNum} / ${state.totalSlides}`;
    if (slideTitleEl) slideTitleEl.textContent = slide.title;
    if (slideSubtitleEl) slideSubtitleEl.textContent = slide.subtitle;
    if (slideChapterTag) slideChapterTag.textContent = slide.chapterName;
    if (slideNormTag) slideNormTag.textContent = slide.normative;

    // Update Bottom Filmstrip active state
    if (filmstripContainer) {
      const thumbs = filmstripContainer.children;
      Array.from(thumbs).forEach((thumb, idx) => {
        if (idx === index) {
          thumb.className = 'flex-shrink-0 w-24 sm:w-28 h-14 rounded-lg overflow-hidden border-2 transition-all relative group border-amber-400 ring-2 ring-amber-400/40 scale-105 z-10';
          thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          thumb.className = 'flex-shrink-0 w-24 sm:w-28 h-14 rounded-lg overflow-hidden border-2 transition-all relative group border-white/10 hover:border-amber-400/50 opacity-70 hover:opacity-100';
        }
      });
    }

    // Update Chapter Pills active state
    updateChapterActiveState(slide.chapterId);
  }

  function nextSlide() {
    if (state.currentSlide < state.totalSlides - 1) {
      renderSlide(state.currentSlide + 1);
    } else {
      renderSlide(0); // loop
    }
  }

  function prevSlide() {
    if (state.currentSlide > 0) {
      renderSlide(state.currentSlide - 1);
    } else {
      renderSlide(state.totalSlides - 1); // loop
    }
  }

  function goToSlide(index) {
    if (state.currentView !== 'slides') {
      switchView('slides');
    }
    renderSlide(index);
  }

  // Toggle Bottom Filmstrip to give almost 100% of screen to the image
  function toggleFilmstrip(forceState) {
    if (typeof forceState === 'boolean') {
      state.filmstripCollapsed = forceState;
    } else {
      state.filmstripCollapsed = !state.filmstripCollapsed;
    }

    if (filmstripDrawer) {
      filmstripDrawer.classList.toggle('collapsed', state.filmstripCollapsed);
    }

    if (toggleFilmstripText) {
      toggleFilmstripText.textContent = state.filmstripCollapsed ? 'Mostrar Tira (B)' : 'Ocultar Tira (B)';
    }

    const slideContainer = document.getElementById('slideViewportContainer');
    if (slideContainer) {
      if (state.filmstripCollapsed) {
        slideContainer.classList.add('h-[calc(100vh-4.25rem)]');
        slideContainer.classList.remove('h-[calc(100vh-9.5rem)]');
        if (mainSlideImg) {
          mainSlideImg.classList.add('fit-contain-collapsed');
          mainSlideImg.classList.remove('fit-contain');
        }
      } else {
        slideContainer.classList.remove('h-[calc(100vh-4.25rem)]');
        slideContainer.classList.add('h-[calc(100vh-9.5rem)]');
        if (mainSlideImg) {
          mainSlideImg.classList.remove('fit-contain-collapsed');
          mainSlideImg.classList.add('fit-contain');
        }
      }
    }
  }

  // Chapter Navigation Pills
  function initChapterPills() {
    if (chapterPillsContainer) {
      chapterPillsContainer.innerHTML = '';
      PRESENTATION.chapters.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = `chapter-pill text-xs px-2.5 py-1 rounded-full border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 whitespace-nowrap`;
        btn.dataset.chapterId = ch.id;
        btn.innerHTML = `
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>${ch.name}</span>
        `;
        btn.addEventListener('click', () => {
          goToSlide(ch.slideStart - 1);
        });
        chapterPillsContainer.appendChild(btn);
      });
    }

    if (chapterMobileSelect) {
      chapterMobileSelect.innerHTML = '';
      PRESENTATION.chapters.forEach(ch => {
        const opt = document.createElement('option');
        opt.value = ch.slideStart - 1;
        opt.textContent = ch.name;
        chapterMobileSelect.appendChild(opt);
      });
      chapterMobileSelect.addEventListener('change', (e) => {
        goToSlide(parseInt(e.target.value));
      });
    }
  }

  function updateChapterActiveState(chapterId) {
    if (chapterPillsContainer) {
      const pills = chapterPillsContainer.querySelectorAll('.chapter-pill');
      pills.forEach(pill => {
        if (parseInt(pill.dataset.chapterId) === chapterId) {
          pill.classList.add('bg-white/10', 'text-amber-300', 'border-amber-400/40');
        } else {
          pill.classList.remove('bg-white/10', 'text-amber-300', 'border-amber-400/40');
        }
      });
    }
  }

  // Fullscreen API Toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error al activar pantalla completa: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // ==============================================
  // 2. INTERACTIVE LIGHTBOX & ZOOM (PINCH & PAN)
  // ==============================================

  function openLightbox(src, alt) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src || PRESENTATION.slides[state.currentSlide].image;
    lightboxImg.alt = alt || PRESENTATION.slides[state.currentSlide].title;
    state.zoomLevel = 1;
    state.panX = 0;
    state.panY = 0;
    updateLightboxTransform();
    if (lightboxZoomRange) lightboxZoomRange.value = 100;
    if (lightboxZoomVal) lightboxZoomVal.textContent = '100%';
    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
  }

  function updateLightboxTransform() {
    if (!lightboxImg) return;
    lightboxImg.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoomLevel})`;
  }

  if (lightboxZoomRange) {
    lightboxZoomRange.addEventListener('input', (e) => {
      const zoom = parseInt(e.target.value) / 100;
      state.zoomLevel = zoom;
      if (lightboxZoomVal) lightboxZoomVal.textContent = `${e.target.value}%`;
      updateLightboxTransform();
    });
  }

  if (resetLightboxZoomBtn) {
    resetLightboxZoomBtn.addEventListener('click', () => {
      state.zoomLevel = 1;
      state.panX = 0;
      state.panY = 0;
      if (lightboxZoomRange) lightboxZoomRange.value = 100;
      if (lightboxZoomVal) lightboxZoomVal.textContent = '100%';
      updateLightboxTransform();
    });
  }

  if (lightboxImg) {
    // Pan drag
    lightboxImg.addEventListener('mousedown', (e) => {
      state.isPanning = true;
      state.panStartX = e.clientX - state.panX;
      state.panStartY = e.clientY - state.panY;
      lightboxImg.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isPanning) return;
      state.panX = e.clientX - state.panStartX;
      state.panY = e.clientY - state.panStartY;
      updateLightboxTransform();
    });

    window.addEventListener('mouseup', () => {
      state.isPanning = false;
      if (lightboxImg) lightboxImg.style.cursor = 'grab';
    });

    // Mouse wheel zoom
    lightboxImg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      let newZoom = Math.min(Math.max(state.zoomLevel + delta, 0.8), 4);
      state.zoomLevel = newZoom;
      const pct = Math.round(newZoom * 100);
      if (lightboxZoomRange) lightboxZoomRange.value = pct;
      if (lightboxZoomVal) lightboxZoomVal.textContent = `${pct}%`;
      updateLightboxTransform();
    });
  }

  // ==============================================
  // 3. INTERACTIVE QUIZ MODAL
  // ==============================================

  function openQuiz() {
    if (!quizModal) return;
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizAnswers = {};
    state.quizSubmitted = false;
    if (quizResultsBox) quizResultsBox.classList.add('hidden');
    renderQuizQuestion(0);
    quizModal.classList.remove('hidden');
    quizModal.classList.add('flex');
  }

  function closeQuiz() {
    if (!quizModal) return;
    quizModal.classList.add('hidden');
    quizModal.classList.remove('flex');
  }

  function renderQuizQuestion(index) {
    const q = PRESENTATION.quiz[index];
    if (!q) return;

    if (quizCurrentNum) quizCurrentNum.textContent = index + 1;
    if (quizTotalNum) quizTotalNum.textContent = PRESENTATION.quiz.length;
    if (quizProgressBar) {
      const pct = ((index + 1) / PRESENTATION.quiz.length) * 100;
      quizProgressBar.style.width = `${pct}%`;
    }

    if (quizQuestionText) quizQuestionText.textContent = q.question;
    if (quizExplanationBox) quizExplanationBox.classList.add('hidden');
    if (quizNextBtn) quizNextBtn.classList.add('hidden');

    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left p-3.5 sm:p-4 rounded-xl border border-white/10 bg-surface-900/80 hover:bg-white/5 hover:border-amber-400/40 transition-all flex items-start gap-3 text-xs sm:text-sm text-slate-200`;
        btn.innerHTML = `
          <span class="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center font-mono text-xs shrink-0 font-bold">
            ${String.fromCharCode(65 + optIdx)}
          </span>
          <span class="flex-1 leading-relaxed">${optText}</span>
        `;
        btn.addEventListener('click', () => {
          handleQuizSelection(optIdx, btn);
        });
        quizOptionsContainer.appendChild(btn);
      });
    }
  }

  function handleQuizSelection(selectedIdx, selectedBtn) {
    const q = PRESENTATION.quiz[state.quizIndex];
    if (state.quizAnswers[state.quizIndex] !== undefined) return; // already answered

    state.quizAnswers[state.quizIndex] = selectedIdx;
    const isCorrect = selectedIdx === q.correct;
    if (isCorrect) state.quizScore++;

    const options = quizOptionsContainer.children;
    Array.from(options).forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-300');
        const icon = btn.querySelector('span');
        if (icon) {
          icon.className = 'w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shrink-0';
          icon.textContent = '✓';
        }
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
        const icon = btn.querySelector('span');
        if (icon) {
          icon.className = 'w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0';
          icon.textContent = '✕';
        }
      } else {
        btn.classList.add('opacity-40');
      }
    });

    // Show Explanation Box
    if (quizExplanationBox) {
      quizExplanationBox.classList.remove('hidden');
      if (quizExplanationText) quizExplanationText.textContent = q.explanation;
      if (quizSlideLinkBtn) {
        quizSlideLinkBtn.textContent = `Ver Diapositiva ${q.slideRef}`;
        quizSlideLinkBtn.onclick = () => {
          closeQuiz();
          goToSlide(q.slideRef - 1);
        };
      }
    }

    // Show Next Button or Results
    if (quizNextBtn) {
      quizNextBtn.classList.remove('hidden');
      if (state.quizIndex === PRESENTATION.quiz.length - 1) {
        quizNextBtn.textContent = 'Ver Resultados Finales';
      } else {
        quizNextBtn.textContent = 'Siguiente Pregunta →';
      }
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (state.quizIndex < PRESENTATION.quiz.length - 1) {
        state.quizIndex++;
        renderQuizQuestion(state.quizIndex);
      } else {
        showQuizResults();
      }
    });
  }

  function showQuizResults() {
    if (quizOptionsContainer) quizOptionsContainer.innerHTML = '';
    if (quizExplanationBox) quizExplanationBox.classList.add('hidden');
    if (quizNextBtn) quizNextBtn.classList.add('hidden');
    if (quizResultsBox) {
      quizResultsBox.classList.remove('hidden');
      const score = state.quizScore;
      const total = PRESENTATION.quiz.length;
      const pct = Math.round((score / total) * 100);
      if (quizFinalScore) quizFinalScore.textContent = `${score} / ${total} (${pct}%)`;

      let msg = '';
      if (pct >= 85) {
        msg = '¡Excelente! Dominio sobresaliente del REBT ITC-BT-18, CTE y control de calidad.';
      } else if (pct >= 65) {
        msg = 'Buen nivel. Revisa las diapositivas de soldadura aluminotérmica y arquetas para perfeccionar.';
      } else {
        msg = 'Se recomienda repasar los esquemas unifilares y los criterios de rechazo de uniones.';
      }
      if (quizScoreMsg) quizScoreMsg.textContent = msg;
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      openQuiz();
    });
  }

  // ==============================================
  // 4. VIEW SWITCHER TABS
  // ==============================================

  function switchView(viewName) {
    state.currentView = viewName;

    // Buttons
    viewBtns.forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active-nav-tab');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('active-nav-tab');
        btn.classList.add('text-slate-400');
      }
    });

    // Panes
    viewPanes.forEach(pane => {
      if (pane.id === `view-${viewName}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // Initialize 3D Viewer if selected
    if (viewName === 'viewer3d') {
      if (!state.viewer3DInstance) {
        setTimeout(() => {
          state.viewer3DInstance = new GroundingViewer3D('webgl-canvas-container');
        }, 100);
      } else {
        state.viewer3DInstance.onWindowResize();
      }
    }
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  // ==============================================
  // 5. CALCULADORA DE RESISTENCIA (REBT ITC-BT-18)
  // ==============================================

  function initCalculator() {
    const soilSelect = document.getElementById('calcSoilSelect');
    const rhoInput = document.getElementById('calcRhoInput');
    const calcType = document.getElementById('calcTypeSelect');
    const rodLength = document.getElementById('calcRodLength');
    const rodCount = document.getElementById('calcRodCount');
    const loopLength = document.getElementById('calcLoopLength');
    const voltLimit = document.getElementById('calcVoltLimit');
    const diffSens = document.getElementById('calcDiffSens');

    // Outputs
    const outResistance = document.getElementById('calcResultResistance');
    const outMaxResistance = document.getElementById('calcResultMaxResistance');
    const outVerdict = document.getElementById('calcResultVerdict');
    const outFormulaText = document.getElementById('calcResultFormulaText');

    if (!soilSelect || !rhoInput) return;

    // Populate soil types
    soilSelect.innerHTML = '';
    SOIL_TYPES.forEach((st, idx) => {
      const opt = document.createElement('option');
      opt.value = st.rho;
      opt.textContent = `${st.name} (ρ = ${st.rho} Ω·m)`;
      soilSelect.appendChild(opt);
    });

    soilSelect.addEventListener('change', () => {
      rhoInput.value = soilSelect.value;
      calculateGrounding();
    });

    const inputs = [rhoInput, calcType, rodLength, rodCount, loopLength, voltLimit, diffSens];
    inputs.forEach(inp => {
      if (inp) {
        inp.addEventListener('input', calculateGrounding);
        inp.addEventListener('change', calculateGrounding);
      }
    });

    function calculateGrounding() {
      const rho = parseFloat(rhoInput.value) || 100;
      const type = calcType ? calcType.value : 'picas';
      const L_pica = parseFloat(rodLength.value) || 2;
      const n_picas = parseInt(rodCount.value) || 1;
      const L_anillo = parseFloat(loopLength.value) || 40;
      const Uc = parseFloat(voltLimit.value) || 24;
      const Idn = parseFloat(diffSens.value) || 0.03;

      let R = 0;
      let formula = '';

      if (type === 'picas') {
        // R = rho / (n * L)
        R = rho / (n_picas * L_pica);
        formula = `R = ρ / (n · L) = ${rho} / (${n_picas} · ${L_pica}) = ${R.toFixed(2)} Ω`;
      } else if (type === 'anillo') {
        // R = 2 * rho / L
        R = (2 * rho) / L_anillo;
        formula = `R = 2 · ρ / L = (2 · ${rho}) / ${L_anillo} = ${R.toFixed(2)} Ω`;
      } else if (type === 'mixto') {
        // Anillo + Picas en paralelo
        const R_anillo = (2 * rho) / L_anillo;
        const R_picas = rho / (n_picas * L_pica);
        R = (R_anillo * R_picas) / (R_anillo + R_picas);
        formula = `R_anillo = ${R_anillo.toFixed(1)} Ω, R_picas = ${R_picas.toFixed(1)} Ω => R_total = ${R.toFixed(2)} Ω`;
      }

      const R_max = Uc / Idn;

      if (outResistance) outResistance.textContent = `${R.toFixed(2)} Ω`;
      if (outMaxResistance) outMaxResistance.textContent = `${R_max.toFixed(1)} Ω (Uc=${Uc}V / Idn=${Idn*1000}mA)`;
      if (outFormulaText) outFormulaText.textContent = formula;

      if (outVerdict) {
        if (R <= R_max) {
          outVerdict.className = 'px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-center';
          outVerdict.innerHTML = `✓ CONFORME REBT (R ≤ R_máx)`;
        } else {
          outVerdict.className = 'px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold text-center';
          outVerdict.innerHTML = `✕ NO CONFORME (R > ${R_max.toFixed(0)} Ω: Aumentar electrodos)`;
        }
      }
    }

    calculateGrounding();
  }

  // ==============================================
  // 6. 3D FLASHCARDS
  // ==============================================

  function initFlashcards() {
    const container = document.getElementById('flashcardsContainer');
    if (!container) return;
    container.innerHTML = '';

    FLASHCARDS.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'perspective-1000 h-64 sm:h-72 cursor-pointer group';
      cardEl.innerHTML = `
        <div class="flashcard relative w-full h-full transform-style-3d rounded-2xl border border-white/10 shadow-xl transition-all duration-500">
          
          <!-- Front Face -->
          <div class="absolute inset-0 w-full h-full backface-hidden rounded-2xl glass-panel p-5 sm:p-6 flex flex-col justify-between border border-white/10 group-hover:border-amber-400/40">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ${card.tag}
                </span>
                <span class="text-xs text-slate-500 font-mono">${card.category}</span>
              </div>
              <h4 class="font-heading font-bold text-slate-100 text-sm sm:text-base leading-snug">
                ${card.title}
              </h4>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed my-auto">
              ${card.front}
            </p>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>Clic para voltear</span>
              <span>↻</span>
            </div>
          </div>

          <!-- Back Face -->
          <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl glass-ui p-5 sm:p-6 flex flex-col justify-between border border-amber-400/30 bg-surface-900/95">
            <div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Solución Técnica
              </span>
              <h4 class="font-heading font-bold text-amber-300 text-xs sm:text-sm mt-2">
                ${card.title}
              </h4>
            </div>

            <div class="text-xs text-slate-200 leading-relaxed overflow-y-auto pr-1 my-auto space-y-1">
              ${card.back.replace(/\n/g, '<br/>')}
            </div>

            <div class="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Volver</span>
              <span>↺</span>
            </div>
          </div>

        </div>
      `;

      cardEl.addEventListener('click', () => {
        const innerCard = cardEl.querySelector('.flashcard');
        if (innerCard) innerCard.classList.toggle('is-flipped');
      });

      container.appendChild(cardEl);
    });
  }

  // ==============================================
  // 7. SITE INSPECTION CHECKLIST
  // ==============================================

  function initChecklist() {
    const listContainer = document.getElementById('checklistItemsContainer');
    const progressBar = document.getElementById('checklistProgressBar');
    const progressCount = document.getElementById('checklistProgressCount');
    const resetBtn = document.getElementById('resetChecklistBtn');

    if (!listContainer) return;
    listContainer.innerHTML = '';

    const savedState = JSON.parse(localStorage.getItem('pat_checklist_state') || '{}');

    function updateProgress() {
      const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]');
      const total = checkboxes.length;
      let checked = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) checked++;
      });
      const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressCount) progressCount.textContent = `${checked} / ${total} (${pct}%)`;
    }

    CHECKLIST_ITEMS.forEach(item => {
      const isChecked = savedState[item.id] || false;
      const row = document.createElement('label');
      row.className = `flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-surface-900/60 hover:bg-white/5 transition-all cursor-pointer ${
        isChecked ? 'border-emerald-500/40 bg-emerald-950/20' : ''
      }`;
      row.innerHTML = `
        <input type="checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} class="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-surface-850 border-white/20" />
        <div class="flex-1 space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-100">${item.title}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">${item.standard}</span>
            ${item.critical ? '<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">CRÍTICO</span>' : ''}
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">${item.description}</p>
        </div>
      `;

      const cb = row.querySelector('input');
      cb.addEventListener('change', () => {
        savedState[item.id] = cb.checked;
        localStorage.setItem('pat_checklist_state', JSON.stringify(savedState));
        row.classList.toggle('border-emerald-500/40', cb.checked);
        row.classList.toggle('bg-emerald-950/20', cb.checked);
        updateProgress();
      });

      listContainer.appendChild(row);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem('pat_checklist_state');
        initChecklist();
      });
    }

    updateProgress();
  }

  // ==============================================
  // 8. TEMARIO DIGITALIZADO & SEARCH
  // ==============================================

  function initTemario() {
    const listContainer = document.getElementById('temarioModulesContainer');
    const searchInput = document.getElementById('temarioSearchInput');
    if (!listContainer) return;

    function renderModules(filter = '') {
      listContainer.innerHTML = '';
      const term = filter.toLowerCase();

      COURSE_MODULES.forEach(mod => {
        const matchingTopics = mod.topics.filter(t => 
          t.title.toLowerCase().includes(term) || t.content.toLowerCase().includes(term)
        );

        if (term && matchingTopics.length === 0 && !mod.title.toLowerCase().includes(term)) {
          return;
        }

        const modCard = document.createElement('div');
        modCard.className = 'glass-panel rounded-2xl p-5 border border-white/10 space-y-4';
        
        let topicsHtml = '';
        const topicsToRender = term ? matchingTopics : mod.topics;

        topicsToRender.forEach(t => {
          topicsHtml += `
            <div class="border-t border-white/5 pt-3 space-y-1.5">
              <h4 class="text-xs sm:text-sm font-bold text-amber-300">${t.title}</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">${t.content.replace(/\n/g, '<br/>')}</p>
            </div>
          `;
        });

        modCard.innerHTML = `
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                ${mod.code} • ${mod.normativeRef}
              </span>
              <h3 class="font-heading font-bold text-sm sm:text-base text-white mt-1.5">
                ${mod.title}
              </h3>
              <p class="text-xs text-slate-400 mt-1">${mod.summary}</p>
            </div>
          </div>
          <div class="space-y-3">
            ${topicsHtml}
          </div>
        `;

        listContainer.appendChild(modCard);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderModules(e.target.value);
      });
    }

    renderModules();
  }

  // ==============================================
  // 9. HD GALLERY GRID
  // ==============================================

  function initGallery() {
    const container = document.getElementById('galleryGridContainer');
    if (!container) return;
    container.innerHTML = '';

    PRESENTATION.slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all group cursor-pointer flex flex-col';
      card.innerHTML = `
        <div class="relative w-full aspect-video bg-black/60 overflow-hidden">
          <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-contain group-hover:scale-105 transition-all duration-300" loading="lazy" />
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 font-mono text-[10px] text-amber-300 font-bold border border-white/10">
            Slide ${String(slide.id).padStart(2, '0')}
          </span>
        </div>
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[10px] text-slate-400 font-mono">${slide.chapterName}</span>
            <h4 class="font-heading font-semibold text-xs text-slate-200 line-clamp-2 mt-1 group-hover:text-amber-300">
              ${slide.title}
            </h4>
          </div>
          <div class="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400">
            <span>Ver presentación</span>
            <span>→</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        goToSlide(idx);
      });

      container.appendChild(card);
    });
  }

  // ==============================================
  // 10. GLOBAL EVENT LISTENERS & SHORTCUTS
  // ==============================================

  // Slide navigation buttons
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', prevSlide);
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', nextSlide);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  if (toggleFilmstripBtn) {
    toggleFilmstripBtn.addEventListener('click', () => toggleFilmstrip());
  }

  if (mainSlideImg) {
    mainSlideImg.addEventListener('dblclick', () => {
      openLightbox();
    });
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => openLightbox());
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (openTestBtn) openTestBtn.addEventListener('click', openQuiz);
  if (closeQuizBtn) closeQuizBtn.addEventListener('click', closeQuiz);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If inside an input, ignore
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleFilmstrip();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
        closeLightbox();
      } else {
        openLightbox();
      }
    } else if (e.key.toLowerCase() === 't') {
      e.preventDefault();
      openQuiz();
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      switchView('viewer3d');
    } else if (e.key === 'Escape') {
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) closeLightbox();
      if (quizModal && !quizModal.classList.contains('hidden')) closeQuiz();
    }
  });

  // Theme Toggle (Dark/Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  }

  // Initial Boot
  initChapterPills();
  initFilmstrip();
  renderSlide(0);
  initCalculator();
  initFlashcards();
  initChecklist();
  initTemario();
  initGallery();
});
