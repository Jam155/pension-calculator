<?php

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
