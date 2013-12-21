// creating function for each route in MainController


var MainController = 
{
    index: function (req, res)  // req for http request and res for http response
    {
         res.view(); //Views are UI of app and which uses embedded javascript(ejs) files and that views are rendered here
    },
    signup: function (req, res) 
    {
        signup: function (req, res) {
        var username = req.param("username"); //getting username
        var password = req.param("password"); //getting pwd
         
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
    }
         
    },
    login: function (req, res) 
    {
         
    },
    chat: function (req, res) 
    {
         
    }
};
module.exports = MainController;  