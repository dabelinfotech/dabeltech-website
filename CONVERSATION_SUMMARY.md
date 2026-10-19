# DABELTECH Web Platform — Complete Conversation & Development Archive

**Conversation ID:** `127b67ab-e585-49df-ad62-587cd759647b`  
**Date:** October 15–19, 2026  
**Project:** DABELTECH & DABELTECH INSTITUTE Official Web Platform  
**Live Production URL:** [https://dabeltech-website.vercel.app](https://dabeltech-website.vercel.app)  
**Dedicated Programs Tab:** [https://dabeltech-website.vercel.app/programs.html](https://dabeltech-website.vercel.app/programs.html)  
**Dedicated Projects Tab:** [https://dabeltech-website.vercel.app/projects.html](https://dabeltech-website.vercel.app/projects.html)  
**Dedicated Gallery Tab:** [https://dabeltech-website.vercel.app/gallery.html](https://dabeltech-website.vercel.app/gallery.html)  
**GitHub Repository:** [https://github.com/dabelinfotech/dabeltech-website](https://github.com/dabelinfotech/dabeltech-website)  
**Desktop Directory:** `C:\Users\DABELTECH\Desktop\DABELTECH WEBSITE\`  
**Workspace Directory:** `C:\Users\DABELTECH\.gemini\antigravity-ide\scratch\dabeltech-website\`  

---

## 1. Executive Summary

This archive records all technical requirements, visual updates, architectural changes, mobile optimization passes, bug fixes, and repository deployments completed during this session for **DABELTECH** ("Leading The Digital Revolution").

---

## 2. Chronological Record of User Requests & Implementations

### Request 1: Navbar Tabs & Branding Restriction
- Restrict navigation tabs strictly to: `Home`, `Programs`, `Services`, `Project`, `Gallery`, `BootCamp`, `Get a Quote`, and `Enroll Now`.
- Standardized navbar links to the 8 required items.

### Request 2: Motion Banner Slider & Quick Select Carousel
- Built `.motion-banners-section` with 19 interactive motion slides.
- Zoomed out previews with `object-fit: contain` and ambient backdrops.
- Built thumbnail carousel with next/prev controls.

### Request 3: Front Page Advert Videos Showcase
- Added official advert videos (`advert-video-1.mp4` and `advert-video-2.mp4`) with chaining and sound controls.

### Request 4: Reorganize Content by Menu Tab
- "put all the content/post under there respective menu tab, put the official commercial advert 01 and 02 display on the frontend of the dashboard and also under gallery and put other videos and images under gallery. let the everything partaining to programs and courses display under program tab"

### Request 5: Project Showcase Dedicated Under Project Tab
- "put the project showcase under project menu tab"
- "remove the project content from thr dashboard frontend and restrict it to be under the project menu tab only"
- "remove from the default web front page"
- Completely removed `<section class="section projects-section" id="projects">` from `index.html`.
- Created dedicated `projects.html` page housing all 15 repositories with interactive filters.

### Request 6: Removal of Academic Programs & Advert 1 and 2 from Front Page (v2.9)
- **User Request:** "remove the academic professional programs and official advert 1 and 2 from the default web front page"
- **Implementation:**
  1. **Clean Default Web Front Page (`index.html`):**
     - Completely removed `<section class="section programs-section" id="programs">` (1,260 lines).
     - Removed `#dash-panel-adverts` and the `Commercial Adverts` tab from the hero executive dashboard.
     - Set `AI & Robotics Intelligence Engine` as the primary active tab on the dashboard frontend.
     - Removed Video 1 (Advert 01) and Video 2 (Advert 02) from `#gallery` on `index.html`.
     - In `#gallery` on `index.html`, retained training lab demos (Videos 3 & 4), 6 photo records, and added a sleek notice banner directing visitors to `gallery.html` for the official broadcast commercials.
     - Top navbar and footer menu tabs link to `programs.html`, `projects.html`, and `gallery.html`.
     - Added instant `<head>` redirects for `#programs`, `#bootcamp`, and `#projects`.
  2. **Dedicated Programs Page (`programs.html`):**
     - Houses all Academic & Professional Programs under the `Programs` menu tab:
       - 7 Certified Career Tracks (Data Analysis, AI & Automation, Full-Stack Web Development, Cybersecurity, Vibe Coding, Digital Marketing, YouTube Mastery).
       - 3 Intensive Bootcamps (`#bootcamp`).
       - 19 Motion Banner Course Curricula & Admissions Showcase with thumbnail preview carousel.
       - Multi-currency Tuition Fee Breakdown (NGN, USD, GHC, KSH, CFA).
  3. **Dedicated Multimedia Gallery Page (`gallery.html`):**
     - Houses the complete multimedia archive under the `Gallery` menu tab:
       - Official Commercial Advert 01 & 02 (1080p HD).
       - Interactive Tech Training Live Demos (Videos 3 & 4).
       - Photographic records (6 campus & founder photos).
       - 19 Banners & Flyers with full-resolution lightbox viewer.
  4. **Multi-Remote Deployment:**
     - Synced to Desktop (`C:\Users\DABELTECH\Desktop\DABELTECH WEBSITE`).
     - Committed and pushed to `dabelinfotech/main` (Vercel production).
     - Committed and pushed to `origin/main` (`dabeltech`).
     - Verified live HTTP 200 and complete section cleanliness.

---

## 3. Architecture & File Matrix

```
dabeltech-website/
├── index.html               # Default Web Front Page (Clean Executive Platform)
├── programs.html            # Dedicated Academic & Professional Programs Page
├── projects.html            # Dedicated 15-Repository Project Showcase Page
├── gallery.html             # Dedicated Multimedia Gallery (Adverts 01 & 02 + Demos + Photos)
├── styles.css               # Core Styles & Responsive Design Tokens (v2.9)
├── script.js                # Interactive Sliders, Lightboxes, Modals (v2.9)
├── assets/                  # 60+ images, logos, banners, and 4 video files
├── README.md                # Platform Documentation
└── .gitignore               # Clean Repository Ignores
```

---

## 4. GitHub Remote Details

- **Remote dabeltech:** `https://github.com/dabeltech/dabeltech-website.git`
- **Remote dabelinfotech:** `https://github.com/dabelinfotech/dabeltech-website.git`
- **Default Branch:** `main`
- **Latest Commit:** `2709ba8`
- **Status:** Clean working tree, fully synced and live on Vercel (`styles.css?v=2.9`).
