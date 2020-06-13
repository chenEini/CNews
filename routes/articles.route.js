const articles = require('../models/article.model');
const { getMaxId } = require('../services/utils');

module.exports = (app) => {
	app.route('/api/articles')
		.get((req, res) => {
			let { startDate, endDate, category } = req.query;

			startDate = startDate || 0;
			endDate = endDate|| Date.now();

			const filteredArticles = articles.filter(
				a => a.category === (category || a.category) &&
					a.createdAt >= startDate &&
					a.createdAt <= endDate
			);

			res.json(filteredArticles);
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
