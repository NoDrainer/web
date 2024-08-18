import { ResolveData } from '@angular/router';
import { ContentfulClientApi, EntrySkeletonType } from 'contentful';

import { ITestimonial, ITestimonialsPage } from './testimonials.model';

let _client: ContentfulClientApi<undefined> | undefined = undefined;

async function getClient() {
  const { createClient } = await import('contentful');

  if (!_client) {
    _client = createClient({
      space: '5mbfpmb4htof',
      accessToken:
        '0f5d010917436ccc53537cbdec9fac2c4dd31d182f9a84c4caa2402d432bfa71',
    });
  }
  return _client;
}

export const testimonialsResolver: ResolveData = {
  testimonials: async () => {
    const client = await getClient();
    const entries = await client.getEntries<EntrySkeletonType<ITestimonial>>({
      content_type: 'wwwNodrainerCom',
    });
    return entries.items
      .map((e) => e.fields)
      .map((t) =>
        Object.assign({}, t, {
          body: t.body
            .split('\n')
            .map((p) => `<p>${p}</p>`)
            .join(''),
        })
      );
  },
  page: async () => {
    const client = await getClient();
    const entries = await client.getEntries<
      EntrySkeletonType<ITestimonialsPage>
    >({
      content_type: 'wwwNodrainerCom',
    });
    return entries.items[0].fields;
  },
};
