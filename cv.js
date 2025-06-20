document.addEventListener('DOMContentLoaded', () => {
  // printPDF function
  window.printPDF = function () {
    const element = document.querySelector('main');
    html2pdf()
      .set({
        filename: 'Omar_Ahmed_Gouda_CV.pdf',
        margin: 1,
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showSection(targetId);
      window.scrollTo({
        top: document.getElementById(targetId).offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });

  // Toggle navbar brand visibility on scroll
  const navbarBrand = document.querySelector('.navbar-brand-container');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navbarBrand.classList.add('navbar-brand-hidden');
    } else {
      navbarBrand.classList.remove('navbar-brand-hidden');
    }
  });

  // Toggle table of contents menu
  const tocToggle = document.getElementById('toc-toggle');
  const tocMenu = document.getElementById('toc-menu');
  const tocClose = document.getElementById('toc-close');

  if (tocToggle && tocMenu) {
    tocToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (tocMenu.classList.contains('toc-menu-hidden')) {
        tocMenu.classList.remove('toc-menu-hidden');
        tocMenu.classList.add('toc-menu-open');
      } else {
        tocMenu.classList.add('toc-menu-hidden');
        tocMenu.classList.remove('toc-menu-open');
      }
    });
  }

  if (tocClose) {
    tocClose.addEventListener('click', (e) => {
      e.preventDefault();
      tocMenu.classList.add('toc-menu-hidden');
      tocMenu.classList.remove('toc-menu-open');
    });
  }

  // Close TOC menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      tocMenu &&
      !tocMenu.contains(e.target) &&
      tocToggle &&
      !tocToggle.contains(e.target) &&
      !tocMenu.classList.contains('toc-menu-hidden')
    ) {
      tocMenu.classList.add('toc-menu-hidden');
      tocMenu.classList.remove('toc-menu-open');
    }
  });

  // Show selected section and hide others
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('section-hidden');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('section-hidden');
    }
    if (tocMenu) {
      tocMenu.classList.add('toc-menu-hidden');
      tocMenu.classList.remove('toc-menu-open');
    }
  }

  // Handle section links in TOC menu
  document.querySelectorAll('.section-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
      window.scrollTo({
        top: document.getElementById(sectionId).offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });

  // Initialize IntersectionObserver for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeInUp');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });

  // Initially show only the About section
  showSection('profile');
});