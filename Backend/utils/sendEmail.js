const dotenv = require("dotenv")
const brevo = require("@getbrevo/brevo");
dotenv.config()

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

module.exports.sendEmail = function (recieverUserEmail, recieverName, subject, textContent) {
    sendSmtpEmail = {
        sender: { email: process.env.BREVO_SENDER_EMAIL },
        to: [
            { email: recieverUserEmail, name: recieverName },
        ],
        subject: `${subject} | The Beauty Aesthetics`,
        htmlContent: textContent,
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function () {
            console.log("Mail to: " + recieverUserEmail);
        },
        function (error) {
            console.error(error);
        }
    );
}