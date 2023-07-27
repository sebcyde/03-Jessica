const MonthsEnum = {
	JANUARY: '01',
	FEBRUARY: '02',
	MARCH: '03',
	APRIL: '04',
	MAY: '05',
	JUNE: '06',
	JULY: '07',
	AUGUST: '08',
	SEPTEMBER: '09',
	OCTOBER: '10',
	NOVEMBER: '11',
	DECEMBER: '12',
};

const getMonth = (number) => {
	const month = number.toString();
	switch (month) {
		case MonthsEnum.JANUARY:
			return 'January';
		case MonthsEnum.FEBRUARY:
			return 'February';
		case MonthsEnum.MARCH:
			return 'March';
		case MonthsEnum.APRIL:
			return 'April';
		case MonthsEnum.MAY:
			return 'May';
		case MonthsEnum.JUNE:
			return 'June';
		case MonthsEnum.JULY:
			return 'July';
		case MonthsEnum.AUGUST:
			return 'August';
		case MonthsEnum.SEPTEMBER:
			return 'September';
		case MonthsEnum.OCTOBER:
			return 'October';
		case MonthsEnum.NOVEMBER:
			return 'November';
		case MonthsEnum.DECEMBER:
			return 'December';
		default:
			console.log('Invalid month number');
			break;
	}
};

module.exports = { getMonth };
