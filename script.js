/* ============ DATA ============ */

const projects = [
  
   {
    title: "TaraNV - Centralized Location and Accommodation",
    desc: "TaraNV is a web application that provides a centralized platform for users to find and book accommodations in various locations. It offers an intuitive interface for searching, filtering, and viewing available lodging options, complete with detailed descriptions, images, and user reviews. The application is designed to streamline the booking process, making it easy for travelers to plan their stays efficiently.",
    img: "TaraNV.png",
    tags: ["HTML", "JavaScript", "CSS", "PostgreSQL"],
    link: "https://github.com/gigson04/TaraNv.git",
    github: true
  },

  
  {
    title: "TicTacToe - Interactive Game",
    desc: "TicTacToe is a classic two-player game where players take turns marking the spaces in a 3x3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game. Built with HTML, CSS, and JavaScript, it features a clean and responsive design that works seamlessly across devices.",
    img: "TicTacToe.png",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/gigson04/TIC_TAC_TOE.git",
    github: true
  },
  
  
  {
    title: "Interactive Login Form - Code With Gigson",
    desc: "An interactive login form with animation swipe built with HTML, CSS, and JavaScript.",
    img: "LogInForm.png",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/gigson04/INTERACTIVE-LOGIN-FORM.git",
    github: true
  },
  
  {
    title: "FlipClock — Interactive Flip Clock",
    desc: "FlipClock is an interactive web application that simulates a classic flip clock, providing a nostalgic yet modern way to display time. Built with HTML, CSS, and JavaScript, it features smooth animations and a responsive design that works seamlessly across devices.",
    img: "FlipClock.png",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/gigson04/FLIPCLOCK.git",
    github: true
  },
 
   {
    title: "Calendar App - Interactive Calendar",
    desc: "An interactive calendar application built with HTML, CSS, and JavaScript, featuring a clean and responsive design that works seamlessly across devices.",
    img: "Calendar.png",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/gigson04/CALENDAR.git",
    github: true
  },
  
  
];

const designs = [
  { title:"Lisa Poster", cat:"Poster", filter:"poster", img:"Lisa.png" },
  { title:"Ferrari Poster", cat:"Poster", filter:"poster", img:"Ferrari.png" },  
];

const testimonials = [
  { msg:"Gigson was an outstanding member of our team whose dedication, initiative, and problem-solving abilities made a lasting impact on every project he touched.", who:"Angelo Ibarra", role:"BSIT STUDENT" },
];

/* ============ RENDER PROJECTS ============ */
const projectGrid = document.getElementById('projectGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card reveal';
  card.innerHTML = `
    <div class="project-thumb"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
    <h3>${p.title}</h3>
    <p class="desc" data-full="${p.desc.replace(/"/g,'&quot;')}">${truncate(p.desc)}</p>
    ${p.desc.length > 140 ? `<button class="see-more">See more</button>` : ''}
    <div class="project-tags">
      ${p.tags.map(t => `<span>${t}</span>`).join('')}
      ${p.link ? `<span>🌐 ${p.link}</span>` : ''}
      ${p.github ? `<span>🐙 GitHub</span>` : ''}
    </div>
  `;
  projectGrid.appendChild(card);
});

function truncate(str, len = 140) {
  return str.length > len ? str.slice(0, len).trim() + '…' : str;
}

projectGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('see-more')) {
    const p = e.target.previousElementSibling;
    const expanded = e.target.dataset.expanded === 'true';
    p.textContent = expanded ? truncate(p.dataset.full) : p.dataset.full;
    e.target.textContent = expanded ? 'See more' : 'See less';
    e.target.dataset.expanded = String(!expanded);
  }
});

/* ============ RENDER DESIGNS ============ */
const designGrid = document.getElementById('designGrid');
designs.forEach(d => {
  const card = document.createElement('div');
  card.className = 'design-card reveal';
  card.dataset.filter = d.filter;
  card.innerHTML = `
    <div class="design-thumb"><img src="${d.img}" alt="${d.title}" loading="lazy"></div>
    <div class="design-meta">
      <div class="cat">${d.cat}</div>
      <div class="title">${d.title}</div>
    </div>
  `;
  designGrid.appendChild(card);
});

/* Filter buttons */
document.getElementById('filterRow').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.design-card').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.filter !== filter);
  });
});

/* ============ RENDER TESTIMONIALS ============ */
const track = document.getElementById('testimonialTrack');
testimonials.forEach(t => {
  const card = document.createElement('div');
  card.className = 'testimonial-card reveal';
  card.innerHTML = `
    <div class="quote-mark">"</div>
    <div class="stars">🙂🙂🙂🙂🙂</div>
    <p class="msg">${t.msg}</p>
    <div class="who">${t.who}</div>
    <div class="role">${t.role}</div>
  `;
  track.appendChild(card);
});

/* ============ CONTACT FORM ============ */
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3200);
});

/* ============ MOBILE MENU ============ */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open-mobile');
  navLinks.style.display = navLinks.classList.contains('open-mobile') ? 'flex' : 'none';
});

/* ============ SCROLL MORPH / REVEAL ============ */
// Note: unlike a one-time reveal, this toggles the 'in' class both ways,
// so elements morph out when scrolled away and morph back in when re-entering view.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in', entry.isIntersecting);
  });
}, { threshold: 0.15 });

// Apply a staggered index to groups of elements so they animate in a wave
function initReveal(selector, groupSize = 8) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--i', i % groupSize);
    observer.observe(el);
  });
}

// Cards already have the .reveal class from render above, just wire up stagger + observe
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.setProperty('--i', i % 8);
  observer.observe(el);
});

// Tags and timeline cards get the scroll animation too, but the animation's
// end-state tilt matches their original hand-drawn rotation instead of flattening to 0deg.
document.querySelectorAll('.tag').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--i', i % 8);
  el.style.setProperty('--tilt', i % 2 === 0 ? '-1deg' : '1deg');
  observer.observe(el);
});

document.querySelectorAll('.timeline-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--i', i % 2);
  el.style.setProperty('--tilt', i === 1 ? '1deg' : '-1deg');
  observer.observe(el);
});
