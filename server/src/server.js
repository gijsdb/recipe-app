const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

require('./routes/userRoutes')(app);
require('./routes/recipeRoutes')(app);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(morgan('common'));
app.use(helmet());

app.get('/', (req, res) => {
    res.json({
        message: 'Root',
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});