'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Restore last active page from localStorage
const savedPage = localStorage.getItem('activePage');
if (savedPage) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === savedPage) {
      pages[i].classList.add('active');
    } else {
      pages[i].classList.remove('active');
    }
  }
  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].textContent.trim().toLowerCase() === savedPage) {
      navigationLinks[i].classList.add('active');
    } else {
      navigationLinks[i].classList.remove('active');
    }
  }
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (navigationLinks[i].textContent.trim().toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        localStorage.setItem('activePage', pages[j].dataset.page); // Save active page
      } else {
        pages[j].classList.remove("active");
      }
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      if (k === i) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }
  });
}

// Portfolio Modal Logic
const modal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('portfolio-modal-img');
const modalClose = document.querySelector('.portfolio-modal-close');
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const img = link.querySelector('img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

modalClose.onclick = function() {
  modal.style.display = 'none';
  modalImg.src = '';
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    modalImg.src = '';
  }
};