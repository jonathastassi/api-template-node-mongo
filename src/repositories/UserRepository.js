class UserRepository
{
    constructor(app) {
        this.app = app;
    }

    async store(data) {
        await this.app.models.User.create(data);
    }

    async findByEmail(email) {
        const res = await this.app.models.User.findOne({
            email: email,
        });
    
        return res;
    }

    async findById(id) {
        const res = await this.app.models.User.findById(id)

        return res;
    }
}

module.exports = (app) => {
    return new UserRepository(app);
}
