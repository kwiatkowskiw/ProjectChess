const User = require('../../db/models/user')

class UserActions{

    // create user
    async createUser(req, res){
        let user;
        const email = req.body.email;
        const password = req.body.password;
        try{
            user = new User({
                email: email,
                password: password,
            })
        await user.save();
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
        res.status(201).json(user);
    }
    // search all users
    async getAllUsers(req, res){
        let users;
        try{
            users = await User.find({});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
        res.status(201).json(users);
        
    }
    // search user
    async getUser(req, res){
        const id = req.params.id;
        let user;
        try{
            user = await User.findOne({_id: id});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        } 
        res.status(201).json(user);
    }
    // update password
    async updateUser(req, res){
        const id = req.params.id;
        const password = req.body.password;
        let user;
        try{
            user = await User.findOne({_id: id});
            user.password = password;
            await user.save();
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
        res.status(201).json(user);
    }
    // delete user
    async deleteUser(req, res){
        const id = req.params.id;
        try{
            await User.deleteOne({_id: id});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        } 
        res.sendStatus(204);
    }
}

module.exports = new UserActions();