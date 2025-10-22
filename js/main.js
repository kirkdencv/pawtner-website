// --- NAVIGATION ---
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const navToggle = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if (navToggle && navLinks) {
    navToggle.onclick = function() {
      navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
    };
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('show'));
    });
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }
});

// --- FAVORITE ICONS ---
function toggleFavorite(icon) {
  icon.classList.toggle('favorited');
  icon.innerHTML = icon.classList.contains('favorited') ? '&#10084;' : '&#9825;';
  // Persist favorite state (optional)
  if (icon.dataset.petId) {
    localStorage.setItem('favorite-' + icon.dataset.petId, icon.classList.contains('favorited'));
  }
}
document.querySelectorAll('.favorite-icon, .profile-favorite-btn').forEach(function(icon) {
  icon.addEventListener('click', function() { toggleFavorite(icon); });
  // Restore favorite state
  if (icon.dataset.petId && localStorage.getItem('favorite-' + icon.dataset.petId) === 'true') {
    icon.classList.add('favorited');
    icon.innerHTML = '&#10084;';
  }
});

// --- PROFILE GALLERY THUMBNAILS ---
document.querySelectorAll('.profile-gallery-thumbs img').forEach(function(thumb) {
  thumb.addEventListener('click', function() {
    const mainImg = document.querySelector('.profile-main-img');
    if (mainImg) mainImg.src = thumb.src;
  });
});

// --- PAGINATION & SEE MORE: Always show all pet cards and pagination on mobile ---
function updatePetCardsAndPagination() {
  const pageBtns = document.querySelectorAll('.pagination .page-btn');
  const petCards = document.querySelectorAll('.pet-card');
  const seeMoreBtn = document.querySelector('.see-more');
  const perPage = 6;

  function isMobile() {
    return window.innerWidth <= 480;
  }

  if (isMobile()) {
    // Show all pet cards
    petCards.forEach(card => card.style.display = 'flex');
    // Show pagination
    if (pageBtns.length) {
      pageBtns.forEach(btn => btn.style.display = 'inline-block');
      pageBtns.forEach(btn => btn.classList.remove('active'));
      if (pageBtns[0]) pageBtns[0].classList.add('active');
    }
    // Hide see more button
    if (seeMoreBtn) seeMoreBtn.style.display = 'none';
  } else {
    // Desktop/tablet: paginate
    let activeIdx = Array.from(pageBtns).findIndex(b => b.classList.contains('active'));
    if (activeIdx === -1) activeIdx = 0;
    petCards.forEach((card, i) => {
      card.style.display = (i >= activeIdx * perPage && i < (activeIdx + 1) * perPage) ? 'flex' : 'none';
    });
    if (pageBtns.length) pageBtns.forEach(btn => btn.style.display = 'inline-block');
    if (seeMoreBtn) seeMoreBtn.style.display = 'block';
  }
}

// Pagination button click
document.addEventListener('DOMContentLoaded', function() {
  const pageBtns = document.querySelectorAll('.pagination .page-btn');
  if (pageBtns.length) {
    pageBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function() {
        if (window.innerWidth > 480) {
          pageBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          updatePetCardsAndPagination();
        }
      });
    });
  }


  // See more button click (desktop only)
  const seeMoreBtn = document.querySelector('.see-more');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function() {
      if (window.innerWidth > 480) {
        document.querySelectorAll('.pet-card').forEach(card => card.style.display = 'flex');
        seeMoreBtn.style.display = 'none';
      }
    });
  }
  // Initial and responsive update
  updatePetCardsAndPagination();
  window.addEventListener('resize', updatePetCardsAndPagination);
});

// --- CUSTOM DROPDOWN (Adopt Page) ---
document.querySelectorAll('.custom-dropdown').forEach(function(dropdown) {
  const selected = dropdown.querySelector('.dropdown-selected');
  const items = dropdown.querySelectorAll('.dropdown-item');
  selected.onclick = function() { dropdown.classList.toggle('open'); };
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

// --- DONATE PAGE INTERACTIONS ---
document.addEventListener('DOMContentLoaded', function() {
  // Amount buttons
  document.querySelectorAll('.donate-amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.donate-amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const otherAmount = document.querySelector('.donate-other-amount');
      if (otherAmount) otherAmount.value = btn.textContent.replace('$', '');
    });
  });
  // Online/Offline toggle
  document.querySelectorAll('.donate-methods .btn-accent, .donate-methods .btn-info').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.donate-methods button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  // Payment method highlight
  document.querySelectorAll('.donate-payment-icons img').forEach(img => {
    img.addEventListener('click', function() {
      document.querySelectorAll('.donate-payment-icons img').forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    });
  });
});

// --- FORM VALIDATION & FEEDBACK ---
function validateForm(form) {
  let valid = true;
  let firstError = null;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#D94F4F';
      if (!firstError) firstError = field;
      if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('form-error')) {
        const error = document.createElement('div');
        error.className = 'form-error';
        error.style.color = '#D94F4F';
        error.style.fontSize = '0.95em';
        error.textContent = 'This field is required.';
        field.parentNode.insertBefore(error, field.nextSibling);
      }
    } else {
      field.style.borderColor = '#E07A5F';
      if (field.nextElementSibling && field.nextElementSibling.classList.contains('form-error')) {
        field.nextElementSibling.remove();
      }
    }
  });
  if (!valid && firstError) {
    firstError.focus();
    firstError.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  return valid;
}
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    if (!validateForm(form)) {
      e.preventDefault();
      return false;
    }
    // Demo: Show success message
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"], .btn-accent');
    if (btn) btn.disabled = true;
    const msg = document.createElement('div');
    msg.className = 'form-success';
    msg.style.color = '#247158';
    msg.style.fontWeight = 'bold';
    msg.style.marginTop = '1rem';
    msg.textContent = 'Thank you! Your submission was received.';
    form.appendChild(msg);
    setTimeout(() => {
      if (btn) btn.disabled = false;
      msg.remove();
      form.reset();
    }, 3000);
  });
});

// --- ACCESSIBILITY: Focus styles ---
document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
  el.addEventListener('focus', function() {
    el.style.outline = '2px solid #E07A5F';
    el.style.outlineOffset = '2px';
  });
  el.addEventListener('blur', function() {
    el.style.outline = '';
    el.style.outlineOffset = '';
  });
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function onError() {
    // prevent infinite retry if placeholder fails
    if (this.dataset.fallbackApplied) return;
    this.dataset.fallbackApplied = '1';
    // resolve placeholder relative to current page, fallback to literal if URL() fails
    try {
      this.src = new URL('img/icons/image-placeholder.png', location.href).href;
    } catch (e) {
      this.src = 'img/icons/image-placeholder.png';
    }
    this.removeEventListener('error', onError);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});


document.querySelectorAll('form').forEach(form => {
  const firstInput = form.querySelector('input, select, textarea');
  if (firstInput) firstInput.focus();
});

// --- Adopt Page: Mobile Filter Sidebar Toggle ---
document.addEventListener('DOMContentLoaded', function() {
  const filterToggle = document.querySelector('.adopt-filter-toggle');
  const sidebar = document.querySelector('.adopt-sidebar');
  const sidebarClose = document.querySelector('.adopt-sidebar-close');

  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', function() {
      sidebar.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', function() {
      sidebar.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
  // Optional: close sidebar when clicking outside
  document.addEventListener('click', function(e) {
    if (
      sidebar &&
      sidebar.classList.contains('show') &&
      !sidebar.contains(e.target) &&
      !e.target.classList.contains('adopt-filter-toggle')
    ) {
      sidebar.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});