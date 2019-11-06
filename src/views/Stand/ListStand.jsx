import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import config from '../../config/config';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ListStand extends Component {
    state = { 
        standDirectory: [],
        delete: false
    }
    rowClicked = (id) =>{
        this.props.history.push(
            {
                 pathname: "/stand/"+ id,
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
                     axios.delete(config.auth.apiBaseUrl + "/api/stands/"+ id + "/")
                         .then(function (response) {
                             comp_this.loadData();
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
        
        axios.get(config.auth.apiBaseUrl + "/api/stands/")
            .then(function (response) {
                console.log(response, 'response');
                
                comp_this.setState({ standDirectory: response.data }); 
            })
            .catch(function (error, response) {
                console.log('error in sada');

            });
    }


    componentDidMount() {
        this.loadData();
    }
    render() { 
        const dataDir = this.state.standDirectory
        const data = []
        dataDir.map(function(item, k ){
            data.push(item);          
        })

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
                id: 'area',
                Header: 'Area',
                accessor: d => d.area.name ,// Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle:{
                    background: "#32304a",
                    color: "#fff"
                }
            }, 
            {
                id: 'coordinate',
                Header: 'Coordinate',
                accessor: d => d.coordinate ,// Custom value accessors!
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
                <p className={'pageTitle'}>List of Stands
                    <span className={'add_btn'}><Link to="/stand/addStand">
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
 
export default ListStand;