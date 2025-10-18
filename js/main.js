//Index Page


// Adopt Page
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

// Hamburger
document.querySelector('.navbar-toggle').onclick = function() {
  document.querySelector('.navbar-links').classList.toggle('show');
};


// Pagination interaction
document.querySelectorAll('.pagination .page-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Remove active from all page buttons
    document.querySelectorAll('.pagination .page-btn').forEach(function(b) {
      b.classList.remove('active');
    });

    // Add active to clicked button if it's a number
    if (!isNaN(parseInt(btn.textContent))) {
      btn.classList.add('active');
    }

    // Example: Show only pet cards for the selected page (pagination logic)
    // You can replace this with your actual data logic
    const page = btn.textContent;
    const petCards = document.querySelectorAll('.pet-card');
    const perPage = 6;
    let start = 0;

    if (!isNaN(parseInt(page))) {
      start = (parseInt(page) - 1) * perPage;
    } else if (btn.textContent === 'Prev') {
      const current = document.querySelector('.pagination .page-btn.active');
      let prev = Math.max(1, parseInt(current.textContent) - 1);
      document.querySelectorAll('.pagination .page-btn')[prev].click();
      return;
    } else if (btn.textContent === 'Next') {
      const current = document.querySelector('.pagination .page-btn.active');
      let next = Math.min(document.querySelectorAll('.pagination .page-btn').length - 2, parseInt(current.textContent) + 1);
      document.querySelectorAll('.pagination .page-btn')[next].click();
      return;
    }

    petCards.forEach(function(card, i) {
      card.style.display = (i >= start && i < start + perPage) ? 'block' : 'none';
    });
  });
});

// Initialize first page
document.addEventListener('DOMContentLoaded', function() {
  const firstActive = document.querySelector('.pagination .page-btn.active');
  if (firstActive) firstActive.click();
});

// Show more pets interaction
document.addEventListener('DOMContentLoaded', function() {
  const seeMoreBtn = document.querySelector('.see-more');
  const petCards = document.querySelectorAll('.pet-card');
  const initialCount = 3; // Show 3 by default
  let showing = initialCount;

  // Hide extra cards initially
  petCards.forEach((card, i) => {
    if (i >= initialCount) card.style.display = 'none';
  });

  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function() {
      for (let i = showing; i < petCards.length; i++) {
        petCards[i].style.display = 'block';
      }
      seeMoreBtn.style.display = 'none';
    });
  }
});

// Favorite icon toggle
document.querySelectorAll('.favorite-icon').forEach(function(icon) {
  icon.addEventListener('click', function() {
    icon.classList.toggle('favorited');
    icon.innerHTML = icon.classList.contains('favorited') ? '&#10084;' : '&#9825;';
  });
});

document.querySelectorAll('.profile-favorite-btn, .favorite-icon').forEach(function(icon) {
  icon.addEventListener('click', function() {
    icon.classList.toggle('favorited');
    icon.innerHTML = icon.classList.contains('favorited') ? '&#10084;' : '&#9825;';
  });
});

document.querySelectorAll('.profile-gallery-thumbs img').forEach(function(thumb) {
  thumb.addEventListener('click', function() {
    document.querySelector('.profile-main-img').src = thumb.src;
  });
});