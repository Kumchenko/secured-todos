import { Request } from 'express'

export const getActionString = (req: Request) => `${req.method} ${req.originalUrl}`
