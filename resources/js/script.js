(function () {
    var nav = document.querySelector('nav');
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.main-nav');
  
    // Sticky nav once the user scrolls past the top
    function onScroll() { nav.classList.toggle('sticky', window.scrollY > 80); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  
    // Mobile menu
    toggle.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', menu.classList.toggle('open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.classList.remove('open');
    });
  
    // Scroll reveal (smooth anchor scrolling is handled by CSS)
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          el.style.transitionDelay = [].indexOf.call(el.parentNode.children, el) * 120 + 'ms';
          el.classList.add('visible');
          io.unobserve(el);
          // drop the helper classes so hover effects stay snappy
          setTimeout(function () {
            el.classList.remove('reveal', 'visible');
            el.style.transitionDelay = '';
          }, 1200);
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('h2, .long-copy, .box, .steps-box, blockquote, .plan-box, .contact-form')
        .forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
    }
  
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  })();