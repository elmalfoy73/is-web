// Получить элемент 'preloader'
const preloader = document.getElementById('preloader');

// Показать preloader перед получением данных
preloader.style.display = 'block';

// Получение данных о книгах с сервера
const response = await fetch('https://retoolapi.dev/fW96ZD/books/');
const books = await response.json(); // Парсинг JSON данных о книгах
const table = generateTable(books, genre, author, Number(year), Number(priceFrom), Number(priceTo), availability);

// Скрыть preloader после получения ответа и отрисовки данных
preloader.style.display = 'none';
