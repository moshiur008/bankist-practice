'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Enable smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  //console.log(e.target.getBoundingClientRect());
  // console.log(s1coords);
  // console.log('Current scroll x/y', pageXOffset, pageYOffset);//depreceted
  // console.log('Current scroll x/y', scrollX, scrollY);
  // console.log(document.documentElement.clientHeight); //viewport height
  // console.log(document.documentElement.clientWidth); //viewport width
  // window.scrollTo(s1coords.left, s1coords.top + scrollY);
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//event delegation
//1. add events listener to a common parent
//2.determine which element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Content

tabsContainer.addEventListener('click', function (e) {
  const activeTab = e.target.closest('.operations__tab');

  //Guard Clause
  if (!activeTab) return;

  //Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  activeTab.classList.add('operations__tab--active');

  //Activate Content
  document
    .querySelector(`.operations__content--${activeTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// //Navigation hover effect
// //mouseenter doesn't have buble effect

// const handleNavHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const navLink = e.target;
//     console.log(navLink);
//     const linkSiblings = navLink.closest('.nav').querySelectorAll('.nav__link');
//     const logo = navLink.closest('.nav').querySelector('img');
//     console.log(linkSiblings);
//     linkSiblings.forEach(el => {
//       if (el !== navLink) {
//         el.style.opacity = opacity;
//         logo.style.opacity = opacity;
//       }
//     });
//   }
// };
// nav.addEventListener('mouseover', function (e) {
//   handleNavHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleNavHover(e, 1);
// });

//Navigation hover effect
//mouseenter doesn't have buble effect

const handleNavHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const navLink = e.target;
    const linkSiblings = navLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = navLink.closest('.nav').querySelector('img');
    linkSiblings.forEach(el => {
      if (el !== navLink) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', handleNavHover.bind(0.5));
nav.addEventListener('mouseout', handleNavHover.bind(1));

// //sticky navigation

// const initialCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//sticky navigation intersection observer

// const obsCallback = function (entries, observer) {
//   console.log(entries);
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //root element that the target element will intersect, null gives viewport
//   threshold: [0, 0.2], //percentage of intersection, 0.1 means 10%
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1); //we need to observe the target element

const navHeight = nav.getBoundingClientRect().height;

const headerObsCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions,
);

headerObserver.observe(header);
