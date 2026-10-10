'use strict';
// Countdown to the fictional fest, using the visitor's local time.
const festDate = new Date(2026, 11, 18, 9, 0, 0).getTime();
const pad = number => String(number).padStart(2, '0');
function updateCountdown() {
  const remaining = Math.max(0, festDate - Date.now());
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(units).forEach(([id, value]) => {
    document.getElementById(id).textContent = pad(value);
  });
  if (remaining === 0) document.querySelector('.countdown-label').textContent = 'THE FEST HAS BEGUN!';
}
updateCountdown();
setInterval(updateCountdown, 1000);

const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-links');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.event-card').forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(expanded));
  });
});

const schedule = {
  1: [
    ['09:00 AM', 'Opening Ceremony', 'Main Auditorium · Welcome and kickoff'],
    ['10:30 AM', 'Code Storm Begins', 'Innovation Lab · 24-hour hackathon'],
    ['12:00 PM', 'Brainwave Qualifiers', 'Seminar Hall · Tech quiz rounds'],
    ['02:00 PM', 'Pixel Wars Kickoff', 'Design Studio · Creative brief reveal']
  ],
  2: [
    ['09:00 AM', 'Robo Rumble', 'Robotics Arena · Obstacle challenge'],
    ['11:00 AM', 'Code Storm Demo Day', 'Innovation Lab · Team presentations'],
    ['01:00 PM', 'Pixel Wars Showcase', 'Design Studio · Prototype judging'],
    ['03:00 PM', 'Brainwave Finals', 'Main Auditorium · Championship quiz']
  ],
  3: [
    ['10:00 AM', 'Idea Ignite', 'Pitch Hall · Startup presentations'],
    ['12:30 PM', 'Innovation Showcase', 'Exhibition Area · Student projects'],
    ['03:00 PM', 'Awards & Recognition', 'Main Auditorium · Winner announcements'],
    ['05:00 PM', 'Closing Celebration', 'Central Lawn · Fest finale']
  ]
};
function renderDay(day) {
  const timeline = document.getElementById('timeline');
  timeline.replaceChildren();
  schedule[day].forEach(([time, title, place]) => {
    const row = document.createElement('div');
    row.className = 'timeline-item';
    const timeNode = document.createElement('span');
    timeNode.className = 'timeline-time';
    timeNode.textContent = time;
    const info = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = title;
    const description = document.createElement('p');
    description.textContent = place;
    info.append(heading, description);
    row.append(timeNode, info);
    timeline.append(row);
  });
  document.querySelectorAll('.day-tab').forEach(button => {
    const active = button.dataset.day === String(day);
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
}
document.querySelectorAll('.day-tab').forEach(button => button.addEventListener('click', () => renderDay(button.dataset.day)));
renderDay(1);

const form = document.getElementById('registration-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const chosenEvent = document.getElementById('event').value;
  const errors = {
    name: name.length < 2 ? 'Please enter your name (at least 2 characters).' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.',
    event: chosenEvent ? '' : 'Please select an event.'
  };
  Object.entries(errors).forEach(([field, message]) => {
    document.getElementById(`${field}-error`).textContent = message;
    document.getElementById(field).setAttribute('aria-invalid', String(Boolean(message)));
  });
  const status = document.getElementById('form-message');
  if (Object.values(errors).some(Boolean)) {
    status.textContent = 'Please fix the highlighted fields.';
    status.style.color = '#ff9999';
    return;
  }
  status.textContent = `Success, ${name}! Your demo registration for ${chosenEvent} is confirmed on this page.`;
  status.style.color = '#c9ff4d';
  form.reset();
});
