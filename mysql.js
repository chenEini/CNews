let knex = null;

module.exports.getInstance = () => {
	if (!knex) {
		throw new Error('no knex object initialized');
	}

	return knex;
}

module.exports.connect = () => {
	return new Promise((resolve, reject) => {
		knex = require('knex')({
			client: 'mysql',
			connection: {
				host: process.env.MYSQL_HOST,
				user: process.env.MYSQL_USER,
				password: process.env.MYSQL_PASS,
				database: process.env.MYSQL_DB
			}
		});

		knex.raw("SELECT 'test connection';").then((message) => {
			resolve();
		}).catch((err) => {
			reject(err);
		})
	})
};

module.exports.createTables = () => {
	if (!knex) {
		return;
	}

	knex.schema.hasTable('categories').then((tableExists) => {
		if (!tableExists) {
			knex.schema.createTable('categories', (table) => {
				table.increments();
				table.string('name');
			}).then(() => {
				console.log('Created categories table');
			}).catch(err => {
				console.log(err);
			})
		}
	});

	knex.schema.hasTable('articles').then((tableExists) => {
		if (!tableExists) {
			knex.schema.createTable('articles', (table) => {
				table.increments();
				table.string('title');
				table.text('content');
				table.integer('views').unsigned().notNullable().defaultTo(0);
				table.integer('category').unsigned().notNullable();
				table.timestamps(true, true);
				table.foreign('category').references('id').inTable('categories');
			}).then(() => {
				console.log('Created articles table');
			}).catch(err => {
				console.log(err);
			});
		}
	});
};
