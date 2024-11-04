require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./data/utils.data");

// Import routers
const roleRouter = require("./routes/role.routes");
const userRouter = require("./routes/user.routes");
const advertisementCategoryRouter = require("./routes/advertisementCategory.routes");
const AdvertisementTypeRouter = require("./routes/advertisementType.routes");
const advertisementRouter = require("./routes/advertisement.routes");
const statusRouter = require("./routes/advertisementStatus.routes");
const advertisementImageRouter = require("./routes/advertisementImage.routes");
const countryRouter = require("./routes/country.routes");
const provinceRouter = require("./routes/province.routes");
const cityRouter = require("./routes/city.routes");
const cityAreaRouter = require("./routes/cityArea.routes");
const carouselRouter = require("./routes/carousel.routes");
const verifyRouter = require("./routes/Verification.routes")

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

// Middleware
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: false })); // Adjust limit as needed
app.use(express.json({ limit: "50mb" })); // Adjust limit as needed

// Routes
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/advertisementcategories", advertisementCategoryRouter);
app.use("/api/v1/advertisementtypes", AdvertisementTypeRouter);
app.use("/api/v1/advertisements", advertisementRouter);
app.use("/api/v1/advertisementstatus", statusRouter);
app.use("/api/v1/advertisementimage", advertisementImageRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/provinces", provinceRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/cityareas", cityAreaRouter);
app.use("/api/v1/carousels", carouselRouter);
app.use("/api/v1/verify", verifyRouter);


// 404 Not Found handler
app.all("*", (req, res) => {
  return res.status(404).send("Not found");
});

// Connect to database and start server
connectDb().then(() => {
  app.listen(port, host, function () {
    console.log(`Server is listening on http://${host}:${port}`);
  });
});

