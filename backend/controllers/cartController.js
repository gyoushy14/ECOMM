import usermodel from "../models/usermodels.js";
const addtoCart = async (req, res) => {
    try {
        let userData = await usermodel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await usermodel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Added Cart" });
    } catch (err) {
        console.log(err);
        res.json({ succes: false, message: "error cart" });

    };
};

const removeCart = async (req, res) => {
    try {
        let userData = await usermodel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await usermodel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removed Cart" });
    } catch (err) {
        console.log(err);
        res.json({ success: flase, message: "not removed Cart" });
    }


}

const getCart = async (req, res) => {
    try {
        let userData = await usermodel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "not got Cart" });

    }



}

export { addtoCart, removeCart, getCart }