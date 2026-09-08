// 滚动渐显 + 数字入场
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px 120px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // 数字计数（data-count 目标值，data-suffix 可选）
  const cio = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
      const dec = (String(target).split('.')[1] || '').length;
      const t0 = performance.now(), dur = 900;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1), v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));
});
