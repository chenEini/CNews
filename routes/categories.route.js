const Category = require('../models/category.model');
const { getMaxId } = require('../services/utils');

module.exports = (app) => {
	app.route('/api/categories')
		.get(async (req, res) => {
			const categories = await Category.find({});
			res.json(categories);
		})
		.post(async (req, res) => {
			const newCategory = await Category.create(req.body, {new: true});
			res.status(201).json(newCategory);
		});

	app.route('/api/categories/:id').get((req, res) => {
		const { id } = req.params;
		const category = Category.find(a => a.id === id);
		res.json(category || {});
	})
};
