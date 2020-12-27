const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>The website is working</h1>');
});

const port = 5555;
app.listen(port, () => {
    console.log(`Car Dealer App is running on http://localhost:${port}`);
});
