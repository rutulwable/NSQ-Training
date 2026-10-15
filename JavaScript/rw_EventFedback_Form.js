// Validation 1 - Manage and Validate Feebdack Comments
function manageFeedbackComments(executionContext)
{
    var formContext = executionContext.getFormContext();
    var rating = formContext.getAttribute("rw_customer_rating").getValue();
    var comments = formContext.getAttribute("rw_feedback_comments");

    if (rating === 126290000 || rating === 126290001)
    {
        comments.setRequiredLevel("required");
    }
    else
    {
        comments.setRequiredLevel("none");
    }
}

function validateFeedbackComments(executionContext)
{
    var formContext = executionContext.getFormContext();
    var eventArgs = executionContext.getEventArgs();
    var rating = formContext.getAttribute("rw_customer_rating").getValue();
    var comments = formContext.getAttribute("rw_feedback_comments").getValue();

    if ((rating === 126290000 || rating === 126290001) && !comments)
    {
        eventArgs.preventDefault();

        formContext.ui.setFormNotification(
            "Feedback Comments are required when Customer Rating is 1 Star or 2 Star.",
            "ERROR",
            "feedbackValidation"
        );
    }
    else
    {
        formContext.ui.clearFormNotification("feedbackValidation");
    }
}

// Validation 2 - Manage and Validate Follow Up Remarks
function manageFollowUpRemarks(executionContext)
{
    var formContext = executionContext.getFormContext();
    var followUpRequired = formContext.getAttribute("rw_follow_up_required").getValue();
    var remarksAttribute = formContext.getAttribute("rw_follow_up_remarks");
    var remarksControl = formContext.getControl("rw_follow_up_remarks");

    if (followUpRequired === true)
    {
        remarksControl.setVisible(true);
        remarksAttribute.setRequiredLevel("required");
    }
    else
    {
        remarksAttribute.setValue(null);
        remarksAttribute.setRequiredLevel("none");
        remarksControl.setVisible(false);
    }
}

function validateFollowUpRemarks(executionContext)
{
    var formContext = executionContext.getFormContext();
    var eventArgs = executionContext.getEventArgs();
    var followUpRequired = formContext.getAttribute("rw_follow_up_required").getValue();
    var remarks = formContext.getAttribute("rw_follow_up_remarks").getValue();

    if (followUpRequired === true && !remarks)
    {
        eventArgs.preventDefault();

        formContext.ui.setFormNotification(
            "Follow Up Remarks are required when Follow Up Required is set to Yes.",
            "ERROR",
            "followupValidation"
        );
    }
    else
    {
        formContext.ui.clearFormNotification("followupValidation");
    }
}