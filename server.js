const express = require('express');
require('dotenv').config();

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({origin:'*'}));


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: "shivanichouksey1702@gmail.com", // replace with your email
    pass:"vjxfmczknxffjqqc", // replace with your email password
  },
});

app.post('/api/sendEmail', async (req, res) => {
  try {
    const { name, email, message } = req.body;
// console.log("data",name)
    const mailOptions = {
      from:"shivanichouksey1702@gmail.com", // replace with your email
      to: email, // replace with the recipient's email
      subject: 'New My PORTFOLIO Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

   await transporter.sendMail(mailOptions);
 

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
