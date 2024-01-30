// temp.controller.js

import { status } from '../../config/response.status.js';
import {CheckFlag, getTempData} from '../services/temp.service.js';
import { response } from '../../config/response.js';
import {tempRouter} from "../routes/temp.route.js";

export const tempTest = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

//tempRouter.get('/exception/:flag',tempException);

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}