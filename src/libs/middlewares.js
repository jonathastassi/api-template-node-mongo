const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(bodyParser.json({
        limit: '5mb',
    }));

    app.use(bodyParser.urlencoded({ 
        extended: false,
    }));

    app.use(cors());

    app.use((req, res, next) => {
        delete req.body._id;
        next();
    });
}