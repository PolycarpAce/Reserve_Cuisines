import React from "react";



function Error({ message }) {
    return (
        <div className="rc-fullpage-text">
            <p>{message}</p>
        </div>
    );
}

Error.defaultProps = {
    message: "Sorry, a server error occured. Please retry."
};


export default Error;