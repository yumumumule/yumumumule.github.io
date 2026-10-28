// Progressive enhancement: all content and links work without JavaScript.
const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const current = sections.find(section => visible.has(section.id));
    for (const link of links) {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-110px 0px -55% 0px', threshold: 0 });
  for (const section of sections) observer.observe(section);
}
