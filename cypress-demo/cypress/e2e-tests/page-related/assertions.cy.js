import { AssertionsPage } from '../../page-object-model/index.js';

describe('Assertions with Page Objects', () => {
  let assertionsPage = new AssertionsPage();

  beforeEach(() => {
    assertionsPage = new AssertionsPage();
    assertionsPage.visitAssertionsPage();
  });

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      assertionsPage.getLastTableRow()
        .should('have.class', 'success');
      assertionsPage.getFirstCellOfLastRow()
        .should('have.text', 'Column content')
        .should('contain', 'Column content')
        .should('have.html', 'Column content')
        .should('match', 'td');
      assertionsPage.getFirstCellOfLastRow()
        .invoke('text')
        .should('match', /column content/i);
      assertionsPage.getAssertionTable()
        .find('tbody tr:last')
        .contains('td', /column content/i)
        .should('be.visible');

      // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element's-text-contents
    });

    it('.and() - chain multiple assertions together', () => {
      // https://on.cypress.io/and
      assertionsPage.getAssertionsLink()
        .should('have.class', 'active')
        .and('have.attr', 'href')
        .and('include', 'cypress.io');
    });
  });

  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    it('expect - make an assertion about a specified subject', () => {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true;
      const o = { foo: 'bar' };

      expect(o).to.equal(o);
      expect(o).to.deep.equal({ foo: 'bar' });
      // matching text using regular expression
      expect('FooBar').to.match(/bar$/i);
    });

    it('pass your own callback function to should()', () => {
      // Pass a function to should that can have any number
      // of explicit assertions within it.
      // The ".should(cb)" function will be retried
      // automatically until it passes all your explicit assertions or times out.
      assertionsPage.getAssertionsParagraph()
        .find('p')
        .should(($p) => {
          const texts = $p.map((i, el) => Cypress.$(el).text());
          const paragraphs = texts.get();

          expect(paragraphs, 'has 3 paragraphs').to.have.length(3);
          expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
            'Some text from first p',
            'More text from second p',
            'And even more text from third p',
          ]);
        });
    });

    it('finds element by class name regex', () => {
      assertionsPage.getDocsHeader()
        .find('div')
        .should(($div) => {
          expect($div).to.have.length(1);
          const className = $div[0].className;
          expect(className).to.match(/heading-/);
        })
        .then(($div) => {
          expect($div, 'text content').to.have.text('Introduction');
        });
    });

    it('can throw any error', () => {
      assertionsPage.getDocsHeader()
        .find('div')
        .should(($div) => {
          if ($div.length !== 1) {
            throw new Error('Did not find 1 element');
          }

          const className = $div[0].className;
          if (!className.match(/heading-/)) {
            throw new Error(`Could not find class "heading-" in ${className}`);
          }
        });
    });

    it('matches unknown text between two elements', () => {
      let text;
      const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();

      assertionsPage.getFirstElement()
        .then(($first) => {
          text = normalizeText($first.text());
        });

      assertionsPage.getSecondElement()
        .should(($div) => {
          const secondText = normalizeText($div.text());
          expect(secondText, 'second text').to.equal(text);
        });;
    });

    it('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20,
      };

      assert.isObject(person, 'value is object');
    });

    it('retries the should callback until assertions pass', () => {
      assertionsPage.getRandomNumberElement()
        .should(($div) => {
          const n = parseFloat($div.text());
          expect(n).to.be.gte(1).and.be.lte(10);
          expect(n).to.be.within(1, 10);
        });
    });
  });
});