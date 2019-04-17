import Product from './product'
import {db} from '../db'

const product = new Product(db)

export {product}