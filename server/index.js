const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../client/public'));

app.listen(3000, () => console.log("listening on  port 3000"));