import { Model, Document } from "mongoose";
import {BaseRepositoryType  } from "./repository.type";


const generateRepository = <T extends Document>(model: Model<T>): BaseRepositoryType<T> => {
    return {
        findOne: (query={}) => 
            model.findOne(query).then(res => {
                if(!res){
                    throw new Error("data not found");
                }
                return res;
            }),
        findById: (id) =>  model.findById(id).then(res => {
            if(!res){
                throw new Error("data not found");
            }
            return res;
        }),
        find: async(query={}, options, fields) => {
            const {skip = 0, limit, sort={} } = options || {};

            const data = await model.find(query, fields, {skip , limit, sort});
            const total =  await model.find(query).countDocuments();

            return {
                data,
                total
            };
        },
        create: async (data) => {
            const results = await model.create(data);
            return {
                _id: results._id,
                message: "create new data success"
            };
        },
        updateOne: async (query, data, options) => {
            await model.updateOne(query, data, options);
            return {
                message: "update data success"
            };
        },
        updateById: async (_id, data) => {
            const results = await model.findByIdAndUpdate(_id, data);
            return {
                _id: results?._id,
                message: "update data success"
            };
        },
        removeById: async (_id) => {
            const results = await model.findByIdAndRemove(_id);
            return {
                _id: results?._id,
                message: "remove data success"
            };
        },
        findAndRemove: async(query, options) => {
            const results = await model.findOneAndRemove(query, options);
            return {
                _id: results?._id,
                message: "remove data success"
            };
        },
        updateMany: async (query, data) => {
            await model.updateMany(query, data);
            return {
                message: "update many success "
            };
        },
        model: model
    };
};

export default generateRepository;