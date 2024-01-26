describe('Blog app', function() {
  let user
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')

      cy.get('html').should('not.contain', `${user.name} logged in`)
    })

    it('succeeds with correct password', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.get('html').should('contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function() {
    const blog1 = {
      title: 'cypress blog title 1',
      author: 'cypress blog author 1',
      url: 'cypress blog url 1'
    }
    const blog2 = {
      title: 'no_delete_title',
      author: 'no_delete_auth',
      url: 'no_delete_url'
    }
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type(blog1.title)
      cy.get('#blog-author').type(blog1.author)
      cy.get('#blog-url').type(blog1.url)
      cy.contains('create').click()

      cy.get('html').should('contain', `${blog1.title} ${blog1.author}`)
    })

    it('A blog can be liked', function() {
      cy.createBlog({ blog: blog1 })
      cy.get('html').should('contain', `${blog1.title} ${blog1.author}`)
      cy.contains(blog1.title).find('button').click()
      cy.contains(blog1.title).parent().contains('like').click()
      cy.contains(blog1.title).parent().contains('likes: 1')
    })

    it('A blog can be deleted by the creator', function() {
      cy.createBlog({ blog: blog1 })
      cy.get('html').should('contain', `${blog1.title} ${blog1.author}`)
      cy.contains(blog1.title).find('button').click()
      cy.contains(blog1.title).parent().contains('Delete').click()
      cy.get('html').should('not.contain', `${blog1.title} ${blog1.author}`)
    })

    it('Blog cannot be deleted by other user', function() {
      const user2 = {
        name: 'nefarious user',
        username: 'foo',
        password: 'bar'
      }

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: user2.username, password: user2.password
      }).then(({ body }) => {
        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs`,
          method: 'POST',
          body: { ...blog2 },
          headers: {
            'Authorization': `Bearer ${body.token}`
          }
        })
      })
      cy.visit('')

      cy.get('html').should('contain', `${blog2.title} ${blog2.author}`)
      cy.contains(blog2.title).find('button').click()
      cy.on('window:confirm', (str) => {
        expect(str).to.eq(`Are you sure you want to delete ${blog2.title} by ${blog2.author}?`)
      })
      cy.contains(blog2.title).parent().contains('Delete').click()

      cy.get('html').should('contain', `${blog2.title} ${blog2.author}`)
    })

    it.only('Blogs sorted by most likes', function() {
      cy.createBlog({ blog: blog1 })
      cy.get('html').should('contain', `${blog1.title} ${blog1.author}`)
      cy.createBlog({ blog: blog2 })
      cy.get('html').should('contain', `${blog2.title} ${blog2.author}`)

      cy.contains(blog2.title).find('button').click()
      cy.contains(blog2.title).parent().contains('like').click()
      cy.contains(blog2.title).parent().contains('likes: 1')

      cy.get('.blog').eq(1).should('contain', `${blog1.title} ${blog1.author}`)
      cy.get('.blog').eq(0).should('contain', `${blog2.title} ${blog2.author}`)

      cy.contains(blog1.title).find('button').click()
      cy.contains(blog1.title).parent().contains('like').click()
      cy.contains(blog1.title).parent().contains('likes: 1')
      cy.contains(blog1.title).parent().contains('like').click()
      cy.contains(blog1.title).parent().contains('likes: 2')

      cy.get('.blog').eq(0).should('contain', `${blog1.title} ${blog1.author}`)
      cy.get('.blog').eq(1).should('contain', `${blog2.title} ${blog2.author}`)
    })
  })

})