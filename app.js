/**
 * PROTOCOL 90: CYBER SECURITY & DISCIPLINE COMMAND CENTER
 * Client-side Controller & Persistent Engine
 */

(function () {
  'use strict';

  // --- DEFAULT DATA TEMPLATES ---
  const DEFAULT_ROUTINE = [
    {
      id: 'routine_1',
      time: '06:30 AM',
      title: 'Bed Exit & Cold Shock',
      desc: 'Instant bed exit, fold rajai, drink 1 glass warm water (zero snoozing).',
      tag: 'Discipline',
      tagColor: 'amber',
      completed: false,
      note: ''
    },
    {
      id: 'routine_2',
      time: '07:00 - 07:45 AM',
      title: 'Physical Activation',
      desc: '25 pushups, bodyweight stretching, 2 km brisk walk (body temperature warmup).',
      tag: 'Physique',
      tagColor: 'emerald',
      completed: false,
      note: ''
    },
    {
      id: 'routine_3',
      time: '08:00 - 08:30 AM',
      title: 'Grooming & Clean Fuel',
      desc: 'Daily bath (beat winter lethargy), facewash/sunscreen, light warm breakfast (poha/dalia/chana; 0% deep-fried).',
      tag: 'Fuel',
      tagColor: 'cyan',
      completed: false,
      note: ''
    },
    {
      id: 'routine_4',
      time: '09:15 AM',
      title: 'Transit to Office',
      desc: 'Bag packed with laptop, exit flat, relocate physically to office (flat is strictly for sleeping).',
      tag: 'Environment',
      tagColor: 'purple',
      completed: false,
      note: ''
    },
    {
      id: 'routine_5',
      time: '09:30 AM - 01:30 PM',
      title: 'Deep Work Block 1 (Cyber Security Practical)',
      desc: '4 hours terminal and labs (OverTheWire / TryHackMe). Phone locked in bag, wired earphones on (Do Not Disturb Shield).',
      tag: 'Core Lab',
      tagColor: 'emerald',
      completed: false,
      note: ''
    },
    {
      id: 'routine_6',
      time: '01:30 - 02:30 PM',
      title: 'Lunch & 15-Min Walk',
      desc: 'Light meal + outdoor walk to eliminate afternoon brain fog.',
      tag: 'Recovery',
      tagColor: 'cyan',
      completed: false,
      note: ''
    },
    {
      id: 'routine_7',
      time: '02:30 - 06:00 PM',
      title: 'Deep Work Block 2 (Income Generation & Skill Building)',
      desc: 'Writing technical documentation, lab walkthrough drafts, freelancing gig research, local IT system support outreach.',
      tag: 'Monetization',
      tagColor: 'amber',
      completed: false,
      note: ''
    },
    {
      id: 'routine_8',
      time: '06:00 - 07:30 PM',
      title: 'Revision & Public Proof-of-Work',
      desc: '1 GitHub commit or Notion technical log published.',
      tag: 'Proof-of-Work',
      tagColor: 'purple',
      completed: false,
      note: ''
    },
    {
      id: 'routine_9',
      time: '08:00 PM',
      title: 'Flat Return & Light Dinner',
      desc: 'Dal, roti, green vegetables (avoid heavy/oily meals).',
      tag: 'Fuel',
      tagColor: 'cyan',
      completed: false,
      note: ''
    },
    {
      id: 'routine_10',
      time: '09:00 - 10:30 PM',
      title: 'Low-Dopamine Chill & Family',
      desc: 'Darknet Diaries / Lex Fridman Security podcast, call home. All screens dark by 10:30 PM.',
      tag: 'Decompress',
      tagColor: 'slate',
      completed: false,
      note: ''
    },
    {
      id: 'routine_11',
      time: '11:00 PM',
      title: 'Lights Out',
      desc: '7.5 hours non-negotiable sleep.',
      tag: 'Recharge',
      tagColor: 'slate',
      completed: false,
      note: ''
    }
  ];

  const DEFAULT_SUNDAY_ROUTINE = [
    {
      id: 'sun_1',
      time: '10:00 AM - 02:00 PM',
      title: 'Backlog Cleared',
      desc: 'Re-attempt failed labs, finish pending walkthrough notes, and solidifying incomplete concepts.',
      completed: false
    },
    {
      id: 'sun_2',
      time: '02:00 - 04:00 PM',
      title: 'Next Week Blueprint',
      desc: 'Set upcoming 7-day lab targets, plan Bandit/THM room targets and technical writing topics.',
      completed: false
    },
    {
      id: 'sun_3',
      time: '04:30 PM Onwards',
      title: 'Offline Reboot',
      desc: 'Complete screen disconnection; visit Central Park / Jaipur Library without phone scrolling.',
      completed: false
    }
  ];

  const DEFAULT_GUARDRAILS = [
    {
      id: 'gr_1',
      title: 'Zero Gaming',
      desc: 'BGMI & all mobile games uninstalled and untouched.',
      secure: true // true = intact, false = breached (red)
    },
    {
      id: 'gr_2',
      title: 'Zero Doom-Scrolling',
      desc: 'Instagram app uninstalled, YouTube Shorts blocked/avoided.',
      secure: true
    },
    {
      id: 'gr_3',
      title: 'The Office Earphone Shield',
      desc: 'Wired earphones worn during work hours to prevent unwanted small talk.',
      secure: true
    },
    {
      id: 'gr_4',
      title: 'Anti-Trap Boundary',
      desc: 'Said clear "NO" to unverified course-building partnerships and shortcuts.',
      secure: true
    },
    {
      id: 'gr_5',
      title: 'Stealth Execution',
      desc: 'Built in silence; shared progress only via GitHub/proof-of-work, not verbal bragging.',
      secure: true
    },
    {
      id: 'gr_6',
      title: 'Health & Brain Clarity',
      desc: '3 Liters water consumed, zero fast-food/refined oils, max 1 cup tea.',
      secure: true
    }
  ];

  const DEFAULT_NETWORKING = [
    { id: 'net_1', name: 'OSI 7-Layer Model & Real Packet Flow', completed: false },
    { id: 'net_2', name: 'TCP 3-Way Handshake vs UDP', completed: false },
    { id: 'net_3', name: 'IP Addressing, CIDR & Subnetting Basics', completed: false },
    { id: 'net_4', name: 'DNS, DHCP, NAT Functionality', completed: false },
    { id: 'net_5', name: 'Critical Ports & Protocols (21, 22, 23, 25, 53, 80, 443, 3389, 8080)', completed: false },
    { id: 'net_6', name: 'Wireshark: Basic Packet Capture & Inspection', completed: false }
  ];

  const DEFAULT_THM = [
    { id: 'thm_1', name: 'Open-Source Intelligence (OSINT) Basics', completed: false },
    { id: 'thm_2', name: 'Linux Fundamentals (Parts 1, 2, 3)', completed: false },
    { id: 'thm_3', name: 'Windows Fundamentals (Parts 1, 2)', completed: false },
    { id: 'thm_4', name: 'Network Fundamentals & Nmap Port Scanning', completed: false },
    { id: 'thm_5', name: 'Web Fundamentals & Burp Suite: The Basics', completed: false },
    { id: 'thm_6', name: 'OWASP Top 10: SQL Injection (SQLi)', completed: false },
    { id: 'thm_7', name: 'OWASP Top 10: Cross-Site Scripting (XSS)', completed: false },
    { id: 'thm_8', name: 'OWASP Top 10: Command Injection', completed: false },
    { id: 'thm_9', name: 'Junior Penetration Tester: Intro & Methodology', completed: false }
  ];

  const DEFAULT_MONETIZATION = [
    { id: 'mon_1', title: 'Technical Writing', desc: 'Pitch 5 tech blogs/platforms for paid documentation gigs.', completed: false },
    { id: 'mon_2', title: 'Local Office Support', desc: 'Troubleshoot router security and OS configurations in local network.', completed: false },
    { id: 'mon_3', title: 'Bug Bounty / VDP', desc: 'Submit first vulnerability disclosure report on HackerOne/Bugcrowd or open-source repo.', completed: false },
    { id: 'mon_4', title: 'Independence Achieved', desc: 'Hand ₹5,000 rent to landlord from personal earnings.', completed: false }
  ];

  // --- STATE MANAGEMENT ---
  const STORAGE_KEY = 'PROTOCOL_90_STATE_V1';

  let state = {
    startDate: new Date().toISOString().split('T')[0],
    manualDayOverride: null,
    sundayMode: false,
    routine: DEFAULT_ROUTINE,
    sundayRoutine: DEFAULT_SUNDAY_ROUTINE,
    guardrails: DEFAULT_GUARDRAILS,
    banditCompleted: [], // array of level numbers e.g. [0, 1, 2]
    networking: DEFAULT_NETWORKING,
    thm: DEFAULT_THM,
    walkthroughCount: 0,
    monetization: DEFAULT_MONETIZATION,
    earnings: [], // array of { id, amount, date, source, note }
    proofOfWorkLogs: [], // array of { id, timestamp, topic, errorFix, link }
    lastActiveDate: new Date().toDateString()
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign({}, state, parsed);
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
    checkDayRollover();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
    renderAll();
  }

  // --- DAY ROLLOVER & HISTORICAL HANDLING ---
  function checkDayRollover() {
    const todayStr = new Date().toDateString();
    if (state.lastActiveDate && state.lastActiveDate !== todayStr) {
      // New day started! Check if we should archive and reset daily checks
      console.log('New calendar day detected in Jaipur. Updating timestamp.');
      state.lastActiveDate = todayStr;
      // Auto-set Sunday mode if today is Sunday
      const dayOfWeek = new Date().getDay();
      if (dayOfWeek === 0) {
        state.sundayMode = true;
      }
      saveState();
    }
  }

  function calculateProtocolDay() {
    if (state.manualDayOverride) {
      return Math.min(90, Math.max(1, state.manualDayOverride));
    }
    const start = new Date(state.startDate);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(90, Math.max(1, diffDays));
  }

  // --- CLOCK & TIMERS ---
  function startJaipurClock() {
    function update() {
      const now = new Date();
      // Format in IST (Jaipur Time)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-IN', options).format(now);
      const clockEl = document.getElementById('jaipurClock');
      if (clockEl) {
        clockEl.textContent = timeStr;
      }
    }
    update();
    setInterval(update, 1000);
  }

  // --- UI NOTIFICATIONS (TOASTS) ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const colorClass = type === 'alert' 
      ? 'border-rose-500 bg-rose-950/90 text-rose-200' 
      : type === 'success' 
      ? 'border-emerald-500 bg-emerald-950/90 text-emerald-200' 
      : 'border-cyan-500 bg-slate-900/90 text-cyan-200';

    toast.className = `p-3 rounded-lg border shadow-xl text-xs font-mono pointer-events-auto flex items-center justify-between gap-3 min-w-[240px] animate-slideDown ${colorClass}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="text-xs hover:text-white font-bold ml-2">✕</button>
    `;

    toast.querySelector('button').onclick = () => toast.remove();
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  // --- RENDER FUNCTIONS ---
  function renderAll() {
    renderHeaderAndMeters();
    renderRoutine();
    renderGuardrails();
    renderCyberCurriculum();
    renderLogs();
    renderLedger();
  }

  function renderHeaderAndMeters() {
    const day = calculateProtocolDay();
    const dayEl = document.getElementById('currentDayDisplay');
    if (dayEl) dayEl.textContent = `Day ${day}`;

    // Sunday mode toggle reflection
    const sundayToggle = document.getElementById('sundayModeToggle');
    const sundayIndicator = document.getElementById('sundayIndicator');
    const sundayLabel = document.getElementById('sundayLabel');
    const weekdayRoutineSection = document.getElementById('weekdayRoutineSection');
    const sundayRoutineSection = document.getElementById('sundayRoutineSection');

    if (sundayToggle) sundayToggle.checked = state.sundayMode;
    if (sundayIndicator) {
      sundayIndicator.className = state.sundayMode 
        ? 'w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]' 
        : 'w-2 h-2 rounded-full bg-slate-600';
    }
    if (sundayLabel) {
      sundayLabel.textContent = state.sundayMode ? 'Sunday Mode: ACTIVE' : 'Sunday Mode: OFF';
      sundayLabel.className = state.sundayMode ? 'text-xs font-mono font-medium text-amber-300' : 'text-xs font-mono font-medium text-slate-400';
    }

    if (state.sundayMode) {
      weekdayRoutineSection.classList.add('hidden');
      sundayRoutineSection.classList.remove('hidden');
    } else {
      weekdayRoutineSection.classList.remove('hidden');
      sundayRoutineSection.classList.add('hidden');
    }

    // Rent Independence Calculation
    const targetRent = 5000;
    const totalEarned = state.earnings.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const rentPercent = Math.min(100, Math.round((totalEarned / targetRent) * 100));
    const rentEarnedDisplay = document.getElementById('rentEarnedDisplay');
    const rentProgressBar = document.getElementById('rentProgressBar');
    const rentPercentage = document.getElementById('rentPercentage');
    const rentRemaining = document.getElementById('rentRemaining');

    if (rentEarnedDisplay) rentEarnedDisplay.textContent = `₹${totalEarned.toLocaleString('en-IN')}`;
    if (rentProgressBar) rentProgressBar.style.width = `${rentPercent}%`;
    if (rentPercentage) rentPercentage.textContent = `${rentPercent}% Paid to Landlord`;
    if (rentRemaining) {
      const remaining = Math.max(0, targetRent - totalEarned);
      if (remaining === 0) {
        rentRemaining.textContent = '🎉 RENT FULLY COVERED!';
        rentRemaining.className = 'text-emerald-400 font-bold';
      } else {
        rentRemaining.textContent = `₹${remaining.toLocaleString('en-IN')} Needed`;
        rentRemaining.className = 'text-amber-400';
      }
    }

    // Daily Discipline Index Calculation
    // Routine completed: 60%
    // Active Guardrails (secure): 40%
    const currentRoutine = state.sundayMode ? state.sundayRoutine : state.routine;
    const routineDoneCount = currentRoutine.filter(r => r.completed).length;
    const routineScore = currentRoutine.length > 0 ? (routineDoneCount / currentRoutine.length) * 60 : 0;

    const secureGuardrailsCount = state.guardrails.filter(g => g.secure).length;
    const guardrailScore = (secureGuardrailsCount / state.guardrails.length) * 40;

    const disciplineTotal = Math.round(routineScore + guardrailScore);

    const circle = document.getElementById('disciplineCircle');
    const percentText = document.getElementById('disciplinePercentText');
    const statusTag = document.getElementById('disciplineStatusTag');

    if (percentText) percentText.textContent = `${disciplineTotal}%`;

    if (circle) {
      const circumference = 2 * Math.PI * 40; // r = 40 => ~251.2
      const offset = circumference - (disciplineTotal / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      // Change color based on score
      if (disciplineTotal >= 80) {
        circle.setAttribute('stroke', '#10B981'); // Emerald
      } else if (disciplineTotal >= 50) {
        circle.setAttribute('stroke', '#F59E0B'); // Amber
      } else {
        circle.setAttribute('stroke', '#EF4444'); // System red
      }
    }

    if (statusTag) {
      if (disciplineTotal >= 85) {
        statusTag.textContent = 'STATUS: COMBAT READY';
        statusTag.className = 'inline-block mt-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40';
      } else if (disciplineTotal >= 50) {
        statusTag.textContent = 'STATUS: UNDER PRESSURE';
        statusTag.className = 'inline-block mt-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40';
      } else {
        statusTag.textContent = 'STATUS: LAZINESS / ALERT';
        statusTag.className = 'inline-block mt-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/40 animate-pulse';
      }
    }

    // Quick Counters in Card 3
    const banditCountEl = document.getElementById('banditCounterCard');
    if (banditCountEl) banditCountEl.textContent = `${state.banditCompleted.length} / 26`;

    const thmCountEl = document.getElementById('thmCounterCard');
    const thmDone = state.thm.filter(t => t.completed).length;
    if (thmCountEl) thmCountEl.textContent = `${thmDone} / 9`;

    const powCounterCard = document.getElementById('powCounterCard');
    if (powCounterCard) powCounterCard.textContent = `${state.proofOfWorkLogs.length} Logged`;
  }

  function renderRoutine() {
    const routineList = document.getElementById('routineList');
    const routineText = document.getElementById('routineCompletionText');
    if (!routineList) return;

    routineList.innerHTML = '';
    const completedCount = state.routine.filter(r => r.completed).length;
    if (routineText) routineText.textContent = `${completedCount}/${state.routine.length} Done`;

    state.routine.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = `routine-item rounded-lg p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${item.completed ? 'completed' : ''}`;
      
      el.innerHTML = `
        <div class="flex items-start gap-3 flex-1">
          <input type="checkbox" id="check_${item.id}" ${item.completed ? 'checked' : ''} class="mt-1 w-4 h-4 rounded text-emerald-500 border-slate-700 bg-slate-900 focus:ring-0 cursor-pointer">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                ${item.time}
              </span>
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                ${item.tag}
              </span>
              <h3 class="item-title text-sm font-semibold text-white font-space">${item.title}</h3>
            </div>
            <p class="text-xs text-slate-400 font-mono leading-relaxed">${item.desc}</p>
            <div class="pt-1">
              <input type="text" placeholder="Quick log / note for this block..." value="${escapeHtml(item.note || '')}" data-id="${item.id}" class="routine-note-input w-full bg-slate-950/60 border border-slate-800/80 rounded px-2 py-1 text-[11px] font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500">
            </div>
          </div>
        </div>
      `;

      // Checkbox handler
      const chk = el.querySelector(`#check_${item.id}`);
      chk.addEventListener('change', (e) => {
        state.routine[index].completed = e.target.checked;
        saveState();
        if (e.target.checked) {
          showToast(`Checkpoint logged: ${item.title}`, 'success');
        }
      });

      // Quick note update handler
      const noteInput = el.querySelector('.routine-note-input');
      noteInput.addEventListener('change', (e) => {
        state.routine[index].note = e.target.value;
        saveState();
      });

      routineList.appendChild(el);
    });

    // Render Sunday Checklist if active
    const sundayList = document.getElementById('sundayList');
    const sundayText = document.getElementById('sundayCompletionText');
    if (sundayList) {
      sundayList.innerHTML = '';
      const sunDone = state.sundayRoutine.filter(s => s.completed).length;
      if (sundayText) sundayText.textContent = `${sunDone}/${state.sundayRoutine.length} Done`;

      state.sundayRoutine.forEach((sItem, sIdx) => {
        const sDiv = document.createElement('div');
        sDiv.className = `p-3 rounded-lg border border-amber-500/20 bg-slate-950/60 flex items-start gap-3 ${sItem.completed ? 'opacity-60' : ''}`;
        sDiv.innerHTML = `
          <input type="checkbox" id="sun_check_${sItem.id}" ${sItem.completed ? 'checked' : ''} class="mt-1 w-4 h-4 rounded text-amber-500 border-slate-700 bg-slate-900 cursor-pointer">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">${sItem.time}</span>
              <h4 class="text-sm font-bold text-white font-space">${sItem.title}</h4>
            </div>
            <p class="text-xs text-slate-400 font-mono mt-1">${sItem.desc}</p>
          </div>
        `;
        const sChk = sDiv.querySelector(`#sun_check_${sItem.id}`);
        sChk.addEventListener('change', (e) => {
          state.sundayRoutine[sIdx].completed = e.target.checked;
          saveState();
          if (e.target.checked) {
            showToast(`Sunday milestone cleared: ${sItem.title}`, 'success');
          }
        });
        sundayList.appendChild(sDiv);
      });
    }
  }

  function renderGuardrails() {
    const list = document.getElementById('guardrailList');
    const badge = document.getElementById('guardrailStatusBadge');
    if (!list) return;

    list.innerHTML = '';
    const breached = state.guardrails.filter(g => !g.secure);

    if (badge) {
      if (breached.length === 0) {
        badge.textContent = 'All Secure';
        badge.className = 'text-xs font-mono px-2 py-0.5 rounded font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      } else {
        badge.textContent = `${breached.length} Trap Broken!`;
        badge.className = 'text-xs font-mono px-2 py-0.5 rounded font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse';
      }
    }

    state.guardrails.forEach((gr, idx) => {
      const row = document.createElement('div');
      row.className = `guardrail-switch-container ${gr.secure ? 'secure' : 'breached'}`;

      row.innerHTML = `
        <div class="pr-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold ${gr.secure ? 'text-slate-200' : 'text-rose-400'}">${gr.title}</span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded ${gr.secure ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}">
              ${gr.secure ? 'ACTIVE' : 'BREACHED'}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 font-mono mt-0.5">${gr.desc}</p>
        </div>

        <button type="button" class="toggle-gr-btn shrink-0 px-2.5 py-1 text-xs font-mono rounded font-semibold transition-all ${gr.secure ? 'bg-emerald-900/40 border border-emerald-700 text-emerald-300 hover:bg-rose-950 hover:text-rose-400 hover:border-rose-600' : 'bg-rose-900 border border-rose-600 text-white hover:bg-emerald-900 hover:border-emerald-600'}">
          ${gr.secure ? '🛡️ Guarded' : '⚠️ Reset'}
        </button>
      `;

      const btn = row.querySelector('.toggle-gr-btn');
      btn.addEventListener('click', () => {
        state.guardrails[idx].secure = !state.guardrails[idx].secure;
        saveState();
        if (!state.guardrails[idx].secure) {
          showToast(`ALERT: Guardrail breached: ${gr.title}! Flat rent requires discipline.`, 'alert');
        } else {
          showToast(`Guardrail restored: ${gr.title}`, 'info');
        }
      });

      list.appendChild(row);
    });
  }

  function renderCyberCurriculum() {
    // 1. Bandit Wargame Grid (Levels 0 to 25)
    const banditGrid = document.getElementById('banditGrid');
    const banditRatio = document.getElementById('banditCompletionRatio');
    if (banditGrid) {
      banditGrid.innerHTML = '';
      const totalLevels = 26; // 0 to 25
      if (banditRatio) banditRatio.textContent = `${state.banditCompleted.length}/${totalLevels}`;

      for (let lvl = 0; lvl < totalLevels; lvl++) {
        const btn = document.createElement('div');
        const isDone = state.banditCompleted.includes(lvl);
        btn.className = `bandit-btn ${isDone ? 'completed' : 'unlocked'}`;
        btn.textContent = `L${lvl}`;
        btn.title = `Bandit Level ${lvl} ${isDone ? '(Completed)' : '(Click to toggle done)'}`;

        btn.addEventListener('click', () => {
          if (state.banditCompleted.includes(lvl)) {
            state.banditCompleted = state.banditCompleted.filter(x => x !== lvl);
          } else {
            state.banditCompleted.push(lvl);
            showToast(`Bandit Level ${lvl} conquered! SSH password stored.`, 'success');
          }
          saveState();
        });

        banditGrid.appendChild(btn);
      }
    }

    // 2. Networking Checklist
    const netList = document.getElementById('networkingList');
    const netRatio = document.getElementById('networkingRatio');
    if (netList) {
      netList.innerHTML = '';
      const netDone = state.networking.filter(n => n.completed).length;
      if (netRatio) netRatio.textContent = `${netDone}/${state.networking.length}`;

      state.networking.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = `flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono ${item.completed ? 'border-emerald-500/30 bg-emerald-950/20' : ''}`;
        row.innerHTML = `
          <label class="flex items-center gap-2 cursor-pointer flex-1">
            <input type="checkbox" id="net_chk_${item.id}" ${item.completed ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-cyan-500 border-slate-700 bg-slate-900 cursor-pointer">
            <span class="${item.completed ? 'line-through text-slate-500' : 'text-slate-300'}">${item.name}</span>
          </label>
        `;
        const chk = row.querySelector(`#net_chk_${item.id}`);
        chk.addEventListener('change', (e) => {
          state.networking[idx].completed = e.target.checked;
          saveState();
          if (e.target.checked) showToast(`Networking concept mastered: ${item.name}`, 'success');
        });
        netList.appendChild(row);
      });
    }

    // 3. TryHackMe Rooms
    const thmList = document.getElementById('thmList');
    const thmRatio = document.getElementById('thmRatio');
    if (thmList) {
      thmList.innerHTML = '';
      const thmDone = state.thm.filter(t => t.completed).length;
      if (thmRatio) thmRatio.textContent = `${thmDone}/${state.thm.length}`;

      state.thm.forEach((room, idx) => {
        const row = document.createElement('div');
        row.className = `flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono ${room.completed ? 'border-purple-500/30 bg-purple-950/20' : ''}`;
        row.innerHTML = `
          <label class="flex items-center gap-2 cursor-pointer flex-1">
            <input type="checkbox" id="thm_chk_${room.id}" ${room.completed ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-purple-500 border-slate-700 bg-slate-900 cursor-pointer">
            <span class="${room.completed ? 'line-through text-slate-500' : 'text-slate-300'}">${room.name}</span>
          </label>
        `;
        const chk = row.querySelector(`#thm_chk_${room.id}`);
        chk.addEventListener('change', (e) => {
          state.thm[idx].completed = e.target.checked;
          saveState();
          if (e.target.checked) showToast(`THM Room Finished: ${room.name}`, 'success');
        });
        thmList.appendChild(row);
      });
    }

    // 4. Walkthrough Counter
    const wtDisplay = document.getElementById('walkthroughCountText');
    if (wtDisplay) {
      wtDisplay.textContent = `${state.walkthroughCount} / 10`;
    }

    // 5. Monetization Phase 3
    const monList = document.getElementById('monetizationList');
    const monRatio = document.getElementById('monetizationRatio');
    if (monList) {
      monList.innerHTML = '';
      const monDone = state.monetization.filter(m => m.completed).length;
      if (monRatio) monRatio.textContent = `${monDone}/${state.monetization.length}`;

      state.monetization.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = `p-2.5 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1 ${item.completed ? 'border-emerald-500/40 bg-emerald-950/30' : ''}`;
        row.innerHTML = `
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="mon_chk_${item.id}" ${item.completed ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 border-slate-700 bg-slate-900 cursor-pointer">
            <span class="font-bold ${item.completed ? 'line-through text-emerald-400' : 'text-white'}">${item.title}</span>
          </label>
          <p class="text-[11px] text-slate-400 pl-6">${item.desc}</p>
        `;
        const chk = row.querySelector(`#mon_chk_${item.id}`);
        chk.addEventListener('change', (e) => {
          state.monetization[idx].completed = e.target.checked;
          saveState();
          if (e.target.checked) showToast(`Independence milestone achieved: ${item.title}`, 'success');
        });
        monList.appendChild(row);
      });
    }
  }

  function renderLogs() {
    const logList = document.getElementById('powLogList');
    const logCount = document.getElementById('powLogCount');
    const searchVal = (document.getElementById('searchPowInput')?.value || '').toLowerCase().trim();

    if (!logList) return;
    logList.innerHTML = '';

    const filtered = state.proofOfWorkLogs.filter(log => {
      if (!searchVal) return true;
      return (log.topic || '').toLowerCase().includes(searchVal) ||
             (log.errorFix || '').toLowerCase().includes(searchVal);
    });

    if (logCount) logCount.textContent = state.proofOfWorkLogs.length;

    if (filtered.length === 0) {
      logList.innerHTML = `
        <div class="text-center py-6 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-lg">
          No proof-of-work entries yet.<br>Solve a lab, fix an error, and commit it above!
        </div>
      `;
      return;
    }

    filtered.forEach(log => {
      const card = document.createElement('div');
      card.className = 'p-3 rounded-lg border border-slate-800 bg-slate-950/80 space-y-1.5 text-xs font-mono';
      
      const linkHtml = log.link 
        ? `<a href="${escapeHtml(log.link)}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]">🔗 Proof Link</a>` 
        : '';

      card.innerHTML = `
        <div class="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-900 pb-1">
          <span class="text-emerald-400 font-bold">${escapeHtml(log.timestamp)}</span>
          <button class="delete-log-btn text-slate-600 hover:text-rose-400 text-xs" data-id="${log.id}">🗑️</button>
        </div>
        <div class="text-white font-bold">${escapeHtml(log.topic)}</div>
        <div class="text-slate-300 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800/60">
          <strong class="text-amber-400">Fix/Breakthrough:</strong> ${escapeHtml(log.errorFix)}
        </div>
        ${linkHtml}
      `;

      card.querySelector('.delete-log-btn').onclick = () => {
        if (confirm('Delete this proof-of-work log entry?')) {
          state.proofOfWorkLogs = state.proofOfWorkLogs.filter(l => l.id !== log.id);
          saveState();
          showToast('Log entry removed', 'info');
        }
      };

      logList.appendChild(card);
    });
  }

  function renderLedger() {
    const list = document.getElementById('ledgerEntriesList');
    const countEl = document.getElementById('ledgerTotalCount');
    if (!list) return;

    list.innerHTML = '';
    if (countEl) countEl.textContent = `${state.earnings.length} records`;

    if (state.earnings.length === 0) {
      list.innerHTML = `
        <div class="text-center py-4 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded">
          No earnings recorded yet. Target is ₹5,000 for rent.
        </div>
      `;
      return;
    }

    state.earnings.slice().reverse().forEach(entry => {
      const row = document.createElement('div');
      row.className = 'p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono';
      row.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="text-emerald-400 font-bold">+₹${Number(entry.amount).toLocaleString('en-IN')}</span>
            <span class="text-slate-300 font-semibold">${escapeHtml(entry.source)}</span>
          </div>
          <div class="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
            <span>📅 ${escapeHtml(entry.date)}</span>
            ${entry.note ? `<span>• ${escapeHtml(entry.note)}</span>` : ''}
          </div>
        </div>
        <button class="delete-earning-btn text-slate-600 hover:text-rose-400 text-xs" data-id="${entry.id}">🗑️</button>
      `;

      row.querySelector('.delete-earning-btn').onclick = () => {
        if (confirm(`Remove earning of ₹${entry.amount}?`)) {
          state.earnings = state.earnings.filter(e => e.id !== entry.id);
          saveState();
          showToast('Income record deleted', 'info');
        }
      };

      list.appendChild(row);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- INITIALIZATION & EVENT LISTENERS ---
  function initEvents() {
    startJaipurClock();

    // 1. Sunday Mode Toggle
    const sunToggle = document.getElementById('sundayModeToggle');
    if (sunToggle) {
      sunToggle.addEventListener('change', (e) => {
        state.sundayMode = e.target.checked;
        saveState();
        showToast(state.sundayMode ? 'Sunday Mode Engaged: Routine relaxed, focus on backlogs & recharge' : 'Weekday Routine Activated: Full focus!', 'info');
      });
    }

    // 2. Emergency Reality Anchor Modal
    const panicBtn = document.getElementById('panicButton');
    const panicModal = document.getElementById('panicModal');
    const closePanic = document.getElementById('closePanicModalBtn');
    const ackPanic = document.getElementById('acknowledgePanicBtn');

    if (panicBtn && panicModal) {
      panicBtn.addEventListener('click', () => {
        panicModal.classList.remove('hidden');
      });
      closePanic.addEventListener('click', () => {
        panicModal.classList.add('hidden');
      });
      ackPanic.addEventListener('click', () => {
        panicModal.classList.add('hidden');
        showToast('Override acknowledged. Return to the terminal and execute.', 'success');
      });
    }

    // 3. Rent Micro-Ledger Modal
    const openLedgerBtn = document.getElementById('openLedgerBtn');
    const ledgerModal = document.getElementById('ledgerModal');
    const closeLedgerBtn = document.getElementById('closeLedgerModalBtn');
    const ledgerForm = document.getElementById('ledgerForm');

    if (openLedgerBtn && ledgerModal) {
      openLedgerBtn.addEventListener('click', () => {
        document.getElementById('ledgerDate').value = new Date().toISOString().split('T')[0];
        ledgerModal.classList.remove('hidden');
      });
      closeLedgerBtn.addEventListener('click', () => {
        ledgerModal.classList.add('hidden');
      });

      ledgerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amt = parseFloat(document.getElementById('ledgerAmount').value);
        const dt = document.getElementById('ledgerDate').value;
        const src = document.getElementById('ledgerSource').value;
        const nt = document.getElementById('ledgerNote').value;

        if (isNaN(amt) || amt <= 0) {
          alert('Please enter a valid amount.');
          return;
        }

        state.earnings.push({
          id: 'earn_' + Date.now(),
          amount: amt,
          date: dt,
          source: src,
          note: nt
        });

        ledgerForm.reset();
        saveState();
        showToast(`₹${amt} logged toward Jaipur flat rent!`, 'success');
      });
    }

    // 4. Proof of Work Form
    const powForm = document.getElementById('powForm');
    if (powForm) {
      powForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = document.getElementById('powTopic').value.trim();
        const errorFix = document.getElementById('powErrorFix').value.trim();
        const link = document.getElementById('powLink').value.trim();

        if (!topic || !errorFix) {
          alert('Topic and Error/Fix are required.');
          return;
        }

        const now = new Date();
        const timestamp = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) + ' ' +
                          now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        state.proofOfWorkLogs.unshift({
          id: 'log_' + Date.now(),
          timestamp,
          topic,
          errorFix,
          link
        });

        powForm.reset();
        saveState();
        showToast('Proof-of-work committed to terminal history!', 'success');
      });
    }

    const searchInput = document.getElementById('searchPowInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderLogs();
      });
    }

    // 5. Phase Tabs (1, 2, 3)
    const phaseTabs = document.querySelectorAll('.phase-tab-btn');
    const phaseViews = {
      '1': document.getElementById('phase1View'),
      '2': document.getElementById('phase2View'),
      '3': document.getElementById('phase3View')
    };

    phaseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPhase = tab.dataset.phase;

        phaseTabs.forEach(t => {
          t.className = 'phase-tab-btn flex-1 py-2 text-center border-b-2 font-semibold transition-colors border-transparent text-slate-400 hover:text-slate-200';
        });
        tab.className = 'phase-tab-btn flex-1 py-2 text-center border-b-2 font-semibold transition-colors border-emerald-500 text-emerald-400 bg-slate-800/40';

        Object.keys(phaseViews).forEach(p => {
          if (p === targetPhase) {
            phaseViews[p].classList.remove('hidden');
          } else {
            phaseViews[p].classList.add('hidden');
          }
        });
      });
    });

    // 6. Walkthrough Increment / Decrement
    const decWt = document.getElementById('decrementWalkthroughBtn');
    const incWt = document.getElementById('incrementWalkthroughBtn');
    if (decWt && incWt) {
      decWt.onclick = () => {
        if (state.walkthroughCount > 0) {
          state.walkthroughCount--;
          saveState();
        }
      };
      incWt.onclick = () => {
        state.walkthroughCount++;
        saveState();
        showToast(`Walkthrough recorded (${state.walkthroughCount}/10)`, 'success');
      };
    }

    // 7. Day Settings Modal (Calibrate start date / day number)
    const editDayBtn = document.getElementById('editDayBtn');
    const dayModal = document.getElementById('daySettingsModal');
    const closeDayModal = document.getElementById('closeDaySettingsModalBtn');
    const saveDayBtn = document.getElementById('saveDaySettingsBtn');
    const startDateInput = document.getElementById('protocolStartDateInput');
    const manualDayInput = document.getElementById('manualDayInput');

    if (editDayBtn && dayModal) {
      editDayBtn.onclick = () => {
        startDateInput.value = state.startDate;
        manualDayInput.value = state.manualDayOverride || calculateProtocolDay();
        dayModal.classList.remove('hidden');
      };
      closeDayModal.onclick = () => dayModal.classList.add('hidden');
      saveDayBtn.onclick = () => {
        if (startDateInput.value) {
          state.startDate = startDateInput.value;
        }
        if (manualDayInput.value) {
          state.manualDayOverride = parseInt(manualDayInput.value, 10);
        }
        dayModal.classList.add('hidden');
        saveState();
        showToast('Protocol day calibration saved!', 'info');
      };
    }

    // 8. New Day Reset Checkboxes Button
    const resetDailyCheckboxesBtn = document.getElementById('resetDailyCheckboxesBtn');
    if (resetDailyCheckboxesBtn) {
      resetDailyCheckboxesBtn.onclick = () => {
        if (confirm('Reset routine checkboxes for today? Your cyber progress, logs, and earnings will stay completely safe.')) {
          state.routine.forEach(r => r.completed = false);
          state.sundayRoutine.forEach(s => s.completed = false);
          saveState();
          showToast('Routine checkboxes reset for today.', 'info');
        }
      };
    }

    // 9. Export & Import JSON
    const exportBtn = document.getElementById('exportDataBtn');
    const importInput = document.getElementById('importDataInput');

    if (exportBtn) {
      exportBtn.onclick = () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `protocol90_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('State successfully exported to JSON!', 'success');
      };
    }

    if (importInput) {
      importInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (imported && (imported.routine || imported.earnings || imported.banditCompleted)) {
              state = Object.assign({}, state, imported);
              saveState();
              showToast('Protocol data successfully imported!', 'success');
            } else {
              alert('Invalid Protocol 90 backup JSON.');
            }
          } catch (err) {
            alert('Error parsing JSON backup file.');
          }
        };
        reader.readAsText(file);
      };
    }
  }

  // --- BOOTSTRAP ---
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initEvents();
    renderAll();
  });

})();
