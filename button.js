// Get the button element
const button = document.querySelector('#button');

// Add an event listener to the button element that listens for a 'click' event
button.addEventListener('click', () => {
  // When the button is clicked, toggle the 'clicked' class on the button element
  button.classList.toggle('clicked');
});
