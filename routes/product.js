import { Router } from 'express'
import { product } from '../cores'

const router = Router()

router.get('/product', (req, res) => {
  res.send(product.getAll())
})

export default router