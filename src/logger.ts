import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware (req: Request, res: Response, next: NextFunction) {
   console.log(`${req.method} ${req.path}:\nQuery: ${key(req.query)}\nParams: ${key(req.params)}\nBody : ${key(req.body)}\n`);
    next();
}
function key(obj): string {
    if (!obj) return
    // return '{\n' + Object.entries(obj).map(([k, v]) => k && v ? '  '+k + ' : ' + v:'').join('\n') + '\n}'
    return '{\n' + Object.entries(obj).map(([k, v]) => v && k && '  '+k + ' : ' + v).join('\n') + '\n}'
}
