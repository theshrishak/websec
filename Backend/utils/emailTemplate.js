
module.exports.welcomeEmailTemplate = (fullName, email = "", defaultPassword = "") => {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <table width="100%" style="padding: 20px; background-color: #f5f5f5;">
        <tr>
          <td align="center">
            <table width="600" style="background-color: #ffffff; padding: 30px; border-left: 6px solid #FFD700; border-radius: 6px;">
              <tr>
                <td align="center">
                  <h2 style="color: #000000;">Welcome to Beauty Aesthetics 🎉</h2>
                  <p style="color: #333333; font-size: 16px;">
                    Hi ${fullName},<br><br>
                    We're excited to welcome you to the Beauty Aesthetics family! From everyday essentials to exclusive deals, we're here to make your shopping experience simple, sustainable, and satisfying.
                  </p>

                  ${defaultPassword ? `
                    <div style="margin: 20px 0; text-align: left;">
                      <p style="color: #333333; font-size: 16px;"><strong>Your login details are:</strong></p>
                      <p style="color: #333333; font-size: 16px;">Email: <strong>${email}</strong></p>
                      <p style="color: #333333; font-size: 16px;">Password: <strong>${defaultPassword}</strong></p>
                    </div>
                  ` : ""}

                  <p style="color: #333333; font-size: 16px;">
                    Start exploring now and enjoy convenience like never before.
                  </p>

                  <a href="https://www.beautyhub.com" style="display: inline-block; background-color: #28a745; color: white; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 20px;">Visit Our Store</a>
                  <p style="color: #888888; font-size: 14px; margin-top: 30px;">Have questions? <a href="https://www.beautyhub.com/contact" style="color: #007BFF; text-decoration: none;">We're here to help</a></p>
                  <p style="color: #999999; font-size: 12px;">Your Convenience, Our Commitment – The Beauty Aesthetics Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};


module.exports.resetPasswordEmailTemplate = (fullName, resetCode, resetCodeExpirationTime) => {
  return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
    <table width="100%" style="padding: 20px; background-color: #f5f5f5;">
      <tr>
        <td align="center">
          <table width="600" style="background-color: #ffffff; padding: 30px; border-left: 6px solid #FFD700; border-radius: 6px;">
            <tr>
              <td align="center">
                <h2 style="color: #000000;">Reset Your Password</h2>
                <p style="color: #333333; font-size: 16px;">
                  Hello ${fullName},<br><br>
                  Use the OTP below to reset your password. This code will expire in ${resetCodeExpirationTime}.
                </p>
                <div style="font-size: 36px; font-weight: bold; color: #28a745; margin: 20px 0;">
                  ${resetCode}
                </div>
                <a href="https://www.beautyhub.com/reset" style="display: inline-block; color: #007BFF; font-weight: bold; font-size: 14px; text-decoration: none; margin-top: 20px;">Reset Password</a>
                <p style="color: #888888; font-size: 14px; margin-top: 30px;">Didn’t request this? You can safely ignore this email.</p>
                <p style="color: #999999; font-size: 12px;">Stay secure – The Beauty Aesthetics Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `
}

module.exports.createBookingEmailTemplate = (
  fullName,
  serviceName,
  serviceType,
  bookingDate,
  bookingTime,
  appointmentPlace = "Studio"
) => {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <table width="100%" style="padding: 20px; background-color: #f5f5f5;">
        <tr>
          <td align="center">
            <table width="600" style="background-color: #ffffff; padding: 30px; border-left: 6px solid #FFD700; border-radius: 6px;">
              <tr>
                <td align="center">
                  <h2 style="color: #000000;">Congratulations! Your Booking is Confirmed! 💅</h2>
                  <p style="color: #333333; font-size: 16px;">
                    Hi ${fullName},<br><br>
                    Thank you for booking with <strong>Beauty Aesthetics</strong>! We're thrilled to help you look and feel your best.
                  </p>
                  <div style="margin: 24px 0; text-align: left;">
                    <h3 style="color: #FFD700; margin-bottom: 10px;">Booking Details</h3>
                    <table style="width:100%; font-size: 16px; color: #333;">
                      <tr>
                        <td style="padding: 6px 0;"><strong>Service:</strong></td>
                        <td style="padding: 6px 0;">${serviceName} (${serviceType})</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Date:</strong></td>
                        <td style="padding: 6px 0;">${bookingDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Time:</strong></td>
                        <td style="padding: 6px 0;">${bookingTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Place:</strong></td>
                        <td style="padding: 6px 0;">${appointmentPlace}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #333333; font-size: 16px;">
                    Please arrive 15 minutes before your appointment. If you need to reschedule or have any questions, feel free to contact us.
                  </p>
                  <a href="https://www.beautyhub.com" style="display: inline-block; background-color: #28a745; color: white; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 20px;">View My Bookings</a>
                  <p style="color: #888888; font-size: 14px; margin-top: 30px;">Need help? <a href="https://www.beautyhub.com/contact" style="color: #007BFF; text-decoration: none;">Contact us</a></p>
                  <p style="color: #999999; font-size: 12px;">We look forward to seeing you!<br>The Beauty Aesthetics Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
module.exports.bookingReminderEmailTemplate = (
  fullName,
  serviceName,
  serviceType,
  bookingDate,
  bookingTime,
  appointmentPlace = "Studio"
) => {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <table width="100%" style="padding: 20px; background-color: #f5f5f5;">
        <tr>
          <td align="center">
            <table width="600" style="background-color: #ffffff; padding: 30px; border-left: 6px solid #FFD700; border-radius: 6px;">
              <tr>
                <td align="center">
                  <h2 style="color: #000000;">⏰ Friendly Reminder: Your Appointment is Soon!</h2>
                  <p style="color: #333333; font-size: 16px;">
                    Hi ${fullName},<br><br>
                    This is a gentle reminder that your <strong>Beauty Aesthetics</strong> appointment is coming up soon.
                  </p>
                  <div style="margin: 24px 0; text-align: left;">
                    <h3 style="color: #FFD700; margin-bottom: 10px;">Appointment Details</h3>
                    <table style="width:100%; font-size: 16px; color: #333;">
                      <tr>
                        <td style="padding: 6px 0;"><strong>Service:</strong></td>
                        <td style="padding: 6px 0;">${serviceName} (${serviceType})</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Date:</strong></td>
                        <td style="padding: 6px 0;">${bookingDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Time:</strong></td>
                        <td style="padding: 6px 0;">${bookingTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;"><strong>Place:</strong></td>
                        <td style="padding: 6px 0;">${appointmentPlace}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #333333; font-size: 16px;">
                    Please arrive 10-15 minutes early to ensure a smooth check-in. If you have any questions or need to reschedule, just let us know!
                  </p>
                  <a href="https://www.beautyhub.com" style="display: inline-block; background-color: #28a745; color: white; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 20px;">View My Bookings</a>
                  <p style="color: #888888; font-size: 14px; margin-top: 30px;">Need help? <a href="https://www.beautyhub.com/contact" style="color: #007BFF; text-decoration: none;">Contact us</a></p>
                  <p style="color: #999999; font-size: 12px;">We're looking forward to seeing you soon!<br>The Beauty Aesthetics Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

