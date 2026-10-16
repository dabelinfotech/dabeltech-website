const http = require('http');
const fs = require('fs');
const path = require('path');

// =============================================================================
// ZERO-DEPENDENCY .ENV LOADER
// =============================================================================
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)?$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value.trim();
      }
    });
  } catch (err) {
    console.warn('Could not read .env file:', err.message);
  }
}

const PORT = parseInt(process.env.PORT, 10) || 8080;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.json': 'application/json; charset=UTF-8',
  '.ico': 'image/x-icon'
};

// =============================================================================
// DABEL-AI KNOWLEDGE BASE & SYSTEM INSTRUCTION
// =============================================================================
const DABELTECH_SYSTEM_PROMPT = `You are DABEL-AI, the official elite AI Assistant and Client Consultant for DABELTECH & DABELTECH INSTITUTE.
Your tone is professional, warm, visionary, and encouraging. You speak with deep expertise in modern digital technologies, software engineering, and certified education.

### ABOUT DABELTECH & DABELTECH INSTITUTE:
- DABELTECH is an international pioneer in smart digital solutions, enterprise software engineering, and advanced technology education.
- Slogan: "Smart Solutions for a Digital Future — Leading The Digital Revolution."
- Founder & Lead Software Architect: Opeyemi Obisesan (Valedictorian Best Student Awardee, visionary full-stack architect, creator of 15+ shipped open-source and commercial products including House of Angels School Result Portal, Zinox Vocals Audio Plugin, S-Whot card game).
- WhatsApp & Hotline: +234 806 216 8465 (Direct WhatsApp link: https://wa.me/2348062168465).
- Global Hubs: Nigeria (Lagos Hub - 12 Tech Innovation Boulevard, Ikeja), Ghana (Accra Hub - East Legon), Kenya (Nairobi - Westlands Cyber Center), Cameroon (Douala - Akwa Digital Suite), United Kingdom (London International Liaison).

### CERTIFIED TRAINING PROGRAMS & COHORTS:
Flexible study modes: 100% Online Live Interactive Batches or Physical In-Person Classes in Lagos.
All tracks include: Verifiable Certificate of Completion, Lifetime LMS Portal Access, Capstone Portfolio Projects, and Mentorship.
Installment payments are accepted (2-3 installments).

1. Track 01: Vibe Coding & AI Full-Stack Mastery
   - Duration: 12 Weeks (Beginner to Advanced)
   - Curriculum: Next.js 14, Node.js, React, Supabase, Tailwind, Cursor AI, Agentic workflows, Building AI agents.
   - Pricing: ₦180,000 | $220 USD | ₵2,700 GHC | KSh 29,000 | 135,000 CFA

2. Track 02: Data Analytics & Business Intelligence
   - Duration: 10 Weeks (Beginner to Job-Ready)
   - Curriculum: Advanced Excel, SQL database queries, Power BI interactive dashboards, Python for Data Science, Tableau.
   - Pricing: ₦150,000 | $180 USD | ₵2,250 GHC | KSh 24,000 | 112,500 CFA

3. Track 03: Full-Stack Web Engineering
   - Duration: 16 Weeks (Intensive Bootcamp)
   - Curriculum: HTML5, CSS3, modern JavaScript (ES6+), React.js, Node.js, Express, MongoDB, PostgreSQL, REST APIs.
   - Pricing: ₦160,000 | $195 USD | ₵2,400 GHC | KSh 25,500 | 120,000 CFA

4. Track 04: AI, Machine Learning & Robotics
   - Duration: 14 Weeks
   - Curriculum: Python, Machine Learning algorithms, TensorFlow, Computer Vision with OpenCV, Arduino robotics, IoT hardware.
   - Pricing: ₦220,000 | $270 USD | ₵3,300 GHC | KSh 35,000 | 165,000 CFA

5. Track 05: Cybersecurity & Ethical Hacking
   - Duration: 12 Weeks
   - Curriculum: Network security protocols, Kali Linux, Penetration testing, Vulnerability scanning, CEH exam prep.
   - Pricing: ₦175,000 | $215 USD | ₵2,600 GHC | KSh 28,000 | 130,000 CFA

6. Track 06: Digital Marketing & Growth Hacking
   - Duration: 8 Weeks
   - Curriculum: High-converting Meta Ads, Google Ads (SEM), Technical SEO, Viral TikTok/Instagram marketing, Automated sales funnels.
   - Pricing: ₦120,000 | $145 USD | ₵1,800 GHC | KSh 19,000 | 90,000 CFA

7. Track 07: YouTube Mastery & Digital Content Creation
   - Duration: 6 Weeks Intensive
   - Curriculum: Channel niche selection, viral video SEO, 4K video editing (Adobe Premiere Pro & CapCut), high CTR thumbnails, YouTube automation & monetization, AdSense, brand sponsorships.
   - Pricing: ₦110,000 | $135 USD | ₵1,650 GHC | KSh 17,500 | 82,500 CFA

### ENTERPRISE SMART SOFTWARE SERVICES:
1. School Result Management Portals: Automated grading, scratch-card pin verification, custom termly report cards with barcodes/QR, SMS broadcast to parents. (Live demo: House of Angels School Portal).
2. Computer-Based Testing (CBT) Portals: JAMB/WAEC/NECO standard examination simulator, countdown timer, auto-grading, student analytics, offline LAN and cloud options.
3. Custom Enterprise Software & Mobile Apps: Scalable web apps, iOS/Android apps, REST APIs, enterprise fintech/ERP solutions.
4. CCTV & Intelligent Surveillance: High-definition IP camera installation, remote smartphone live monitoring, biometric access control.
5. Smart Classroom & Interactive Boards: Digital touch whiteboards, audio-visual laboratory setup for schools and training academies.
6. Computer Hardware Maintenance & Lab Setup: PC repair, workstation upgrades, server room infrastructure, structured network cabling.

### ADVICE & INTERACTION GUIDELINES:
- Always be helpful, clear, and concise. Format responses with neat bullet points, bold highlights, and clean markdown.
- When prospective students ask about pricing, show the price in their currency (or offer the Nigerian Naira and USD options).
- When clients want a demo, quote, or want to enroll, provide clear links:
  - Enroll form: #enroll
  - Instant quote generator: #quote
  - Programs overview: #programs
  - Live projects: #projects
  - Direct WhatsApp link: https://wa.me/2348062168465
- Always invite them to connect on WhatsApp (+234 806 216 8465) for quick admission processing or custom contract quotations.`;

// =============================================================================
// INTELLIGENT RULE-BASED FALLBACK ENGINE (ZERO-CONFIG GUARANTEE)
// =============================================================================
function generateFallbackReply(userMessage) {
  const query = (userMessage || '').toLowerCase();

  if (query.includes('price') || query.includes('fee') || query.includes('cost') || query.includes('how much') || query.includes('tuition')) {
    return `### 🎓 DABELTECH Institute — Course Fees & Multi-Currency Overview

Here is our current tuition breakdown across our 7 certified tracks:

* **01. Vibe Coding & AI Full-Stack Mastery** (12 Wks): **₦180,000** | $220 USD | ₵2,700 GHC | KSh 29,000 | 135,000 CFA
* **02. Data Analytics & Business Intelligence** (10 Wks): **₦150,000** | $180 USD | ₵2,250 GHC | KSh 24,000 | 112,500 CFA
* **03. Full-Stack Web Development** (16 Wks): **₦160,000** | $195 USD | ₵2,400 GHC | KSh 25,500 | 120,000 CFA
* **04. AI, Machine Learning & Robotics** (14 Wks): **₦220,000** | $270 USD | ₵3,300 GHC | KSh 35,000 | 165,000 CFA
* **05. Cybersecurity & Ethical Hacking** (12 Wks): **₦175,000** | $215 USD | ₵2,600 GHC | KSh 28,000 | 130,000 CFA
* **06. Digital Marketing & Growth Hacking** (8 Wks): **₦120,000** | $145 USD | ₵1,800 GHC | KSh 19,000 | 90,000 CFA
* **07. YouTube Mastery & Content Creation** (6 Wks): **₦110,000** | $135 USD | ₵1,650 GHC | KSh 17,500 | 82,500 CFA

💡 **Perks Included:** Flexible 2–3 installment payments, lifetime LMS access, mentorship, and verifiable certification!

👉 [Click here to calculate custom quote](#quote) or [Enroll in a Cohort](#enroll).  
💬 Prefer to chat with an admissions officer? [Message us on WhatsApp (+234 806 216 8465)](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20want%20to%20inquire%20about%20course%20fees).`;
  }

  if (query.includes('youtube') || query.includes('video editing') || query.includes('monetiz')) {
    return `### 📹 YouTube Mastery & Digital Content Creation (Track 07)

Our YouTube Mastery track is designed to take you from 0 to a monetized, viral channel:

* **Duration:** 6 Weeks Intensive (Online & In-Person)
* **Tuition:** **₦110,000** | $135 USD | ₵1,650 GHC | KSh 17,500 | 82,500 CFA
* **Core Syllabus:**
  - High-traffic niche selection & audience psychology
  - 4K Video Editing with Adobe Premiere Pro & CapCut
  - High CTR Thumbnail Design with Photoshop & Canva
  - YouTube SEO, Tagging, Titles & Algorithm Optimization
  - YouTube Automation, AI Scriptwriting & Faceless Channels
  - AdSense Monetization, Brand Deals & Affiliate Funnels

👉 [Enroll in YouTube Mastery Today](#enroll) or [Chat on WhatsApp](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20am%20interested%20in%20the%20YouTube%20Mastery%20Course).`;
  }

  if (query.includes('school') || query.includes('result') || query.includes('cbt') || query.includes('portal') || query.includes('exam')) {
    return `### 🏫 Smart Educational Portals by DABELTECH

We are the premier developers of enterprise school technology across West Africa:

1. **School Result Management Portal:**
   - Automated grade calculations & instant position ranking
   - Custom PDF report cards with student photos, QR codes & school crest
   - Scratch-card pin verification system for termly result access
   - Instant SMS & WhatsApp notifications to parents
   - *Live Production Example:* [House of Angels School Portal](https://house-of-angels-schools-portal.vercel.app)

2. **Computer-Based Testing (CBT) Platform:**
   - Realistic JAMB/WAEC/NECO examination interface
   - Automated timer countdown and instant grading analytics
   - Offline local school server support + cloud synchronization
   - Question bank management with mathematical symbols and diagrams

👉 [Request a Live Demonstration & Quotation](#quote) or [Connect with our Lead Architect on WhatsApp](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20want%20to%20request%20a%20School%20Result%20or%20CBT%20Portal%20demo).`;
  }

  if (query.includes('founder') || query.includes('opeyemi') || query.includes('obisesan') || query.includes('who built') || query.includes('ceo') || query.includes('leader')) {
    return `### 👨‍💻 Meet DABELTECH's Founder — Opeyemi Obisesan

**Opeyemi Obisesan** is the Lead Software Architect and Founder of DABELTECH & DABELTECH INSTITUTE:

* **Academic Excellence:** Honored Valedictorian Best Student Awardee.
* **Engineering Impact:** Architected 15+ production-grade web systems, educational portals, and audio plugins on GitHub.
* **Featured Inventions:**
  - *House of Angels Schools Result Portal* (Live portal serving hundreds of students)
  - *Zinox Vocals Audio Plugin* (Modern digital audio production tool)
  - *S-Whot Card Game* (Interactive browser-based game engine)
* **Vision:** Empowering the next generation of African and global developers with high-demand tech skills while engineering mission-critical software for schools and enterprises.

👉 [View Founder's Live Portfolio](https://dabelinfotech-github-io.vercel.app/) or [Explore GitHub (15 Repos)](https://github.com/dabelinfotech).`;
  }

  if (query.includes('contact') || query.includes('whatsapp') || query.includes('phone') || query.includes('location') || query.includes('address') || query.includes('call')) {
    return `### 📞 Contact DABELTECH & Global Hubs

We are always online and ready to assist you:

* **WhatsApp Hotline (Fastest):** [+234 806 216 8465](https://wa.me/2348062168465)
* **Email:** contact@dabeltech.com / dabelinfotech@gmail.com
* **Main Headquarters:** 12 Tech Innovation Boulevard, Ikeja, Lagos, Nigeria
* **International Liaison Hubs:**
  - 🇬🇭 Accra, Ghana (East Legon Hub)
  - 🇰🇪 Nairobi, Kenya (Westlands Cyber Center)
  - 🇨🇲 Douala, Cameroon (Akwa Digital Suite)
  - 🇬🇧 London, United Kingdom (International Desk)

👉 [Open WhatsApp Chat Now](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20would%20like%20to%20connect%20with%20your%20team).`;
  }

  if (query.includes('service') || query.includes('web design') || query.includes('cctv') || query.includes('software') || query.includes('repair')) {
    return `### ⚡ DABELTECH Enterprise Tech Services

Beyond our academy, we deliver end-to-end technology solutions:

* **School Result & CBT Portals:** Enterprise grade automated school systems.
* **Custom Web & Mobile Development:** High-performance responsive websites, web applications, and APIs.
* **CCTV & Intelligent Surveillance:** Security camera installation with 24/7 mobile live streaming.
* **Smart Classroom & Interactive Whiteboards:** Modern digital board setups for schools.
* **Computer Lab Setup & Hardware Maintenance:** Workstation deployment, networking, and component repairs.

👉 [Get an Instant Project Quote](#quote) or [Discuss Your Project on WhatsApp](https://wa.me/2348062168465?text=Hello%20DABELTECH%2C%20I%20need%20a%20quotation%20for%20enterprise%20services).`;
  }

  return `### 👋 Welcome to DABELTECH & DABELTECH INSTITUTE!

I am **DABEL-AI**, your dedicated digital consultant. Here is how I can assist you right now:

* 🎓 **Explore Certified Programs:** Inquire about fees, curriculum, and schedules for our 7 tech tracks (Full-Stack, Data Analytics, YouTube Mastery, Cybersecurity, AI/Robotics, Vibe Coding, Digital Marketing).
* 🏫 **Enterprise Portals:** Learn about our automated **School Result Portals** and **CBT Examination Systems**.
* 💰 **Pricing & Quotes:** Get exact prices in NGN (₦), USD ($), GHC (₵), KSH, or CFA.
* 👨‍💻 **Founder & Portfolio:** Discover our Lead Architect Opeyemi Obisesan and our 15+ live products.
* 💬 **Live Human Advisor:** [Message our Admissions Team on WhatsApp (+234 806 216 8465)](https://wa.me/2348062168465).

*💡 Tip: You can also tap the Settings ⚙️ icon on this chat to connect your personal Google Gemini API key for open-ended conversation!*`;
}

// =============================================================================
// GOOGLE GEMINI API CALLER
// =============================================================================
async function callGeminiAPI({ message, history = [], apiKey, model }) {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

  if (!effectiveKey) {
    // Return high-value fallback response if no API key is provided
    const fallbackText = generateFallbackReply(message);
    return {
      reply: fallbackText,
      source: 'dabeltech-knowledge-engine',
      hasApiKey: false
    };
  }

  // Build candidate models cascade
  let primaryModel = (model || process.env.GEMINI_MODEL || 'gemini-3.5-flash').trim();
  if (primaryModel === 'gemini-1.5-flash' || primaryModel === 'gemini-2.0-flash' || primaryModel === 'gemini-2.5-flash') {
    primaryModel = 'gemini-3.5-flash';
  }

  const modelCandidates = [
    primaryModel,
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash'
  ];
  // Deduplicate candidate list
  const uniqueModels = [...new Set(modelCandidates)];

  // Build conversational contents with DABELTECH persona & grounding
  const contents = [
    {
      role: 'user',
      parts: [{ text: `SYSTEM DIRECTIVE & KNOWLEDGE BASE:\n${DABELTECH_SYSTEM_PROMPT}` }]
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I am DABEL-AI, the official AI Assistant and Client Consultant for DABELTECH & DABELTECH INSTITUTE. I am ready to assist visitors with accurate, professional, and inspiring guidance.' }]
    }
  ];

  // Add previous conversational turns (up to last 10 messages for speed & context)
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-10);
    recentHistory.forEach(item => {
      if (item.sender === 'user') {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'assistant' || item.sender === 'model') {
        contents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    });
  }

  // Add the current user message
  contents.push({ role: 'user', parts: [{ text: message }] });

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.95
    }
  };

  for (const candidateModel of uniqueModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${candidateModel}:generateContent?key=${effectiveKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return {
            reply,
            source: 'google-gemini',
            model: candidateModel,
            hasApiKey: true
          };
        }
      } else {
        const errText = await response.text();
        console.warn(`Model ${candidateModel} returned ${response.status}:`, errText);
      }
    } catch (modelErr) {
      console.warn(`Error calling candidate model ${candidateModel}:`, modelErr.message);
    }
  }

  // If all Gemini models are unreachable or failed
  const fallbackText = generateFallbackReply(message);
  return {
    reply: `${fallbackText}\n\n*(Note: Displaying instant DABELTECH knowledge response. All models currently busy.)*`,
    source: 'gemini-fallback',
    error: 'All models returned errors'
  };
}

// =============================================================================
// HTTP SERVER WITH STATIC FILES & API ROUTING
// =============================================================================
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ---------------------------------------------------------------------------
  // API ROUTE: POST /api/chat
  // ---------------------------------------------------------------------------
  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        // Guard against overly large payloads (1MB max)
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const userMessage = payload.message || '';
        const history = payload.history || [];
        const clientApiKey = payload.apiKey || '';
        const clientModel = payload.model || process.env.GEMINI_MODEL || 'gemini-3.8-flash';

        if (!userMessage.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, error: 'Message cannot be empty' }));
          return;
        }

        const result = await callGeminiAPI({
          message: userMessage,
          history,
          apiKey: clientApiKey,
          model: clientModel
        });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          reply: result.reply,
          source: result.source,
          model: result.model || clientModel,
          hasApiKey: result.hasApiKey !== false
        }));
      } catch (err) {
        console.error('Chat endpoint error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: false,
          error: 'Internal server error processing AI chat',
          reply: generateFallbackReply('')
        }));
      }
    });
    return;
  }

  // ---------------------------------------------------------------------------
  // API ROUTE: GET /api/ai-status
  // ---------------------------------------------------------------------------
  if (pathname === '/api/ai-status' && req.method === 'GET') {
    const hasServerKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({
      status: 'online',
      provider: 'Google Gemini',
      defaultModel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      hasServerKey
    }));
    return;
  }

  // ---------------------------------------------------------------------------
  // STATIC FILE SERVING
  // ---------------------------------------------------------------------------
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    // Support HTTP 206 Partial Content for video streaming & fast scrubbing
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      fileStream.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`DABELTECH Server live at http://localhost:${PORT}`);
  console.log(`DABEL-AI endpoint ready at http://localhost:${PORT}/api/chat`);
});
