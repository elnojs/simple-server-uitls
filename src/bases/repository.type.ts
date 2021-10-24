import { Model , UpdateQuery, FilterQuery, QueryOptions, Document , DocumentDefinition} from "mongoose";
import {ISkipLimitSort, IField} from "../types/common.type";


export interface FindManyResponsType<T> {
  data: Array<T>
  total: number
}

export interface UpdateOneOptionsType extends QueryOptions{
  rawResult?: true
  upsert?: true
}

export interface BaseRepositoryType<T extends Document> {
  findById(id: string): Promise<T> ;
  findOne(query?: FilterQuery<T>): Promise<T> ;
  find(query?: FilterQuery<T>, options?: ISkipLimitSort, fields?: IField): Promise<FindManyResponsType<T>>,
  create(data: T | DocumentDefinition<T>, ): Promise<CreateEditReturnType>
  updateOne(query: FilterQuery<T>, newData:UpdateQuery<T>, options?:UpdateOneOptionsType): Promise<CreateEditReturnType>,
  updateById(_id: string, newData: UpdateQuery<T>): Promise<CreateEditReturnType>,
  removeById(_id: string,): Promise<CreateEditReturnType>,
  updateMany(query: FilterQuery<T>, newData: UpdateQuery<T>, options?:QueryOptions): Promise<CreateEditReturnType>,
  findAndRemove(query?: FilterQuery<T>, options?: QueryOptions): Promise<CreateEditReturnType>,
  model: Model<T>
}