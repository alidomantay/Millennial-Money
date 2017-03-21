var donut1 = Morris.Donut({
	element: 'expense-donut',
	data: emptyExpense,
	redraw: true,
	resize: true,
});
$('#chart-container').resize(function(){
	donut1.redraw();
});

var donut2 = Morris.Donut({
	element: 'savings-donut',
	data: emptySavings,
	redraw: true,
	resize: true,
});
$('#chart-container').resize(function(){
	donut2.redraw();
});
