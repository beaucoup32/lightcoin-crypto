class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
    // this.balance = 0;
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // track time of transaction
    this.time = new Date();

    // add transaction to account

    if (!this.isAllowed()) {
      return false;
    }

    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("beaucoup");
// console.log(myAccount);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);

t2 = new Deposit(60.5, myAccount);
t2.commit();
console.log("Transaction 2:", t2);

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);

console.log("Balance:", myAccount.balance);
