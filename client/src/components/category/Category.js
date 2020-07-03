import React from 'react';

function Category(props) {
    const {category} = props;

    return (<div>{category.name}</div>);
}

export default Category;