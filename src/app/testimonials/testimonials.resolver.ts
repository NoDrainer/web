import { ResolveData } from '@angular/router';
import {
  ContentfulClientApi,
  createClient,
  EntrySkeletonType,
} from 'contentful';
import { ITestimonial, ITestimonialsPage } from './testimonials.model';

let client: ContentfulClientApi<undefined> | undefined = undefined;

function getClient() {
  if (!client) {
    client = createClient({
      space: '5mbfpmb4htof',
      accessToken:
        '0f5d010917436ccc53537cbdec9fac2c4dd31d182f9a84c4caa2402d432bfa71',
    });
  }
  return client;
}

export const testimonialsResolver: ResolveData = {
  testimonials: () => {
    return getClient()
      .getEntries<EntrySkeletonType<ITestimonial>>({
        content_type: 'wwwNodrainerCom',
      })
      .then((x) =>
        x.items
          .map((e) => e.fields)
          .map((t) =>
            Object.assign({}, t, {
              body: t.body
                .split('\n')
                .map((p) => `<p>${p}</p>`)
                .join(''),
            })
          )
      );
  },
  page: () => {
    return getClient()
      .getEntries<EntrySkeletonType<ITestimonialsPage>>({
        content_type: 'wwwNodrainerCom',
      })
      .then((x) => x.items[0].fields);
  },
};
