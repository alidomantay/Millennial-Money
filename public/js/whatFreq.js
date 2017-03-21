function whatExpenseFreq(data) {

  total = 0.00;
  expenseData[0].value = 0.00;
  expenseData[1].value = 0.00;
  expenseData[2].value = 0.00;
  expenseData[3].value = 0.00;
  expenseData[4].value = 0.00;

  switch (expenseFreq) {
    case 0:
    var dateToday = moment().format('YYYY-MM-DD');
    $.each(data, function(key, newdata){
      if (newdata.date == dateToday) {
        expenseDataToDonut(newdata);
      }
    });
    break;
    case 1:
    var week = moment().startOf('week').format('YYYY-MM-DD');
    var endWeek = moment().endOf('week').format('YYYY-MM-DD');
    for (var i = 0; m != endWeek; i++) {
      var m = moment(week).add(i, 'd').format('YYYY-MM-DD');
      $.each(data, function(key, newdata){
        if (newdata.date == m) {
          expenseDataToDonut(newdata);
        }
      });
    }
    break;
    case 2:
    var month = moment().format('MM');
    var endWeek = moment().format('YYYY');
    $.each(data, function(key, newdata){
      if ((moment(newdata.date).format('MM') + moment(newdata.date).format('YYYY')) == (month + endWeek)) {
        expenseDataToDonut(newdata);
      }
    });

    break;
    case 3:
    $.each(data, function(key, newdata){
      expenseDataToDonut(newdata);
    });
    break;
    default:
  }
  total = total.toFixed(2);
  $('#expenseTotal').text('₱' + total);
  if (total != 0)
  donut1.setData(expenseData);
  else
  donut1.setData(emptyExpense);

}

function whatSavingsFreq(data) {

  savings = 0.00;
  savingsData[0].value = 0.00;

  switch (savingsFreq) {
    case 0:
    var dateToday = moment().format('YYYY-MM-DD');
    $.each(data, function(key, newdata){
      if (newdata.date == dateToday) {
        savingsDataToDonut(newdata);
      }
    });
    break;
    case 1:
    var week = moment().startOf('week').format('YYYY-MM-DD');
    var endWeek = moment().endOf('week').format('YYYY-MM-DD');
    for (var i = 0; m != endWeek; i++) {
      var m = moment(week).add(i, 'd').format('YYYY-MM-DD');
      $.each(data, function(key, newdata){
        if (newdata.date == m) {
          savingsDataToDonut(newdata);
        }
      });
    }
    break;
    case 2:
    var month = moment().format('MM');
    var endWeek = moment().format('YYYY');
    $.each(data, function(key, newdata){
      if ((moment(newdata.date).format('MM') + moment(newdata.date).format('YYYY')) == (month + endWeek)) {
        savingsDataToDonut(newdata);
      }
    });

    break;
    case 3:
    $.each(data, function(key, newdata){
      savingsDataToDonut(newdata);
    });
    break;
    default:
  }
  savings = savings.toFixed(2);
  $('#savingsTotal').text('₱' + savings);
  if (savings != 0)
  donut2.setData(savingsData);
  else
  donut2.setData(emptySavings);
}

function expenseDataToDonut(data){

  var exp = parseFloat(data.amount);
  for (var i = 0; i < 5; i++) {
    if(data.category == (i + 1)) {
    expenseData[i].value += exp;
    expenseData[i].value = parseFloat(parseFloat(expenseData[i].value).toFixed(2));
    break;
    }
  }

  total += parseFloat(exp);

}

function savingsDataToDonut(data){
  var savingsToData = parseFloat(data.amount);
  savingsData[0].value += savingsToData;
  savingsData[0].value = parseFloat(parseFloat(savingsData[0].value).toFixed(2));
  savings += savingsToData;
}
