/* main and chat pages & 2 controllers for handling signuo and login*/
module.exports.routes = {
    '/' : {
         controller: 'main',
         action: 'index'
    },
    '/signup' : {
         controller: 'main',
         action: 'signup'
    },
    '/login' : {
         controller: 'main',
         action: 'login'
    },
    '/chat' : {
         controller: 'main',
         action: 'chat'
    }
};