import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { encodeParams } from '@Shared/helpers/replace-uri';

import { HttpParameterCodec } from '@angular/common/http';
export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
@Injectable()
export class HttpEncodeParamsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const request = req;

    if (req.params['map']) {
      const paramsRequest: Map<string, Array<any>> = req.params['map'];
      let paramsEncode: { [key: string]: string | string[] } = {};

      paramsRequest.forEach((values, key) => {
        paramsEncode[key] = values;
      });

      const requestEncode = req.clone({
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: paramsEncode,
        }),
      });

      return next.handle(requestEncode);
    }

    return next.handle(request);
  }
}
