import React, { Component } from 'react';
import {  Route, Switch } from "react-router-dom";
import AddCategory from './AddCategory'
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'

class Category extends Component {
    state = { 
        click: true
     }
    render() {
        return (
            <React.Fragment>
                <div className={'page_content'}>
                        <Switch>                                 
                            <Route exact path="/category/addCategory" component={AddCategory} />                        
                            <Route path="/category/:id" component={EditCategory} />
                            <Route path="/category" component={ListCategory} test={'test'}/>
                        </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default Category;