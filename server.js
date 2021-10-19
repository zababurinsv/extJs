const express = require('express')
const app = express()

const path = require('path');
const router = express.Router();

const port = 3000

var fs = require('fs');

const hostname = '127.0.0.1';

const ITEMS_DEFAULT = [
    { id: "0", name: "--Please choose an option--"},
    { id: "1", name: "Samsung" },
    { id: "2", name: "Apple" },
    { id: "3", name: "Asus" },
    { id: "4", name: "Huawei" },
    { id: "5", name: "Lenovo" },
    { id: "6", name: "LG" }
]

items = JSON.parse(JSON.stringify(ITEMS_DEFAULT));

app.use((request, response, next) => {
    console.log(request.url)
    next()
});

app.use('/app', express.static('app'));

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
});

router.get('/', (request, response) => {
    items = JSON.parse(JSON.stringify(ITEMS_DEFAULT));
    response.sendFile(path.join(__dirname + '/index.html'));
});

router.get("/items", (request, response) => {
    console.log('sssgetss', request.query)
    response.json(items);
});

router.post("/select/:id", (request, response) => {
    console.log('sssssssssssss', request.query)
    let id = request.params.id;
    let index = ((value) => {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === value) {
                return i;
            }
        }
        return -1;
    })(id);
    if (index >= 0) {
        items.splice(index, 1);
    }
    response.json({ status: (index >= 0) ? 'ok' : 'err' });
});

app.use((err, request, response, next) => {
    console.log(err)
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');