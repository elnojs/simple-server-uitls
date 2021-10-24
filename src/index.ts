import {generateController} from "./bases/controller"
import generateRepository from "./bases/repository"
import {parsedQueryAndSort} from "./middlewares/queries"
import {errorMidleware, jsonDataMiddleWare} from "./middlewares/response"



export default {
  generateController,
  generateRepository,
  errorMidleware,
  parsedQueryAndSort,
  jsonDataMiddleWare,
}