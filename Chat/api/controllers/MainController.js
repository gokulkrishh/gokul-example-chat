// creating function for each route in MainController

var MainController = 
{
    index: function (req, res)  // req for http request and res for http response
    {
         res.view(); //Views are UI of app and which uses embedded javascript(ejs) files and that views are rendered here
    },
    signup: function (req, res) 
    {

         
    },
    login: function (req, res) 
    {
         
    },
    chat: function (req, res) 
    {
         
    }
};
module.exports = MainController;  