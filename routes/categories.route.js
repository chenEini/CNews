const { getInstance } = require('../mysql');

module.exports = (app) => {
	app.route('/api/categories')
		.get(async (req, res) => {
			try {
				const mysql = getInstance();
				const categories = await mysql('categories');
				res.json(categories);
			} catch (e) {
				console.log('Failed to get the categories', e);
			}
		})
		.post(async (req, res) => {
			try {
				const mysql = getInstance();
				let newCategory = await mysql('categories').insert(req.body);
				newCategory = await mysql('categories').where('id', newCategory[0]).first();
				res.status(201).json(newCategory);
			} catch (e) {
				console.log(`Failed to add the category ${req.body.name}`, e);
			}
		});

	app.route('/api/categories/:id').get(async (req, res) => {
		const { id } = req.params;
		const mysql = getInstance();
		const category = await mysql('categories').where('id', id).first();
		res.json(category || {});
	})
};
