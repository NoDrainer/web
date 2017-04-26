import * as gulp from 'gulp';
import {
  ApplicationBuilderFromModule,
  ApplicationPrerenderer,
  HtmlOutput,
} from 'angular-ssr';

import { join } from 'path';
import { AppModule } from '../src/app/app.module';

gulp.task('default', (done) => {
  const dist = join(process.cwd(), 'dist');
  const builder = new ApplicationBuilderFromModule(AppModule, join(dist, 'index.html'));
  const application = builder.build();
  const html = new HtmlOutput(dist);
  const renderer = new ApplicationPrerenderer(application);

  renderer.prerenderTo(html)
    .then(() => { done(); })  
    .catch(exception => {
      console.error('Failed to render due to uncaught exception', exception);
      done();
    });
});
