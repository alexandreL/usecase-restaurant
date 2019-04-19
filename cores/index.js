import ProductControler from './ProductControler'
import {productModel} from '../db'

const productControler = new ProductControler(productModel)

export {productControler}