import express from 'express'
import { changePassword, findAccountByUserName, login, logout, signup } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.get('/', findAccountByUserName)

router.post('/change-password', changePassword)

export default router