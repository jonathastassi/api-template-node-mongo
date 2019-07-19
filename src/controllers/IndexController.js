class IndexController
{
    constructor(app) {
        this.app =  app;
    }

    index(req, res, next) {
        try {
            res.status(200).send({
                title: "API - VUTTR", 
                version: "0.0.1"
            });
        } catch (err) {
            this.app.libs.utils.errorResponse(res, err, 'Falha ao processar sua requisição');
        }
    }
}

module.exports = (app) => {
    return new IndexController(app);
}