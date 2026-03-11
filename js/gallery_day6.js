// ================================
// PHOTO DATA
// This is your photo "database" — 
// add or remove photos by editing this array!
// ================================

let photos = [
    { src: 'images/newton-museum-01.jpg', caption: 'Newton\'s Museum - 01' },
    { src: 'images/newton-museum-02.jpg', caption: 'Newton\'s Museum - 02' },
    { src: 'images/newton-museum-03.jpg', caption: 'Newton\'s Museum - 03' },
    { src: 'images/newton-museum-04.jpg', caption: 'Newton\'s Museum - 04' },
    { src: 'images/newton-museum-05.jpg', caption: 'Newton\'s Museum - 05' },
    { src: 'images/newton-museum-06.jpg', caption: 'Newton\'s Museum - 06' },
    { src: 'images/newton-museum-07.jpg', caption: 'Newton\'s Museum - 07' },
    { src: 'images/newton-museum-08.jpg', caption: 'Newton\'s Museum - 08' },
    { src: 'images/newton-museum-09.jpg', caption: 'Newton\'s Museum - 09' },
    { src: 'images/newton-museum-10.jpg', caption: 'Newton\'s Museum - 10' },
    { src: 'images/newton-museum-11.jpg', caption: 'Newton\'s Museum - 11' },
    { src: 'images/newton-museum-12.jpg', caption: 'Newton\'s Museum - 12' },
    { src: 'images/newton-museum-13.jpg', caption: 'Newton\'s Museum - 13' },
    { src: 'images/newton-museum-14.jpg', caption: 'Newton\'s Museum - 14' },
    { src: 'images/newton-museum-15.jpg', caption: 'Newton\'s Museum - 15' },
    { src: 'images/newton-museum-16.jpg', caption: 'Newton\'s Museum - 16' },
    { src: 'images/newton-museum-17.jpg', caption: 'Newton\'s Museum - 17' },
    { src: 'images/newton-museum-18.jpg', caption: 'Newton\'s Museum - 18' },
  ];
  
  
  // ================================
  // RENDER GALLERY
  // This function BUILDS the gallery 
  // from the photos array above
  // ================================
  
  function renderGallery() {
    // Find the gallery section in the HTML
    const gallery = document.querySelector('.gallery');
  
    // Clear everything currently in the gallery
    // innerHTML = the HTML content INSIDE an element
    gallery.innerHTML = '';
  
    // Loop through every photo in the array
    // and build an HTML card for each one
    photos.forEach(function(photo, index) {
  
      // Create a new div element in memory
      const item = document.createElement('div');
  
      // Give it the gallery-item class so our CSS styles it
      item.classList.add('gallery-item');
  
      // Fill the div with HTML using a template literal
      // Template literals use backticks ` ` instead of quotes
      // ${variable} drops a variable's value right into the string
      item.innerHTML = `
        <img src="${photo.src}" 
             alt="${photo.caption}"
             data-index="${index}">
        <p class="caption">${photo.caption}</p>
        <button class="remove-btn" data-index="${index}">
          Remove
        </button>
      `;
      
      // Attach remove button click listener
    const removeBtn = item.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function() {
      const i = parseInt(removeBtn.getAttribute('data-index'));
      removePhoto(i);
    });


      // Add this card to the gallery on the page
      gallery.appendChild(item);
    });
  
    // After rebuilding the gallery, re-attach lightbox listeners
    // (because the old img elements were deleted and replaced)
    attachLightboxListeners();
  }
  
  
  // ================================
  // ADD PHOTO
  // Adds a new photo to the array
  // then re-renders the gallery
  // ================================
  
  function addPhoto() {
    // Get the values from the input fields
    const srcInput = document.querySelector('#newSrc');
    const captionInput = document.querySelector('#newCaption');
  
    const src = srcInput.value.trim().startsWith('images/') 
  ? srcInput.value.trim() 
  : 'images/' + srcInput.value.trim();        // .trim() removes accidental spaces
    const caption = captionInput.value.trim();
  
    // Validate — make sure both fields are filled in
    if (src === '' || caption === '') {
      alert('Please fill in both the filename and caption!');
      return;   // stop the function here if fields are empty
    }
  
    // Add new photo object to the END of the array
    // push() adds an item to the end of an array
    photos.push({ src: src, caption: caption });
  
    // Clear the input fields ready for next time
    srcInput.value = '';
    captionInput.value = '';
  
    // Re-render the gallery to show the new photo
    renderGallery();
  }
  
  
  // ================================
  // REMOVE PHOTO
  // Removes a photo from the array
  // by its index, then re-renders
  // ================================
  
  function removePhoto(index) {
    // Confirm before deleting — good UX practice!
    const confirmed = confirm('Remove this photo from the gallery?');
  
    if (confirmed) {
      // splice(index, 1) = remove 1 item at this position
      photos.splice(index, 1);
  
      // Re-render gallery without that photo
      renderGallery();
    }
  }
  
  
  // ================================
  // LIGHTBOX
  // ================================
  
  const lightbox = document.querySelector('#lightbox');
  const lightboxImg = document.querySelector('#lightboxImg');
  const closeBtn = document.querySelector('#closeBtn');
  
  function attachLightboxListeners() {
    // Re-find all gallery images (they change every time we render)
    const galleryImages = document.querySelectorAll('.gallery-item img');
  
    galleryImages.forEach(function(img) {
      img.addEventListener('click', function() {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }
  
  // Close buttons only need to be attached once
  closeBtn.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  
  // ================================
  // START
  // Run renderGallery when the page loads
  // ================================
  
  renderGallery();