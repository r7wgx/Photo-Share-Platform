import User from '../model/userModel.js';


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            user,
            succeded: true
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


export {createUser};