import Team from "../models/team.js";
import Organization from "../models/organization.js";

// Add a team to an organization
export const createTeam = async (req, res) => {
    try {
        const team = new Team(req.body); // Create new team with request body
        const savedTeam = await team.save(); // Save the team

        // Add team to the organization
        await Organization.findByIdAndUpdate(req.body.organization, {
            $push: { teams: savedTeam._id }
        });

        res.status(201).json(savedTeam); // Send back the saved team
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// export const getTeams = async (req, res) => {
//     try {
//         const organizations = await Team.find().populate({
//             path: 'teams',
//             populate: { path: 'employee' }
//         });
//         res.status(200).json(organizations);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const getTeams = async(req, res)=>{
    try {
        const teams = await Team.find()
        .populate('members', 'name')  // Populate the `members` field with `name`
          .populate('organization', 'name');  // Populate the `organization` field with `name`
        
        if(!teams || teams.length === 0){
            return res.status(404).json({errorMessage:"Not found User"});
        }

        res.json(teams);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching teams' });
      }
};

