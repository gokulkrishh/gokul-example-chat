// creating function for each route in MainController

var MainController = 
{
index: function (req, res)  // req for http request and res for http response
{
    res.view(); //Views are UI of app and which uses embedded javascript(ejs) files and that views are rendered here
},
signup: function (req, res) 
{
        var username = req.param("username"); //getting username from post request
        var password = req.param("password"); //getting pwd from post request
         
        Users.findByUsername(username).done(function(err, usr) //findByUsername with username which is in user model,with this can find whether a username is already present or not
        {
            if (err) 
            {
                res.send(500, { error: "DB Error" }); 
            } 
            else if (usr) 
            {
                res.send(400, {error: "Username already Taken"}); //if username already present. Send error
            } 
            else 
            {
                var hasher = require("password-hash"); // adding password hash module to variable hasher
                password = hasher.generate(password); //hashing password with hasher
                 
                Users.create({username: username, password: password}).done(function(error, user) {
                if (error) 
                {
                    res.send(500, {error: "DB Error"}); 
                } 
                else 
                {
                    req.session.user = user; //user is created and stored in session
                    res.send(user); // sending back response
                }
                });
             }
        });
},
login: function (req, res) 
{
    var username = req.param("username");
    var password = req.param("password");
     
    Users.findByUsername(username).done(function(err, usr) 
    {
        if (err) 
        {
            res.send(500, { error: "DB Error" });
        } 
        else 
        {
            if (usr) {
                var hasher = require("password-hash");
                if (hasher.verify(password, usr.password)) //verifying the password with same password module
                { 
                    req.session.user = usr;
                    res.send(usr);
                } 
                else 
                {
                    res.send(400, { error: "Wrong Password" });
                }
            } 
            else 
            {
                res.send(404, { error: "User not Found" });
            }
        }
    });
},
chat: function (req, res) 
    {
         if (req.session.user) 
         {
            res.view({username: req.session.user.username}); //checking user is logged in or not and if logged, load the view
         }
         else // if not logged in redirect to index page
         {
            res.redirect('/');
         }
    }
};
module.exports = MainController;  