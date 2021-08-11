const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { body, check, validationResult } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const config = require('./config/database');
const logger = require("morgan");
var cors = require('cors')


const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');


mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection and initialis gridfs
db.once('open', function() {
    console.log('Connected to MongoDB');
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Check for DB errors
db.on('error', function(err) {
    console.log(err);
});


// Configuring storage.... TODO read more on this
const storage = new GridFsStorage({
    url: config.database,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err)

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    //filename: file.originalname,
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            })
        })
    }

})

// making the storage usable
const upload = multer({ storage });

// Init App
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
const API_PORT = 3001;
const router = express.Router();

//Testing cors to allow access to this server from different sites it works universally
//app.use(cors()) 

// Express Session Middleware
app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res); //TODO configure front end to mindful of messages from res.local, it should render when its not empty
    next();
});

// Express Validator Middleware
/* app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
})); */


// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// TODO implement this properly session management
app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    console.log(res.locals)
    next();
});

router.get("/", (req, res) => {
    res.send({ message: "HELLO WORLD" });
    console.log("it console logged req.body", req.body);

});

router.post("/test", (req, res) => {
    res.send({ message: "HELLO WORLD" });
    console.log("it console logged req.body", req.body);
    console.log('Inside the test callback function')
    console.log(req.sessionID)

});

// Bring in User Model
let User = require('./models/user');

router.post('/login', function(req, res, next) {
    // console.log(" for login", req);
    /* Original code */
    /*    console.log('Inside POST /login callback function sessionID')
       console.log(req.sessionID)
       console.log('Inside POST /login callback function req.body')
       console.log(req.body)
       passport.authenticate('local', {
           successRedirect: 'http://localhost:3000/profile',
           failureRedirect: 'http://localhost:3000/login',
           failureFlash: true
       })(req, res, next); */
    //res.send(req.user);
    //console.log(req.user);
    //console.log(res.locals);
    /* Original code stops here */



    //TODO uncomment later
    /* console.log('Inside POST /login callback function sessionID')
    console.log(req.sessionID)
    console.log('Inside POST /login callback function req.body')
    console.log(req.body) */
    passport.authenticate('local', (err, user, info) => {
        // TODO uncomment later
        /* console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`) */
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            console.log(user);
            //console.log(err);
            if (user) {
                return res.send('You were authenticated & logged in!\n');
            } else {
                return res.send('You are not logged in!');
            }
            // return res.redirect('http://localhost:3000/api/profile');
            // return res.redirect('http://localhost:3001/api/profile');
            //return res.send('You were authenticated & logged in!\n');
        })
    }, {
        successRedirect: 'http://localhost:3001/api/profile',
        failureRedirect: 'http://localhost:3000/login',
        failureFlash: true
    })(req, res, next);
});


/* app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback')
    console.log('Inside POST /login callback function sessionID')
    console.log(req.sessionID)
    console.log('Inside POST /login callback function req.body')
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        return res.send('You were authenticated & logged in!\n');
      })
    })(req, res, next);
  }) */


router.post('/signup', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is not Valid'),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    //	check('password2').notEmpty().withMessage('Password do not match');
    body('password2').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password do not match');
        }
        return true;
    })
], /* upload.single('profilePic'), */ function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    /* const profilePic = req.body.profilePic; */

    let errors = validationResult(req)
    console.log(errors.errors);
    if (errors.errors.length != 0) {
        res.send({
            errors: errors.errors
        });
    } else {
        console.log('new user creating')
            //upload.single('profilePic');
            //console.log("this is filename of file " + req.filename)
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
                /* ,
                            profilePic: req.filename */
        })

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err) {
                    console.log('new user created')
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.send('success' + 'You are now registered and can now login');
                        //res.redirect('http://localhost:3000/login');
                    }
                })
            });
        })
    }
});

router.get("/profile", ensureAuthenticated, (req, res) => {
    //TODO uncomment for testing
    /* console.log("user is authenticated req.user")
    console.log(req.user); */
    res.send({ message: "reached authenticated profile" })
        //res.redirect('http://localhost:3000/')
})

router.post("/profile", ensureAuthenticated, (req, res) => {
    //TODO uuncomment for testing
    /* console.log("user is authenticated req.user")
    console.log(req.user); */
    //res.send({ message: "reached authenticated profile" })
    //res.redirect('http://localhost:3000/')
    var profile = {
        name: req.user.name,
        email: req.user.email,
        profilePic: req.user.profilePic || null
    }
    res.send(profile);
})

router.post("/profilePic", ensureAuthenticated, upload.single('file'), (req, res) => { //TODO comment ensureauthenticated if this stops working
    console.log('THIS IS REQ  FROM POST PROFILEPIC')
    console.log(JSON.stringify(req.file));
    //res.redirect('/');
    console.log("check if user is still available " + req.user)
    var query = { "_id": req.user._id }
    var pic = { "profilePic": req.file.filename }
    User.findOneAndUpdate(query, pic, (err, doc) => {
        if (err) { console.log(err) } else { console.log(doc) };
    })
    res.redirect('localhost:3000/profile')

})


router.get('/profilepictest', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check if files
        console.log('these are the files' + files);
        if (!files || files.length === 0) {
            res.send({ files: false });
        } else {
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true
                } else {
                    file.isImage = false
                }
            })
            res.send({ files: files });
        }


    });
})

router.get("/profilePic/:filename", (req, res) => {
    console.log("THIS IS req.params.filename");
    console.log(req.params.filename);
    if (req.params.filename && req.params.filename != undefined && req.params.filename != ":undefined") {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            //Check if files
            if (!file || file.length === 0) {
                console.log("no file " + file);
                return res.status(404).json({
                    err: 'No file exist'
                })
            } else {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    //Read output to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: "Not an Image"
                    })
                }
            }
        })
    }

})


var tempProductSession = [];

let Product = require('./models/products')
router.post("/store", ensureAuthenticated, (req, res) => {
    console.log("THIS IS RE.BODY")
    console.log(req.body);
    //var request = {...req.body }
    //var owner = { id: req.user._id }
    //var test = {...request, ownerid: req.user._id }
    var test = {...req.body, owner: req.user._id }
    console.log("THIS IS TEST")
    console.log(test);
    console.log("THIS IS REQ>SESSION")
    console.log(req.sessionID);
    let session = req.sessionID

    let product = new Product();

    product.title = test.title;
    product.price = test.price;
    product.company = test.company
    product.info = test.info
    product.amount = test.amount
    product.owner = test.owner
    console.log("THIS IS PRODUCT  " + JSON.stringify(product));

    let id = product._id

    tempProductSession.push({ session: session, id: id })

    product.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("PRODUCT ADDED");
            //res.send("recieved");
        }
    });

    //res.end();
})

router.post('/store_image', ensureAuthenticated, upload.single('file'), (req, res) => {
    console.log("IT GOT TO /STORE_IMAGE")
    console.log("THIS is TEMPSESSION " + JSON.stringify(tempProductSession))
    console.log('CHECK FOR FILENAME' + req.file.filename);
    var queryProduct = tempProductSession.find((element) => {
        return element.session === req.sessionID
    })
    var query = { "_id": queryProduct.id }
    var pic = { "productPic": req.file.filename }

    console.log("This is pic " + JSON.stringify(pic));

    Product.findOneAndUpdate(query, pic, (err, doc) => {
        if (err) { console.log(err) } else { console.log(doc) };
    })

})


router.post('/listproducts', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
        } else {

            res.send(products);
        }
    })
})

/* router.post('/testUpload', (req, res) => {
     console.log(JSON.stringify(req.name));
    const readstream = gfs.createReadStream({ filename: "Upload file" });
    readstream.pipe(req.body);
    readstream.on('close', () => { console.log("written to database successfully") });
}) */

router.post('/testUpload', upload.single('testFile'), (req, res) => {
    // if (err) throw err
    console.log(req.file)
    res.send({ message: "uploaded successfully" })

})


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("you are authorized")
        return next();
    } else {
        console.log('you are unauthorized')
            // req.flash('danger', 'Please login');
            //res.redirect('http://localhost:3000/login');
        return res.send(false);
    }
}



app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`, "http://localhost:3001/api"));