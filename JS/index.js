// Slider

let theRightSlider = document.querySelector(".topic .right");
let box = document.querySelector(".topic .box").offsetWidth;
let pgX, leftScroll;
let arrowBtn = document.querySelectorAll(".arrows i");
let infintPlay;

arrowBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    theRightSlider.scrollLeft += btn.id === "left" ? -box : box;
  });
});

let isDragging = false;

const dragStart = (e) => {
  isDragging = true;
  theRightSlider.classList.add("dragging");
  pgX = e.pageX;
  leftScroll = theRightSlider.scrollLeft;
};

// Function
const dragging = (e) => {
  if (!isDragging) return;
  theRightSlider.scrollLeft = leftScroll - (e.pageX - pgX);
};

const dragEnd = () => {
  isDragging = false;
  theRightSlider.classList.remove("dragging");
};
const autoPlay = () => {
  infintPlay = setTimeout(() => (theRightSlider.scrollLeft += box), 4000);
};
autoPlay();

const infinteScroll = () => {
  if (theRightSlider.scrollLeft === 0) {
    theRightSlider.classList.add("no-trans");
    theRightSlider.scrollLeft =
      theRightSlider.scrollWidth - 2 * theRightSlider.offsetWidth;
    theRightSlider.classList.remove("no-trans");
  } else if (
    Math.ceil(theRightSlider.scrollLeft) ===
    theRightSlider.scrollWidth - theRightSlider.offsetWidth
  ) {
    theRightSlider.classList.add("no-trans");
    theRightSlider.scrollLeft = theRightSlider.offsetWidth;
    theRightSlider.classList.remove("no-trans");
  }
  // Clear
  clearTimeout(infintPlay);
  if (!theRightSlider.matches(":hover")) autoPlay();
};
// Trigger
theRightSlider.addEventListener("mousemove", dragging);
theRightSlider.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
theRightSlider.addEventListener("scroll", infinteScroll);
theRightSlider.addEventListener("mouseenter", () => clearTimeout(infintPlay));
theRightSlider.addEventListener("mouseleave", autoPlay);

// LightBox
let LightBox = document.querySelector(".lightbox");
let imgLightBox = LightBox.querySelector("img");
let theBoxes = Array.from(document.querySelectorAll(".feature .box > img"));
let theClose = document.querySelector(".close");

theBoxes.forEach((img) => {
  img.addEventListener("click", (e) => {
    LightBox.classList.add("show");
    document.body.style.overflow = "hidden";
    imgLightBox.src = img.src;
  });
});

theClose.addEventListener("click", () => {
  LightBox.classList.remove("show");
  document.body.style.overflow = "auto";
});

let sidebar = document.querySelector(".sidebar");
let closeSidebar = sidebar.querySelector(".fa-x");
let navbar = document.querySelector(".navbar");

sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

let toggle = document.querySelector(".toggle");
let Scroller = document.querySelector(".scroller");
let theHeight =
  document.documentElement.offsetHeight - document.documentElement.clientHeight;

toggle.addEventListener("click", () => {
  sidebar.classList.add("show");
});
closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

window.addEventListener("scroll", () => {
  if (window.scrollY != sidebar) {
    sidebar.classList.remove("show");
  }
  if (window.scrollY > 600) {
    navbar.classList.add("nav-top");
  } else {
    navbar.classList.remove("nav-top");
  }
  let scrollTop = document.documentElement.scrollTop;
  Scroller.style.width = `${(scrollTop / theHeight) * 100}%`;
});

let links = document.querySelectorAll(".navLinks li a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.move).scrollIntoView({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Preloader
let preloader = document.querySelector(".preload");
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("loaded");
    document.body.style.overflow = "auto";
  }, 500);
});
