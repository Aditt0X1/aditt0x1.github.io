document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const cardGrid = document.querySelector('.card-grid');
    const cards = document.querySelectorAll('.card');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    // Card click event
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('active');
        
        // You could add more interactions here, like expanding cards, showing more content, etc.
        const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
        card.style.setProperty('--accent', randomColor);
        
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        card.appendChild(ripple);
        
        // Clean up after animation
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      // Update SVG icon for theme
      if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    });
    
    // Mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      requestAnimationFrame(updateParallax);
    });
    
    // Touch movement for mobile
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        
        requestAnimationFrame(updateParallax);
      }
    });
    
    // Update elements based on mouse position
    function updateParallax() {
      // Update center reference
      centerX = container.getBoundingClientRect().left + (container.offsetWidth / 2);
      centerY = container.getBoundingClientRect().top + (container.offsetHeight / 2);
      
      // Calculate mouse position relative to center
      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;
      
      // Update grid rotation (subtle)
      cardGrid.style.transform = `rotateX(${-deltaY * 5}deg) rotateY(${deltaX * 5}deg)`;
      
      // Update each card and its layers
      cards.forEach(card => {
        const depth = parseFloat(card.dataset.depth) || 20;
        const cardX = (mouseX - (card.getBoundingClientRect().left + card.offsetWidth / 2)) / 25;
        const cardY = (mouseY - (card.getBoundingClientRect().top + card.offsetHeight / 2)) / 25;
        
        // Apply parallax to card layers
        const layers = card.querySelectorAll('.card-layer');
        layers.forEach(layer => {
          const layerDepth = depth * parseFloat(getComputedStyle(layer).transform.split(',')[14] || 1) / 20;
          layer.style.transform = `translateX(${cardX * layerDepth * -1}px) translateY(${cardY * layerDepth * -1}px) translateZ(${depth}px)`;
        });
      });
    }
    
    // Initial update
    updateParallax();
    
    // Resize event to update center position
    window.addEventListener('resize', () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight / 2;
    });
    
    // Add keyboard navigation for accessibility
    let focusedCardIndex = -1;
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Tab navigation is handled by the browser
        return;
      }
      
      if (e.key === 'Enter' || e.key === ' ') {
        // Activate focused card
        const focusedCard = document.activeElement;
        if (focusedCard && focusedCard.classList.contains('card')) {
          focusedCard.click();
          e.preventDefault();
        }
      }
      
      // Arrow key navigation between cards
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        
        // Find the currently focused card index
        cards.forEach((card, index) => {
          if (card === document.activeElement) {
            focusedCardIndex = index;
          }
        });
        
        // Calculate new index based on arrow key
        let newIndex = focusedCardIndex;
        const cardsPerRow = Math.floor(cardGrid.offsetWidth / (cards[0].offsetWidth + parseFloat(getComputedStyle(cardGrid).gap)));
        
        switch (e.key) {
          case 'ArrowLeft':
            newIndex = Math.max(0, focusedCardIndex - 1);
            break;
          case 'ArrowRight':
            newIndex = Math.min(cards.length - 1, focusedCardIndex + 1);
            break;
          case 'ArrowUp':
            newIndex = Math.max(0, focusedCardIndex - cardsPerRow);
            break;
          case 'ArrowDown':
            newIndex = Math.min(cards.length - 1, focusedCardIndex + cardsPerRow);
            break;
        }
        
        // Focus the new card
        if (newIndex >= 0 && newIndex < cards.length) {
          cards[newIndex].focus();
        }
      }
    });
  });