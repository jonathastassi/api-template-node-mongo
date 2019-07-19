module.exports = app => {
    app.group('/api/v1', (router) => {
        router.get('/', app.controllers.IndexController.index.bind(app.controllers.IndexController));
    });
}
  