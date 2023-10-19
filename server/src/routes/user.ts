import { Router } from 'express'
import UserController from '../controllers/UserController'
import { AccessMiddleware } from '../middlewares/AccessMiddleware'
import { Role } from '@prisma/client'

const router = Router()

router.get('/identify', UserController.identify)
router.post('/login', UserController.authenticate, UserController.authorize)
router.patch('/activate', UserController.activate, UserController.authorize)

router.get('/me', AccessMiddleware(), UserController.getMe)
router.get('/refresh', UserController.refresh, UserController.authorize)
router.patch('/change', AccessMiddleware(), UserController.changePass, UserController.authorize)
router.post('/registration', AccessMiddleware([Role.Admin]), UserController.registration)
router.patch('/block', AccessMiddleware([Role.Admin]), UserController.block)
router.patch('/unblock', AccessMiddleware([Role.Admin]), UserController.unblock)
router.patch('/restrict', AccessMiddleware([Role.Admin]), UserController.restrict)

router.get('/all', AccessMiddleware([Role.Admin]), UserController.getMany)

router.get('/logout', UserController.logout)

export default router
