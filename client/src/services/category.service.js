export class CategoriesService {
    static categoriesUrl = `${window.location.origin}/api/categories`;

    static getCategories() {
        return fetch(this.categoriesUrl)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }

    static addCategory(category) {
        return fetch(this.categoriesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }
}
