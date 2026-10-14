function validateEmail(executionContext) {

    // Get form context
    var formContext = executionContext.getFormContext();

    // Get email value
    var email = formContext.getAttribute("emailaddress").getValue();

    // Check if email has value
    if (email != null) {

        // Convert to lowercase
        email = email.toLowerCase();

        // Check forbidden domain
        if (email.endsWith("@nsquarexperts.com")) {

            // Show error message
            formContext.ui.setFormNotification(
                "Email address from @nsquarexperts.com is not allowed.",
                "ERROR",
                "emailValidation"
            );

            // Clear field
            formContext.getAttribute("emailaddress").setValue(null);
        }
        else {

            // Remove error message
            formContext.ui.clearFormNotification("emailValidation");
        }
    }
}


// Ocassion And Shop Look-up Filtering

function filterShopLookup(executionContext) {

    var formContext = executionContext.getFormContext();

    //formContext.getAttribute("rw_shops").setValue(null);

    formContext.getControl("rw_shops").addPreSearch(function () {

        var occasion =
            formContext.getAttribute("rw_occasion").getValue();

        if (occasion == null) {
            return;
        }

        var filterXml =
            "<filter type='and'>" +
            "<condition attribute='rw_events_organized_here' operator='eq' value='" +
            occasion +
            "' />" +
            "</filter>";

        formContext.getControl("rw_shops")
            .addCustomFilter(filterXml);
    });
}



function addShopFilter(formContext, occasion) {

    var filterXml =
        "<filter type='and'>" +
        "<condition attribute='rw_events_organized_here' operator='eq' value='" +
        occasion +
        "' />" +
        "</filter>";

    formContext.getControl("rw_shops")
        .addCustomFilter(filterXml);
}