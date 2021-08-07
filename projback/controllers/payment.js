const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "xtc6jfrkj84nfv6h",
    publicKey: "27nrxz37fw369nb5",
    privateKey: "f97e42485ab97d10b901897898c8169a"
  });

exports.getToken = (req,res)=>{

    gateway.clientToken.generate({
        
      }, (err, response) => {
        
        if (err) {
            return res.status(500).json({err:"galat hai bhai!"})
        }
        else{
            return res.json(response)
        }
      });
}

exports.payemnt =(req,res)=>{
    let nonceFromTheClient = req.body.nonceFromTheClient;
    let amount  = req.body.amount;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if (err) {
            return res.status(500).json({err:"galat hai bhai!"})
        }
        else{
            return result;
        }
      });


}