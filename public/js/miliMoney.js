$('body').ready(function(e){

	$(document).click(function(e) {
		if(!$(e.target).is('td, .crudBtn, .modal *')) {
			$('tbody tr').removeClass('clicked');
			$('tbody tr').css("background-color", "");
			$('#btnEdit, #btnDelete').attr("disabled", "true");
		}
	});

	$('table th').on('click', function() {
		$('span').removeClass('selected');
		$('span', this).addClass('selected');
		var spanTxt = $('span', this).text();
		if (spanTxt == "▲") {
			$('span', this).text('▼');
		}
		else {
			$('span', this).text('▲');
		}
		$('th span').not('span.selected').text('');
	});

	$('tbody tr').on('click', function() {
		$('tbody tr').removeClass('clicked');
		$(this).addClass('clicked');
		$('tbody tr').css("background-color", "");
		$('#btnEdit, #btnDelete').removeAttr("disabled");
		$(this).css("background-color", "#ddd");
	});

	$('#expenseModal .crudBtn').on('click', function() {
		$('#expenseRecord select, #expenseRecord input').removeAttr('readonly');
		$('#expRecSubmit').text('Submit');
		if ($(this).is('#btnEdit')) {
			$('#expenseRecord form').attr("action", "/updateExpense	");
			$('#expenseRecord .modal-title').text('Edit Record');
			var amount = $('.clicked .amount').text().split('.');
			$('#idExpHolder').val($('.clicked ._id').text());

			$('#expenseRecAmount').val(amount[0]);
			$('#expenseRecDecimal').val(amount[1]);
			$('#expenseRecDate').val($('.clicked .date').text());
			$('#categoryRec').val($('.clicked .category').text());
		}else {
			$('#expenseRecord form').attr("action", "/deleteExpense");
			$('#expenseRecord .modal-title').text('Delete This Record?');
			var amount = $('.clicked .amount').text().split('.');
			$('#idExpHolder').val($('.clicked ._id').text());
			$('#expenseRecAmount').val(amount[0]);
			$('#expenseRecDecimal').val(amount[1]);
			$('#expenseRecDate').val($('.clicked .date').text());
			$('#categoryRec').val($('.clicked .category').text());
			$('#expRecSubmit').text('Yes');
			$('#expenseRecord select, #expenseRecord input').attr('readonly', 'true');
		}
	});

	$('#savingsModal .crudBtn').on('click', function() {
		$('#savingsRecord select, #savingsRecord input').removeAttr('readonly');
		$('#expRecSubmit').text('Submit');
		if ($(this).is('#btnEdit')) {
			$('#savingsRecord form').attr("action", "/updateSavings");
			$('#savingsRecord .modal-title').text('Edit Record');
			var amount = $('.clicked .amount').text().split('.');
			$('#idSavHolder').val($('.clicked ._id').text());
			$('#nameRec').val($('.clicked .name').text());
			$('#saveRecAmount').val(amount[0]);
			$('#saveRecDecimal').val(amount[1]);
			$('#saveRecDate').val($('.clicked .date').text());
		}else {
			$('#savingsRecord form').attr("action", "/deleteSavings");
			$('#savingsRecord .modal-title').text('Delete This Record?');
			var amount = $('.clicked .amount').text().split('.');
			$('#idSavHolder').val($('.clicked ._id').text());
			$('#nameRec').val($('.clicked .name').text());
			$('#saveRecAmount').val(amount[0]);
			$('#saveRecDecimal').val(amount[1]);
			$('#saveRecDate').val($('.clicked .date').text());
			$('#savRecSubmit').text('Yes');
			$('#savingsRecord select, #savingsRecord input').attr('readonly', 'true');
		}
	});

	$("#expenseDate").attr("value", moment().format('YYYY-MM-DD'));
	$("#saveDate").attr("value", moment().format('YYYY-MM-DD'));

	$('#viewExpenseTable').on('click', function(e){
		$('#myModalLabel').text('Expense Record');
		$('#expenseTable').removeAttr('hidden');
		$('#savingsTable').attr('hidden', true);
	});
	$('#viewSavingsTable').on('click', function(e){
		$('#myModalLabel').text('Savings Record');
		$('#savingsTable').removeAttr('hidden');
		$('#expenseTable').attr('hidden', true);
	});

	$('#expenseForm').on('submit', function(e){
		$('#expenseForm .badge').text('Submitting...');
	});

	$('#savingsForm').on('submit', function(e){
		$('#savingsForm .badge').text('Submitting...');
	});

	$('#expenseDaily').on('click',function(){
		expenseFreq = 0;
		$('#expenseTime').text('Daily');
		whatExpenseFreq(expenseDaWeMo);
	})

	$('#expenseWeekly').on('click',function(){
		expenseFreq = 1;
		$('#expenseTime').text('Weekly');
		whatExpenseFreq(expenseDaWeMo);
	})

	$('#expenseMonthly').on('click',function(){
		expenseFreq = 2;
		$('#expenseTime').text('Monthly');
		whatExpenseFreq(expenseDaWeMo);
	})
	$('#expenseAll').on('click',function(){
		expenseFreq = 3;
		$('#expenseTime').text('');
		whatExpenseFreq(expenseDaWeMo);
	})
	$('#savingsDaily').on('click',function(){
		savingsFreq = 0;
		$('#savingsTime').text('Daily');
		whatSavingsFreq(savingsDaWeMo);
	})

	$('#savingsWeekly').on('click',function(){
		savingsFreq = 1;
		$('#savingsTime').text('Weekly');
		whatSavingsFreq(savingsDaWeMo);
	})

	$('#savingsMonthly').on('click',function(){
		savingsFreq = 2;
		$('#savingsTime').text('Monthly');
		whatSavingsFreq(savingsDaWeMo);
	})
	$('#savingsAll').on('click',function(){
		savingsFreq = 3;
		$('#savingsTime').text('');
		whatSavingsFreq(savingsDaWeMo);
	})

	retrieveExpenseData();
	retrieveSavingsData();
});

function retrieveExpenseData() {

	expenseDaWeMo = expenseServToClient;
	whatExpenseFreq(expenseDaWeMo);

}

function retrieveSavingsData() {

	savingsDaWeMo = savingsServToClient;
	whatSavingsFreq(savingsDaWeMo);

}
