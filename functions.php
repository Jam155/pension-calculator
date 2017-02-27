<?php

	function getContributionInputs() {

		$contributions = $_REQUEST['contributions'];

		if (sizeof($contributions) > 0) {

			foreach($_REQUEST['contributions'] as $i => $contribution): ?>

				<div class="contribution">

					<input type="date" name="contributions[<?php echo $i; ?>][date]" value="<?php echo $contribution['date'] ?>"/><!--
					--><input type="number" name="contributions[<?php echo $i; ?>][monthly]" value="<?php echo $contribution['monthly']; ?>" />

				</div>

			<?php endforeach; 

		} else { ?>

			<div class="contribution">

				<input type="date" name="contributions[0][date]" value="" /><!--
				--><input type="number" name="contributions[0][monthly]" value="" />

			</div>

		<? }

	}

	function calculateAge() {

		$age = 0;
		$dob = getDOB();

		if ($dob !== "") {

			$dob_date = new DateTime($dob);
			$today = new DateTime();

			$dob_timestamp = $dob_date->getTimestamp();
			$today = $today->getTimestamp();

			$diff = $today - $dob_timestamp;

			$age = date('Y', $diff);
			$age = $age - 1970;

		}

		return $age;

	}

	function _getValue($field) {

		$value = "";

		if (isset($_REQUEST[$field]) && $_REQUEST[$field]) {

			$value = $_REQUEST[$field];

		}

		return $value;

	}

	function getFirstName() {

		return _getValue("firstname");

	}

	function getSurname() {

		return _getValue("lastname");

	}

	function getDOB() {

		return _getValue("dob");

	}

	function getSalary() {

		return _getValue("salary");

	}

	function getRetirementAge() {

		return _getValue("retirement-age");

	}

	function getTax() {

		return _getValue("tax");

	}

	function getInitial() {

		return _getValue("initial");

	}

	function getInterest() {

		return _getValue("interest");

	}

	function getEmployerContributions() {

		return _getValue("employer");

	}

	function getStart($i) {

		$start = "";

		if (isset($_REQUEST["start"][$i])) {

			$start = $_REQUEST["start"][$i];

		}

		return $start;

	}

	function getMonthly($i) {

		$monthly = "";

		if (isset($_REQUEST["monthly"][$i])) {

			$monthly = $_REQUEST["monthly"][$i];

		}

		return $monthly;

	}

?>
