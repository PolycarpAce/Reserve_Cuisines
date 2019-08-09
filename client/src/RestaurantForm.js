import React from "react";

//we make our form a controlled component that does not manage any state.
function RestaurantForm({
    name,
    formSubmitting,
    formSuccess,
    formError,
    handleNameChange,
    resetFormState,
    HandleSubmit
}) {
    const disable = !name;

    return(
        <form className="rc-form" onSubmit={HandleSubmit}>
            {formSuccess && (
                <p className="rc-alert rc-alert-success">
                    Form Submitted successfuly.
                </p>
            )}
            {formError && (
                <p className="rc-alert rc-alert rc-arlet-error">
                    Sorry, error submitting form. Please retry.
                </p>
            )}
            <div className="rc-form-row">
                <div className="rc-form-col">
                    <label htmlFor="name">Name</label>
                    <div className="rc-form-input-group">
                        <input type="text" name="name" className={valdationError.name ? "has-error" : ""} autoComplete="off" value={name} onChange={handleNameChange} disabled={formSubmitting} />
                        {valdationError.name && (
                            <span className="rc-form-input-error">
                                {validationErrors.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <button className="rc-btn rc-btn-form" type="submit" disabled={disable || formSubmitting}>
                Submit
            </button>
            <button className="rc-btn rc-btn-form" type="reset" onClick={resetFormState} disabled={formSubmitting}>
                Reset
            </button>
        </form>
    );
}

export default RestaurantForm;