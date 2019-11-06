import React, { Component } from 'react';
import {  Route, Switch } from "react-router-dom";
import AddSkut from './AddSkut'
import ListSkut from './ListSkut'
import Edit from './Edit'

class Skut extends Component {
    state = { 
        click: true
     }

    render() {
        return (
            <React.Fragment>
                <div className={'page_content'}>
                        <Switch>                                 
                            <Route exact path="/skut/addSkut" component={AddSkut} />                        
                            <Route path="/skut/:id" component={Edit} />
                            <Route path="/skut" component={ListSkut}/>
                        </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default Skut;