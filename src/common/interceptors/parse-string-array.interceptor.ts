import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ParseStringArrayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request:Request = context.switchToHttp().getRequest();
    console.log("body",request.body);
    
    if (request.body && request.body.problems) {
      try {
        const parsed = JSON.parse(request.body.problems);
        request.body.problems = Array.isArray(parsed) ? parsed : [];
      } catch {
        request.body.problems = [];
      }
    }

    return next.handle(); 
  }
}