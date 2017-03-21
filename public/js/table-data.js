var expenseOptions = {
  valueNames: ['_id', 'amount', 'date', 'category'],
  item: '<tr><td class="_id" hidden></td><td class="amount"></td><td class="date"></td><td class="category"></td></tr>'
};

var savingsOptions = {
  valueNames: ['_id', 'name', 'amount', 'date'],
  item: '<tr><td class="_id" hidden></td><td class="name"></td><td class="amount"></td><td class="date"></td></tr>'
};


var expenseList = new List('expenseTable', expenseOptions, expenseServToClient);
var savingsList = new List('savingsTable', savingsOptions, savingsServToClient);
