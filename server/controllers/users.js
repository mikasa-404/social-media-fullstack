import User from "../models/User.js";

export const getUser=async(req, res)=>{
    try {
        const {id}=req.params;
        const user= await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends= async (req, res) =>{
    try {
        const {id}= req.params;
        const user= await User.findById(id);
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends= friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath};
        });
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const addRemoveFriend= async(req, res)=>{
    try {
        const {id, friendId}= req.params;
        const user= await User.findById(id);
        const friend= await User.findById(friendId);

        if(user.friends.includes(friendId)){
            //remove from friend list of both
            user.friends= user.friends.filter((id)=>(id!==friendId));
            friend.friends= friend.friends.filter((id)=>(id!==id));
        }else{
            //add to both friends list
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        //format and return friends again
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends= friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath};
        });
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
    
}
