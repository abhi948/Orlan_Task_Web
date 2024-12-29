import Member from "../models/employee.js";
import Team from "../models/team.js";
import fs from "fs";
import path from "path";


export const createMember = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.files?.image);

        // Image upload logic
        let imageFileName = "";
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            const uploadDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            imageFileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(uploadDir, imageFileName);
            await imageFile.mv(filePath);
        }

        // Member creation logic
        const memberData = { ...req.body, image: imageFileName };
        const member = new Member(memberData);
        const savedMember = await member.save();

        // Associate the member with the team
        if (req.body.team) {
            // Update the team document and push the member ID into the team's members array
            await Team.findByIdAndUpdate(req.body.team, {
                $push: { members: savedMember._id }
            });
        }

        res.status(201).json(savedMember);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: error.message });
    }
};



export const getEmployee = async (req, res) => {
    try {
        const userData = await Member.find()
        .populate('team', 'name')        // Populate `team` with its `name` field
        ;
        if (!userData || userData.length === 0) {
            return res.status(404).json({ errorMessage: "Not found User" });
        }
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
};
