import { C3Page } from './app.po';

describe('c3 App', function() {
  let page: C3Page;

  beforeEach(() => {
    page = new C3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
