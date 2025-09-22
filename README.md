# OnlineShopper. React + Vite Project

**OnlineShopper** — одностраничное приложение интернет‑магазина на React с витриной товаров, корзиной, оформлением заказа, историей заказов, трекингом доставки и страницей 404. Проект собран на Vite, использует клиентские роуты, работу с API через axios, unit и интеграционные тесты на Vitest.

Полностью клиентская часть, взаимодействует с API через `axios`, использует маршрутизацию (`react-router`), компонентный подход.

### 🚀✨ Функционал

- 🏠 **Главная страница**: каталог товаров с поиском, рейтингом, ценой и выбором количества.
- 🛒 **Корзина и оформление заказа**: изменение количества и удаление товаров, выбор способа доставки и подсчёт стоимости (товары, доставка, налог, итог).
- 📦 **История заказов**: просмотр всех заказов с детализацией по товарам.
- 📍 **Отслеживание заказа**: визуальный прогресс-бар доставки с расчетом прогресса во времени.
- ❌ **Страница 404**: обработка несуществующих маршрутов.
- ✅ **Тестирование**: модульные тесты с помощью Vitest.
- 💡**Адаптивная верстка**: адаптивность дизайна под разные разрешения экранов.

### 🛠️ Технологии и инструменты

- **React 18** — компонентный подход, хуки, фрагменты
- **Vite** — быстрая сборка и разработка
- **React Router** — клиентская маршрутизация
- **Axios** — HTTP-запросы к API
- **dayjs** — работа с датами
- **Vitest** — модульное тестирование компонентов и утилит
- **ESLint** — контроль качества кода

### 📦 Структура
```
OnlineShopper
├─ public/ # статика (изображения, favicons)
├─ src/
│ ├─ components/
│ │ └─ Header.jsx
│ ├─ pages/
│ │ ├─ home/ # HomePage, ProductsGrid, Product
│ │ ├─ checkout/ # CheckoutPage и составные блоки
│ │ ├─ orders/ # OrdersPage, OrdersGrid, OrderHeader, OrderDetailsGrid
│ │ ├─ tracking/ # TrackingPage
│ │ └─ not-found/ # NotFoundPage
│ ├─ utils/
│ │ └─ money.js # formatMoney
│ ├─ App.jsx
│ └─ main.jsx # BrowserRouter, монтирование
├─ tests/ # Vitest (HomePage.test.jsx, Product.test.jsx и т.д.)
├─ vite.config.js, vitest.config.js, setupTests.js, package.json, package-lock.json, eslint.config.js
├─ index.html
├─ .gitignore
└─ README.md (этот файл)
```

### 🚀 Быстрый старт

```
cd working-directory
```

Для корректной работы веб-приложения необходимо запустить локальную backend-часть:
```
git clone https://github.com/SuperSimpleDev/ecommerce-backend-ai.git
// Или через SSH:
git clone git@github.com:SuperSimpleDev/ecommerce-backend-ai.git

cd ecommerce-backend-ai 
npm install
npm run dev
// Server is running on port 3000
// Доступно на http://localhost:3000
```

Далее запуск клиентской части в новом терминале из working-directory:
```
git clone https://github.com/caxapb/OnlineShopper.git
// Или через SSH:
git clone git@github.com:caxapb/OnlineShopper.git

cd OnlineShopper
npm install
npm run dev
```

Для тестирования:
```

```
