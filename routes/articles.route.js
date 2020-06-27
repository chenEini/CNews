const Article = require('../models/article.model');

module.exports = (app) => {
	app.route('/api/articles')
		.get(async (req, res) => {
			let { startDate, endDate, category } = req.query;
			const query = {}

			if (category) {
				query.category = category;
			}

			if (startDate) {
				query.createdAt = { $gte: startDate }
			}

			if (endDate) {
				query.createdAt = query.createdAt || {};
				query.createdAt = {...query.createdAt, ...{ $lte: endDate }};
			}

			try {
				const articles = await Article.find(query).sort({ createdAt: -1 }).populate('category');
				res.json(articles);
			} catch (e) {
				console.log('Failed to find articles', e)
			}
		})
		.post(async (req, res) => {
			try {
				const newArticle = await Article.create(req.body);
				res.status(201).json(newArticle);
			} catch (e) {
				console.log('Failed to add article', e);
			}
		});

	app.route('/api/articles/:id').get(async (req, res) => {
		const { id } = req.params;

		try {
			const article = await Article.findById(id).populate('category');
			res.json(article);
		} catch (e) {
			console.log('Failed to get article', e);
		}
	})
};
