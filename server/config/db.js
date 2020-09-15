import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => res)
  .catch((err) => console.log("error", err));