import express from 'express';
import {tempRouter} from "./src/routes/temp.route.js";
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import cartRouter from "./src/routes/cart.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express();
const port = 3000;


// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false}));

const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
}


// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use(myLogger);

app.get('/', (req, res) => {
    console.log("/");
    res.send('PackIt 루트페이지 테스트중(2)');
});

app.get('/hello', (req, res) => {
    console.log("/hello");
    res.send('패킷 랜딩 페이지');
});

app.use('/temp', tempRouter);


//장바구니
app.use('/cart',cartRouter);




// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.stack);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});