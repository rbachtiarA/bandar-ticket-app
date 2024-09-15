import { UserController } from "@/controllers/user.controller"
import { checkAdmin, verifyToken } from "@/middlewares/token"
import { uploader } from "@/middlewares/uploader"
import { validateRegister } from "@/middlewares/validator"
import { Router } from "express"

export class UserRouter{
    private router: Router
    private userController: UserController

    constructor(){
        this.userController = new UserController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', verifyToken, checkAdmin, this.userController.getUser)
        //this.router.get('/', this.userController.getUser)
        this.router.post('/', validateRegister, this.userController.registerUser)
        this.router.post('/login', this.userController.login)
        this.router.patch('/:id', this.userController.updateUser)
        this.router.delete('/:id', this.userController.deleteUser)
        this.router.post('/check-email', this.userController.checkEmail)
        this.router.post('/avatar', 
            verifyToken, 
            uploader("avatar", "/avatar").single('avatar'), 
            this.userController.editAvatar
        )
        this.router.patch('/verify', verifyToken, this.userController.verifyEmail)
        this.router.post('/logout', verifyToken, this.userController.logout)
    }

    getRouter(): Router {
        return this.router
    }
}