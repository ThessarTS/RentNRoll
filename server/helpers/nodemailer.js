var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sajadhijir@gmail.com",
    pass: "curd vpkz tkto ismu",
  },
});
async function sendOTPByEmail(email, otp) {
  try {
    const mailOptions = {
      from: transporter.options.auth.user,
      to: email,
      subject: "Kode OTP untuk Login",
      text: `Kode OTP Anda adalah: ${otp}`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim: " + info.response);
  } catch (error) {
    console.error("Kesalahan saat mengirim email:", error);
    throw error;
  }
}

function generateOTP() {
  number = [];
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * 10);
    number.push(random);
  }
  number = number.join("");
  return number;
}

module.exports = { generateOTP, sendOTPByEmail };
