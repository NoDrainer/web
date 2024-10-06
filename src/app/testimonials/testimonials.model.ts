import type { EntryFieldTypes } from 'contentful';

export interface ITestimonialDto {
  fullName: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  body: EntryFieldTypes.Text;
}

export interface ITestimonialVm {
  fullName: string;
  location: string;
  bodyParagraphs: string[];
}

export interface ITestimonialsPage {
  galonsSaved: EntryFieldTypes.Text;
}
