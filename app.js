const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose.connect(
    db.url, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
).then(() => {
    console.log("Connected to Database")
}).catch(error => {
    console.log('Cannot connect to database', error)
    process.exit();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Benard Simple Blog Project." });
});


//////////////////////////////////////////////////////////////////////
////////////ROUTES //////////////////////
/////////////////////////////////////////////////////////////////////
require("./app/routes/blog.routes.js")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});