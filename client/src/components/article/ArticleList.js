import React, {useEffect, useState} from 'react';
import {ArticlesService} from '../../services/articles.service';
import Article from './Article'
import {CategoriesService} from "../../services/category.service";

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState('');
	const [startDateSearch, setStartDateSearch] = useState(null);
	const [endDateSearch, setEndDateSearch] = useState(null);

	const getArticles = (category, startDate, endDate) => {
		ArticlesService.getArticles(category, startDate, endDate)
			.then(data => {
				setArticles(data)
			})
			.catch(err => {
				console.log(err)
			});
	};

	useEffect(() => {
		getArticles();
	}, []);

    useEffect(() => {
	    CategoriesService.getCategories()
		    .then(data => {
			    setCategories(data)
		    })
		    .catch(err => {
			    console.log(err)
		    });
    }, [categories.length]);

    const onCategoryChange = (event) => {
    	setCategorySearch(event.target.value);
    };

    const search = (event, isClear = false) => {
	    let startDate = '';
	    let endDate = '';

	    if (isClear) {
	    	getArticles('', '', '');
	    	return;
	    }

    	if (startDateSearch) {
	        startDate = new Date(startDateSearch);
	    }

	    if (endDateSearch) {
	        endDate = new Date(endDateSearch);
	        endDate.setHours(23, 59, 59, 999);
	    }

	    getArticles(categorySearch, startDate, endDate);
    };

    const clearSearch = () => {
        setCategorySearch('');
        setStartDateSearch(null);
        setEndDateSearch(null);

        search(null, true)
    };

    return (
        <div className="article-list">
	        <div className="search">
				<div className="category-search">
					<select value={categorySearch} id="category" onChange={onCategoryChange}>
						<option value={''}>All</option>
						{
							categories.map((c, index) => <option value={c.id} key={index} >{c.name}</option>)
						}
					</select>
				</div>
		        <div className="dates-search">
			        <input id="startDate" type="date" placeholder="Enter start date" onChange={e => setStartDateSearch(e.target.value)}/>
			        <input id="endDate" type="date" placeholder="Enter end date" onChange={e => setEndDateSearch(e.target.value)}/>
		        </div>
		        <button onClick={search}>Search</button>
		        <button onClick={clearSearch}>Clear</button>
	        </div>

	        <div className="content">
	            {
	                articles.map((a, index) => (<Article key={index} article={a}/>))
	            }
	        </div>
        </div>
    )
}

export default ArticleList;
