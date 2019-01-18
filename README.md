# NodeJS API Kanban board (clone Trello)

API для канбан доски

В качестве базы используются MongoDB сервиса www.mlab.com

## Установка

```
clone https://github.com/RookMeister/api-kanban-board.git

```

## Запуск

```
cd api-kanban-board

npm install

npm start

```

## База

За подключение к базе отвечает файл api-kanban-board/src/KanbanAPI/configDB.js

```
module.exports = {
  username: '****', //Логин к базе
  password: '****', //Пароль к базе
  database: '*****' //Адрес базы
}

```
