function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const logo = document.querySelector('.logo');
    const isOpen = menu.classList.contains('active');

    if (!isOpen) {
      menu.classList.add('active');
      overlay.classList.add('active');
      logo.classList.add('animate-logo');
      document.addEventListener('click', handleOutsideClick);
    } else {
      closeMenu();
    }
  }

    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('mobileOverlay').classList.remove('active');
      document.querySelector('.logo').classList.remove('animate-logo');
      document.removeEventListener('click', handleOutsideClick);
    }

  
    function handleOutsideClick(event) {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('hamburgerIcon');
  
      if (!menu.contains(event.target) && !icon.contains(event.target)) {
        closeMenu();
      }
    }