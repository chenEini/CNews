const {getInstance} = require('../mysql');

module.exports = (app) => {
	app.route('/api/articles')
		.get(async (req, res) => {
			const {startDate, endDate, category} = req.query;

			try {
				const mysql = getInstance();
				const articles = await mysql('articles')
					.select('articles.*', 'categories.name as categoryName')
					.orderBy('created_at', 'desc')
					.modify((queryBuilder) => {
						if (category) {
							queryBuilder.where('category', category);
						}

						if (startDate) {
							const date = new Date(parseInt(startDate, 10));
							queryBuilder.where('created_at', '>=', date);
						}

						if (endDate) {
							const date = new Date(parseInt(endDate, 10));
							queryBuilder.where('created_at', '<=', date);
						}
					})
					.leftJoin('categories', 'articles.category', 'categories.id');
				res.json(articles);
			} catch (e) {
				console.log('Failed to find articles', e)
			}
		})
		.post(async (req, res) => {
			try {
				const mysql = getInstance();
				let newArticle = await mysql('articles').insert(req.body);
				newArticle = await mysql('articles')
					.select('articles.*', 'categories.name as categoryName')
					.where('articles.id', newArticle[0])
					.leftJoin('categories', 'articles.category', 'categories.id')
					.first();
				res.status(201).json(newArticle);
			} catch (e) {
				console.log('Failed to add article', e);
			}
		});

	app.route('/api/articles/:id').get(async (req, res) => {
		const {id} = req.params;

		try {
			const mysql = getInstance();
			const article = await mysql('articles')
				.select('articles.*', 'categories.name as categoryName')
				.where('articles.id', id)
				.leftJoin('categories', 'articles.category', 'categories.id')
				.first();
			await mysql('articles')
				.where('id', id)
				.update('views', article.views + 1);
			article.views += 1;
			res.json(article);
		} catch (e) {
			console.log('Failed to get article', e);
		}
	})
};
