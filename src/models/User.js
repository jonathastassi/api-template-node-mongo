module.exports = app => {
    const schema = new app.libs.database.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, 
            required: true,
        },
        roles: {
            type: String, 
            required: true,
            enum: ['user', 'admin'],
            default: 'user',
        },
    } , {
        timestamps: true
    });

    return app.libs.database.model('User', schema)
}
