const Category = require('../models/category.model');

module.exports = (app) => {
	app.route('/api/categories')
		.get(async (req, res) => {
			try {
				const categories = await Category.find({});
				res.json(categories);
			} catch (e) {
				console.log('Failed to get the categories', e);
			}
		})
		.post(async (req, res) => {
			try {
				const newCategory = await Category.create(req.body);
				res.status(201).json(newCategory);
			} catch (e) {
				console.log(`Failed to add the category ${req.body.name}`, e);
			}
		});

	app.route('/api/categories/:id').get((req, res) => {
		const { id } = req.params;
		const category = Category.find(a => a.id === id);
		res.json(category || {});
	})
};
