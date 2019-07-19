const bcrypt = require('bcrypt');

class AuthController
{
    constructor(app) {
        this.app =  app;
    }

    async login(req, res, next) {
        let contract = new this.app.libs.validator();
        contract.isEmail(req.body.email, 'E-mail inválido');
        contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');
    
        if (!contract.isValid()) {
            res.status(400).send(contract.showErrors()).end();
            return;
        }

        try {
            const user = await await this.app.repositories.UserRepository.findByEmail(req.body.email);
    
            if (user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    const token = await this.app.services.AuthService.generateToken({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        roles: user.roles,
                    });
            
                    res.status(200).send({
                        token: token,
                        data: {
                            email: user.email,
                            name: user.name,
                            roles: user.roles,
                        },
                    }); 

                    return;
                }
            }

            res.status(403).send({
                message: 'Usuário ou senha inválidos'
            });
        } catch (err) {
            this.app.libs.utils.errorResponse(res, err, 'Falha ao processar sua requisição');
        }
    }

    async register(req, res, next) {
        let contract = new this.app.libs.validator();
        contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
        contract.isEmail(req.body.email, 'E-mail inválido');
        contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');
    
        if (!contract.isValid()) {
            res.status(400).send(contract.showErrors()).end();
            return;
        }
    
        try {
            await this.app.repositories.UserRepository.store(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password,10),
                    roles: "user"
                }
            )

            res.status(201).send({message: 'Usuário cadastrado com sucesso!'}); 
        } catch (err) {
            this.app.libs.utils.errorResponse(res, err, 'Ocorreu um erro ao processar a requisição!');
        }
    }

    async refresh(req, res, next) {
        try {
            const token = this.app.services.AuthService.getToken(req);
            const data = await this.app.services.AuthService.decodeToken(token);

            const user = await this.app.repositories.UserRepository.findById(data.id);

            if (!user) {
                res.status(404).send({
                    message: 'Usuário não encontrado!'
                });
                return;
            }
            const tokenData = await this.app.services.AuthService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
                roles: user.roles,
            });

            res.status(200).send({
                token: tokenData,
                data: {
                    email: user.email,
                    name: user.name,
                    roles: user.roles,
                },
            });
        } catch (err) {
            this.app.libs.utils.errorResponse(res, err, 'Falha ao processar sua requisição');
        }
    }
}

module.exports = (app) => {
    return new AuthController(app);
}