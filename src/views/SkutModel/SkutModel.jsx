import React, { Component } from 'react';
import {  Route, Switch } from "react-router-dom";
import AddModel from './AddModel'
import ListModel from './ListModel'
import Edit from './Edit'

class SkutModel extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className={'page_content'}>
                        <Switch>                                 
                            <Route exact path="/model/addModel" component={AddModel} />                        
                            <Route path="/model/:id" component={Edit} />
                            <Route path="/model" component={ListModel} test={'test'}/>
                        </Switch>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SkutModel;