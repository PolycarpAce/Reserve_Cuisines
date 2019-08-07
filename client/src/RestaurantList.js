import React from"react";
import axios from "axios";
import { Link } from "@reach/router";
import Loading from "./Loading";
import Error from "./Error";

class RestaurantList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            Loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchRestaurants();
    }

    fetchRestaurants() {
        this.setState({ loading: true, error: false });

        axios.get("/api/restaurants").then(respose => {
            this.setState({
                restaurants: respose.data,
                loading: false,
                error: false
            });
        })
        .catch(error => {
            this.setState({
                restaurants: [],
                loading: false,
                error: true
            });
        });
    }

    render() {
        const { restaurants, loading, error } = this.state;

        if(loading) {
            return <Loading />;
        }

        if(error) {
            return <Error />
        }

        return (
            <div className="rc-conteiner">
                <div className="rc-restaurant-list">
                    {restaurants.map(r => (
                        <div key={r.id} className="rc-restaurants">
                            <div className="rc-restaurants-body">
                                <div className="rc-title">{r.name}</div>
                            </div>
                            <div className="rc-restaurants-footer">
                                <Link to={'/restaurants/${r.id}'}
                                className="rc-btn rc-btn-menu"
                                >
                                    See Menu
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        );
    }
    

    
}

export default RestaurantList;