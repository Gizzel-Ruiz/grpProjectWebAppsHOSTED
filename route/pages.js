const express = require('express');  
const router = express.Router();  
const Register = require('./models/register')  
const SubmitPosts = require('./models/subpost') 

// routing for user registration page
router.get('/', (req, res) => {  
    res.render('usrregi', {regiMsg: ""})  
})  

// routing for user sign in page
router.get('/usrsign', (req, res) => {  
    res.render('usrsign', {signinMsg: ""}) 
})  

//routing for profile page --- validates session is active and quieries user from session in order to display only posts submitted by active user
router.get('/prof', (req, res) => {
    if(!req.session.user){ 
        res.render('usrsign', {signinMsg: "You've been signed out"}) 
        console.log("Attempt to load post view failed") 
    }else{ 
        userName = req.session.user
        console.log("Loaded post view with no errors")
        SubmitPosts.find({userName:req.session.user}, function(err, post) {
            if(post) {
                console.log("Posts queried for user ")
                if(post.length > 0){
                    res.render('prof', {
                        postList: post,
                        postMsg: ""
                    })
                } else {
                    res.render('prof', {
                        postList: post,
                        postMsg: "No posts found"
                    })
                    console.log("No posts found for user")
                }
            }else {
                res.render('usrsign', {signinMsg: ""})
                console.log("User posts query failed ")
            }
        })
    } 
})  

// routing for feed page when accessed from category, post, profile pages
router.get('/feed', (req, res) => {  
    SubmitPosts.find({editorsPick: "Y"}, function(err, editorspick) {
        if(editorspick) {
            console.log("Editors picks posts queried ")
            if(editorspick.length > 0){
                return res.render('feed', {
                    editorspickList: editorspick,
                    editorsPickErrorMSG: ""
                })
            } else {
                return res.render('feed', {
                    editorspickList: editorspick,
                    editorsPickErrorMSG: "There are currently no post in this category"
                })
            }
        }
    }) 
})  

// routing for category 1 page 
router.get('/cat1', (req, res) => {  
    SubmitPosts.find({category: "Books"}, function(err, bookpost) {
        if(bookpost) {
            console.log("Books posts queried ")
            if(bookpost.length > 0){
                return res.render('cat1', {
                    bookpostList: bookpost,
                    bookErrorMSG: ""
                })
            } else {
                return res.render('cat1', {
                    bookpostList: bookpost,
                    bookErrorMSG: "There are currently no post in this category"
                })
            }
        }
    })
})   

// routing for category 2 page 
router.get('/cat2', (req, res) => {  
    SubmitPosts.find({category: "Anime"}, function(err, animepost) {
        if(animepost) {
            console.log("Anime posts queried ")
            if(animepost.length > 0){
                return res.render('cat2', {
                    animepostList: animepost,
                    animeErrorMSG: ""
                })
            } else {
                return res.render('cat2', {
                    animepostList: animepost,
                    animeErrorMSG: "There are currently no post in this category"
                })
            }
        }
    }) 
})  

// routing for submitting a post page --- validates session to ensure user is logged in, if logged in session tracks user id to ensure post is linked to user 
router.get('/post', (req, res) => {  
    if(!req.session.user){ 
        res.render('usrsign', {signinMsg: "You've been signed out"}) 
        console.log("Post submission attempted and failed...user is not logged in") 
    }else{ 
        res.render('post', {userName : req.session.user})
        console.log("Post submission attempted and sucessful...user is logged in " + userName) 
    } 
}) 

// routing for log out click --- destroys user session and displays log out message
router.get("/loggedOut", (req, res) => {
    const {  
        userName
    } = req.session.user;
    req.session.destroy();
    console.log("Session terminated.")
    res.render('loggedout')
})

// routing for registration page --- queries database to ensure that email address and username are unique and passes appropriate error messages 
router.post("/submitRegister", (req, res) => {  
    const {  
        userEmail,
        userName,  
        userPass  
    } = req.body; 
    Register.findOne({userEmail: userEmail}, function(err, doc){ 
        if(err) throw err; 
        if(doc) { 
            console.log("Email Address already registered") 
            return res.render('usrregi', {regiMsg: "Email Address are already taken"})
        }else{ 
            console.log("Email address available for registration") 
            Register.findOne({userName : userName}, function(err, doc){ 
                if(err) throw err; 
                if(doc) { 
                    console.log("User name already taken") 
                    res.render('usrregi', {regiMsg: "Username not available"})  
                } else{
                    console.log("Email Address and User name available") 
                    const register = new Register ({  
                        userEmail: req.body.userEmail,  
                        userName: req.body.userName,  
                        userPass: req.body.userPass  
                    }); 
                    Register.collection.insertOne(register)  
                    .then(result => {  
                        return res.render('usrsign', {signinMsg: ""})  
                    })  
                    .catch(err => console.log(err)); 
                    // return res.render('usrregi', {regiMsg: "Some error occured. Account not created, try again."});  
                }
            }) 
        }
    })
})  

// routing for sign up page --- captures sign up details 
router.post('/submitSignin', (req, res) => {  
    const {  
        userName,  
        userPass  
    } = req.body;  
    Register.findOne({userName : userName, userPass : userPass}, function(err, doc){ 
        if(err) throw err; 
        if(doc) { 
            console.log("User authenticated") 
            req.session.user = userName 
            //routes to feed after a sign in
            SubmitPosts.find({editorsPick: "Y"}, function(err, editorspick) {
                if(editorspick) {
                    console.log("Editor's picks posts queried ")
                    if(editorspick.length > 0){
                        return res.render('feed', {
                            editorspickList: editorspick,
                            editorsPickErrorMSG: ""
                        })
                    } else {
                        return res.render('feed', {
                            editorspickList: editorspick,
                            editorsPickErrorMSG: "There are currently no post in this category"
                        })
                    }
                }
            }) 
        }else{ 
            console.log("No user match found") 
            res.render('usrsign', {signinMsg: "Incorrect username/password"}) 
        } 
    }) 
})  

// routing for post submissions --- captures submission data and passess to database 
router.post("/submitPost", (req, res) => {  
    imgMsg = "postplaceholder"
    editorMsg = "NOT SELECTED"
    const submitposts = new SubmitPosts ({  
        userName: req.session.user, 
        category: req.body.category,  
        title: req.body.title,  
        description: req.body.description,
        imageName: imgMsg,
        editorsPick: editorMsg
    }); 
    SubmitPosts.collection.insertOne(submitposts)  
    .then(result => {  
        //routes to feed page when a post is submitted
        SubmitPosts.find({editorsPick: "Y"}, function(err, editorspick) {
            if(editorspick) {
                console.log("Editor's picks posts queried ")
                if(editorspick.length > 0){
                    return res.render('feed', {
                        editorspickList: editorspick,
                        editorsPickErrorMSG: ""
                    })
                } else {
                    return res.render('feed', {
                        editorspickList: editorspick,
                        editorsPickErrorMSG: "There are currently no post in this category"
                    })
                }
            }
        }) 
    })  
    .catch(err => console.log(err));  
})  

module.exports = router; 
