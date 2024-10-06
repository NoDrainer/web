import { Injectable } from '@angular/core';
import type {
  ContentfulClientApi,
  EntryCollection,
  EntrySkeletonType,
  FieldsType,
} from 'contentful';
import { from, map, ReplaySubject, share } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  ITestimonialDto,
  ITestimonialVm,
} from '../../testimonials/testimonials.model';

let _client: ContentfulClientApi<undefined> | undefined = undefined;

async function getClient() {
  const { createClient } = await import('contentful');

  if (!_client) {
    _client = createClient({
      space: environment.contentfulSpace,
      accessToken: environment.contentfulAccessToken,
    });
  }
  return _client;
}

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  testimonials$ = from(getEntries<ITestimonialDto>('wwwNodrainerCom')).pipe(
    map(mapContentfulEntriesToTestimonials),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
      resetOnError: false,
      resetOnRefCountZero: false,
    })
  );
}

async function getEntries<T extends FieldsType>(
  content_type: 'wwwNodrainerCom'
) {
  const client = await getClient();
  const query = { content_type };
  const entries = await client.getEntries<EntrySkeletonType<T>>(query);
  return entries;
}

function mapContentfulEntriesToTestimonials(
  entries: EntryCollection<
    EntrySkeletonType<ITestimonialDto>,
    undefined,
    string
  >
): ITestimonialVm[] {
  return entries.items
    .map((e) => e.fields)
    .map(({ fullName, location, body }) => {
      return {
        fullName,
        location,
        bodyParagraphs: body.split('\n'),
      };
    });
}
