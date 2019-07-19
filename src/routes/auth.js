module.exports = app => {
    app.group('/api/v1', (router) => {
        router.post('/login', app.controllers.AuthController.login.bind(app.controllers.AuthController))
        router.post('/register', app.controllers.AuthController.register.bind(app.controllers.AuthController))
    
        router.group(function(routerPrivate){
            routerPrivate.post('/refresh', app.services.AuthService.authorize, app.controllers.AuthController.refresh.bind(app.controllers.AuthController));
        });
    });
}
