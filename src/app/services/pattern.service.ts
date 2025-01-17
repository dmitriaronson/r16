import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Step } from '../models/step.model';
import { Channel } from '../models/channel.model';
import { IStep } from '../interfaces/pattern';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class PatternService {
  private token: string;
  private url = '/pattern';

  static createSeq(channelId = 0, bars = 16): IStep[] {
    const seq = [];

    for (let index = 0; index < bars; index += 1) {
      seq.push(new Step(index, channelId));
    }

    return seq;
  }

  constructor(
    private http: Http,
  ) {}

  public getPatterns() {
    return this.request('GET', '');
  }

  public getPattern(id: string = window.location.pathname.substr(1)) {
    return Observable.if(
      () => id.length !== 0,
      this.request('GET', id),
      Observable.of({
        tempo: 120,
        channels: [new Channel()],
      })
    );
  }

  public post(body) {
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
