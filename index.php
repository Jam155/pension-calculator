<html>
	<head>
		<title>
			Pension Calculator
		</title>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script src="node_modules/jquery/dist/jquery.js"></script>
		<script src="node_modules/chart.js/dist/Chart.bundle.js"></script>
		<script>

			jQuery(document).ready(function() {
				var ctx = document.getElementById("chart");
				console.log(ctx);
				var pensionChart = new Chart(ctx, {

					type: 'line',
					data: {

						labels: ["5", "10", "15", "20", "25", "30"],
						datasets: [

							{

								label: "Pension Estimate",
								fill: false,
								lineTension: 0.1,
								data: [200, 200, 200, 200, 200, 200],

							}

						]

					}

				});
			})
			

		</script>

	</head>

	<body>

		<h1>Pension Calculator</h1>

		<div class="body">

			<div class="form">

				<h2>Pension Details</h2>

				<form>

					First Name:<br />
					<input type="text" name="firstname" />
					Last Name: <br />
					<input type="text" name="lastname" />
					DOB: <br />
					<input type="date" name="dob" value="1991-12-17"/>
					Salary: <br />
					<input type="number" name="salary" step="1" min="0" value="23000" />
					Retirement Age: <br />
					<input type="number" name="retirement-age" min="55" step="1" value="55"/>
					Tax Bracket: <br />
					<select name="tax">
						<option value="basic">Basic Rate</option>
						<option value="higher">Higher Rate</option>
					</select>
					Initial Amount:
					<input type="number" name="initial" step="0.01" min="0" value="0.00">
					Est. Growth: <br />
					<input type="number" name="interest" step="0.01" value="5.00">
					Employer Contributions: <br />
					<input type="number" name="employer" step="0.01" min="0" value="1.00">
					Monthly Contributions: <br />
					<input type="number" name="monthly" step="0.01" min="0" value="300.00">


				</form>

			</div><!--

			--><div class="view">

				<h2>Pension View</h2>

				<canvas id="chart" width="400px" />

			</div>

		</div>

	</body>

</html>
