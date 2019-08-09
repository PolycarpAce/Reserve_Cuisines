import React from "react";

function RestaurantTable({
    restaurants,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditRestaurant,
    onDeleteRestaurant
}) {
    if (tableLoading) {
        return <p className="rc-table-loading">Loading Restaurants..... </p>;
    }

    return (
        <div className="rc-table">
            {deleteSuccess &&(
                <p className="rc-alert rc-alert-success">
                    Record deleted successfully.
                </p>
            )}
            {tableError && (
                <p className="rc-alert rc-alert-error">
                    Sorry, a sever error occurred. Please Retry.
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {restaurants.length === 0 && (
                <tbody>
                    {restaurants.map((restaurant, index) => {
                        const {id, name } = restaurant;

                        return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>
                                    <span className="rc-table-link" onClick={onEditRestaurant(restaurant)}>
                                        Edit
                                    </span>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <span className="rc-table-link" onClick={onDeleteRestaurant(
                                        restaurant,
                                        restaurants
                                    )}>
                                        Delete 
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
            </table>
            
        </div>
    );
}

export default RestaurantTable;