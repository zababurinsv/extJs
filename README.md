# Задание

## Инструкция по запуску

1. Выполнить `npm install`
2. Запуск `node index.js`
3. Перейти на [http://localhost:3000/](http://localhost:3000/).

## Вопросы

1. Определите функциональное назначение исходного кода фронтенда.
2. Найдите и опишите недостатки кода js фронтенда, которые будут мешать выполнять предназначение. Устраните самые простые.
3. На странице фронтенда присутствует флаг подтверждения. Доработайте код.
4. Что произойдет, если строки 46-49 вставить на 13-ую строку файла index.html?
5. Какая цель введения параметра `_dc`?
6. В каких запросах параметр `_dc` лишний?
7. В каких случаях на один из запросов бакенд будет возвращать `{"status":"err"}`?

### Ответы
1. Выбор модели телефона, Обновление данных на странице
2. 
* `for="pet-select"` требуется заменить на `for="phone-select"`
  ```jsx
  <label for="pet-select">Choose:</label>
  ```
* При сбразывании параметров из тега select изчезало дефолтное поле
  ```jsx
  <option value="0">--Please choose an option--</option>
  ```
* По умолчанию кнопка selected должна быть отклбюченна  
  ```jsx
  <button id="btn-select" type="button" disabled="true">Select</button>
  ```
* При нажатии кнопки select не производилось обновление данных.

3. Добавил поведение. Если флаг не стоит нельзя выбирать кнопку `select`
4. Эти три параметра будут null, так кака html ещё не загружен
```jsx
let btnRefresh = this.getBtnRefresh();
let btnSelect = this.getBtnSelect();
let btnConfirm = this.getBtnConfirm();
```

6. _dc это параметр блокировки кеша
7. Лишний у post запроса. 
   GET запросы агрессивно кэшируются браузером, и, добавляя уникальную временную метку, он отключает кеш браузера.
8. `status: (index >= 0) ? 'ok' : 'err'` если index меньше нуля