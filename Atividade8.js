class ContaBancaria {
  constructor(agencia, numero, tipo, saldo = 0) {
    this.agencia = agencia;
    this.numero = numero;
    this.tipo = tipo;
    this.saldo = saldo;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(novoSaldo) {
    this._saldo = novoSaldo;
  }

  sacar(valor) {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    } else {
      console.log('Saldo insuficiente.');
      return false;
    }
  }

  depositar(valor) {
    this.saldo += valor;
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(agencia, numero, cartaoCredito, saldo = 0) {
    super(agencia, numero, 'Conta Corrente', saldo);
    this.cartaoCredito = cartaoCredito;
  }

  get cartaoCredito() {
    return this._cartaoCredito;
  }

  set cartaoCredito(novoCartaoCredito) {
    this._cartaoCredito = novoCartaoCredito;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, 'Conta Poupança', saldo);
  }
}

class ContaUniversitaria extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, 'Conta Universitária', saldo);
  }

  sacar(valor) {
    if (valor <= 500 && valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    } else {
      console.log('Saque não permitido para contas universitárias ou valor acima de 500 reais.');
      return false;
    }
  }
}

function interagirComSistema() {
  const tipoConta = prompt('Digite o tipo de conta (ContaCorrente, ContaPoupanca ou ContaUniversitaria):').toLowerCase();

  let conta;
  switch (tipoConta) {
    case 'contacorrente':
      conta = new ContaCorrente(123, 456, 100, 1000);
      break;
    case 'contapoupanca':
      conta = new ContaPoupanca(789, 101112, 5000);
      break;
    case 'contauniversitaria':
      conta = new ContaUniversitaria(131415, 161718, 200);
      break;
    default:
      console.log('Tipo de conta não reconhecido.');
      return;
  }

  console.log(`Saldo inicial da ${conta.tipo}: R$ ${conta.saldo.toFixed(2)}`);

  const operacao = prompt('Digite a operação a ser realizada (saque ou deposito):').toLowerCase();

  switch (operacao) {
    case 'saque':
      const valorSaque = parseFloat(prompt('Digite o valor do saque:'));
      if (conta.sacar(valorSaque)) {
        console.log(`Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso.`);
      } else {
        console.log('Saque não permitido.');
      }
      break;
    case 'deposito':
      const valorDeposito = parseFloat(prompt('Digite o valor do depósito:'));
      conta.depositar(valorDeposito);
      console.log(`Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${conta.saldo.toFixed(2)}`);
      break;
    default:
      console.log('Operação não reconhecida.');
  }
}

// Exemplo de uso
interagirComSistema();
