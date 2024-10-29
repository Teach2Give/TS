// express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // You can specify a more precise type here based on your user object
        }
    }
}
