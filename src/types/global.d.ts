
 interface ISort{
  [key: string]: number;
}

interface IField{
  [key: string]: number;
}

interface IFind {
  total: number;
  data: Array<Document>
}

interface DateRangeType {
  startDate: Date;
  endDate: Date;
}

interface DocumentCreateType<T> {
  data: Array<T> | T
}


interface CreateEditReturnType{
  _id?:  string
  message?: string
}

interface ExtendedError extends Error {
    statusCode: number
}

interface ISkipLimitSort{
  skip: number;
  limit: number;
  sort: ISort
}


