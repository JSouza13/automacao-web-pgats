class Cadastro {
  preencherFormulario(userData) {
    this.iniciarCadastro(userData.firstName, userData.email);
    this.preencherDadosPessoais(userData);
    this.preencherEndereco(userData);
    this.marcarBoletins();
    this.confirmarCadastro();
  }

  iniciarCadastro(firstName, email) {
    cy.get('[data-qa="signup-name"]').type(firstName);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.contains('button', 'Signup').click();
  }

  preencherDadosPessoais(userData) {
    cy.get('input[type="radio"]').check('Mrs');
    cy.get('[data-qa="password"]').type(userData.password, { log: false });
    cy.get('[data-qa="days"]').select('5');
    cy.get('[data-qa="months"]').select('November');
    cy.get('[data-qa="years"]').select('1993');
  }

  preencherEndereco(userData) {
    cy.get('[data-qa="first_name"]').type(userData.firstName);
    cy.get('[data-qa="last_name"]').type(userData.lastName);
    cy.get('[data-qa="company"]').type(userData.company);
    cy.get('[data-qa="address"]').type(userData.address);
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(userData.state);
    cy.get('[data-qa="city"]').type(userData.city);
    cy.get('[data-qa="zipcode"]').type(userData.zipCode);
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber);
  }

  marcarBoletins() {
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
  }

  confirmarCadastro() {
    cy.get('[data-qa="create-account"]').click();
    cy.url().should('include', 'account_created');
    cy.get('[data-qa="account-created"]').should('contain.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
  }

  adicionarAoCarrinho() {
    cy.contains("Add to cart").click();
    cy.contains("View Cart").click();
  }

  finalizarCompra(userData) {
    cy.get('.btn-default.check_out').should('be.visible').click();
    cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details');
    cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order');
    cy.get('.form-control').type(userData.mobileNumber);
    cy.get('.btn-default.check_out').click();
  }

  preencherFormularioContato(userData, mensagem, arquivo) {
    cy.get('[data-qa="name"]').type(userData.firstName);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="message"]').type(mensagem);
    cy.get('[name="upload_file"]').selectFile(arquivo);
    cy.get('[data-qa="submit-button"]').click();
  }

  realizarPagamento(userData) {
    cy.get('[data-qa="name-on-card"]').type(`${userData.firstName} ${userData.lastName}`);
    cy.get('[data-qa="card-number"]').type(userData.creditCardNumber);
    cy.get('[data-qa="cvc"]').type(userData.creditCardCVV);
    cy.get('[data-qa="expiry-month"]').type(12);
    cy.get('[data-qa="expiry-year"]').type(2035);
    cy.get('[data-qa="pay-button"]').click();
  }

  verificarPedidoRealizado() {
    cy.get('[data-qa="order-placed"]').should('be.visible');
  }

  deletarConta() {
    cy.get('[href*="delete"]').click();
    cy.get('b').should('contain', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
  }

  verificarPaginaDeContato() {
    cy.contains("Get In Touch").should("be.visible");
  }
}

export default new Cadastro();