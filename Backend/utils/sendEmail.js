const dotenv = require("dotenv")
const { logger } = require('./logger');

dotenv.config()

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.apiClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;


module.exports.sendEmail = function (recieverUserEmail, recieverName, subject, textContent) {
    const sendEmailToUser = {
        sender: { email: process.env.BREVO_SENDER_EMAIL },
        to: [
            { email: recieverUserEmail, name: recieverName },
        ],
        subject: `${subject} | The Beauty Aesthetics`,
        htmlContent: textContent,
    };
    apiInstance.sendTransacEmail(sendEmailToUser).then(
        function () {
            logger.info("Mail to: " + recieverUserEmail);
        },
        function (error) {
            logger.error(error);
        }
    );
}
