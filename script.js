//##################################################################################################
//      Luis Iván Bazán Flores    
//      2024 The University of Memphis
//
//  ".JS Script for my personal website"
//##################################################################################################

document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const contactButton = document.getElementById('contactButton');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');
    const leftNav = document.querySelector('.lightbox-nav.left');
    const rightNav = document.querySelector('.lightbox-nav.right');
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initially display the home section
    showTabContent('Home');

    // Current image index in the lightbox
    let currentImageIndex;

    // Functions
    // Hide all tab contents
    function hideAllTabContents() {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
    }

    // Show the target tab content
    function showTabContent(targetId) {
        hideAllTabContents();
        document.getElementById(targetId).classList.add('active');
    }

    // Add click event listeners to all tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('data-target');
            showTabContent(targetId);
        });
    });

    // Open lightbox with the selected image
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex].src;
        lightbox.style.display = 'flex';
    }

    // Show previous image in the lightbox
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    // Show next image in the lightbox
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    // Event listeners
    // Open lightbox on image click
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Close lightbox
    close.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg && e.target !== leftNav && e.target !== rightNav) {
            lightbox.style.display = 'none';
        }
    });

    // Navigate images using lightbox arrows
    leftNav.addEventListener('click', function() {
        showPreviousImage();
    });

    rightNav.addEventListener('click', function() {
        showNextImage();
    });

    // Navigate images using keyboard
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
});