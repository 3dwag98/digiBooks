import firebase from "firebase/app";
import "firebase/database";

export default (req, res) => {
  const data = [];
  firebase
    .database()
    .ref("Books")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          data.push(child.val());
        });
        res.status(200).json(data);
      } else {
        res.status(200).send("No data available");
      }
    })
    .catch((error) => {
      res.status(200).send(error);
    });
};
