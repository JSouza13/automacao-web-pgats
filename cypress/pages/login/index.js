class Login {
  preencherLogin(email, password) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });

    cy.get('[data-qa="login-button"]').click();
  }

}

export default new Login();