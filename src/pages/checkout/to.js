var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const params = (body) => ({
  TableName: 'Order',
  Item: {
    "cartProducts": {
      "L": body.products.map((product) => ({
        M: {
          img: { "L": product.photos.map((p) => ({ S: p })) },
          title: { "S": product.name },
          price: { "N": product.price.toString() },
          quantity: { "N": product.quantity.toString() }
        }
      }))
    },
    "title": { S: "Pedido - " + new Date(Date.now()).toLocaleDateString('br') },
    "createdAt": { S: new Date(Date.now()).toISOString() },
    "price": { N: "123" },
    "quantity": { N: "1" },
    "orderSummary": {
      M: {
        "discount": {
          "N": body.orderSummary.discount.toString()
        },
        "orderId": {
          "S": body.orderSummary.orderId
        },
        "quantity": {
          "N": body.orderSummary.quantity.toString()
        },
        "shipping": {
          "N": body.orderSummary.shipping.toString()
        },
        "subTotal": {
          "N": body.orderSummary.subTotal.toString()
        },
        "total": {
          "N": body.orderSummary.total.toString()
        }
      }
    },
    "shippingDetails": {
      M: {
        addressLine1: { S: body.shippingDetails.addressLine1 },
        addressLine2: { S: body.shippingDetails.addressLine2 },
        city: { S: body.shippingDetails.city },
        state: { S: body.shippingDetails.state },
        country: { S: body.shippingDetails.country },
        email: { S: body.shippingDetails.email },
        firstName: { S: body.shippingDetails.firstName },
        lastName: { S: body.shippingDetails.lastName },
        mobile: { S: body.shippingDetails.mobile },
        pinCode: { S: body.shippingDetails.pinCode }
      }
    }
  }
});

exports.handler = async (event) => {
  console.log(event)
  const body = JSON.parse(event.body)
  console.log(body.products)
  // console.log(params(body))
  await ddb.putItem(params(body), function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  }).promise();
  const response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*"
    },
    statusCode: 200,
    body: JSON.stringify('Pedido registrado com sucesso!'),
  };
  return response;
};
