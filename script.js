(function () {
  var tabs = document.querySelectorAll('.trigger-tab');
  var panels = document.querySelectorAll('.trigger-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var trigger = tab.getAttribute('data-trigger');

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
      panels.forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-trigger') === trigger);
      });
    });
  });
})();
