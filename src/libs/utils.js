module.exports = function(app) {
    this.errorResponse = (res, err, message) => {
        console.error(err)
        res.status(500).send({
            message
        });
    }

    return this;  
};