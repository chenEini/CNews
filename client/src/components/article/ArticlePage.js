import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import { ArticlesService } from "../../services/articles.service";

function ArticlePage() {
    let { articleId } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        ArticlesService.getArticle(articleId).then((article) => {
            setArticle(article)
        }).catch(console.log);
    }, [articleId]);

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
                {article.created_at} | {article.views} views
            </footer>
        </div>
    )
}

export default ArticlePage;
