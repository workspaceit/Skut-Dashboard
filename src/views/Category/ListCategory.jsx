import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import config from '../../config/config';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ListCategory extends Component {
    state = {
        skutDirectory: []
    }

    loadData = () => {
        // const prop = this.props;
        const comp_this = this;
        axios.defaults.headers.get["Authorization"] = "Bearer " + this.state.acces_token;
        axios.get(config.auth.apiBaseUrl + "/api/scooter-categories/")
            .then(function (response) {
                // console.log(response.data);
                comp_this.setState({ skutDirectory: response.data });

            })
            .catch(function (error, response) {
                console.log('error in sada');

            });
    }

    delete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const comp_this = this;
                        axios.defaults.headers.get["Authorization"] = "Bearer " + this.state.acces_token;
                        axios.delete(config.auth.apiBaseUrl + "/api/scooter-categories/" + id + "/")
                            .then(function (response) {
                                comp_this.setState({ delete: !comp_this.state.delete })
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

    rowClicked = (id) => {
        this.props.history.push(
            {
                pathname: "/category/" + id,
                state: { id: id }
            }
        )
    }
    componentDidMount() {
        this.loadData();
    }
    render() {


        const dataDir = this.state.skutDirectory
        const data = []
        dataDir.map(function (item, k) {
            data.push(item);
        })
        const columns = [
            {
                id: 'Model', // Required because our accessor is not a string
                Header: 'Name',
                accessor: d => d.name,// Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle: {
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'description', // Required because our accessor is not a string
                Header: 'Description',
                accessor: d => d.description, // Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle: {
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'created', // Required because our accessor is not a string
                Header: 'Created At',
                accessor: d => d.created_at, // Custom value accessors!
                Cell: props => <span className='cell_des'>{props.value}</span>, // Custom cell components!
                headerStyle: {
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'action', // Required because our accessor is not a string
                Header: 'Action',
                accessor: d => d.id, // Custom value accessors!
                Cell: props => <Button className='cell_des action_btn' onClick={() => this.rowClicked(props.value)}>View</Button>, // Custom cell components!
                headerStyle: {
                    background: "#32304a",
                    color: "#fff"
                }
            },
            {
                id: 'action', // Required because our accessor is not a string
                Header: 'Action',
                accessor: d => d.id, // Custom value accessors!
                Cell: props => <Button className='cell_des action_btn' onClick={() => this.delete(props.value)}>Delete</Button>, // Custom cell components!
                headerStyle: {
                    background: "#32304a",
                    color: "#fff"
                }
            }
        ]
        return (
            <div className={"list-page"}>
                <p className={'pageTitle'}>List of Categories
                <span className={'add_btn'}><Link to="/category/addCategory">
                        <p>+ </p>
                    </Link></span>
                </p>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                />
            </div>
        );
    }
}

export default ListCategory;