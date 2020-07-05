import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ArticlesService} from "../../services/articles.service";

function Article(props) {
    const {article} = props;
    const [articleDate, setArticleDate] = useState("");

    useEffect(() => {
        ArticlesService.getArticleDate(article)
            .then(res => {
                setArticleDate(res)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <header>
                <Link to={`/articles/${article.id}`}>{article.title} | {article.categoryName}</Link>
            </header>
            <footer>
                {articleDate ? (`${articleDate} |`) : ''} {article.views} views
            </footer>
        </div>
    )
}

export default Article;
