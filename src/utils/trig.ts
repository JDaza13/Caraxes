const deg2rad = (degrees: number) => {
	return degrees * (Math.PI / 180);
};

const getSinPathAt = (i: number, steps: number) => {
	const rad = (2 * Math.PI * i) / steps;
	return Math.sin(rad);
};

export default {
	deg2rad,
	getSinPathAt
};
