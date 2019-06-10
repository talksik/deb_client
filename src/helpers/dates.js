const toJsDate = date => {
	// Split timestamp into [ Y, M, D, h, m, s ]
	var dateParts = date.split('-');
	var utcDate = new Date(
		dateParts[0],
		dateParts[1] - 1,
		dateParts[2].substr(0, 2)
	);

	var newDate = new Date(
		utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000
	);

	var offset = utcDate.getTimezoneOffset() / 60;
	var hours = utcDate.getHours();

	newDate.setHours(hours - offset);

	return newDate;
};

const dateDiff = (dt1, dt2) => {
	var diff = (dt2.getTime() - dt1.getTime()) / 1000;
	diff /= 60 * 60 * 24 * 7 * 4;
	return Math.abs(Math.round(diff));
};

const getMonthString = month => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return monthNames[month];
};

export const dateFunctions = {
	toJsDate,
	dateDiff,
	getMonthString
};
