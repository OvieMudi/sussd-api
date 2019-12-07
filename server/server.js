const express = require('express');
const logger = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const PORT = process.env.PORT || 3010;

app.get('*', (req, res) => {
  res.send('Welcome to this simple App');
});

app.post('*', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let defaultMessage = `What would you like to check?
  1. My phone number
  2. My account`;

  let STATUS = 200;

  let response;
  let phone;
  let accountBalance;
  let accountNumber;

  if (text == '') {
    response = `CON ${defaultMessage}`;
  } else if (text == '1') {
    phone = '07031841477';
    response = `END Your phone number is ${phone}`;
  } else if (text == '2') {
    response = `CON What information do want to view?
    1. Account balance
    2. Account number`;
  } else if (text == '2*1') {
    accountBalance = 'N310,573,620.78';
    response = `END Your account balance is: ${accountBalance}`;
  } else if (text == '2*2') {
    accountNumber = '2110091689';
    response = `END Your account number is: ${accountNumber}`;
  } else {
    STATUS = 400;
    response = `CON INVALID INPUT.
    ${defaultMessage}`;
  }

  return res.status(STATUS).send(response);
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
