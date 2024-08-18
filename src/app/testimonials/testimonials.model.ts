import type { EntryFieldTypes } from 'contentful';

export interface ITestimonial {
  fullName: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  body: EntryFieldTypes.Text;
}

export interface ITestimonialsPage {
  galonsSaved: EntryFieldTypes.Text;
}
