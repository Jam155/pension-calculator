<?php

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

	function getMonthly() {

		return _getValue("monthly");

	}

?>
