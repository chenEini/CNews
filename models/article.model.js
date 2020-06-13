const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	title: {
		type: String,
		required: 'title field is required',
		trim: true
	},
	content: {
		type: String,
		required: 'content field is required',
		trim: true
	},
	category: {
		type: mongoose.Schema.ObjectId,
		required: 'category field is required'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Article', articleSchema);

const articles = [
	{
		id: '1',
		title: 'title mock 1',
		content: 'content mock 1',
		category: '1',
		createdAt: Date.now()
	},
	{
		id: '2',
		title: 'title mock 2',
		content: 'content mock 2',
		category: '2',
		createdAt: Date.now()
	},
	{
		id: '3',
		title: 'title mock 3',
		content: 'content mock 3',
		category: '3',
		createdAt: Date.now()
	}
];

module.exports = articles;
