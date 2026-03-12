const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PAYSTACK_SECRET = "sk_test_14d531d41696b8a21040bd2427389710cafdd808";

app.post("/pay", async (req, res) => {

const { email, amount, name } = req.body;

try {

const response = await axios.post(
"https://api.paystack.co/transaction/initialize",
{
email: email,
amount: amount * 100, // Paystack uses kobo/pesewas
metadata: {
customer_name: name
}
},
{
headers: {
Authorization: `Bearer ${PAYSTACK_SECRET}`,
"Content-Type": "application/json"
}
}
);

res.json({
payment_url: response.data.data.authorization_url
});

} catch (error) {
res.status(500).json({ error: error.message });
}

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
