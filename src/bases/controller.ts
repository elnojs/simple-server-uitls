import {ObjectSchema} from "joi";
import { Request, Response , NextFunction} from "express";
import { FilterQuery, Document } from "mongoose";
import {BaseRepositoryType} from "./repository.type";

interface ParamsDictionary{
  id: string;
}


export interface BaseControllerType {
  get(req: Request, res: Response, next: NextFunction): void;
  getOne(req: Request<ParamsDictionary>, res: Response, next: NextFunction): void;
  create(req: Request, res: Response, next: NextFunction): void;
  remove(req: Request<ParamsDictionary>, res: Response, next: NextFunction): void;
  edit(req: Request<ParamsDictionary>, res: Response, next: NextFunction): void;
}


export const generateController  = <T extends Document>(repository: BaseRepositoryType<T > , validateSchema?:ObjectSchema, updateSchema ?:ObjectSchema ): BaseControllerType  => {
    return { 
        get: async (req, res, next) =>{
            try {
                const q = req.q as FilterQuery<T>;
                const data =  await repository.find(q, {skip: req.skip, limit: req.limit, sort: req.sort || {}} );
                return res.json(data);
            } catch (error) {
                return next(error);
            }
        },
        getOne: async (req, res, next) => {
            try {
                const data =  await repository.findById(req.params.id);
                if(!data){
                    throw new Error("data search not found");
                }
                return res.json(data); 
            } catch (error) {
                return next(error);
            }
          
        },
        create: async(req, res, next) => {
            try {
                let data = req.body;
                if(validateSchema){
                    data = await validateSchema.validateAsync(data, {stripUnknown: true}).catch(err => {
                        err.statusCode = 401;
                        throw err;
                    });
                }
                const createdData = await repository.create(data);
                return res.json(createdData);
            } catch (error) {
                return next(error);
            }
        },
        remove: async(req, res, next) => {
            try {
                const deletedResponse = await repository.removeById(req.params.id);
                return res.json(deletedResponse);
            }catch(error) {
                return next(error);
            } 
        },
        edit: async(req, res, next) => {
            try {
                let data = req.body;
                let schema : undefined | ObjectSchema = validateSchema; 

                if(updateSchema){
                    schema = updateSchema;
                }
                if(schema){
                    data = await schema.validateAsync(data, {stripUnknown: true}).catch(err => {
                        err.statusCode = 401;
                        throw err;
                    });
                }
                const editResponse = await repository.updateById(req.params.id, data);
                return res.json(editResponse);
            }catch(error) {
                return next(error);
            }
        }
    };
};  