import React, {useEffect, useState} from 'react';
import {CategoriesService} from '../../services/category.service';
import Category from './Category'

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategory] = useState('');

    useEffect(() => {
        CategoriesService.getCategories()
            .then(data => {
                setCategories(data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const addCategory = () => {
        if (newCategoryName) {
            CategoriesService.addCategory({ name: newCategoryName }).then((newCategory) => {
                setCategories([...categories, newCategory]);
                setNewCategory('')
            }).catch(console.log);
        }
    };

    const onCategoryNameChange = (event) => {
        setNewCategory(event.target.value);
    };

    return (
        <div>
            <div>
                <span>categories list:</span>
            </div>
            <br/>
            <div className="category-list">
                {
                    categories.map((c, i) => (<Category key={i} category={c}/>))
                }
            </div>
            <div>
                <input value={newCategoryName} onChange={onCategoryNameChange}/>
                <button onClick={addCategory}>Add category</button>
            </div>
        </div>
    )
}

export default CategoryList;
