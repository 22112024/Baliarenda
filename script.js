// === Бургер-меню ===
// Функция для переключения видимости меню (бургер-меню)
function toggleMenu() {
  const menuContainer = document.querySelector(".menu_container");
  if (menuContainer) {
    menuContainer.classList.toggle("active");
  }
}

// Закрытие бургер-меню при клике вне его
document.addEventListener("click", function (event) {
  const menuContainer = document.querySelector(".menu_container");
  const burgerMenu = document.querySelector(".burger_menu");

  if (
    menuContainer &&
    menuContainer.classList.contains("active") &&
    !menuContainer.contains(event.target) &&
    !burgerMenu.contains(event.target)
  ) {
    menuContainer.classList.remove("active");
  }
});

// === Работа с внешними ссылками ===
// Открывает ссылку в новой вкладке
function openLink(url) {
  window.open(url, "_blank");
}

// === Работа с выпадающими меню ===
// Универсальная функция для переключения видимости выпадающего меню
function toggleDropdownMenu(menuId) {
  const dropdownMenu = document.getElementById(menuId);
  if (dropdownMenu) {
    dropdownMenu.classList.toggle("active");
  }
}

// Закрывает выпадающее меню, если клик произошел вне его
document.addEventListener("click", function (event) {
  const dropdownMenus = [
    "district_dropdown",
    "type_dropdown",
    "rooms_dropdown",
    "price_dropdown",
  ];

  dropdownMenus.forEach((menuId) => {
    const dropdownMenu = document.getElementById(menuId);
    const menuLi = document.querySelector(`.${menuId.split("_")[0]}`);

    if (
      dropdownMenu &&
      dropdownMenu.classList.contains("active") &&
      !dropdownMenu.contains(event.target) &&
      !menuLi.contains(event.target)
    ) {
      dropdownMenu.classList.remove("active");
    }
  });
});

// Предотвращение закрытия меню при клике на чекбокс или связанный текст
document.querySelectorAll(".dropdown_menu li").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
  });
});

// Работа с кнопками комнат
document.querySelectorAll(".rooms_btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Переключаем класс "selected" для текущей кнопки
    button.classList.toggle("selected");
  });
});

// === Переключение языка ===
const russianButton = document.getElementById("russian");
const englishButton = document.getElementById("english");

function switchLanguage() {
  if (russianButton.classList.contains("active")) {
    russianButton.classList.remove("active");
    russianButton.classList.add("inactive");
    englishButton.classList.remove("inactive");
    englishButton.classList.add("active");
  } else {
    russianButton.classList.remove("inactive");
    russianButton.classList.add("active");
    englishButton.classList.remove("active");
    englishButton.classList.add("inactive");
  }
}

// === Переключение валюты ===
const idrButton = document.getElementById("idr");
const usdButton = document.getElementById("usd");

function switchCurrency() {
  if (idrButton.classList.contains("active")) {
    idrButton.classList.remove("active");
    idrButton.classList.add("inactive");
    usdButton.classList.remove("inactive");
    usdButton.classList.add("active");
  } else {
    idrButton.classList.remove("inactive");
    idrButton.classList.add("active");
    usdButton.classList.remove("active");
    usdButton.classList.add("inactive");
  }
}

// === Добавление обработчиков для переключения языка и валюты ===
document
  .getElementById("languageSwitcher")
  ?.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("russian") ||
      event.target.classList.contains("english")
    ) {
      switchLanguage();
    }

    if (
      event.target.classList.contains("idr") ||
      event.target.classList.contains("usd")
    ) {
      switchCurrency();
    }
  });

// Устанавливаем начальный язык (по умолчанию русский активен), если элементы существуют
if (russianButton && englishButton) {
  russianButton.classList.add("active");
  englishButton.classList.add("inactive");
}

// Устанавливаем начальную валюту (по умолчанию IDR активен), если элементы существуют
if (idrButton && usdButton) {
  idrButton.classList.add("active");
  usdButton.classList.add("inactive");
}

// === Работа с выпадающими меню для районов, типов жилья, комнат и цены ===
document
  .querySelector(".district")
  ?.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращает действие по умолчанию
    toggleDropdownMenu("district_dropdown");
  });

document.querySelector(".type")?.addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращает действие по умолчанию
  toggleDropdownMenu("type_dropdown");
});

document.querySelector(".rooms")?.addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращает действие по умолчанию
  toggleDropdownMenu("rooms_dropdown");
});

document.querySelector(".price")?.addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращает действие по умолчанию
  toggleDropdownMenu("price_dropdown");
});

// === Открытие ссылок на другие страницы ===
function redirectToPage(url) {
  // Проверьте, существует ли путь
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error("Файл не найден:", url);
        alert("Страница временно недоступна.");
      } else {
        window.location.href = url;
      }
    })
    .catch((error) => {
      console.error("Ошибка при загрузке страницы:", error);
    });
}

// Функция для обновления состояния (активной звезды)
function updateStarState(starId) {
  const starIcon = document.getElementById(starId);

  // Если звезда уже активна (с классом 'selected'), удаляем этот класс
  if (starIcon.classList.contains("selected")) {
    starIcon.classList.remove("selected");
    // Убираем из localStorage, чтобы она не была активной при перезагрузке
    localStorage.removeItem(starId);
  } else {
    // Иначе, добавляем класс 'selected' для активной звезды
    starIcon.classList.add("selected");
    // Сохраняем состояние в localStorage, чтобы при перезагрузке страницы звезда оставалась активной
    localStorage.setItem(starId, "selected");
  }
}

// Функция для загрузки состояния из localStorage
function loadStarState(starId) {
  const starIcon = document.getElementById(starId);
  if (localStorage.getItem(starId)) {
    // Если состояние сохранено в localStorage, делаем звезду активной
    starIcon.classList.add("selected");
  }
}

// Добавляем обработчик клика на каждую звезду
document.querySelectorAll(".star_icon").forEach((starIcon) => {
  const starId = starIcon.id;

  // Загружаем состояние для каждой звезды при загрузке страницы
  loadStarState(starId);

  starIcon.addEventListener("click", () => {
    updateStarState(starId);
  });
});

// Функция для открытия модального окна
function openLoginMenu() {
  const loginMenu = document.getElementById("loginMenu");
  if (loginMenu) {
    loginMenu.style.display = "flex"; // Показываем окно
  }
}

// Функция для закрытия модального окна
function closeLoginMenu() {
  const loginMenu = document.getElementById("loginMenu");
  if (loginMenu) {
    loginMenu.style.display = "none"; // Скрываем окно
  }
}

// Добавляем обработчик для кнопки "loginButton" после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");

  if (loginButton) {
    loginButton.addEventListener("click", openLoginMenu);
  } else {
    console.log("Кнопка с id 'loginButton' не найдена на странице.");
  }

  // Закрытие модального окна при клике на фон
  const loginMenu = document.getElementById("loginMenu");
  if (loginMenu) {
    loginMenu.addEventListener("click", function (event) {
      if (event.target === this) {
        closeLoginMenu();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var passwordField = document.getElementById("password"); // Получаем элемент поля пароля
  var toggleButton = document.getElementById("togglePassword"); // Получаем кнопку переключения видимости
  var toggleIcon = document.getElementById("toggleIcon"); // Получаем элемент изображения иконки

  if (toggleButton) {
    // Проверка, существует ли кнопка
    toggleButton.addEventListener("click", function () {
      // Проверяем текущий тип поля и переключаем его
      if (passwordField.type === "password") {
        passwordField.type = "text"; // Меняем тип на "text", чтобы показывать пароль
        toggleIcon.src = "img/visiblepasswordr.svg"; // Заменяем на иконку с открытым глазом
        toggleIcon.alt = "Hide password"; // Обновляем описание для доступности
      } else {
        passwordField.type = "password"; // Если поле уже типа "text", меняем обратно на "password"
        toggleIcon.src = "img/invisiblepassword.svg"; // Заменяем на иконку с закрытым глазом
        toggleIcon.alt = "Show password"; // Обновляем описание для доступности
      }
    });
  } else {
    console.log("Кнопка переключения пароля не найдена.");
  }
});

window.history.pushState(null, "", window.location.href);

/*
const goTopBtn = document.querySelector(".go-top");

window.addEventListener("scroll", trackScroll);
goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  const scrolled = window.scrollY; // Получаем текущую прокрутку
  const coords = document.documentElement.clientHeight;

  // Если прокрутили вниз больше, чем на высоту окна
  if (scrolled > coords) {
    goTopBtn.classList.add("go-top--show"); // Показываем кнопку
  } else {
    goTopBtn.classList.remove("go-top--show"); // Скрываем кнопку
  }
}

function goTop() {
  if (window.scrollY > 0) {
    // Если не на самом верху
    window.scrollBy(0, -75); // Прокручиваем страницу вверх
    setTimeout(goTop, 0); // Рекурсивно продолжаем прокрутку
  }
}

*/
