document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');
  
      const filter = button.getAttribute('data-filter'); // Get the filter value
      const cards = document.querySelectorAll('.ctf-card');
  
      cards.forEach(card => {
        const platform = card.getAttribute('data-platform'); // Get the card's platform
        if (filter === 'all' || platform === filter) {
          card.style.display = 'block'; // Show matching cards
        } else {
          card.style.display = 'none'; // Hide non-matching cards
        }
      });
    });
  });