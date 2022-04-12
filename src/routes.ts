import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const routes = Router();

//instancia de controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

//rotas
//cria uma tag
routes.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
//lista todas as tags
routes.get('/tags', ensureAuthenticated, ensureAdmin, listTagsController.handle);
//cria um usuário
routes.post('/users', createUserController.handle);
//lista usuários
routes.get('/users', ensureAuthenticated, listUsersController.handle);
//login de usuário
routes.post('/login', authenticateUserController.handle);
//cria um elogio
routes.post('/compliments', ensureAuthenticated, createComplimentController.handle);
//lista todos os elogios recebidos
routes.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);
//lista todos os elogios enviados
routes.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);

export { routes };