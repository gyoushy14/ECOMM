import mongoose from "mongoose";
export const connection_Nodejs = async () => {
  await mongoose
    .connect(
      "mongodb+srv://gyuoshy1417:HJELKQlMOcR3AoUm@gh14-ecommerce-store.qew4l.mongodb.net/GH14-Ecommerce-Store"
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};

// MOGOOSE CONNECTION DB
// const connection_Mongoose = async () => {
//   await mongoose.connect(
//     "mongodb+srv://gyuoshy1417:HJELKQlMOcR3AoUm@gh14-ecommerce-store.qew4l.mongodb.net/GH14-Ecommerce-Store"
//   );
// };
