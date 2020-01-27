/**
 * Support class for IE9+
 */

 /**
  * Return a DOM node desired
  * @param {*} elem => class from element
  */
 const $ = (elem) => {
  return document.querySelector(elem);
}

/**
 * 
 * @param {*} el 
 * @param {*} className
 */
const hasClass = (el, className) => {
  return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

/**
 * 
 * @param {*} el 
 * @param {*} className 
 */
const addClass = (el, className) => {
  if (el.classList) {
   el.classList.add(className);
  } else {
   el.className += ' ' + className
  }
}

/**
 * 
 * @param {*} el 
 * @param {*} className 
 */
const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}