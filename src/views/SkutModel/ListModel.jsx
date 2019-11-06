import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import config from '../../config/config';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class ListModel extends Component {
    state = { 
        skutDirectory: [],
        delete: false
     }
    componentDidMount() {
        this.loadData();
    }
    rowClicked = (id) =>{
        this.props.history.push(
            {
                 pathname: "/model/"+ id,
                 state: { id: id }
            }
        )
     }
     delete = (id) =>{         
         confirmAlert({
             title: 'Confirm to Delete',
             message: 'Are you sure to do this.',
             buttons: [
               {
                 label: 'Yes',
                 onClick: () => {
                     const comp_this = this;
                     let token = localStorage.Skut_access_token;    
                     axios.defaults.headers.get["Authorization"] = "Bearer " + token;
                     axios.delete(config.auth.apiBaseUrl + "/api/scooter-models/"+ id + "/")
                         .then(function (response) {
                             comp_this.setState({delete: !comp_this.state.delete })
                         })
                         .catch(function (error, response) {
                             console.log('error in sada');
             
                         });  
                 }
               },
               {
                 label: 'No',
                 onClick: () => {
                     return;
                 }
               }
             ]
           })     
     }
     loadData = () =>{         
         const comp_this = this;
         let token = localStorage.Skut_access_token; 
         
         axios.defaults.headers.get["Authorization"] = "Bearer " + token ;
         
         axios.get(config.auth.apiBaseUrl + "/api/scooter-models/")
             .then(function (response) {
                 console.log(response, 'response');
                 
                 comp_this.setState({ skutDirectory: response.data }); 
             })
             .catch(function (error, response) {
                 console.log('error in sada');
 
             });
     }
    render() { 
        const dataDir = this.state.skutDirectory
        const data = []
        dataDir.map(function(item, k ){
            data.push(item);          
        })
        console.log(data, 'data');
        
        
        
        
        

        const columns = [            
            {
                id: 'name',
                Header: 'Name',
                accessor: d => d.name ,// Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'description',
                Header: 'Description',
                accessor: d => d.description ,// Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            }, 
            {
                id: 'category',
                Header: 'Category',
                accessor: d => d.category.name ,// Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            }, 
            {
                id: 'action', // Required because our accessor is not a string
                Header: 'Action',
                accessor: d => d.id, // Custom value accessors!
                Cell: props => <Button className='cell_des' onClick={() => this.rowClicked(props.value)}>View</Button>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'action', // Required because our accessor is not a string
                Header: 'Action',
                accessor: d => d.id, // Custom value accessors!
                Cell: props => <Button className='cell_des' onClick={() => this.delete(props.value)}>Delete</Button>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            }
        ]         
        return ( 
            <div className={"list-page"}>
                <p className={'pageTitle'}>List of Skut Models 
                    <span className={'add_btn'}><Link to="/model/addModel">
                        + 
                    </Link></span>
                </p>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize= {10}                    
                />
            </div>
         );
    }
}
 
export default ListModel;