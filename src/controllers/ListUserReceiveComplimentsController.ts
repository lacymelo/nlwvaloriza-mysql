import { Request, Response } from 'express';
import { ListUserReceiveComplimentsService } from '../service/ListUserReceiveComplimentsService';

class ListUserReceiveComplimentsController{
    async handle(req: Request, res: Response){
        const { user_id } = req;

        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();

        const receiveCompliments = await listUserReceiveComplimentsService.execute(user_id);

        return res.status(200).json(receiveCompliments);
    }
}

export { ListUserReceiveComplimentsController }