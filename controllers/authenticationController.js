import userModel from '../models/userModel.js'

export const createUser = async (req,res)=>{
    const {email, password, userRole} = req.body;
    try {
        const user = await userModel.create({
            email,
            password,
            userRole
        });
        return res.status(201).json({success: true, user:user});
    }catch (err){
        console.log(err);
        res.json(err);
    }
}
