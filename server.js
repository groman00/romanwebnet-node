const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , '../dist/index.html'));
});

app.get('*', (req, res) => {
    res.send('Page Not Found')
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(PORT);
    console.log(`Express started on port ${PORT}`);
}
