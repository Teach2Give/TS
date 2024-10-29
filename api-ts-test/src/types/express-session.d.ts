// src/@types/express-session.d.ts
import { Session } from 'express-session';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            session?: Session; // or Session | undefined
        }
    }
}
