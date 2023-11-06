const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//static middleware pointing to the public folder 
app.use('public',express.static('public'));


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('/routes/apiRoutes')(app);
require('/routes/htmlRoutes')(app);



app.listen(PORT, () => {
    console.log (`API server working on Port ${PORT}!`);
});