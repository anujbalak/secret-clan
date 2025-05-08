import { updateAdminStatus, updateMembership } from "../db/queries.js"

export const getMemberPage = (req, res) => {
    if (!req.user) {
        return res.redirect('/')
    }
    res.render('pages/member')
}

export const postMemberDetails = async (req, res) => {
    try {
        let { member, admin} = req.body
        if (!admin) {
            admin = false;
        } else {
            admin = true;
        }
        
        if (member === 'warrior cat') {
            await updateMembership(req.user.id, true);
        }
        if (admin) {
            await updateAdminStatus(req.user.id, true);
        }
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
}
