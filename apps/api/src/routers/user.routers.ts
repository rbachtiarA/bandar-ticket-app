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
        //this.router.get('/', verifyToken, checkAdmin, this.userController.getUser)
        this.router.get('/', this.userController.getUser)
        this.router.post('/', validateRegister, this.userController.registerUser)
        this.router.post('/login', this.userController.login)
        this.router.post('/name/:id', verifyToken, this.userController.updateName)
        this.router.post('/password/:id', verifyToken, this.userController.updatePassword)
        this.router.post('/organizer/:id', verifyToken, this.userController.becomeOrganizer)
        this.router.post('/email/:id', verifyToken, this.userController.updateEmail)
        this.router.delete('/:id', this.userController.deleteUser)
        this.router.post('/check-email', this.userController.checkEmail)
        this.router.post('/avatar', 
            verifyToken, 
            uploader("avatar", "/avatar").single('avatar'), 
            this.userController.updateAvatar
        )
        this.router.get('/verify/:token', verifyToken, this.userController.verifyEmail)
        this.router.post('/logout', verifyToken, this.userController.logout)
        this.router.get('/get-user', verifyToken, this.userController.getUserById)
        
    }

    getRouter(): Router {
        return this.router
    }
}