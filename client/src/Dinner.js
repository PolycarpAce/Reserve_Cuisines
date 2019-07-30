import React from "react";
import axios from "axios";
import Menu from "./Menu";
import loading from "./Loading";
import Error from "./Error";

class Dinner extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            availableDinner: [],
            loading: false,
            error: false

        };
    }

    componentDidMount() {
        this.fetchavailableDinner();
    }

    fetchavailableDinner() {
        this.setState({ loading: true, error: false });

        axios.get("/api/menu").then(response =>{
            this.setState({
                availableDinner: response.data,
                loading: false,
                error: false
            });
        })
        .catch(error=> {
            this.setState({
                availableDinner: [],
                loading: false,
                error: true
            });
        });
    }

    render() {
        const { availableDinner, loading, error } = this.state;

        if (loading) {
            return <loading />;
        }

        if (error) {
            return <Error />;
        }
    
        return(
            <div className="rc-container">
                <div className="rc-dinner">
                    {availableDinner.map(m =>(
                        <Menu key={m.menu_id} availableDinner={m} />
                    ))}
                </div>
            </div>
    
        );
        
    }
}



export default Dinner;