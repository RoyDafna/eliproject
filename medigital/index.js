import express from 'express';
import database from './models/database.js';
import dotenv from 'dotenv';
import actions from './controller/actions.js';
import tasks from './controller/tasks.js';
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', actions);
app.use('/functions', tasks);

database
.sync()
.then(results => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running via port ${process.env.PORT}`);
    })
})
.catch(err => {
    console.log(err);
})