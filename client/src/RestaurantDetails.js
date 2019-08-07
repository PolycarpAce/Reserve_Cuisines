import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantDetails: [],
            menu: [],
            Loading: false,
            error: false
        };
    }
    componentDidMount() {
        this.fetchRestaurantDetails();
    }

    fetchRestaurantDetails() {
        this.setState({ loading: true, error: false });

        const { restaurant_id } = this.props;
        const restaurantDetailsPromise = axios.get('/api/restaurants/${restaurant_id}');
        const menuPromise =  axios.get('/api/restaurants/${restaurant_id}/menu');

        axios.all([restaurantDetailsPromise, menuPromise]).then(
            axios.spread((restaurantDetailsResponse, menuResponse) => {
                this.setState({
                    restaurantDetails: restaurantDetailsResponse.data,
                    menu: menuResponse.data,
                    loading: false,
                    error: false
                });
            })
        )
        .catch(error => {
            this.setState({
                restaurantDetails: [],
                menu: [],
                loading: false,
                error: true
            });
        });
    }

    toDateString(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return '${year}-${month}-${day}';
    }

    render() {
        const { restaurantDetails, menu, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error/>
        }

        if (restaurantDetails.length !== 1) {
            return (
                <Error message="Sorry, the restaurant does not exist. Please retry. " />
            );
        }

        const { name } = restaurantDetails[0];
        const menuIdDateString = menu.map(menu => {
            const dateString = this.toDateString(menu.time);

            return '${menu.menu_id}:${dateString}';
        });
        const uniqueMenuIdDateString = [...new Set(menuIdDateString)];
        const restaurantDinner = uniqueMenuIdDateString.map(
            menuIdDate => {
                const menuId = Number(menuIdDate.split(":")[0]);
                const dinnerTime = menuIdDate.split(":")[1];
                const time = menu.filter(
                    menu => menu.menu_id === menuId && this.toDateString(menu.time) === dinnerTime
                )
                .map(menu => {
                    const timeFormatter = new Intl.DateTimeFormat("en", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    });
                    return timeFormatter.format(new Date(menu.time));
                });
                const dateFormatter = new Intl.DateTimeFormat("en",{
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                return {
                    menuId,
                    dinnerTime: dateFormatter.format(new Date(dinnerTime)),
                    times
                };
            }
        );

        return (
            <div className="rc-container">
                <h1>{name}</h1>
                {dinnerInRestaurant.map(dinnerTime => {
                    const { menuId, dinnerTime, times } = dinnerTime;
                    const{
                        dish_name,
                        price,
                        preparation_time
                    } = menu.filter(m => m.menu_id === menuId)[0];

                    return(
                        <div key={'${menuId}:${dinnerTime}'} className="rc-menu-datails-wrapper">
                            <div className="rc-menu-details">
                                <img className="rc-menu-details-poster" src={logo.svg} alt={dish_name} />
                                <div className="rc-menu-deatils-info">
                                    <h2>{dish_name}</h2>
                                    <p>
                                        <span>preparation_time</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

}





export default RestaurantDetails;