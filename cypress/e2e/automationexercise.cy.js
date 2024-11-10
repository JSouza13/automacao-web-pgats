import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import { gerarPessoa } from '../fixtures/pesssoa';

const MESSAGES = {
  subscriptionSuccess: 'You have been successfully subscribed!',
  emailExists: 'Email Address already exist!',
  loginError: 'Your email or password is incorrect',
};

describe('Trabalho final', () => {

  const userData = gerarPessoa();
  const userData2 = gerarPessoa();

  beforeEach(() => {
    cy.visit('https://automationexercise.com');
    menu.irParaLoginCadastro();
  });

  it('Test Case 1: Cadastrar um usuário', () => {
    // act - açao
    cadastro.preencherFormulario(userData);
    // assert - verificação
    cy.contains(`Logged in as ${userData.firstName}`).should('be.visible');
  });

  it('Test Case 2: Login User with correct email and password', () => {
    // act - açao
    login.preencherLogin(userData.email, userData.password);
    // assert - verificação
    cy.contains(`Logged in as ${userData.firstName}`).should('be.visible');
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    // act - açao
    login.preencherLogin(userData.email, '12345');
    // assert - verificação
    cy.contains(MESSAGES.loginError).should("be.visible");
  });

  it('Test Case 4: Logout User', () => {
    login.preencherLogin(userData.email, userData.password);
    cy.contains(`Logged in as ${userData.firstName}`).should('be.visible');
    // act - açao
    cy.contains('Logout').click();
    // assert - verificação
    cy.url().should('contain', 'login');
    cy.contains("Login to your account").should("be.visible");
  });

  it('Test Case 5: Register User with existing email', () => {
    // act - açao
    cadastro.iniciarCadastro(userData.firstName, userData.email);
    // assert - verificação
    cy.contains(MESSAGES.emailExists).should("be.visible");
  });

  it('Test Case 6: Contact Us Form', () => {
     // Arrange - preparação
     menu.irParaContato();
     cadastro.verificarPaginaDeContato();
     // act - açao
     cadastro.preencherFormularioContato(userData, 'This is a test message.', 'cypress/fixtures/screen.png');
     // assert - verificação
     cy.contains("Success! Your details have been submitted successfully.").should("be.visible");
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    // act - açao
    menu.irParaProdutos();
    menu.verificarPaginaProdutos();
    // assert - verificação
    menu.visualizarDetalhesPrimeiroProduto();
    menu.verificarDetalhesProduto();
  });

  it('Test Case 9: Search Product', () => {
    // act - açao
    menu.verificarProduto('T-shirt');
    // assert - verificação
    menu.verificarProdutoPesquisado();
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    // act - açao
    menu.iniciarAssinatura(userData.email);
    // assert - verificação
    cy.contains(MESSAGES.subscriptionSuccess).should("be.visible");
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    cadastro.preencherFormulario(userData2);
    cadastro.adicionarAoCarrinho();
    cadastro.finalizarCompra(userData2);
    cadastro.realizarPagamento(userData2);
    cadastro.verificarPedidoRealizado();
    cadastro.deletarConta();
  });
});
