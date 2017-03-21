import { browser, element, by } from 'protractor';

export class NoDrainerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('nd-root h1')).getText();
  }
}
