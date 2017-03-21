import { NoDrainerPage } from './app.po';

describe('no-drainer App', () => {
  let page: NoDrainerPage;

  beforeEach(() => {
    page = new NoDrainerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('nd works!');
  });
});
