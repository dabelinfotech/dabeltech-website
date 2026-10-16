// 0. SCROLL STABILIZATION: Prevent page running down on open/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Immediate scroll top enforcement
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Enable smooth scrolling ONLY after initial page load & layout stabilization
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    document.documentElement.classList.add('smooth-scroll');
  }, 120);
});

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page remains at top on DOMContentLoaded
  window.scrollTo(0, 0);

  // Smooth scroll for in-page anchors without sticky URL hashes
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetHash = this.getAttribute('href');
      if (targetHash && targetHash !== '#' && targetHash !== '#!') {
        const targetEl = document.querySelector(targetHash);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      }
    });
  });

  // ==========================================
  // 1. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ==========================================
  // 2. EXECUTIVE DASHBOARD TAB SWITCHING
  // ==========================================
  const dashTabBtns = document.querySelectorAll('.dash-tab-btn');
  const dashPanels = document.querySelectorAll('.dash-panel');

  dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dashTabBtns.forEach(b => b.classList.remove('active'));
      dashPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-dash');
      const activePanel = document.getElementById(`dash-panel-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Auto-cycle through dashboard tabs smoothly every 5.5s until user manually clicks
  let currentDashIndex = 0;
  let userInteracted = false;
  dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => { userInteracted = true; });
  });

  setInterval(() => {
    if (!userInteracted && dashTabBtns.length > 0) {
      currentDashIndex = (currentDashIndex + 1) % dashTabBtns.length;
      dashTabBtns[currentDashIndex].click();
      userInteracted = false; // preserve gentle automated demonstration
    }
  }, 5500);

  // ==========================================
  // 3. MULTI-CURRENCY SELECTOR
  // ==========================================
  const currencySelect = document.getElementById('currency-select');
  const coursePriceElements = document.querySelectorAll('.price-value');

  function updateCurrency(currency) {
    coursePriceElements.forEach(el => {
      const val = el.getAttribute(`data-${currency.toLowerCase()}`);
      if (val) {
        el.textContent = val;
      }
    });

    // Also update calculator if present
    if (typeof updateCalculatorDisplay === 'function') {
      updateCalculatorDisplay();
    }
  }

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      updateCurrency(e.target.value);
    });
  }

  // ==========================================
  // 4. SERVICE TABS FILTERING
  // ==========================================
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. PROJECT TABS FILTERING
  // ==========================================
  const projectTabBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. LIGHTBOX MODAL FOR GALLERY
  // ==========================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, caption) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxCaption.textContent = caption || '';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Make accessible globally for inline trigger buttons
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ==========================================
  // 7. INTERACTIVE COST ESTIMATOR / CALCULATOR
  // ==========================================
  const calcCategory = document.getElementById('calc-category');
  const calcCourseGroup = document.getElementById('course-select-group');
  const calcCourse = document.getElementById('calc-course');
  const calcEarlyBird = document.getElementById('calc-earlybird');
  const calcTotalDisplay = document.getElementById('calc-total-display');
  const calcBreakdownText = document.getElementById('calc-breakdown-text');
  const calcClaimBtn = document.getElementById('calc-claim-btn');

  const basePricing = {
    'school-website': { NGN: 120000, USD: 150, GHC: 1200, KSH: 15000, CFA: 75000, name: 'School / Business Website' },
    'result-portal': { NGN: 150000, USD: 180, GHC: 1500, KSH: 18000, CFA: 90000, name: 'Student Result Portal System' },
    'cbt-portal': { NGN: 140000, USD: 170, GHC: 1400, KSH: 17000, CFA: 85000, name: 'CBT Examination Platform' },
    'cctv-hardware': { NGN: 200000, USD: 250, GHC: 2000, KSH: 25000, CFA: 125000, name: 'Smart Board & CCTV Security Setup' }
  };

  function updateCalculatorDisplay() {
    if (!calcCategory || !calcTotalDisplay) return;

    const currentCurrency = currencySelect ? currencySelect.value : 'NGN';
    const selectedCategory = calcCategory.value;
    const isEarlyBird = calcEarlyBird && calcEarlyBird.checked;
    const modeEl = document.querySelector('input[name="calc-mode"]:checked');
    const mode = modeEl ? modeEl.value : 'online';

    let baseAmount = 0;
    let label = '';

    if (selectedCategory === 'training') {
      if (calcCourseGroup) calcCourseGroup.style.display = 'block';
      const selectedOption = calcCourse.options[calcCourse.selectedIndex];
      label = selectedOption.text;
      baseAmount = parseFloat(selectedOption.getAttribute(`data-${currentCurrency.toLowerCase()}`)) || 45000;

      // In-person lab surcharge for practical power/lab maintenance (15%)
      if (mode === 'physical') {
        baseAmount = Math.round(baseAmount * 1.15);
      }
    } else {
      if (calcCourseGroup) calcCourseGroup.style.display = 'none';
      const item = basePricing[selectedCategory];
      label = item ? item.name : 'Custom Tech Project';
      baseAmount = item ? item[currentCurrency] : 100000;
    }

    // Apply early bird / promotional discount if applicable
    let finalAmount = baseAmount;
    if (isEarlyBird) {
      finalAmount = Math.round(baseAmount * 0.9);
    }

    // Format price with currency symbol
    let formattedPrice = '';
    switch (currentCurrency) {
      case 'NGN':
        formattedPrice = '₦' + finalAmount.toLocaleString();
        break;
      case 'USD':
        formattedPrice = '$' + finalAmount.toLocaleString();
        break;
      case 'GHC':
        formattedPrice = finalAmount.toLocaleString() + ' GHC';
        break;
      case 'KSH':
        formattedPrice = finalAmount.toLocaleString() + ' KSH';
        break;
      case 'CFA':
        formattedPrice = finalAmount.toLocaleString() + ' CFA';
        break;
      default:
        formattedPrice = '₦' + finalAmount.toLocaleString();
    }

    calcTotalDisplay.textContent = formattedPrice;

    if (calcBreakdownText) {
      const modeText = mode === 'physical' ? 'In-Person Lab (Lagos)' : 'Online Batch';
      const discountText = isEarlyBird ? ' &bull; 10% Early-Bird Applied' : '';
      calcBreakdownText.innerHTML = `${label} &bull; ${modeText}${discountText}`;
    }

    // Update WhatsApp link with dynamic quotation text
    if (calcClaimBtn) {
      const message = encodeURIComponent(
        `Hello DABELTECH! I generated a quote on your website:\n` +
        `• Purpose: ${label}\n` +
        `• Mode: ${mode === 'physical' ? 'In-Person Lab' : 'Online'}\n` +
        `• Estimated Total: ${formattedPrice}\n` +
        `Please confirm availability and registration details.`
      );
      calcClaimBtn.onclick = () => {
        window.open(`https://wa.me/2348062168465?text=${message}`, '_blank');
      };
    }
  }

  // Attach listener events to calculator
  if (calcCategory) calcCategory.addEventListener('change', updateCalculatorDisplay);
  if (calcCourse) calcCourse.addEventListener('change', updateCalculatorDisplay);
  if (calcEarlyBird) calcEarlyBird.addEventListener('change', updateCalculatorDisplay);
  document.querySelectorAll('input[name="calc-mode"]').forEach(r => {
    r.addEventListener('change', updateCalculatorDisplay);
  });

  // Initial calculation
  updateCalculatorDisplay();

  // ==========================================
  // 8. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const email = document.getElementById('contact-email').value;
      const service = document.getElementById('contact-service').value;
      const message = document.getElementById('contact-message').value;

      const whatsappText = encodeURIComponent(
        `*NEW INQUIRY VIA DABELTECH WEBSITE*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Email:* ${email}\n` +
        `*Service/Course:* ${service}\n` +
        `*Message:* ${message || 'None'}`
      );

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Inquiry Recorded!</strong><br>
          Redirecting to WhatsApp to send directly to DABELTECH Support...
        `;
        formFeedback.style.display = 'block';
      }

      setTimeout(() => {
        window.open(`https://wa.me/2348062168465?text=${whatsappText}`, '_blank');
      }, 1200);
    });
  }

  // ==========================================
  // 9. ADVERTISEMENT BANNERS MOTION SLIDER ENGINE
  // ==========================================
  const motionContainer = document.getElementById('motion-slider-container');
  const motionSlides = document.querySelectorAll('.motion-slide');
  const prevBtn = document.getElementById('motion-prev-btn');
  const nextBtn = document.getElementById('motion-next-btn');
  const playPauseBtn = document.getElementById('motion-play-pause-btn');
  const dotsWrapper = document.getElementById('motion-dots-wrapper');
  const timerBar = document.getElementById('motion-timer-bar');
  const thumbCards = document.querySelectorAll('.thumb-card');
  const thumbsScroll = document.getElementById('motion-thumbnails-scroll');
  const thumbPrevBtn = document.getElementById('thumb-prev-btn');
  const thumbNextBtn = document.getElementById('thumb-next-btn');
  const thumbStagePrev = document.getElementById('thumb-stage-prev');
  const thumbStageNext = document.getElementById('thumb-stage-next');

  if (motionSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = motionSlides.length;
    let isPlaying = true;
    let progressInterval = null;
    const slideDuration = 5500; // 5.5 seconds per banner
    const progressStep = 50; // smooth update every 50ms
    let elapsed = 0;

    // Dynamically build dot indicators
    if (dotsWrapper) {
      dotsWrapper.innerHTML = '';
      motionSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `motion-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to banner slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetTimer();
        });
        dotsWrapper.appendChild(dot);
      });
    }

    const dots = dotsWrapper ? dotsWrapper.querySelectorAll('.motion-dot') : [];

    function updateSlideDisplay() {
      // Toggle slides
      motionSlides.forEach((slide, idx) => {
        if (idx === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      // Update thumbnails with smooth motion slide centering
      thumbCards.forEach((thumb, idx) => {
        if (idx === currentSlide) {
          thumb.classList.add('active');
          if (thumbsScroll && currentSlide > 0) {
            const scrollLeft = thumb.offsetLeft - (thumbsScroll.clientWidth / 2) + (thumb.clientWidth / 2);
            thumbsScroll.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          } else if (thumbsScroll && currentSlide === 0) {
            thumbsScroll.scrollLeft = 0;
          }
        } else {
          thumb.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlideDisplay();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Attach Main Prev / Next button clicks
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    // Quick Select Any Banner: Next and Prev buttons
    if (thumbPrevBtn) {
      thumbPrevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    if (thumbNextBtn) {
      thumbNextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    // Quick Select Stage Arrows (Flanking Next/Prev buttons)
    if (thumbStagePrev) {
      thumbStagePrev.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    if (thumbStageNext) {
      thumbStageNext.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    // Interactive mouse drag-to-slide motion for thumbnail preview strip
    if (thumbsScroll) {
      let isDown = false;
      let startX = 0;
      let scrollLeftPos = 0;

      thumbsScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        thumbsScroll.classList.add('active-drag');
        startX = e.pageX - thumbsScroll.offsetLeft;
        scrollLeftPos = thumbsScroll.scrollLeft;
      });

      thumbsScroll.addEventListener('mouseleave', () => {
        isDown = false;
      });

      thumbsScroll.addEventListener('mouseup', () => {
        isDown = false;
      });

      thumbsScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - thumbsScroll.offsetLeft;
        const walk = (x - startX) * 1.5;
        thumbsScroll.scrollLeft = scrollLeftPos - walk;
      });

      // Mouse wheel horizontal motion slide
      thumbsScroll.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          thumbsScroll.scrollBy({ left: e.deltaY * 1.4, behavior: 'smooth' });
        }
      }, { passive: false });
    }

    // Thumbnail cards clicking
    thumbCards.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          goToSlide(idx);
          resetTimer();
        }
      });
    });

    // Play / Pause toggle
    function togglePlayPause() {
      isPlaying = !isPlaying;
      if (playPauseBtn) {
        playPauseBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
        playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Auto-Slide' : 'Play Auto-Slide');
      }
      if (isPlaying) {
        startTimer();
      } else {
        pauseTimer();
      }
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Timer & Progress management
    function startTimer() {
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        if (!isPlaying) return;
        elapsed += progressStep;
        const pct = Math.min((elapsed / slideDuration) * 100, 100);
        if (timerBar) timerBar.style.width = `${pct}%`;

        if (elapsed >= slideDuration) {
          elapsed = 0;
          nextSlide();
        }
      }, progressStep);
    }

    function pauseTimer() {
      if (progressInterval) clearInterval(progressInterval);
    }

    function resetTimer() {
      elapsed = 0;
      if (timerBar) timerBar.style.width = '0%';
      if (isPlaying) {
        startTimer();
      }
    }

    // Pause on hover over entire motion slider so user can read text comfortably
    if (motionContainer) {
      motionContainer.addEventListener('mouseenter', () => {
        if (isPlaying) pauseTimer();
      });
      motionContainer.addEventListener('mouseleave', () => {
        if (isPlaying) startTimer();
      });
    }

    // Touch swipe support for mobile/tablet devices
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.getElementById('motion-slides-viewport');
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeThreshold = 45;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        resetTimer();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        resetTimer();
      }
    }

    // Keyboard navigation when mouse is hovering the motion slider
    document.addEventListener('keydown', (e) => {
      if (motionContainer && motionContainer.matches(':hover')) {
        if (e.key === 'ArrowRight') {
          nextSlide();
          resetTimer();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
          resetTimer();
        }
      }
    });

    // Start auto motion slide
    startTimer();
  }

  // ==========================================
  // 12. FRONT PAGE OFFICIAL ADVERT VIDEOS CONTROLLER
  // ==========================================
  const adVideo1 = document.getElementById('advert-video-1');
  const adVideo2 = document.getElementById('advert-video-2');
  const adPlayBtn = document.getElementById('advert-play-btn');
  const adPlayIcon = document.getElementById('ad-play-icon');
  const adCenterTrigger = document.getElementById('advert-center-play-trigger');
  const adCenterIcon = document.getElementById('advert-center-icon');
  const adSoundToggleBtn = document.getElementById('advert-sound-toggle-btn');
  const adAudioBtn = document.getElementById('advert-audio-btn');
  const adSoundIcon = document.getElementById('advert-sound-icon');
  const adVolIcon = document.getElementById('ad-vol-icon');
  const adSoundText = document.getElementById('advert-sound-text');
  const adPrevTrackBtn = document.getElementById('advert-prev-track-btn');
  const adNextTrackBtn = document.getElementById('advert-next-track-btn');
  const adProgressBar = document.getElementById('advert-progress-fill');
  const adProgressTrack = document.getElementById('advert-progress-track');
  const adTimecode = document.getElementById('advert-timecode');
  const adCurrentIndicator = document.getElementById('advert-current-indicator');
  const adBroadcastStatus = document.getElementById('advert-broadcast-status');
  const adQueueLabel = document.getElementById('advert-queue-label');
  const adCard1 = document.getElementById('advert-card-1');
  const adCard2 = document.getElementById('advert-card-2');
  const adStatus1 = document.getElementById('ad-status-1');
  const adStatus2 = document.getElementById('ad-status-2');
  const adFullscreenBtn = document.getElementById('advert-fullscreen-btn');
  const adScreenStage = document.getElementById('advert-screen-stage');

  if (adVideo1 && adVideo2) {
    let currentAdvertIndex = 1; // 1 or 2
    let isUserMuted = true; // starts muted for compliant automatic browser playback

    function getActiveVideo() {
      return currentAdvertIndex === 1 ? adVideo1 : adVideo2;
    }

    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateAdvertUI() {
      if (currentAdvertIndex === 1) {
        adVideo1.classList.add('active');
        adVideo2.classList.remove('active');

        if (adCard1) adCard1.classList.add('active');
        if (adCard2) adCard2.classList.remove('active');

        if (adStatus1) adStatus1.innerHTML = '<i class="fa-solid fa-circle-play"></i> Now Playing';
        if (adStatus1) adStatus1.className = 'ad-status-pill playing';
        if (adStatus2) adStatus2.innerHTML = '<i class="fa-solid fa-forward-step"></i> Up Next (Auto-Plays)';
        if (adStatus2) adStatus2.className = 'ad-status-pill upnext';

        if (adCurrentIndicator) adCurrentIndicator.textContent = 'ADVERT 1 OF 2';
        if (adBroadcastStatus) adBroadcastStatus.innerHTML = 'NOW PLAYING: ADVERT 01 &bull; OFFICIAL COMMERCIAL';
        if (adQueueLabel) adQueueLabel.innerHTML = '<i class="fa-solid fa-forward-step text-accent"></i> Up Next: Advert 02 (Auto-Sequenced)';
      } else {
        adVideo2.classList.add('active');
        adVideo1.classList.remove('active');

        if (adCard2) adCard2.classList.add('active');
        if (adCard1) adCard1.classList.remove('active');

        if (adStatus2) adStatus2.innerHTML = '<i class="fa-solid fa-circle-play"></i> Now Playing';
        if (adStatus2) adStatus2.className = 'ad-status-pill playing';
        if (adStatus1) adStatus1.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Replay Advert 1';
        if (adStatus1) adStatus1.className = 'ad-status-pill standby';

        if (adCurrentIndicator) adCurrentIndicator.textContent = 'ADVERT 2 OF 2';
        if (adBroadcastStatus) adBroadcastStatus.innerHTML = 'NOW PLAYING: ADVERT 02 &bull; SOLUTIONS &amp; TRAINING SHOWCASE (AUTO-SEQUENCED)';
        if (adQueueLabel) adQueueLabel.innerHTML = '<i class="fa-solid fa-rotate text-accent"></i> Next: Loop Back to Advert 01';
      }
    }

    function switchAdvert(targetIndex, playImmediately = true) {
      if (targetIndex === currentAdvertIndex && playImmediately) {
        const activeVid = getActiveVideo();
        if (activeVid.paused) {
          activeVid.play();
        }
        return;
      }

      const prevVid = getActiveVideo();
      prevVid.pause();

      currentAdvertIndex = targetIndex;
      const nextVid = getActiveVideo();

      nextVid.currentTime = 0;
      nextVid.muted = isUserMuted;

      updateAdvertUI();

      if (playImmediately) {
        const playPromise = nextVid.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('Playback deferred:', err);
          });
        }
      }
      updatePlayPauseIcons();
    }

    // When Advert 1 ends -> Immediately start Advert 2!
    adVideo1.addEventListener('ended', () => {
      switchAdvert(2, true);
    });

    // When Advert 2 ends -> Loop back to Advert 1 immediately!
    adVideo2.addEventListener('ended', () => {
      switchAdvert(1, true);
    });

    // Sound toggle function
    function toggleSound(forceState) {
      if (typeof forceState === 'boolean') {
        isUserMuted = forceState;
      } else {
        isUserMuted = !isUserMuted;
      }

      adVideo1.muted = isUserMuted;
      adVideo2.muted = isUserMuted;

      if (isUserMuted) {
        if (adSoundIcon) adSoundIcon.className = 'fa-solid fa-volume-xmark';
        if (adVolIcon) adVolIcon.className = 'fa-solid fa-volume-xmark';
        if (adSoundText) adSoundText.textContent = 'Click for Sound';
        if (adSoundToggleBtn) adSoundToggleBtn.classList.remove('unmuted');
      } else {
        if (adSoundIcon) adSoundIcon.className = 'fa-solid fa-volume-high';
        if (adVolIcon) adVolIcon.className = 'fa-solid fa-volume-high';
        if (adSoundText) adSoundText.textContent = 'Sound On';
        if (adSoundToggleBtn) adSoundToggleBtn.classList.add('unmuted');
      }
    }

    if (adSoundToggleBtn) {
      adSoundToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSound();
      });
    }

    if (adAudioBtn) {
      adAudioBtn.addEventListener('click', () => {
        toggleSound();
      });
    }

    // Play/Pause control
    function updatePlayPauseIcons() {
      const vid = getActiveVideo();
      const isPaused = vid.paused;

      if (adPlayIcon) {
        adPlayIcon.className = isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
      }
      if (adCenterIcon) {
        adCenterIcon.className = isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
      }
      if (adCenterTrigger) {
        if (isPaused) {
          adCenterTrigger.classList.add('paused');
        } else {
          adCenterTrigger.classList.remove('paused');
        }
      }
    }

    function togglePlay() {
      const vid = getActiveVideo();
      if (vid.paused) {
        vid.play();
      } else {
        vid.pause();
      }
      updatePlayPauseIcons();
    }

    if (adPlayBtn) adPlayBtn.addEventListener('click', togglePlay);
    if (adCenterTrigger) adCenterTrigger.addEventListener('click', togglePlay);

    // Track buttons
    if (adPrevTrackBtn) {
      adPrevTrackBtn.addEventListener('click', () => {
        switchAdvert(1, true);
      });
    }

    if (adNextTrackBtn) {
      adNextTrackBtn.addEventListener('click', () => {
        switchAdvert(2, true);
      });
    }

    // Playlist cards clicking
    if (adCard1) {
      adCard1.addEventListener('click', () => {
        switchAdvert(1, true);
      });
    }

    if (adCard2) {
      adCard2.addEventListener('click', () => {
        switchAdvert(2, true);
      });
    }

    // Fullscreen support
    if (adFullscreenBtn && adScreenStage) {
      adFullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (adScreenStage.requestFullscreen) {
            adScreenStage.requestFullscreen();
          } else if (adScreenStage.webkitRequestFullscreen) {
            adScreenStage.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // Timeupdate & progress scrubbing
    function handleTimeUpdate(vid) {
      if (vid !== getActiveVideo()) return;
      if (!vid.duration) return;

      const pct = (vid.currentTime / vid.duration) * 100;
      if (adProgressBar) adProgressBar.style.width = `${pct}%`;
      if (adTimecode) {
        adTimecode.textContent = `${formatTime(vid.currentTime)} / ${formatTime(vid.duration)}`;
      }
    }

    adVideo1.addEventListener('timeupdate', () => handleTimeUpdate(adVideo1));
    adVideo2.addEventListener('timeupdate', () => handleTimeUpdate(adVideo2));

    adVideo1.addEventListener('play', updatePlayPauseIcons);
    adVideo1.addEventListener('pause', updatePlayPauseIcons);
    adVideo2.addEventListener('play', updatePlayPauseIcons);
    adVideo2.addEventListener('pause', updatePlayPauseIcons);

    // Progress bar seeking
    if (adProgressTrack) {
      adProgressTrack.addEventListener('click', (e) => {
        const vid = getActiveVideo();
        if (!vid.duration) return;
        const rect = adProgressTrack.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        vid.currentTime = clickPos * vid.duration;
      });
    }

    // AUTOMATIC PLAYBACK TRIGGER:
    // Starts playing automatically when viewer gets to the page
    function attemptAutoplay() {
      adVideo1.muted = true; // Muted autoplay is guaranteed by browser security policy
      isUserMuted = true;
      const playPromise = adVideo1.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updatePlayPauseIcons();
        }).catch(() => {
          // If browser policy deferred, activate on first scroll or touch
          const onFirstInteraction = () => {
            adVideo1.play();
            updatePlayPauseIcons();
            window.removeEventListener('scroll', onFirstInteraction);
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('touchstart', onFirstInteraction);
          };
          window.addEventListener('scroll', onFirstInteraction, { passive: true });
          window.addEventListener('click', onFirstInteraction, { passive: true });
          window.addEventListener('touchstart', onFirstInteraction, { passive: true });
        });
      }
    }

    // Trigger autoplay immediately on load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      attemptAutoplay();
    } else {
      window.addEventListener('DOMContentLoaded', attemptAutoplay);
    }

    // Also trigger via IntersectionObserver so if user scrolls past, it stays playing
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const vid = getActiveVideo();
            if (vid.paused) {
              vid.play().catch(() => {});
            }
          }
        });
      }, { threshold: 0.25 });

      if (adScreenStage) {
        observer.observe(adScreenStage);
      }
    }
  }

  // ==========================================
  // 17. DABEL-AI CLIENT ASSISTANT CONTROLLER
  // ==========================================
  const aiChatToggleBtn = document.getElementById('ai-chat-toggle-btn');
  const aiChatWindow = document.getElementById('ai-chat-window');
  const aiCloseChatBtn = document.getElementById('ai-close-chat-btn');
  const aiClearChatBtn = document.getElementById('ai-clear-chat-btn');
  const aiSettingsToggleBtn = document.getElementById('ai-settings-toggle-btn');
  const aiSettingsDrawer = document.getElementById('ai-settings-drawer');
  const aiSettingsDrawerClose = document.getElementById('ai-settings-drawer-close');
  const aiApiKeyInput = document.getElementById('ai-api-key-input');
  const aiToggleKeyVisibility = document.getElementById('ai-toggle-key-visibility');
  const aiModelSelect = document.getElementById('ai-model-select');
  const aiSaveSettingsBtn = document.getElementById('ai-save-settings-btn');
  const aiResetKeyBtn = document.getElementById('ai-reset-key-btn');
  const aiQuickChips = document.querySelectorAll('.ai-chip');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiTypingIndicator = document.getElementById('ai-typing-indicator');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiMicBtn = document.getElementById('ai-mic-btn');

  if (aiChatToggleBtn && aiChatWindow) {
    let chatHistory = [];
    const STORAGE_KEY = 'dabeltech_gemini_api_key';
    const MODEL_KEY = 'dabeltech_gemini_model';
    const CHAT_HISTORY_KEY = 'dabeltech_chat_history';

    // Load saved settings
    const savedKey = localStorage.getItem(STORAGE_KEY) || '';
    const savedModel = localStorage.getItem(MODEL_KEY) || 'gemini-1.5-flash';
    if (aiApiKeyInput) aiApiKeyInput.value = savedKey;
    if (aiModelSelect) aiModelSelect.value = savedModel;

    // Load session chat history if present
    try {
      const storedHistory = sessionStorage.getItem(CHAT_HISTORY_KEY);
      if (storedHistory) {
        chatHistory = JSON.parse(storedHistory);
        if (Array.isArray(chatHistory) && chatHistory.length > 0) {
          // Re-render saved messages
          chatHistory.forEach(item => {
            renderMessageBubble(item.sender, item.text, false);
          });
        }
      }
    } catch (e) {
      console.warn('Could not parse stored chat history:', e);
    }

    // Toggle Chat Window
    function toggleChat(forceOpen) {
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !aiChatWindow.classList.contains('active');
      if (shouldOpen) {
        aiChatWindow.classList.add('active');
        aiChatToggleBtn.classList.add('is-open');
        aiChatToggleBtn.setAttribute('aria-expanded', 'true');
        aiChatWindow.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
          if (aiChatInput) aiChatInput.focus();
        }, 150);
        scrollToBottom();
      } else {
        aiChatWindow.classList.remove('active');
        aiChatToggleBtn.classList.remove('is-open');
        aiChatToggleBtn.setAttribute('aria-expanded', 'false');
        aiChatWindow.setAttribute('aria-hidden', 'true');
        if (aiSettingsDrawer) aiSettingsDrawer.classList.remove('open');
      }
    }

    aiChatToggleBtn.addEventListener('click', () => toggleChat());
    if (aiCloseChatBtn) aiCloseChatBtn.addEventListener('click', () => toggleChat(false));

    // Toggle Settings Drawer
    if (aiSettingsToggleBtn && aiSettingsDrawer) {
      aiSettingsToggleBtn.addEventListener('click', () => {
        aiSettingsDrawer.classList.toggle('open');
      });
    }
    if (aiSettingsDrawerClose && aiSettingsDrawer) {
      aiSettingsDrawerClose.addEventListener('click', () => {
        aiSettingsDrawer.classList.remove('open');
      });
    }

    // Toggle API Key visibility
    if (aiToggleKeyVisibility && aiApiKeyInput) {
      aiToggleKeyVisibility.addEventListener('click', () => {
        const isPassword = aiApiKeyInput.type === 'password';
        aiApiKeyInput.type = isPassword ? 'text' : 'password';
        const icon = aiToggleKeyVisibility.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        }
      });
    }

    // Save Settings
    if (aiSaveSettingsBtn) {
      aiSaveSettingsBtn.addEventListener('click', () => {
        const key = (aiApiKeyInput.value || '').trim();
        const model = aiModelSelect ? aiModelSelect.value : 'gemini-1.5-flash';
        localStorage.setItem(STORAGE_KEY, key);
        localStorage.setItem(MODEL_KEY, model);
        
        aiSaveSettingsBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        setTimeout(() => {
          aiSaveSettingsBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Key';
          if (aiSettingsDrawer) aiSettingsDrawer.classList.remove('open');
        }, 1200);

        renderMessageBubble('assistant', `✨ **Configuration Updated!** Gemini API key configured for \`${model}\`. Ready to assist!`);
      });
    }

    // Reset Key
    if (aiResetKeyBtn) {
      aiResetKeyBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        if (aiApiKeyInput) aiApiKeyInput.value = '';
        renderMessageBubble('assistant', 'ℹ️ Custom Gemini key removed. DABEL-AI will use the server connection or built-in knowledge engine.');
      });
    }

    // Clear Chat
    if (aiClearChatBtn) {
      aiClearChatBtn.addEventListener('click', () => {
        chatHistory = [];
        sessionStorage.removeItem(CHAT_HISTORY_KEY);
        // Reset message container to default welcome
        aiChatMessages.innerHTML = `
          <div class="ai-msg ai-msg-bot">
            <div class="ai-msg-avatar">
              <img src="assets/logo.jpeg" alt="DABEL-AI">
            </div>
            <div class="ai-msg-content">
              <div class="ai-msg-bubble">
                <p><strong>Chat Cleared! 🧹</strong></p>
                <p>How may I assist you now with DABELTECH courses, fees, or school portal deployments?</p>
              </div>
              <span class="ai-msg-time">Just now</span>
            </div>
          </div>
        `;
      });
    }

    // Quick Chips Handlers
    aiQuickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) {
          sendMessage(prompt);
        }
      });
    });

    // Scroll Helper
    function scrollToBottom() {
      if (aiChatMessages) {
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
      }
    }

    // Markdown Parser
    function parseMarkdown(text) {
      if (!text) return '';
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Headers (### Header)
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h4>$1</h4>');

      // Bold (**bold**)
      html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

      // Code backticks (`code`)
      html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

      // Links ([text](url))
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>');

      // Bullet points
      const lines = html.split('\n');
      let inList = false;
      const formattedLines = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('* ') || line.startsWith('- ')) {
          if (!inList) {
            formattedLines.push('<ul>');
            inList = true;
          }
          formattedLines.push(`<li>${line.substring(2)}</li>`);
        } else {
          if (inList) {
            formattedLines.push('</ul>');
            inList = false;
          }
          if (line.length > 0) {
            if (!line.startsWith('<h3') && !line.startsWith('<h4') && !line.startsWith('<ul')) {
              formattedLines.push(`<p>${line}</p>`);
            } else {
              formattedLines.push(line);
            }
          }
        }
      }
      if (inList) {
        formattedLines.push('</ul>');
      }

      return formattedLines.join('');
    }

    // Render Message Bubble
    function renderMessageBubble(sender, text, shouldSave = true) {
      const isUser = sender === 'user';
      const msgEl = document.createElement('div');
      msgEl.className = `ai-msg ${isUser ? 'ai-msg-user' : 'ai-msg-bot'}`;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (isUser) {
        msgEl.innerHTML = `
          <div class="ai-msg-content">
            <div class="ai-msg-bubble">
              <p>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <span class="ai-msg-time">${timeStr}</span>
          </div>
        `;
      } else {
        const formattedContent = parseMarkdown(text);
        msgEl.innerHTML = `
          <div class="ai-msg-avatar">
            <img src="assets/logo.jpeg" alt="DABEL-AI">
          </div>
          <div class="ai-msg-content">
            <div class="ai-msg-bubble">${formattedContent}</div>
            <span class="ai-msg-time">${timeStr}</span>
          </div>
        `;
      }

      aiChatMessages.appendChild(msgEl);
      scrollToBottom();

      if (shouldSave) {
        chatHistory.push({ sender, text });
        try {
          sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory.slice(-20)));
        } catch (e) {}
      }
    }

    // Call AI Backend or Client Gemini
    async function fetchAIReply(userMessage) {
      const apiKey = localStorage.getItem(STORAGE_KEY) || '';
      const model = localStorage.getItem(MODEL_KEY) || 'gemini-1.5-flash';

      // 1. First attempt: call local server endpoint /api/chat
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            history: chatHistory,
            apiKey: apiKey,
            model: model
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.reply) {
            return data.reply;
          }
        }
      } catch (serverErr) {
        console.warn('Backend /api/chat unreachable, evaluating client fallback:', serverErr);
      }

      // 2. Client-side direct Gemini API fallback (e.g. if hosted statically without Node server)
      if (apiKey && apiKey.trim().length > 10) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          const contents = [];
          chatHistory.slice(-6).forEach(item => {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          });
          contents.push({ role: 'user', parts: [{ text: userMessage }] });

          const directResp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
            })
          });

          if (directResp.ok) {
            const directData = await directResp.json();
            const directText = directData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (directText) return directText;
          }
        } catch (directErr) {
          console.error('Direct client Gemini call error:', directErr);
        }
      }

      // 3. Fallback client knowledge reply
      return `### 💡 DABEL-AI Quick Advisor
Thank you for your question! For instant assistance with course admissions, custom quotes, or school portal demonstrations, our Lead Architect and Admissions Officers are standing by live on WhatsApp:

👉 [Click here to chat instantly on WhatsApp (+234 806 216 8465)](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20have%20an%20inquiry%20regarding%20your%20services)

*(Tip: You can also tap the ⚙️ settings icon at the top of this window to enter your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) for full generative conversation).*`;
    }

    // Send Message Handler
    async function sendMessage(text) {
      const msg = (text || (aiChatInput ? aiChatInput.value : '')).trim();
      if (!msg) return;

      if (aiChatInput) aiChatInput.value = '';

      // Render user bubble
      renderMessageBubble('user', msg, true);

      // Show typing indicator
      if (aiTypingIndicator) {
        aiTypingIndicator.classList.add('active');
        scrollToBottom();
      }

      try {
        const reply = await fetchAIReply(msg);
        if (aiTypingIndicator) aiTypingIndicator.classList.remove('active');
        renderMessageBubble('assistant', reply, true);
      } catch (err) {
        if (aiTypingIndicator) aiTypingIndicator.classList.remove('active');
        renderMessageBubble('assistant', 'Sorry, I encountered an issue processing your request. Please try again or reach out on [WhatsApp](https://wa.me/2348062168465).');
      }
    }

    if (aiChatForm) {
      aiChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
      });
    }

    // Voice Input with Web Speech API
    if (aiMicBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      let isRecording = false;

      aiMicBtn.addEventListener('click', () => {
        if (!isRecording) {
          try {
            recognition.start();
            isRecording = true;
            aiMicBtn.classList.add('recording');
            aiMicBtn.title = 'Listening... Speak now';
          } catch (e) {
            console.error('Speech recognition start failed:', e);
          }
        } else {
          recognition.stop();
          isRecording = false;
          aiMicBtn.classList.remove('recording');
          aiMicBtn.title = 'Speak to DABEL-AI';
        }
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && aiChatInput) {
          aiChatInput.value = transcript;
          sendMessage(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        isRecording = false;
        aiMicBtn.classList.remove('recording');
        aiMicBtn.title = 'Speak to DABEL-AI';
      };

      recognition.onend = () => {
        isRecording = false;
        aiMicBtn.classList.remove('recording');
        aiMicBtn.title = 'Speak to DABEL-AI';
      };
    } else if (aiMicBtn) {
      aiMicBtn.style.display = 'none'; // Hide if browser doesn't support Web Speech API
    }
  }
});
