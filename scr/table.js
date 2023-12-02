// Получение формы и контейнера для результатов
const form = document.getElementById('bookCatalogForm');
const resultsTable = document.getElementById('resultsTable');

// Добавление слушателя события отправки формы
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращение перезагрузки страницы

    // Получение значений из формы
    const genre = form.elements.genre.value;
    const author = form.elements.author.value;
    const year = form.elements.year.value;
    const priceFrom = form.elements.priceFrom.value;
    const priceTo = form.elements.priceTo.value;
    const availability = form.elements.availability.value;

    // Генерация таблицы на основе введенных параметров
    const table = generateTable(genre, author, Number(year), Number(priceFrom), Number(priceTo), availability);

    // Очистка контейнера результатов и добавление сгенерированной таблицы
    resultsTable.innerHTML = '';
    resultsTable.appendChild(table);
});

// Функция для генерации таблицы на основе введенных параметров
function generateTable(genre, author, year, minPrice, maxPrice, availability) {

    const books = [
        { name: "Курсическая книга заговоров и заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 1, price: 0.1, available: true },
        { name: "История магии", author: "Батильда Бэгшот", genre: "Учебник", year: 1, price: 2, available: true },
        { name: "Тёмные силы: пособие по самозащите", author: "Квентин Тримбл", genre: "Учебник", year: 1, price: 1, available: true },
        { name: "Теория магии", author: "Адальберт Уоффлинг", genre: "Учебник", year: 1, price: 2, available: true },
        { name: "1000 магических растений и грибов", author: "Филлида Спора", genre: "Учебник", year: 1, price: 2, available: true },
        { name: "Руководство по трансфигурации для начинающих", author: "Эмерик Свитч", genre: "Учебник", year: 1, price: 1, available: true },
        { name: "Магические отвары и зелья", author: "Жиг Мышьякофф", genre: "Учебник", year: 1, price: 2, available: true },
        { name: "Фантастические звери: места обитания", author: "Ньют Саламандер", genre: "Учебник", year: 1, price: 2, available: true },
        { name: "Современная история магии", author: "", genre: "Другое", year: "", price: 3, available: true },
        { name: "Развитие и упадок Тёмных искусств", author: "", genre: "Другое",  year: "", price: 4, available: true },
        { name: "Величайшие события волшебного мира в двадцатом веке", author: "", genre: "Другое",  year: "", price: 5, available: true },
        { name: "История Хогвартса", author: "Гариус Томкинк", genre: "Другое", year: "", price: 1, available: true },
        { name: "История квиддича", author: "Кеннилуорти Уисп", genre: "Другое",  year: "", price: 3, available: true },
        { name: "Стандартная книга заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 2, price: 1, available: true },
        { name: "Встречи с вампирами", author: "Златопуст Локонс", genre: "Учебник", year: 2, price: 1, available: false },
        { name: "Духи на дорогах", author: "Златопуст Локонс", genre: "Учебник", year: 2, price: 1, available: false },
        { name: "История магии", author: "Батильда Бэгшот", genre: "Учебник", year: 3, price: 2, available: true },
        { name: "Основы защиты от Тёмных искусств", author: "Жиг Мышьякофф", genre: "Учебник", year: 3, price: 3, available: true },
        { name: "Стандартная книга заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 3, price: 1, available: true },
        { name: "Стандартная книга заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 4, price: 1, available: true },
        { name: "Как рассеять туман над будущим", author: "Кассандра Ваблатски ", genre: "Учебник", year: 4, price: 4, available: true },
        { name: "Стандартная книга заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 5, price: 1, available: true },
        { name: "Теория защитной магии", author: "Уилберт Слинкхард", genre: "Учебник", year: 5, price: 1, available: true },
        { name: "Стандартная книга заклинаний", author: "Миранда Гуссокл", genre: "Учебник", year: 6, price: 1, available: true },
        { name: "Расширенный курс зельеварения", author: "Либациус Бораго", genre: "Учебник", year: 6, price: 1, available: true },
        { name: "Сказки барда Бидля", author: "", genre: "Другое", year: "", price: 3, available: true },
        { name: "Жизнь и обманы Альбуса Дамблдора", author: "Рита Скитер", genre: "Другое", year: "", price: 4, available: true },
    ];



    const filteredBooks = books.filter(book => {
        return (
            (genre === "" || book.genre === genre) &&
            (!year || book.year === year) &&
            (author === "" || book.author.includes(author)) &&
            (!minPrice || book.price >= minPrice) &&
            (!maxPrice || book.price <= maxPrice) &&
            ((availability === "") || (availability === "есть в наличии" && book.available) || (availability === "нет в наличии" && !book.available))
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
        addCell(row, book.name);
        addCell(row, book.author);
        addCell(row, book.price);
        addCell(row, book.available ? "есть в наличии" : "нет в наличии");
    });

    return table;
}

function addCell(row, text) {
    const cell = row.insertCell();
    const textNode = document.createTextNode(text);
    cell.appendChild(textNode);
}
