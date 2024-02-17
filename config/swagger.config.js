// swagger.config.js

import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: 'PackIt API',
            version: '1.0.0',
            description: 'Packit API 입니다'
        },
        host: 'port-0-pack-it-ghdys32bls1g7ot3.sel5.cloudtype.app',
        basepath: '../',
        schemes: ['https'],
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);