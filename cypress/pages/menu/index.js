class Menu {
  menus = {
    PRODUTOS: 'Products',
  }

  irParaProdutos() {
    cy.contains('Products').click();
  }

  irParaLoginCadastro() {
    cy.contains('Signup').click();
  }

  irParaContato() {
    cy.contains('Contact us').click();
  }

  verificarProduto(nomeProduto) {
    this.irParaProdutos();
    this.verificarPaginaProdutos();
    cy.get('input#search_product').type(nomeProduto);
    cy.get('button#submit_search').click();
  }

  verificarPaginaProdutos() {
    cy.url().should('contain', 'products');
    cy.get('.title').should('be.visible').and('contain', 'All Products');
  }

  visualizarDetalhesPrimeiroProduto() {
    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.least', 1)
      .first()
      .parent()
      .contains('View Product')
      .click();
  }

  verificarDetalhesProduto() {
    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information p').should('be.visible').and('have.length', 4);
    cy.get('.product-information span span').should('be.visible');
  }

  pesquisarProduto(produto) {
    cy.get('input#search_product').type(produto);
    cy.get('button#submit_search').click();
  }

  verificarProdutoPesquisado() {
    cy.contains("Searched Products").should("be.visible");
    cy.get('.single-products').should('be.visible').and('have.length.least', 3);
  }

  iniciarAssinatura(email) {
    cy.get('input#susbscribe_email').scrollIntoView().type(email);
    cy.get('button#subscribe').click();
  }

  irPara(menu) {
    cy.contains(menu).click();
  }
}

export default new Menu();