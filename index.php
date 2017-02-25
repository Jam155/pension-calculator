<html>
	<head>
		<title>
			Pension Calculator
		</title>
		<link rel="stylesheet" type="text/css" href="css/main.css">

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

			</div>

		</div>

	</body>

</html>
