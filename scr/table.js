// Получение формы и контейнера для результатов
const form = document.getElementById('bookCatalogForm');
const resultsTable = document.getElementById('resultsTable');

// Добавление слушателя события отправки формы
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращение перезагрузки страницы

    // Получение значений из формы
    const genre = form.elements.genre.value;
    const author = form.elements.author.value;
    const year = form.elements.year.value;
    const priceFrom = form.elements.priceFrom.value;
    const priceTo = form.elements.priceTo.value;
    const availability = form.elements.availability.value;

    // Сохранение значений в локальное хранилище
    localStorage.setItem('genre', genre);
    localStorage.setItem('author', author);
    localStorage.setItem('year', year);
    localStorage.setItem('priceFrom', priceFrom);
    localStorage.setItem('priceTo', priceTo);
    localStorage.setItem('availability', availability);

    // Получение данных о книгах с сервера
    const response = await fetch('https://retoolapi.dev/fW96ZD/books/');
    const books = await response.json(); // Парсинг JSON данных о книгах
    const table = generateTable(books, genre, author, Number(year), Number(priceFrom), Number(priceTo), availability);

    // Очистка контейнера результатов и добавление сгенерированной таблицы
    resultsTable.innerHTML = '';
    resultsTable.appendChild(table);
});

// Загрузка значений из локального хранилища при загрузке страницы
window.onload = function() {
    form.elements.genre.value = localStorage.getItem('genre');
    form.elements.author.value = localStorage.getItem('author');
    form.elements.year.value = localStorage.getItem('year');
    form.elements.priceFrom.value = localStorage.getItem('priceFrom');
    form.elements.priceTo.value = localStorage.getItem('priceTo');
    form.elements.availability.value = localStorage.getItem('availability');
};

// Функция для генерации таблицы на основе введенных параметров
function generateTable(books, genre, author, year, minPrice, maxPrice, availability) {

    const filteredBooks = books.filter(book => {
        return (
            (genre === "" || book.genre === genre) &&
            (!year || book.year === year) &&
            (author === "" || book.author.includes(author)) &&
            (!minPrice || book.price >= minPrice) &&
            (!maxPrice || book.price <= maxPrice) &&
            ((availability === "") || (availability === "есть в наличии" && book.availability) || (availability === "нет в наличии" && !book.availability))
        );
    });

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    addCell(headerRow, "Тип");
    addCell(headerRow, "Курс");
    addCell(headerRow, "Название");
    addCell(headerRow, "Автор");
    addCell(headerRow, "Цена");
    addCell(headerRow, "Наличие");

    filteredBooks.forEach(book => {
        const row = table.insertRow();
        addCell(row, book.genre);
        addCell(row, book.year);
        addCell(row, book.title);
        addCell(row, book.author);
        addCell(row, book.price);
        addCell(row, book.availability ? "есть в наличии" : "нет в наличии");
    });

    return table;
}

function addCell(row, text) {
    const cell = row.insertCell();
    const textNode = document.createTextNode(text);
    cell.appendChild(textNode);
}
