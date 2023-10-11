import { Router } from 'express'
import PostController from '../controllers/PostController'
import { AccessMiddleware } from '../middlewares/AccessMiddleware'
import { Role } from '@prisma/client'

const router = Router()

router.post('/', AccessMiddleware([Role.Moderator, Role.Admin]), PostController.create)
router.delete('/', AccessMiddleware([Role.Admin]), PostController.find, PostController.delete)
router.patch('/', AccessMiddleware([Role.Admin]), PostController.find, PostController.update)
router.get('/all', AccessMiddleware(), PostController.getMany)

export default router
