import {Router} from 'express'
import {params} from '../config'

const router = Router()

router.get('/supportedLanguage', async (req, res) => {
  res.json(params.languages)
})

export default router