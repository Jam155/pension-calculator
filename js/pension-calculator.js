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
				//total = (principle * interestRate);
				var comp = compounded * years;
				var interest = Math.pow(interestRate, comp);
				total = principle * interest;

				return total;



			}

			var getMonthlyAmount = function() {

				var monthlyAmount = jQuery('input[name=monthly]').val();
				var taxRebate = getTaxRebate();
				var empCont = getEmployerContributions();

				monthlyAmount = monthlyAmount * taxRebate + empCont;
			
				console.log(monthlyAmount);

				return monthlyAmount;

			}

			var getTaxRebate = function() {

				var taxRate = jQuery('select[name=tax]').val();

				if (taxRate == 'basic') {

					taxRate = 1.2;

				} else {

					taxRate = 1.4;

				}

				console.log(taxRate);

				return taxRate;

			}

			var getEmployerContributions = function() {

				var salary = jQuery('input[name=salary]').val();
				var contRate = jQuery('input[name=employer]').val();
				contRate = (contRate / 100);

				console.log(salary);
				console.log(contRate);

				var empCont = (salary / 12) * contRate;

				console.log(empCont);

				return empCont;

			}

			var getMonthlyInterestRate = function() {

				var interest = jQuery('input[name=interest]').val();
				interest = interest / 100;
				var monthly = interest / 12;
				monthly = 1 + monthly;

				console.log(monthly);

				return monthly;

			}

			var getValue = function(years, monthlyAmount) {

				var months = years * 12;
				var amount = 0; //getInitialAmount();
				var empCont = getEmployerContributions();
				var taxCont = getTaxRebate();

				for (var i = 0; i < months; i++) {

					amount = parseFloat(amount * getMonthlyInterestRate()) + parseFloat(getMonthlyAmount());

				}

				amount += getComPrinciple(years);
				console.log(amount);

				return parseInt(amount, 10);

			}

			var getValues = function(years, total) {
			
				return [getValue(0, 200), getValue(5, 200), getValue(10, 200), getValue(15, 200), getValue(20, 200), getValue(25, 200), getValue(30,200)];


			}

			jQuery(document).ready(function() {
				var ctx = document.getElementById("chart");
				console.log(ctx);
				var pensionChart = new Chart(ctx, {

					type: 'line',
					data: {

						labels: ["0", "5", "10", "15", "20", "25", "30"],
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
