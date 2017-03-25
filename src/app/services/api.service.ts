import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/rx';

import { PatternService } from './pattern.service';
import { Channel } from '../models/channel.model';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  private token: string;
  private url = '/pattern';

  constructor(
    private http: Http,
    private patternService: PatternService,
  ) {}

  getPatterns() {
    return this.request('GET', '');
  }

  get(id) {
    return Observable.if(
      () => id.length !== 0,
      this.request('GET', id),
      Rx.Observable.of({
        tempo: 120,
        channels: [new Channel()],
      })
    );
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
