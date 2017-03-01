
class Contribution {

	constructor(date, amount) {

		this.date = new Date(date);
		this.amount = amount;

	}

	static compare(a, b) {

		if (a.date < b.date) {

			return -1;

		} else if (a.date > b.date) {

			return 1;

		} else {

			return 0;

		}

	}

}
