import {Request,  Response , NextFunction,} from "express";
import {stringToQueryObj, parseSort} from "../libs/helpers";

export const parsedQueryAndSort = async (req: Request, _: Response, next: NextFunction) : Promise<void> => {
    try {
        req.q = req.q ? {...stringToQueryObj(req.query.q as string), ...req.q }: stringToQueryObj(req.query.q as string);
        req.sort = parseSort(req.query.sort as string);
        req.skip = Number(req.query.skip);
        req.limit = Number(req.query.limit);

        next();
    } catch (error) {
        return next(error); 
    }
};