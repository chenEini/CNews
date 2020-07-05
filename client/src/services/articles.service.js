export class ArticlesService {
    static articlesUrl = `${window.location.origin}/api/articles`;
    static lambdaUrl = 'https://3t0d39gku3.execute-api.us-east-1.amazonaws.com/production/dateformatting';

    static getArticles(category = '', startDate = '', endDate = '') {
        if (startDate) {
            startDate = startDate.getTime();
        }

        if (endDate) {
            endDate = endDate.getTime();
        }

        return fetch(`${this.articlesUrl}?category=${category}&startDate=${startDate}&endDate=${endDate}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }

    static getArticle(id: string) {
        return fetch(`${this.articlesUrl}/${id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });
    }

    static addArticle(title: string, content: string, category: string) {
        const data = {title, content, category};
        return fetch(this.articlesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }

    static getArticleDate(article) {
        return fetch(`${this.lambdaUrl}?articleDate=${article.created_at}`)
            .then(res => {
            	return res.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
