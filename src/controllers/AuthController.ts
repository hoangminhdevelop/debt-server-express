import { User } from '@/entities/User'
import { AuthRepository, authRepository } from '@/repositories'

class AuthController {
  constructor(private authRepo: AuthRepository) {}

  async register(req: Request, res: Response) {
    console.log('req :>> ', req.body)
  }
}

const authController = new AuthController(authRepository)
