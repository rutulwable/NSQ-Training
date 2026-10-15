function validateEmail(executionContext) {
    var formContext = executionContext.getFormContext();
    var email = formContext.getAttribute("emailaddress").getValue();

    if (email != null) {
        email = email.toLowerCase();

        if (email.endsWith("@nsquarexperts.com")) {
            formContext.ui.setFormNotification(
                "Email address from @nsquarexperts.com is not allowed.",
                "ERROR",
                "emailValidation"
            );
            formContext.getAttribute("emailaddress").setValue(null);
        }
        else {
            formContext.ui.clearFormNotification("emailValidation");
        }
    }
}


// Ocassion And Shop Look-up Filtering

function handleOccasionChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var occasion = formContext.getAttribute("rw_occasion").getValue();
    var shopControl = formContext.getControl("rw_shops");

    if (occasion == null) {
        formContext.getAttribute("rw_shops").setValue(null);
        shopControl.setDisabled(true);
        return;
    }

    shopControl.setDisabled(false);

    formContext.getControl("rw_shops")
        .addPreSearch(function () {
            addShopFilter(formContext, occasion);
        });
}


function addShopFilter(formContext, occasion) {

    var filterXml =
        "<filter type='and'>" +
        "<condition attribute='rw_events_organized_here' operator='eq' value='" + occasion + "' />" +
        "</filter>";

    formContext.getControl("rw_shops")
        .addCustomFilter(filterXml);
}




function handleSpouseName(executionContext) {

    var formContext = executionContext.getFormContext();
    var occasion = formContext.getAttribute("rw_occasion").getValue();
    var spouseControl = formContext.getControl("rw_spouse_name");
    var spouseAttribute = formContext.getAttribute("rw_spouse_name");

    if (occasion == 126290002) {
        spouseControl.setVisible(true);
        spouseAttribute.setRequiredLevel("required");
    }
    else {
        spouseControl.setVisible(false);
        spouseAttribute.setRequiredLevel("none");
        spouseAttribute.setValue(null);
    }
}




function lockFieldsBasedOnStatus(executionContext) {

    var formContext = executionContext.getFormContext();
    var approvalText = formContext.getAttribute("rw_management_approval").getText();

    if (approvalText == "Initiated" ||approvalText == "Approved" || approvalText == "Rejected" ) 
        {
        var fields = [ "rw_title", "rw_first_name", "rw_last_name", "emailaddress", "rw_mobile_number", "rw_wow_moment_date", "rw_occasion", "rw_shops" ];
        for (var i = 0; i < fields.length; i++) {
            formContext.getControl(fields[i])
                .setDisabled(true);
        }
    }
}






// Validation 6 - Invalid Wow Moment Date Validation
function validateWowMomentDate(executionContext)
{
    var formContext = executionContext.getFormContext();
    var eventArgs = executionContext.getEventArgs();
    var wowMomentDate = formContext.getAttribute("rw_wow_moment_date").getValue();

    if (!wowMomentDate)
    {
        return;
    }

    var today = new Date();
    today.setHours(0,0,0,0);

    var minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    var maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 180);

    wowMomentDate.setHours(0,0,0,0);

    if (wowMomentDate < minDate || wowMomentDate > maxDate)
    {
        eventArgs.preventDefault();

        formContext.ui.setFormNotification(
            "Invalid Wow Moment Date. Please select a date that is at least 2 days after today and no more than 180 days from today.",
            "ERROR",
            "wowMomentDateValidation"
        );
    }
    else
    {
        formContext.ui.clearFormNotification("wowMomentDateValidation");
    }
}

//Validation 7 - first Name and last name validation
function validateName(executionContext)
{
    var formContext = executionContext.getFormContext();
    var fieldName = executionContext.getEventSource().getName();
    var attribute = formContext.getAttribute(fieldName);
    var value = attribute.getValue();

    if (!value)
    {
        return;
    }

    var regex = /^[A-Za-z-]{2,}$/;

    if (!regex.test(value))
    {
        attribute.setValue(null);

        formContext.ui.setFormNotification(
            "Only alphabets and hyphens are allowed. Name must contain at least 2 characters.",
            "ERROR",
            fieldName
        );
    }
    else
    {
        formContext.ui.clearFormNotification(fieldName);
    }
}

// Validation 8 - Mobile number validation
function validateMobileNumber(executionContext)
{
    var formContext = executionContext.getFormContext();

    var mobile = formContext.getAttribute("rw_mobile_number").getValue();

    if (!mobile)
    {
        return;
    }

    var regex = /^\+91\d{10}$/;

    if (!regex.test(mobile))
    {
        formContext.getAttribute("rw_mobile_number").setValue(null);

        formContext.ui.setFormNotification(
            "Invalid mobile number. Enter the number in +91XXXXXXXXXX format with exactly 10 digits after +91.",
            "ERROR",
            "mobileValidation"
        );
    }
    else
    {
        formContext.ui.clearFormNotification(
            "mobileValidation"
        );
    }
}

// Validation 9 - Rejection Remarks validation
function manageRejectionRemarks(executionContext)
{
    var formContext = executionContext.getFormContext();

    var status = formContext.getAttribute("rw_management_approval").getValue();

    var remarks = formContext.getAttribute("rw_rejection_remarks");

    // Replace with actual Rejected option value
    var rejectedValue = 126290002;

    if(status === rejectedValue)
    {
        remarks.setRequiredLevel("required");
    }
    else
    {
        remarks.setRequiredLevel("none");
    }
}

function validateRejectionRemarks(executionContext)
{
    var formContext = executionContext.getFormContext();
    var eventArgs = executionContext.getEventArgs();
    var status = formContext.getAttribute("rw_management_approval").getValue();
    var remarks = formContext.getAttribute("rw_rejection_remarks").getValue();

    // Replace with actual Rejected option value
    var rejectedValue = 3;

    if(status === rejectedValue && !remarks)
    {
        eventArgs.preventDefault();

        formContext.ui.setFormNotification(
            "Rejection Remarks are required when the Management Approval Status is Rejected.",
            "ERROR",
            "rejectionRemarksValidation"
        );
    }
    else
    {
        formContext.ui.clearFormNotification(
            "rejectionRemarksValidation"
        );
    }
}