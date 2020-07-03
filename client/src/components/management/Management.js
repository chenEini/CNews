import React from 'react';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import CategoryList from "../category/CategoryList";
import AddArticle from "../article/AddArticle";

function Management() {
    return (
        <div>
            <ul style={{'marginLeft': '20px'}}>
                <li>
                    <Link to={'/management/articles'}>Manage Articles</Link>
                </li>
                <li>
                    <Link to={'/management/categories'}>Manage Categories</Link>
                </li>
            </ul>
            <Switch>
                <Route path={'/management/articles'}>
                    <AddArticle/>
                </Route>
                <Route path={'/management/categories'}>
                    <CategoryList/>
                </Route>
            </Switch>
        </div>
    );
}

export default Management;
