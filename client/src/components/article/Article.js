import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function Article(props) {
    const {article} = props;
    const [articleDate, setArticleDate] = useState("");
    const lambdaUrl = 'https://3t0d39gku3.execute-api.us-east-1.amazonaws.com/production/dateformatting';

    useEffect(() => {
        fetch(`${lambdaUrl}?articleDate=${article.created_at}`)
            .then(res => setArticleDate(res.json()))
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
