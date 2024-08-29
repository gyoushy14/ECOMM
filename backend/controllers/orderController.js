import Stripe from "stripe";
import orderMOdel from "../models/ordermodel.js";
import usermodel from "../models/usermodels.js";

// Import necessary models (order and user) and the Stripe library

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Initialize Stripe with the secret key from environment variable

const front_endurl = "http://localhost:5174";
// Define the base URL of your frontend application

const placeHolder = async (req, res) => {
  // Define an asynchronous function named placeHolder that handles incoming requests (req) and sends responses (res)

  try {
    // Try block to handle successful operations

    const newOrder = new orderMOdel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // Create a new order object from the request body data (user ID, items, total amount, and address)

    await newOrder.save();
    // Save the new order object to the database

    await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    // Update the user's cart data to be empty after placing the order

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "EGP",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 48, // Assuming price is in PKR and converting to cents (multiply by 100) and adjusting for current exchange rate (multiply by 48, adjust as needed)
      },
      quantity: item.quantity,
    }));
    // Create an array of line items for Stripe checkout based on the order items

    line_items.push({
      price_data: {
        currency: "EGP",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 48, // Assuming delivery charge is 2 PKR and converting to cents
      },
      quantity: 1,
    });
    // Add a separate line item for delivery charges

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${front_endurl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${front_endurl}/verify?success=false&orderId=${newOrder._id}`,
    });
    // Create a Stripe checkout session with the line items, payment mode, and redirect URLs for successful and failed payments

    res.json({ success: true, session_url: session.url });
    // Send a response with success status and the Stripe session URL for redirection

  } catch (error) {
    // Catch block to handle any errors

    res.json({ success: false, message: "Error in Order Controller" });
    // Send a response with error status and a generic error message
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderMOdel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" })
    } else {
      await orderMOdel.findOneAndDelete(orderId);
      res.json({ succes: false, message: "Not Paid" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "error in Verify" });
  }

}

const userOrders = async (req, res) => {
  try {
    const orders = await orderMOdel.find({ userId: req.body.userId })
    res.json({ success: true, data: orders });
  } catch (err) {
    console.log(err);

    res.json({ success: false, message: "Error in userOrders " });
  }
};


const listOrders_Admin = async (req, res) => {
  try {
    const orders = await orderMOdel.find({});
    res.json({ success: true, data: orders })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed" })
  }
};

const updateStatus = async (req, res) => {

  try {
    await orderMOdel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "status Updated" })
  } catch (error) {
    res.json({ success: false, message: "status Failed" })
  }
}



export { placeHolder, verifyOrder, userOrders, listOrders_Admin, updateStatus };
// Export the placeHolder function for use in other parts of the application