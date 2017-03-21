import 'angular2-universal-polyfills';
import * as gulp from 'gulp';
import { Prerender } from 'angular2-gulp-prerender';
import { AppModule } from './src/app/app.module';

gulp.task('prerender', () => {
    return gulp.src(['./src/index.html'])
      .pipe(Prerender(<any>{ App: AppModule }))
      .pipe(gulp.dest('dist'));
});
