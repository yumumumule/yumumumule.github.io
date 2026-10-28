// Progressive enhancement: all content and links work without JavaScript.
const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('nav a[href^="#"]')];
let scheduled = false;
function updateCurrentSection() {
  scheduled = false;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  let current = sections[0];
  for (const section of sections) {
    const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
    if (section.getBoundingClientRect().top <= offset + margin + 2) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    const requested = sections.find(section => `#${section.id}` === window.location.hash);
    current = requested && requested.getBoundingClientRect().top >= offset ? requested : sections.at(-1);
  }
  for (const link of links) {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function scheduleUpdate() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateCurrentSection); }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('hashchange', scheduleUpdate);
scheduleUpdate();
