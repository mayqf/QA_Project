describe('Realworld New Post Scenarios Testing with Cypress', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.navbar.navbar-light').contains('Sign in').should('be.visible').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()
      });

  

      it('Check only the title is mandatory for form field', () => {
        cy.get('button[type="button"]').click().click()
        cy.get('.error-messages').should('contain', "title can't be blankis too short (minimum is 1 character)")
        cy.get('.error-messages').should('not.contain', "body can't be blank")
        cy.get('.error-messages').should('not.contain', "description can't be blankis too short (minimum is 1 character)")
    });

    it('Check no limits for characters for any of the fields', () => {
        cy.get('.form-group').eq(0).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(1).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(2).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(3).should('not.have.attr', 'maxlength')
    });

    it('Check only logged in users can create article', () => {
        cy.get('.navbar.navbar-light').contains('New Post').should('exist');
        cy.get('.navbar.navbar-light').contains('Settings').click();
        cy.get('button').contains("Or click here to logout.").click();
        cy.get('.navbar.navbar-light').contains('New Post').should('not.exist');
    });

    
    it('Check Tags that do not exist are created automatically', () => {
        cy.get('nav a').last() .click()
        cy.get('.tag-list').should('not.contain', 'my tag')
        cy.get('.navbar.navbar-light').contains('New Post').click();
        cy.get('.form-group').eq(0).type('My title')
        cy.get('.form-group').eq(1).type('About testing')
        cy.get('.form-group').eq(2).type('This post is **important**.')
        cy.get('.form-group').eq(3).type('my tag')
        cy.get('button[type="button"]').click()
        cy.get('.tag-list').contains('my tag').should('exist');
      })

     
      it('Check Only text is allowed ', () => {
        cy.get('.form-group').eq(0).should('have.attr','type','text');
        cy.get('.form-group').eq(1).should('have.attr','type','text');
        cy.get('.form-group').eq(2).should('have.attr','type','text');
        cy.get('.form-group').eq(3).should('have.attr','type','text');
    
      })

      it('Check the Success message after pusblishing article with title and directed to home page', () => {
        cy.get('.form-group').eq(0).type('My title')
        cy.get('.form-group').eq(1).type('About success message testing')
        cy.get('.form-group').eq(2).type('This post is for message/home page testing')
        cy.get('.form-group').eq(3).type('my tag')
        cy.get('button[type="button"]').click()
        cy.url().should('eq', 'https://react-redux.realworld.io/#/?_k=lntp9x') 
        
    });

    it('Check no draft saved and all changes are lost if user navigates away from the article before publishing.', () => {
        cy.get('.form-group').eq(0).type('Unsuccessful Submit Article title')
        cy.get('nav a').last() .click()
        cy.get('.article-preview').should('not.contain', "Unsuccessful Submit Article title")
        
    });

});