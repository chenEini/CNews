const articles = require('../models/article.model');
const { getMaxId } = require('../services/utils');

module.exports = (app) => {
	app.route('/api/articles')
		.get((req, res) => {
			const { startDate, endDate, catergoey } = req.query;

			console.log(startDate, endDate, catergoey);
			res.json(articles);
		})
		.post((req, res) => {
			const newArticle = req.body;

			if (!newArticle.id) {
				newArticle.id = getMaxId(articles) + 1;
			}

			articles.push(newArticle);
			res.status(201).json(newArticle);
		});

	app.route('/api/articles/:id').get((req, res) => {
		const { id } = req.params;
		const article = articles.find(a => a.id === id);
		res.json(article || {});
	})
};
