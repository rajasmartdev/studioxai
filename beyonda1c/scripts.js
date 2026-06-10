function showPage(id) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'home') setTimeout(fireHeroAnims, 400);
}
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
function animateBar(el, target, labelEl) {
  let start = null; const dur = 1400;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = target * ease;
    el.style.width = val + '%';
    if (labelEl) labelEl.textContent = val.toFixed(1) + '%';
    if (p < 1) requestAnimationFrame(step);
    else { el.style.width = target + '%'; if (labelEl) labelEl.textContent = target.toFixed(1) + '%'; }
  }
  requestAnimationFrame(step);
}
function animateCounter(el, target, dec, suffix) {
  let start = null; const dur = 1600;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * ease).toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(dec) + suffix;
  }
  requestAnimationFrame(step);
}
function fireHeroAnims() {
  animateBar(document.getElementById('bar1'), 96.4, document.getElementById('pct1'));
  animateBar(document.getElementById('bar2'), 23.2, document.getElementById('pct2'));
  document.querySelectorAll('.hvs-val[data-count]').forEach(el => {
    const t = parseFloat(el.dataset.count), s = el.dataset.suffix;
    animateCounter(el, t, t % 1 === 0 ? 0 : 1, s);
  });
}
setTimeout(fireHeroAnims, 600);
const evSection = document.getElementById('evidence');
const evObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateBar(document.getElementById('ebar1'), 96.4, document.getElementById('epct1'));
      animateBar(document.getElementById('ebar2'), 23.2, document.getElementById('epct2'));
      animateCounter(document.getElementById('spread-num'), 73.2, 1, '');
      document.querySelectorAll('.cs-num[data-target]').forEach(el => {
        const t = parseFloat(el.dataset.target), d = parseInt(el.dataset.dec), s = el.dataset.suffix;
        animateCounter(el, t, d, s);
      });
      evObs.unobserve(e.target);
    }
  });
}, {threshold: 0.15});
if (evSection) evObs.observe(evSection);