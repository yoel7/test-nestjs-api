import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware (req: Request, res: Response, next: NextFunction) {
   console.log(`${req.method} ${req.path}:\nQuery: ${key(req.query)}\nParams: ${key(req.params)}\nBody : ${key(req.body)}\n\n`);
    next();
}
function key(obj): string {
    return '{\n' + Object.keys(obj).map(k => '  '+k + ' : ' + obj[k]).join('\n') + '\n}'
}
