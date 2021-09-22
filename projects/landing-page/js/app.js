/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");
let isScrollEvent = true;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const getItemByAttribute = (attributeParent, attribute) => {
  const attributeValue = attributeParent.getAttribute(attribute);
  const element = document.querySelector(`[data-nav = "${attributeValue}"]`);
  return element;
};

//getBounding function => get bounding clientRect for element and checks if this element is within the screen
const getBounding = (element) => {
  const elementBounding = element.getBoundingClientRect();
  const isElementWithinBounding =
    elementBounding.top > 0 &&
    elementBounding.left > 0 &&
    elementBounding.top <
      (window.innerHeight || document.documentElement.clientHeight);
  return { elementBounding, isElementWithinBounding };
};

const setActiveClass = () => {
  const navBarAnchors = document.querySelectorAll("a");
  const activeSection = document.querySelector(".active");
  if (activeSection) activeSection.classList.remove("active");
  const activeAnchor = document.querySelector(".menu__link--active");
  if (activeAnchor) activeAnchor.classList.remove("menu__link--active");
  for (const key in navBarAnchors) {
    const selectedSection = getItemByAttribute(
      navBarAnchors[key],
      "data-value"
    );
    const { isElementWithinBounding } = getBounding(selectedSection);
    if (isElementWithinBounding) {
      navBarAnchors[key].classList.add("menu__link--active");
      selectedSection.classList.add("active");
      break;
    }
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let sectionNum = 1; sectionNum <= sections.length; sectionNum++) {
  const navBarItem = document.createElement("li");
  const navBarLink = document.createElement("a");
  navBarLink.textContent = `Section ${sectionNum}`;
  navBarLink.textContent = `Section ${sectionNum}`;
  navBarLink.setAttribute("data-value", `Section ${sectionNum}`);
  navBarLink.classList.add("menu__link");
  navBarItem.appendChild(navBarLink);
  navBarList.appendChild(navBarItem);
  navBarLink.addEventListener("click", (event) => {
    isScrollEvent = false;
    onLinkClick(event);
  });
}

// Add class 'active' to section when near top of viewport
setActiveClass();

// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", (event) => {
  if (isScrollEvent) {
    setActiveClass();
  }
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
const onLinkClick = (event) => {
  event.preventDefault();
  const activeItem = document.querySelector(".active");
  if (activeItem) activeItem.classList.remove("active");
  const selectedSection = getItemByAttribute(event.target, "data-value");
  const { elementBounding } = getBounding(selectedSection);
  const { elementBounding: bodyBounding } = getBounding(document.body);
  const topOffset = elementBounding.top - bodyBounding.top;
  window.scrollTo({
    left: elementBounding.x,
    top: topOffset,
    behavior: "smooth",
  });

  selectedSection.classList.add("active");
  isScrollEvent = true;
};
