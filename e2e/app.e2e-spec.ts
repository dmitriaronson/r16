import { Random16Page } from './app.po';

describe('random16 App', function() {
  let page: Random16Page;

  beforeEach(() => {
    page = new Random16Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
