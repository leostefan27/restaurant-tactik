const fs = require("fs");
const xml2js = require("xml2js");
const asyncHandler = require("express-async-handler");

var builder = new xml2js.Builder({
  cdata: true,
});
var parser = new xml2js.Parser({
  explicitArray: false,
});

// Function that gets the payment
const getPayment = (orderId, amount, currency, user, address) => {
  let date = new Date();

  const order = {
    $: { id: orderId, timestamp: date.getTime(), type: "card" },
    signature: ".......",
    url: {
      return: "......",
      confirm: ".......",
    },
    invoice: {
      $: {
        currency: currency,
        amount: amount,
      },
      details: "test plata",
      contact_info: {
        billing: {
          $: {
            type: "person",
          },
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          mobile_phone: user.phone,
          address: user.address,
        },
        shipping: {
          $: {
            type: "person",
          },
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          mobile_phone: user.phone,
          address: user.address,
        },
      },
    },
  };

  return order;
};

// Function that gets the request
const getRequest = (orderId) => {
  let xml = builder.buildObject(getPayment(orderId, 1, "RON"));
  return rc4.encrypt(publicKey, xml);
};

function decodeResponse(data) {
  return new Promise(function (resolve, reject) {
    parser.parseString(
      rc4.decrypt(privateKey, data.env_key, data.data),
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}
