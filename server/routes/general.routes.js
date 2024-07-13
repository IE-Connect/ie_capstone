import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import upload from "../multer/multer.config.js";
import Users from "../collection_models/registerSchema.js";
import Announcement from "../collection_models/announcementSchema.js";
// import UsersProfile from "../collection_models/userProfilesSchema.js";

// SECURITY CONFIGURATION
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { tokenGenerator } from "../utils/tokenGenerator.js";
// DI PA TO AYOS HAHHAHAHA DI PA SECURED ANG WEBSITE
import { authenticate } from "../middleware/authController.js";
import { refreshTokenMiddleware } from "../middleware/refreshTokenController.js";
import userProfilesSchema from "../collection_models/userProfilesSchema.js";

const JSON_SECRET = process.env.JSON_SECRET_KEY;
// const JSON_REFRESH_SECRET = process.env.JSON_REFRESH_TOKEN;

// CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = Router();

// ANNOUNCEMENT GET ENDPOINT
router.route("/bulletin").get(authenticate, async (req, res) => {
  try {
    const resAnnouncement = await Announcement.find({
      expiration: { $gte: Date.now() },
    });
    console.log(resAnnouncement);
    res.status(200).json({ success: true, announcement: resAnnouncement });
  } catch (error) {
    res.status(404).json({ success: false, err: error.message });
  }
});

// ANNOUNCEMENT POST ENDPOINT
router.route("/bulletin").post(authenticate, async (req, res) => {
  const { name, announcement, expiration } = req.body;

  const date = new Date(expiration);

  try {
    const newAnnouncement = await Announcement.create({
      name: name,
      announcement: announcement,
      expiration: date,
    });

    console.log(newAnnouncement);
    await newAnnouncement.save();
    res
      .status(201)
      .json({ success: true, message: "Announcement created successfully!" });
  } catch (error) {
    res.json({ success: false, error: err.message });
  }
});

// REGISTRATION POST ENDPOINT
router.route("/registration").post(async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      surname,
      age,
      birthday,
      contact, 
      email,
      username,
      password,
      batch,
    } = req.body;


    if (!password || !firstname ||!middlename || !surname || !age  || !birthday || !contact ||
      !email || !username || !batch ) {
      console.log("Please complete all the field")
      return
    }


    const name = `${firstname} ${middlename} ${surname}`;
    const duplicate = await Users.findOne({ username }).lean().exec();
    if (duplicate) {
      return res.status(400).json({ message: "Duplicate username" });
    }


    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);


    const Birthdate = new Date(birthday);
    tokenGenerator(result._id, res, JSON_SECRET);
    const newProfile = await Users.create({
      name,
      age,
      birthday: Birthdate,
      contact,
      email,
      username,
      password: hashedPass,
      batch,
    });
    newProfile.save();
    res.status(201).json({ success: true, message: "Profile saved!" });
  } catch (error) {
    console.error(error.message);
  }
 
});

// LOGIN POST ENDPOINT
router.route("/login").post(async (req, res) => {
  try {
    const { uname, pword } = req.body;
    console.log(uname, pword);

    const result = await Users.findOne({ username: uname });
    if (!result) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(pword, result?.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }


    tokenGenerator(result._id, res, JSON_SECRET);
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: {
        id: result._id,
        fullname: result.name,
        username: result.username,
        profilePic: result.photopic,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check Auth Route
// router.route("/check-auth").get((req, res) => {
//   res.status(200).send("Authenticated");
// });

// REFRESH TOKEN Route
// router.route("/refresh-token").post(async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(401);

//   try {
//     const decoded = jwt.verify(refreshToken, JSON_REFRESH_SECRET);
//     const token = jwt.sign({ userId: decoded.userId }, JSON_SECRET, {
//       expiresIn: "1d", // Refreshed access token duration
//     });
//     res.json({ token });
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     res.status(403).json({ message: "Token refresh failed" });
//   }
// });

// LOG OUT ROUTE

router.route("/logout").post(async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.send("Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE PROFILE POST ENDPOINT
router
  .route("/profile/editProfile")
  .patch(authenticate, upload.single("photo"), async (req, res) => {
    const { name, age, birthday, contact, email, batch } = req.body;
    const id = req.params.id;
    const file = req.file;
    try {
      const updated = await Users.findById(id).exec();
      if (!updated) {
        return res.status(400).json({ message: "User not found" });
      }

      if (file) {
        const photoUrl = await cloudinary.uploader.upload(file.path);
        updated.photopic = photoUrl.secure_url;
      }
      updated.name = name;
      updated.age = age;
      updated.birthday = birthday;
      updated.contact = contact;
      updated.email = email;
      updated.batch = batch;

      const updatedProfile = await updated.save();

      // console.log(photoUrl.secure_url);
      res
        .status(201)
        .json({ success: true, message: `${updatedProfile.name} is updated` });
    } catch (error) {
      console.error(error.message);
    }
  });

router.route("/profile").get(authenticate, async (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

// ADMIN LOGIN POST ENDPOINT
// router.route("/admin-login").post();
// router.route().patch();

// PEOPLE GET END POINT
// authenticate, refreshTokenMiddleware,

router.route("/people").get(authenticate, async (req, res) => {
  try {
    const loggedInID = req.user._id;
    const users = await Users.find({ _id: { $ne: loggedInID } })
      .select("-password")
      .select("-username")
      .lean();

    // console.log(users);
    res.status(200).json({
      success: true,
      message: "Successful data get request!!",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

export default router;
