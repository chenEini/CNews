const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('Category', categorySchema);

const categories = [
	{
		id: 1,
		name: 'Business'
	},
	{
		id: 2,
		name: 'World'
	},
	{
		id: 3,
		name: 'Politics'
	},
	{
		id: 4,
		name: 'Sports'
	},
	{
		id: 5,
		name: 'Health'
	}
];