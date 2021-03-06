var getAge = function() {

	var age = jQuery('input[name=age]').val();
	return age;

}

var getInitialAmount = function() {

	var initialAmount = jQuery('input[name=initial]').val();
	return initialAmount;

}

var getComPrinciple = function(years) {

	var principle = getInitialAmount();
	var compounded = 12;
	var interestRate = getMonthlyInterestRate();
	var total = 0;

	if (years > 0) {

		total = (principle * interestRate) ^ (compounded * years);

	} else {

		total = principle;

	}
	
	var comp = compounded * years;
	var interest = Math.pow(interestRate, comp);
	total = principle * interest;

	return total;



}

var getMonthlyAmount = function() {

	var monthlyAmount = jQuery('input[name=monthly]').val();
	var taxRebate = getTaxRebate();
	var empCont = getEmployerContributions();

	monthlyAmount = (monthlyAmount / (1 - taxRebate)) + empCont;

	return monthlyAmount;

}

var getTaxRebate = function() {

	var taxRate = jQuery('select[name=tax]').val();

	if (taxRate == 'basic') {

		taxRate = 0.2;

	} else {

		taxRate = 0.4;

	}

	return taxRate;

}

var getEmployerContributions = function() {

	var salary = jQuery('input[name=salary]').val();
	var contRate = jQuery('input[name=employer]').val();
	contRate = (contRate / 100);

	var empCont = (salary / 12) * contRate;

	return empCont;

}

var getMonthlyInterestRate = function() {

	var interest = jQuery('input[name=interest]').val();
	interest = interest / 100;
	var monthly = interest / 12;
	monthly = 1 + monthly;

	return monthly;

}

var getInterestRate = function() {

	var interest = jQuery('input[name=interest]').val();
	interest = interest / 100;

	return interest;

}

var getValue = function(years, monthlyAmount) {

	var months = years * 12;
	var amount = 0; //getInitialAmount();
	var empCont = getEmployerContributions();
	var taxCont = getTaxRebate();
	var monthlyAmount = getMonthlyAmount();
	var interestRate = getInterestRate();

	for (var i = 0; i < months; i++) {

		amount = parseFloat(amount * getMonthlyInterestRate()) + parseFloat(getMonthlyAmount());

	}

	amount += getComPrinciple(years);

	return parseInt(amount, 10);

}

var getValues = function(years, total) {

	return [getValue(0, 200), getValue(5, 200), getValue(10, 200), getValue(15, 200), getValue(20, 200), getValue(25, 200), getValue(30,200), getValue(35, 200), getValue(40, 200)];


}

var getLabels = function() {

	var labels = new Array();

	for (var i = 0; i < 9; i++) {

		var label = getAge(); //parseFloat(getAge());
		var extra = i * 5;

		label = parseInt(extra) + parseInt(label);

		labels.push(label);

	}

	return labels;

}

jQuery(document).ready(function() {
	var ctx = document.getElementById("chart");
	console.log(ctx);
	var pensionChart = new Chart(ctx, {

		type: 'line',
		data: {

			labels: getLabels(),
			datasets: [

				{

					label: "Pension Estimate",
					fill: false,
					lineTension: 0.1,
					data: getValues(5, 6),

				}

			]

		}

	});
})
