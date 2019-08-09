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
            name: "",
            editing: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false

        });
    }

    isValid() {
        const { validationErrors, isValid} = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    validateFormInput(data) {
        const validationErrors = {};
        const { name } = data;

        if (!name) {
            validationErrors.name = "this field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).lenth === 0
        };
    }
    
    handleNameChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { editing, restaurants, id, name } = this.state;

        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing) {
                // Existing record - update
                axios.put('/api/restaurants/${restaurant_id}', { name }).then(response => {
                    this.resetFormState();

                    const index = restaurants.findIndex(c => c.id === id);

                    this.setState({
                        formSuccess: true,
                        restaurants: [
                            ...restaurants.slice(0, index),
                            { id, name },
                            ...restaurants.slice(index + 1)
                        ]
                    });
                })
                .catch(error => {
                    this.setState({
                        validationErrors: {},
                        formSubmitting: false,
                        formSuccess: false,
                        formError: true
                    });
                });
            } else {
                //New record - save
                axios.post("/api/restaurants", { name }).then(response => {
                    this.resetFormState();
                    this.setState({
                        formSuccess: true,
                        restaurants: [...restaurants, {id: response.data, name }]
                    });
                })
                .catch(error => {
                    this.setState({
                        validationErrors: {},
                        formSubmitting: false,
                        formSuccess: false,
                        formError:true
                    });
                });
            }
        }
    }

    handleEditRestaurant(restaurants) {
        return () => {
            this.setState({ ...restaurants, editing: true });
        };
    }

    handleDeleteRestaurant(restaurant, restaurants) {
        return () => {
            const {id, name } = restaurants;

            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to delete'${name}'?")) {
                axios.delete('/api/restaurants/${restaurant_id}').then(response => {
                    const index = restaurants.findIndex(r => r.id === id);

                    this.setState({
                        restaurants: [
                            ...restaurants.slice(0, index),
                            ...restaurants.slice(index + 1)
                        ],
                        deleteSuccess: true,
                        tableError: false
                    });
                })
                .catch(error => {
                    this.setState({
                        deleteSuccess: false,
                        tableError: true
                    });
                });
            }
        };
    }
    render() {
        const {
            name,
            editing,
            formSubmitting,
            validationErrors,
            formSuccess,
            formError,
            restaurants,
            tableLoading,
            tableError,
            deleteSuccess
        } = this.state;

        return (
            <div className="rc-restaurant-admin">
                <h1>Restaurants</h1>
                <h3>{editing ? "Edit Restaurants": "Add Restaurants"}</h3>
                <RestaurantForm name={name} formSubmitting={formSubmitting} validationErrors={validationErrors} formSuccess={formSuccess} formError={formError} handleNameChange={this.handleNameChange} resetFormState={this.resetFormState} handleSubmit={this.handleSubmit}/>
                <RestaurantTable restaurants={restaurants} tableLoading={tableLoading} deleteSuccess={deleteSuccess} onEditRestaurants={this.handleEditRestaurant} onDeleteRestaurants={this.handleDeleteRestaurant}/>
            </div>
        );
    }
}

export default RestaurantAdmin;