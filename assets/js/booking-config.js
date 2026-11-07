/* Meet the Author booking.

   PLACEHOLDER email: replace the email value with the real contact address
   before sharing the request form. The placeholder is not a working inbox.

   Leave calendly.inPerson and calendly.virtual as empty strings to show the
   availability-request form. When an https Calendly URL is set for an event
   type, that event embeds a Calendly scheduler. When both URLs are set, the
   request form is hidden.
*/
window.BOOKING_CONFIG = {
  email: "PLACEHOLDER_REPLACE_WITH_AUTHOR_EMAIL@example.com",
  sessionMinutes: 30,
  calendly: {
    inPerson: "",
    virtual: ""
  }
};
