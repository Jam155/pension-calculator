
var contributions = new Array();

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

var getContributions = function() {

	var contributionsHolder = jQuery('.contributions');
	contributionsHolder.find('.contribution').each(function(index) {

		var date = jQuery(this).find('input[type=date]').val();
		var amount = jQuery(this).find('input[type=number]').val();

		contributions.push(new Contribution(date, amount));

	});

	contributions.sort(Contribution.compare);

}

var getMonthlyAmount = function(date) {

	var contributions = jQuery('.contribution');

	console.log(contributions);

	var monthlyAmount = jQuery(contributions[0]).find('input[name="contributions[0][monthly]"]').val();
	var startDate = jQuery(contributions[0]).find('input[name="contributions[0][date]"]').val();

	console.log(monthlyAmount);
	startDate = new Date(startDate);

	var taxRebate = getTaxRebate();
	var empCont = getEmployerContributions();

	if (date > startDate) {

		monthlyAmount = (monthlyAmount / (1 - taxRebate)) + empCont;

	} else {

		monthlyAmount = 0;

	}

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

	var today = new Date();
	var currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
	console.log(currentDate);
	var timestamp = (new Date()).getTime();
	console.log(timestamp);
	var months = years * 12;
	var amount = 0; //getInitialAmount();
	var empCont = getEmployerContributions();
	var taxCont = getTaxRebate();
	var monthlyAmount = getMonthlyAmount();
	var interestRate = getInterestRate();

	for (var i = 0; i < months; i++) {

		currentDate.setMonth(currentDate.getMonth() + 1);
		amount = parseFloat(amount * getMonthlyInterestRate()) + parseFloat(getMonthlyAmount(currentDate));

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
	getContributions();
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

	jQuery('#addContribution').on('click', function(e) {

		e.preventDefault();
		e.stopPropagation();

		var index = jQuery('.contributions .contribution').length;

		jQuery('.contributions').append("<div class='contribution'><input type='date' name='contributions[" + length + "][date]' /><!----><input type='number' name='contributions[" + length + "][monthly]' /></div>");

	});
})
