import React, { Component } from 'react';
import {  Route, Switch } from "react-router-dom";
import AddStand from './AddStand'
import ListStand from './ListStand'
import Edit from './Edit'

class Stand extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className={'page_content'}>
                        <Switch>                                 
                            <Route exact path="/stand/addStand" component={AddStand} />                        
                            <Route path="/stand/:id" component={Edit} />
                            <Route path="/stand" component={ListStand}/>
                        </Switch>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Stand;