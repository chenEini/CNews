import React, { useEffect, useState } from 'react';
import { CategoriesService } from "../../services/category.service";
import { ArticlesService } from "../../services/articles.service";

function AddArticle() {
    const [categories, setCategories] = useState([]);
    const [newArticleTitle, setNewArticleTitle] = useState('');
    const [newArticleContent, setNewArticleContent] = useState('');
    const [newArticleCategory, setNewArticleCategory] = useState(-1);

    useEffect(() => {
        CategoriesService.getCategories()
            .then(data => {
                setCategories(data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const onTitleChange = (event) => {
        setNewArticleTitle(event.target.value);
    };

    const onContentChange = (event) => {
        setNewArticleContent(event.target.value);
    };

    const onCategoryChange = (event) => {
        setNewArticleCategory(event.target.value);
    };

    const addArticle = () => {
        if (!newArticleTitle || !newArticleContent || !newArticleCategory) {
            return;
        }

        ArticlesService.addArticle(newArticleTitle, newArticleContent, newArticleCategory).then(() => {
            console.log('New article was added');
        }).catch(console.log);

        setNewArticleTitle('');
        setNewArticleContent('');
        setNewArticleCategory(-1);
    };

    const renderCategoryOptions = () => categories.map((c, i) =>
        (<option key={i} value={c.id}>{c.name}</option>));

    return (
        <div>
            <div>Add Article:</div>
            <div>
                <input value={newArticleTitle} onChange={onTitleChange} name="title" placeholder="Enter title" />
                <textarea value={newArticleContent} onChange={onContentChange} name="content" placeholder="Enter content" />
                <select value={newArticleCategory} onChange={onCategoryChange} name="category">
                    <option disabled value={-1}>Choose category</option>
                    {renderCategoryOptions()}
                </select>
            </div>
            <button onClick={addArticle}>Add</button>
        </div>
    );
}

export default AddArticle;
