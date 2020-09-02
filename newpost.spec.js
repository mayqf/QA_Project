describe('Realworld New Post Scenarios Testing with Cypress', () => {
    beforeEach(() => {
        cy.visit('/')
        //cy.contains('Sign in').click()
      });

      it('Check only logged in users can create article', () => {
        cy.get('.navbar.navbar-light').contains('New Post').should('not.visible');
        
    });

    it('Check the title is only mandatory', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()
        cy.get('button[type="button"]').click().click()
        cy.get('.error-messages').should('contain', "title can't be blankis too short (minimum is 1 character)")
        cy.get('.error-messages').not().should('contain', "body can't be blank")
        cy.get('.error-messages').not().should('contain', "description can't be blankis too short (minimum is 1 character)")
        
        
    });

    it('Check no limits for characters for any of the fields', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()

        cy.get('.form-group').eq(0).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(1).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(2).should('not.have.attr', 'maxlength')
        cy.get('.form-group').eq(3).should('not.have.attr', 'maxlength')
        
    });

    
    it('Check Tags that does not exist are created automatically', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()
    
       
        cy.get('.form-group').eq(0).type('My title')
        cy.get('.form-group').eq(1).type('About testing')
        cy.get('.form-group').eq(2).type('This post is **important**.')
    
        cy.get('.form-group').eq(3).type('my tag')
        cy.get('button[type="button"]').click()
        
    
        // check that each tag is displayed after post is shown
        cy.url().should('include', '/article/my-title')
        cy.get('.tag-list').contains('tag')
        //cy.contains('.tag-list', 'tag')
      })

     
      it('Check Only Only text is allowed ', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()

        cy.get('.form-group').eq(0).type('$>?`~}{,%*-')
        cy.get('.form-group').eq(1).type('$>?`~}{,%*-')
        cy.get('.form-group').eq(2).type('$>?`~}{,%*-')
    
        cy.get('.form-group').eq(3).type('$>?`~}{,%*-')
        cy.get('button[type="button"]').click()
        cy.get('button[type="submit"]').should('contain', 'Post Comment')
    
    
      })

      it('Check the Success message after pusblishing article with title and directed to home page', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()
    
       
        cy.get('.form-group').eq(0).type('My title')
        cy.get('.form-group').eq(1).type('About success message testing')
        cy.get('.form-group').eq(2).type('This post is for message/home page testing')
    
        cy.get('.form-group').eq(3).type('my tag')
        cy.get('button[type="button"]').click()
        
    
        cy.url().should('eq', 'https://react-redux.realworld.io/#/?_k=lntp9x') 
        
    });

    it('Check no draft saved and all changes are lost if user navigates away from the article before publishing.', () => {
        cy.get('.navbar.navbar-light').contains('Sign in').click()
        cy.get('[type="email"]').clear().type('hyf_tester@gmail.com')
        cy.get('[type="password"]').clear().type('HYFtester1')
        cy.get('button[type="submit"]').click()
        cy.get('.navbar.navbar-light').contains('New Post').click()
    
        
        cy.get('.form-group').eq(0).type('Unsuccessful Submit Article title')
        cy.get('.form-group').eq(1).type('Unsuccessful Article submit')
        cy.get('.navbar.navbar-light').contains('Home').click()
        cy.get('.navbar.navbar-light').contains('hyftester').click()
        cy.get('.article-preview').should('not.contain', "Unsuccessful Submit Article title")
        
    });

});