module.exports.getMaxId = (objects) => {
	objects.reduce((a, b) => (a.id < b.id ? b.id : a.id), 1);
};
