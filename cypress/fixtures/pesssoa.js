import { address, name, company, phone, internet, finance } from 'faker-br';

export function gerarPessoa() {
  return {
    firstName: name.firstName(),
    lastName: name.lastName(),
    email: internet.email(),
    password: internet.password(8),
    company: company.companyName(),
    address: address.streetName(),
    state: address.state(),
    city: address.city(),
    zipCode: address.zipCode(),
    mobileNumber: phone.phoneNumber(),
    creditCardNumber: finance.creditCardNumber(),
    creditCardCVV: finance.creditCardCVV()
  };
}