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
		ref: 'Category',
		required: 'category field is required'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', articleSchema);
