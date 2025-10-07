document.querySelectorAll('.custom-dropdown').forEach(function(dropdown) {
  const selected = dropdown.querySelector('.dropdown-selected');
  const items = dropdown.querySelectorAll('.dropdown-item');

  selected.onclick = function() {
    dropdown.classList.toggle('open');
  };

  items.forEach(function(item) {
    item.onclick = function() {
      selected.innerHTML = item.innerHTML;
      dropdown.classList.remove('open');
    };
  });

  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
  });
});