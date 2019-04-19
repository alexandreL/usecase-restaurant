import {Router} from 'express'
import {productControler} from '../cores'

const router = Router()

router.get('/products', async (req, res) => {
  let language = req.query.language
  try {
    let all = await productControler.getAll(language)
    res.json(all)
  } catch (e) {
    res.status(500).send('Internal Server Error')
  }
})

router.get('/searchProduct', async (req, res) => {
  let language = req.query.language
  let name = req.query.name
  try {
    let all = await productControler.searchProduct(language, name)
    res.json(all)
  } catch (e) {
    res.status(500).send('Internal Server Error')
  }
})

router.post('/newProduct', async (req, res) => {
  try {
    let all = await productControler.newProduct(req.body)
    res.json(all)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/products/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    let all = await productControler.getById(req.params.id)
    res.json(all)
  } catch (e) {
    res.status(500).send('Internal Server Error')
  }
})

router.patch('/product', async (req, res) => {
  try {
    let all = await productControler.updateProduct(req.body)
    res.json(all)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})



export default router