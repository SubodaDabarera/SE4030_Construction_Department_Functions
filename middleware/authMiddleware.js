import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("middleware/service_account.json"),
});

const verifyUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;

        // Pass control to next middleware function
        next();
      })
      .catch((error) => {
        // Handle error: if the ID token is invalid, respond with 401 Unauthorized
        res.status(401).send("Unauthorized Operation");
      });
  } catch (err) {
    return;
  }
};

export default verifyUser;
