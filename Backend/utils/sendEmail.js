const dotenv = require("dotenv")
dotenv.config()

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
const apiKey = apiInstance.apiClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;


const sendSmtpEmail = new brevo.SendSmtpEmail();


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
