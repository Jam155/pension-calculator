<?php require_once('functions.php'); ?>
<html>
	<head>
		<title>
			Pension Calculator
		</title>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script src="node_modules/jquery/dist/jquery.js"></script>
		<script src="node_modules/chart.js/dist/Chart.bundle.js"></script>
		<script src="js/pension-calculator.js"></script>

	</head>

	<body>

		<h1>Pension Calculator</h1>

		<div class="body">

			<div class="form">

				<h2>Pension Details</h2>

				<?php var_dump($_REQUEST); ?>

				<form>

					First Name:<br />
					<input type="text" name="firstname" value="<?php echo getFirstName(); ?>" />
					Last Name: <br />
					<input type="text" name="lastname" value="<?php echo getSurname(); ?>" />
					DOB: <br />
					<input type="date" name="dob" value="<?php echo getDOB(); ?>"/>
					Salary: <br />
					<input type="number" name="salary" step="1" min="0" value="<?php echo getSalary(); ?>" />
					Retirement Age: <br />
					<input type="number" name="retirement-age" min="55" step="1" value="<?php echo getRetirementAge(); ?>"/>
					Tax Bracket: <br />
					<select name="tax">
						<option value="basic">Basic Rate</option>
						<option value="higher">Higher Rate</option>
					</select>
					Initial Amount:
					<input type="number" name="initial" step="0.01" min="0" value="<?php echo getInitial(); ?>">
					Est. Growth: <br />
					<input type="number" name="interest" step="0.01" value="<?php echo getInterest(); ?>">
					Employer Contributions: <br />
					<input type="number" name="employer" step="0.01" min="0" value="<?php echo getEmployerContributions(); ?>">
					Monthly Contributions: <br />
					<div class="monthly">
						<input type="date" name="start" value="<?php echo getStart(); ?>"/><!--
						--><input type="number" name="monthly" step="0.01" min="0" value="<?php echo getMonthly(); ?>">
					</div>
					<input type="submit" name="Save Changes" />
					<input type="hidden" name="age" value="<?php echo calculateAge(); ?>" />


				</form>

			</div><!--

			--><div class="view">

				<h2>Pension View</h2>

				<canvas id="chart" width="400px" />

			</div>

		</div>

	</body>

</html>
