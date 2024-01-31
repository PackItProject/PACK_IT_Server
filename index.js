import express from 'express';
import {tempRouter} from "./src/routes/temp.route.js";
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';


const app = express();
const port = 3000;

const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
}


// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use(myLogger);

app.get('/', (req, res) => {
    console.log("/");
    res.send('PackIt 루트페이지 테스트중');
});

app.get('/hello', (req, res) => {
    console.log("/hello");
    res.send('패킷 랜딩 페이지');
});

app.use('/temp', tempRouter);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.stack);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});