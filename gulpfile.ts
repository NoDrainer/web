import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as gulp from 'gulp';
import { ngExpressEngine, RenderOptions } from '@nguniversal/express-engine';
import { AppServerModule } from './src/app/app.server';

import { join } from 'path';
import { AppModule } from './src/app/app.module';

gulp.task('default', (done) => {
  const dist = join(process.cwd(), 'dist');
  prerender(done);
});

export function prerender(done?) {
  let renderer = ngExpressEngine({
    bootstrap: AppServerModule
  });

  let opts: RenderOptions = {
    req: { originalUrl: '/' },
    bootstrap: AppServerModule
  };
  
  renderer(join(process.cwd(), 'src', 'index.html'), opts, (err, html) => {
    console.log(err ? err : html);
    if(done) done();
  });
}
