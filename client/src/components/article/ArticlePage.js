import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import { ArticlesService } from "../../services/articles.service";

function ArticlePage() {
    let { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [articleDate, setArticleDate] = useState("");

    useEffect(() => {
        ArticlesService.getArticle(articleId).then((article) => {
            setArticle(article)
        }).catch(console.log);
    }, [articleId]);

    useEffect(() => {
        if (article) {
            ArticlesService.getArticleDate(article)
                .then(res => setArticleDate(res))
                .catch(err => {
                    console.log(err);
                });
        }
    }, [article]);

    return (
    	!article ? null :
        <div>
            <header>
                {article.title} | {article.categoryName}
            </header>
            <article>
                {article.content}
            </article>
            <footer>
                {articleDate ? (`${articleDate} |`) : ''} {article.views} views
            </footer>
        </div>
    )
}

export default ArticlePage;
