const articles = [
	{
		id: '1',
		title: 'title mock 1',
		content: 'content mock 1',
		createdAt: Date.now()
	},
	{
		id: '2',
		title: 'title mock 2',
		content: 'content mock 2',
		createdAt: Date.now()
	},
	{
		id: '3',
		title: 'title mock 3',
		content: 'content mock 3',
		createdAt: Date.now()
	}
];

module.exports = (app) => {
	app.route('/api/articles').get((req, res) => {
		res.json(articles);
	});

	app.route('/api/articles/:id').get((req, res) => {
		const { id } = req.params;
		const article = articles.find(a => a.id === id);
		res.json(article || {});
	})
};
