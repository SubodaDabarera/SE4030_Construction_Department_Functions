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

export const getUserDetails = async(req, res) => {
    const {userId} = req.query;

    try{
        const userDetails = await userModel.findById({_id:userId}).then((user) => {
            return res.status(201).json({success: true, user: user})
        })
        
    }catch (err){
        console.log(err);
        res.json(err);
    }
}
