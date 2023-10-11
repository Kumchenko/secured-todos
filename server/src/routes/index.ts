import { Router } from 'express'
import userRouter from './user'
import postRouter from './post'

const router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)

export default router
