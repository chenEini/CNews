const categories = require('../models/category.model');
const { getMaxId } = require('../services/utils');

module.exports = (app) => {
	app.route('/api/categories')
		.get((req, res) => {
			res.json(categories);
		})
		.post((req, res) => {
			const newCategory = req.body;

			if (!newCategory.id) {
				newCategory.id = getMaxId(categories) + 1;
			}

			categories.push(newCategory);
			res.status(201).json(newCategory);
		});

	app.route('/api/categories/:id').get((req, res) => {
		const { id } = req.params;
		const category = categories.find(a => a.id === id);
		res.json(category || {});
	})
};
