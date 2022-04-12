import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import cors from "cors";

import { routes } from './routes';

import './database';

const app = express();

app.use(cors());

//para entender requisições do tipo json
app.use(express.json());

// exportando as rotas
app.use(routes);

//middle interceptador de error na requisição
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: 'Internal Server Error'
    });
});

//inicializa o servidor
app.listen(3000, () => console.log('Server is running Port:3000'));

