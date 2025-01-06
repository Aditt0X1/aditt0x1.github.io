 // Function to reveal timeline items smoothly on scroll
 function revealTimelineItems() {
    var items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item) {
        var position = item.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', revealTimelineItems);

// Call function on load to reveal any items already in view
revealTimelineItems();
// Получаем элементы
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector(".close");

// Получаем все изображения с классом enlarge-on-hover
const images = document.querySelectorAll(".enlarge-on-hover");

// Функция для открытия модального окна при нажатии на изображение
images.forEach(function(image) {
image.addEventListener('click', function() {
modal.style.display = "flex";  // Открываем модальное окно
modalImg.src = this.src;  // Устанавливаем источник изображения
});
});

// Функция для закрытия модального окна при нажатии на кнопку "Закрыть"
closeButton.addEventListener('click', function() {
modal.style.display = "none";  // Закрываем модальное окно
});

// Функция для закрытия модального окна при нажатии вне изображения
window.addEventListener('click', function(event) {
if (event.target === modal) {
modal.style.display = "none";  // Закрываем модальное окно
}
});
