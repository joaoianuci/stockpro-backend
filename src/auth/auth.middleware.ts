import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // check if the user have access token from google
    // if not, redirect to google login page

    const accessToken = req.session?.accessToken || req.cookies?.accessToken || null;
    if (!accessToken) {
      // throw new Error('Unauthorized');
    }
    next();
  }
}
