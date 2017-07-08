import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ITestimonial, ITestimonialsPage } from '../models/testimonial';
import { Observable } from 'rxjs/Observable';
import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';

export interface ITestimonialsResolver {
  testimonials: ITestimonial[];
  page: ITestimonialsPage;
}

@Injectable()
export class TestimonialsResolver implements Resolve<ITestimonialsResolver> {
  client: ContentfulClientApi | undefined;

  resolve() {
    if (!this.client) {
      this.client = createClient({
        space: '5mbfpmb4htof',
        accessToken: '0f5d010917436ccc53537cbdec9fac2c4dd31d182f9a84c4caa2402d432bfa71'
      });
    }

    return Observable.combineLatest(
      this.getTestimonials(),
      this.getPageText()
    )
      .map(([testimonials, page]) => {
        return { testimonials, page };
      })
  }

  getPageText() {
    return Observable.fromPromise(
      this.client.getEntries({ content_type: 'pageTestimonials' }) as Promise<EntryCollection<ITestimonialsPage>>
    )
      .map(x => x.items[0].fields);
  }

  getTestimonials() {
    return Observable.fromPromise(
      this.client.getEntries({ content_type: 'wwwNodrainerCom' }) as Promise<EntryCollection<ITestimonial>>
    )
      .map(x => x.items.map(e => e.fields).map(t => {
        return Object.assign({}, t, {
          body: t.body
            .split('\n')
            .map(p => `<p>${p}</p>`)
            .join('')
        })
      }));
  }
}

