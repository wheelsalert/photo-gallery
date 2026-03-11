// ================================
// LIGHTBOX GALLERY
// ================================

// STEP 1: Find the elements we need
// querySelector finds the FIRST element matching that selector
// Think of it like: "Go find me the element with this id/class"

const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');
const closeBtn = document.querySelector('#closeBtn');

// querySelectorAll finds ALL matching elements — returns a list
// This grabs every single img tag inside every .gallery-item
const galleryImages = document.querySelectorAll('.gallery-item img');


// STEP 2: Open lightbox when a photo is clicked
// forEach = "do this for each item in the list"
// Like telling every photo: "hey, listen for clicks!"

galleryImages.forEach(function(img) {

  img.addEventListener('click', function() {
    // Copy the clicked photo's src into the lightbox img
    lightboxImg.src = img.src;

    // Add the 'active' class — this triggers our CSS to show it
    lightbox.classList.add('active');

    // Prevent the page from scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
  });

});


// STEP 3: Close lightbox when X button is clicked
closeBtn.addEventListener('click', function() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';    // restore scrolling
});


// STEP 4: Close lightbox when clicking the dark background
// (but NOT when clicking the photo itself)
lightbox.addEventListener('click', function(e) {

  // e.target = the exact element that was clicked
  // We only close if they clicked the background (lightbox itself)
  // NOT if they clicked the photo inside it
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

});


// STEP 5: Close lightbox when pressing the Escape key
document.addEventListener('keydown', function(e) {

  // e.key tells us which key was pressed
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

});