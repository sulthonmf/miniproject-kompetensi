describe('Products Page', () => {
    it('should render product cards', () => {
      cy.visit('http://localhost:3000') // Replace '/products' with the actual URL of your ProductsPage
  
      // Check if product cards are rendered
      cy.get('.grid-cols-1 .ProductCard').should('have.length.greaterThan', 0)
    })
  
    // Add more tests as needed
  })
  