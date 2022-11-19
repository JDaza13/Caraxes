const deg2rad = (degrees: number) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
};

const calcAngleDegrees = (x: number, y: number) => {
	return (Math.atan2(y, x) * 180) / Math.PI;
};

export default {
    deg2rad,
    calcAngleDegrees
};