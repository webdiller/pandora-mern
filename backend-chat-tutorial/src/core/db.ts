import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://root:root@cluster0-rndef.mongodb.net/examplepandora?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err: any) => {
    if (err) {
      throw Error(err);
    }
  }
);
