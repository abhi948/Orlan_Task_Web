import Organization from "../models/organization.js";

export const createOrganization = async (req, res) => {
    try {
        const organization = new Organization(req.body);
        const { email } = organization;
        const orgExist = await Organization.findOne({ email });
        if(orgExist){
            return res.status(400).json({errorMessage:'User Already Exist'});
        }
        const savedOrg = await organization.save();
        res.status(201).json(savedOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find().populate({
            path: 'teams',
            populate: { path: 'members' }
        });
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteOrg = async(req, res)=>{
    try {
        const id = req.params.id;
        const orgExist = await Organization.findById(id);        
        if(!orgExist){
            return res.status(404).json({errorMessage:"Not found User"});
        }
        const deletedUserDate = await Organization.findByIdAndDelete(id);
        // res.status(200).json({message:"User Deleted Successfully"});
        return res.status(200).json(deletedUserDate);
    } catch (error) {
        return res.status(500).json({errorMessage:"Internal server error"});
    }
};