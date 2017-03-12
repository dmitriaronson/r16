import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  private token: string;
  private url = 'http://localhost:4200/pattern';

  constructor(
    private http: Http,
  ) {}

  get(id) {
    return this.request('GET', id);
  }

  post(body) {
    return this.request('POST', '', body);
  }

  private request(method, id, body?) {
    const options = new RequestOptions({ method });

    if (body) {
      options.body = body;
    }

    return this.http.request(`${this.url}/${id}`, options)
      .map(this.body)
      .catch(this.handleError);
  }

  private body(res: Response) {
    const body = res.json();
    return body.data || null;
  }

  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.error || JSON.stringify(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

}
