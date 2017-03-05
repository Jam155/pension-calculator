
var contributions = new Array();
var currentContribution = -1;
var currentCompare = 0;

var values = new Array();
var labels = new Array();

var getAge = function() {

	var age = jQuery('input[name=age]').val();
	return age;

}

var getDOB = function() {

	var dob = jQuery('input[name=dob]').val();
	return dob;

}

var getRetirementAge = function() {

	var retirementAge = jQuery('input[name=retirement-age]').val();
	return retirementAge;

}

var getInitialAmount = function() {

	var initialAmount = jQuery('input[name=initial]').val();
	return initialAmount;

}

var getComPrinciple = function(months) {

	var principle = getInitialAmount();
	var interestRate = getMonthlyInterestRate();
	var total = principle;

	if (months > 0) {

		total = (principle * interestRate) ^ months;

	}

	return total;

}

/*var getComPrinciple = function(years) {

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

}*/

var getContributions = function() {

	var contributionsHolder = jQuery('.contributions');
	contributionsHolder.find('.contribution').each(function(index) {

		var date = jQuery(this).find('input[type=date]').val();
		var amount = jQuery(this).find('input[type=number]').val();
		var type = jQuery(this).find('select').val();

		contributions.push(new Contribution(date, amount, type));

	});

	contributions.sort(Contribution.compare);

}

var getMonthlyAmount = function(date) {

	var contribution;

	if (contributions.length > currentCompare) {
	
		contribution = contributions[currentCompare];

		if (contribution.date <= date) {

			currentCompare++;
			currentContribution++

		}

	}

	var taxRebate = getTaxRebate();
	var empCont = getEmployerContributions();
	var monthlyAmount = 0;

	if (currentContribution > -1) {

		contribution = contributions[currentContribution];

		monthlyAmount = parseFloat( contribution.amount );

		if (monthlyAmount > 0) {
			
			monthlyAmount = monthlyAmount / ( 1 - taxRebate);

		}
	}

	monthlyAmount += empCont;
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

var getValues = function(/*years, monthlyAmount*/) {

	currentContribution = -1;
	currentCompare = 0;

	var dob = new Date(getDOB());
	var retirementAge = getRetirementAge();
	var retirementDate = new Date(getDOB());
	retirementDate.setFullYear(dob.getFullYear() + parseInt(retirementAge));
	console.log(dob.getFullYear() + parseInt(retirementAge));
	console.log(retirementAge);
	console.log(retirementDate);

	var today = new Date();
	//var currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
	var currentDate = getStartDate();
	var timestamp = (new Date()).getTime();
	var months = getNumberOfMonths(currentDate, retirementDate);
	//var months = years * 12;
	var amount = parseFloat(getInitialAmount());
	var empCont = getEmployerContributions();
	var taxCont = getTaxRebate();
	var monthlyAmount = getMonthlyAmount();
	var interestRate = getInterestRate();
	values = new Array();
	labels = new Array();
	values.push(amount.toFixed(2));
	labels.push(currentDate.getFullYear());
	

	for (var i = 0; i < months; i++) {

		currentDate.setMonth(currentDate.getMonth() + 1);
		amount = parseFloat(amount * getMonthlyInterestRate()) + parseFloat(getMonthlyAmount(currentDate));
		
		if ((i % (12)) == 0) {
			console.log(amount);
			values.push(amount.toFixed(2));
			labels.push(currentDate.getFullYear());
		}

	}

	values.push(amount.toFixed(2));
	labels.push(currentDate.getFullYear());

	console.log(values);
	console.log(labels);
	console.log(currentDate);

	return parseInt(amount, 10);

}

var getNumberOfMonths = function(startDate, endDate) {

	var months = (endDate.getFullYear() - startDate.getFullYear()) * 12;	

	//For now don't worry about the day.
	months -= startDate.getMonth();
	months += endDate.getMonth();

	console.log(months);
	return months;

}

var getStartDate = function() {

	var startDate = new Date(getDOB());
	startDate.setFullYear(startDate.getFullYear + 18);

	if (contributions.length > 0) {

		startDate = new Date(contributions[0].date);

	}

	return startDate;

}

/*var getValues = function() {
	
	var retirementAge = getRetirementAge();
	var retirementDate = new Date(getDOB());
	retirementDate.setFullYear(retirementDate.getFullYear() + parseInt(retirementAge));

}*/

/*var getValues = function(years, total) {

	return [getValue(0, 200), getValue(5, 200), getValue(10, 200), getValue(15, 200), getValue(20, 200), getValue(25, 200), getValue(30,200), getValue(35, 200), getValue(40, 200)];


}*/

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
	getValues();
	var ctx = document.getElementById("chart");
	console.log(ctx);
	var pensionChart = new Chart(ctx, {

		type: 'line',
		data: {

			labels: labels, /*getLabels(),*/
			datasets: [

				{

					label: "Pension Estimate",
					fill: false,
					lineTension: 0.1,
					data: values,/*getValues(5, 6),*/

				}

			]

		}

	});

	jQuery('#addContribution').on('click', function(e) {

		e.preventDefault();
		e.stopPropagation();

		var index = jQuery('.contributions .contribution').length;

		jQuery('.contributions').append("<div class='contribution'><input type='date' name='contributions[" + index + "][date]' /><!----><input type='number' name='contributions[" + index + "][monthly]' /><select name='contributions[" + index + "][type]'><option>Monthly</option><option>Single</option></div>");

	});
})
