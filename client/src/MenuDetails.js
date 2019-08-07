import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";


class MenuDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDetails: [],
            restaurants: [],
            loading: false,
            error: false

        };
    }

    componentDidMount() {
        this.fetchMenuDetails();
    }

    fetchMenuDetails() {
        this.setState({ loading: true, error: false });

        const { menu_id } = this.props;
        const menuDetailsPromise = axios.get('/api/menu/${menu_id}');
        const restaurantsPromise = axios.get('/api/restaurants/${restaurant_id}/menu');

        axios.all([menuDetailsPromise, restaurantsPromise]).then(
            axios.spread((menuDetailsResponse, RestaurantsResponse) =>{
                this.setState({
                    menuDetails: menuDetailsResponse.data,
                    restaurants: RestaurantsResponse.data,
                    loading: false,
                    error: false
                });
            })
        )
        .catch(error => {
            this.setState({
                menuDetails: [],
                restaurants: [],
                loading: false,
                error: true
            });
        });
    }

    toDateString(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = date.getMonth() +1;
        const dat = date.getDate();

        return '${year}-${month}-${day}';
    }

    render() {
        const { menuDetails, restaurants, loading ,error } = this.state;
        
        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error />;
        }

        if (menuDetails.length !== 1) {
            return (
                <Error message="Sorry, the menu does not exist. Please retry." />

            );
        }
        
        const {
            dish_name,
            price,
            preparation_time
        } = menuDetails[0];
        const restaurantNameDateStrings = restaurants.map(restaurants => {
            const datastring = this.toDatatring(restaurants.time);

            return '${restaurants.name}:${dateString}';
        });
        const uniqueRestaurantNameDateString = [...new Set(restaurantNameDateStrings)];
        const restaurantDinner = uniqueRestaurantNameDateString.map(
            restaurantNameDate => {
                const restaurantName = restaurantNameDate.split(":")[0];
                const dateDinner = restaurantNameDate.split(":")[1];
                const times = restaurants.filter(
                    restaurants => restaurants.resturant_name === restaurantName && this.toDateString(restaurants.time) === dateDinner
                )
                .map(restaurants => {
                    const timeFormatter = new Intl.DateTimeFormat("en", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    });

                    return timeFormatter.format(new Date(restaurants.time));

                });

                const DateTimeFormat = new Intl.DateTimeFormat("en", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                return {
                    restaurantName, dateDinner: DateTimeFormat.format( new Date(dateDinner)), times
                };
            }
        );
        return (
            <div className="rc-container">
                <div className="rc-menu-details-wrapper">
                    <div className="rc-menu-details">
                        <img 
                        className="rc-menu-details-poster"
                        src={"food.jpeg"}
                        alt={dish_name}
                        />
                        <div className="rc-menu-details-info">
                            <h2>{dish_name}</h2>
                            <p>{preparation_time}</p>
                            <p>
                                <span>price</span>
                            </p>
                            <p>
                                <span></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className= "rc-menu-restaurants">
                    <h1>Restaurants offering dinner</h1>
                    {restaurantDinner.map(restaurants => {
                        const { restaurantName, dateDinner, times } = restaurants;

                        return (
                            <div key={'${restaurantName}:${dateDinner}'} className="rc-menu-restaurant">
                                <h3>{restaurantName}</h3>
                                <p>{dateDinner}</p>
                                <p>
                                    {times.map(time =>(<span key={time}>{time}</span>))}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}



export default MenuDetails;