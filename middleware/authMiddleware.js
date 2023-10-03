import admin from "firebase-admin";
import logger from "../services/logger.js";

admin.initializeApp({
  credential: admin.credential.cert("middleware/service_account.json"),
});

const checkRoles = (email) => {
  // checking the user roles
  let splitEmail = email.split("@");
  logger.info("First email split: length of splited one", splitEmail.lenth);
  try {
    let firstElement = splitEmail[0];

    let splitFirstElement = firstElement.split(".");
    logger.info(
      "Second email split: length of splited one",
      splitFirstElement.lenth
    );

    if (splitFirstElement.length < 2) {
      return "";
    }
    let userRole = splitFirstElement[1];
    logger.info("User role retrieved");
    return userRole;
  } catch (err) {
    logger.error("User role is not retrieved");
    return "";
  }
};

export const verifyUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  logger.info(token ? "Token received" : "Token not received");
  try {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        logger.info("Decoded token received");
        const uid = decodedToken.uid;
        req.uid = uid;
        logger.info("UID has been set");
        // Pass control to next middleware function
        next();
      })
      .catch((error) => {
        // Handle error: if the ID token is invalid, respond with 401 Unauthorized
        logger.error("Unauthorized operation");
        res.status(401).send("Unauthorized Operation");
      });
  } catch (err) {
    return;
  }
};

export const checkAccessLevel = async (req, res, next) => {
  let email = "";
  const uid = req.uid;
  logger.info(uid ? "UID received" : "UID not received");

  // get the emails
  await admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord
      const userObj = userRecord.toJSON();
      if (userObj.email) {
        logger.info("Email retrieved");
        email = userObj.email;
      } else {
        logger.info("Email is not found");
      }
    })
    .catch((error) => {
      logger.error("Error fetching user data", error);
    });

  const userRole = await checkRoles(email);
  if (userRole) {
    // If the user is an admin, they are authorized to access the route
    logger.info("User access granted");
    next();
  } else {
    // If the user is not an admin, they are not authorized to access the route
    logger.error("User access is not granted");
    res.status(403).send("Method Forbidden");
  }
};
