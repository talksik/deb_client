function numberWithCommas(x) {
	if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return 0;
}

export const textFunctions = { numberWithCommas };
