const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "tylernorbury96@gmail.com",
        subject: "Welcome to Task Manager!",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "tylernorbury96@gmail.com",
        subject: "Sorry to see you go!",
        text: `Sorry to see you leave ${name}, is there anything we could've changed to have made you stay?`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail,
};
