import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ArticleList from "./components/article/ArticleList";
import Management from "./components/management/Management";
import ArticlePage from "./components/article/ArticlePage";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/articles">Articles</Link>
                        </li>
                        <li>
                            <Link to="/management">Management Login</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={'/articles/:articleId'}>
                        <ArticlePage/>
                    </Route>
                    <Route path="/articles">
                        <ArticleList/>
                    </Route>
                    <Route path="/management">
                        <Management/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}