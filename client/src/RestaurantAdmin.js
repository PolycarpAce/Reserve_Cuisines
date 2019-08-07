import React from "react";
import axios from "axios";
import RestaurantForm from "./RestaurantForm";
import RestaurantTable from "./RestaurantTable";


class RestaurantAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nmae:"",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            restaurants: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false
        };

        this.resetFormState = this.resetFormState.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditRestaurant = this.handleEditRestaurant.bind(this);
        this.handleDeleteRestaurant = this.handleDeleteRestaurant.bind(this);

    }

    componentDidMount() {
        this.fetchRestaurants();
    }

    fetchRestaurants() {
        this.setState({tableLoading: true, tableError: false});

        axios.get("/api/restaurants").then(response => {
            this.setState({
                
                restaurants: response.data,
                tableLoading: false,
                tableError: false

            });
        })
        .catch(error => {
            this.setState({

                restaurants: [],
                tableLoading: false,
                tableError: false

            });
            
        });
    }

    resetFormState() {
        this.setState({

        })
    }
}

export default RestaurantAdmin;