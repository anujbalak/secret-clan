import express from 'express';
import indexRouter from './routes/indexRouter.js';
import 'dotenv/config'
import path from 'node:path'
import url from 'node:url'
import registrationRouter from './routes/registrationRouter.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolder = path.join(__dirname, 'views');

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', viewsFolder)

app.use('/', indexRouter);
app.use('/registration', registrationRouter)

app.listen(process.env.PORT, () => console.log('App listening at port', process.env.PORT))