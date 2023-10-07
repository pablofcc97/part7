
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ name: 'pepe', username: 'pepe', password: 'abcd' })
    cy.visit('')
    
  })

  it('Login form is shown', function() {
    // ...
    cy.get('.form--login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('.loginInput--username').type('pepe')
      cy.get('.loginInput--password').type('abcd')
      cy.get('.loginInput--submit').click()

      cy.contains('pepe logged In')
    })

    it('fails with wrong credentials', function() {
      // ...
      cy.get('.loginInput--username').type('pipo')
      cy.get('.loginInput--password').type('xyz')
      cy.get('.loginInput--submit').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pepe', password: 'abcd' })
    })

    it('A blog can be created', function() {
      // ...
      cy.contains('New blog').click()
      cy.get('.blogInput--title').type('blog test')
      cy.get('.blogInput--author').type('author test')
      cy.get('.blogInput--url').type('url test')
      cy.get('.blogInput--submit').click()

      cy.contains('blog test')
    })
  })

 describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'pepe', password: 'abcd' })
      cy.createBlog({title:'blog test', author:'author test', url:'www.test.com'})
    })

    it('an user can like a blog', function() {
      // ...
      cy.get('.blog').get('.button--view').click()
      cy.get('.blog').get('.button--like').click()
      cy.contains('1')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'pepe', password: 'abcd' })
      cy.createBlog({title:'blog test', author:'author test', url:'www.test.com'})
    })

    it('an user can delete a blog created by him', function() {
      // ...
      cy.get('.blog').get('.button--view').click()
      cy.get('.blog').get('.button--remove').click()
      cy.get('.blog').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.createUser({ name: 'juan', username: 'juan', password: 'abcd' })
      cy.login({ username: 'pepe', password: 'abcd' })
      cy.createBlog({title:'blog test', author:'author test', url:'www.test.com'})
    })

    it('an user cant delete a blog created by other user', function() {
      // ...
      cy.get('.blog').get('.button--logout').click()
      cy.login({ username: 'juan', password: 'abcd' })
      cy.get('.blog').get('.button--view').click()
      cy.get('.blog').get('.button--remove').click()
      cy.get('.blog').should('exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'pepe', password: 'abcd' })
      cy.createBlog({title:'A title with no likes', author:'author test', url:'www.test.com/2'})
      cy.createBlog({title:'The title with the second most likes', author:'author test', url:'www.test.com/0'})
      cy.createBlog({title:'The title with the most likes', author:'author test', url:'www.test.com/1'})
      cy.createBlog({title:'A title with no likes', author:'author test', url:'www.test.com/3'})
    })

    it('an user cant delete a blog created by other user', function() {
      // ...
      cy.contains('The title with the most likes').parent().contains('View').click()
      cy.contains('The title with the most likes').parent().contains('Like').as('mostLikedBlogButton')
      cy.get('@mostLikedBlogButton').click()
      cy.wait(1000)
      cy.get('@mostLikedBlogButton').click()
      cy.wait(1000)

      cy.contains('The title with the second most likes').parent().contains('View').click()
      cy.contains('The title with the second most likes').parent().contains('Like').as('secondMostLikedBlogButton')
      cy.wait(1000)
      cy.get('@secondMostLikedBlogButton').click()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})