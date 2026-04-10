const membersModel = require("../models/members");
const memberController = {};

memberController.getAll = async (req, res) => {
    // #swagger.tags = ['members']
    // #swagger.description = 'Get all members in the collection.'
    try {
        const members = await membersModel.find({ deletedAt: null });
        res.status(200).json(members);
    } catch {
        res.status(500).json({ error: "Failed to get members" });
    }
};

memberController.get = async (req, res) => {
    // #swagger.tags = ['members']
    // #swagger.description = 'Get a member by ID.'
    try {
        const member = await membersModel.findOne({
            _id: req.params.id,
            deletedAt: null
        });
        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.status(200).json(member);
    } catch {
        res.status(500).json({ error: "Failed to get member" });
    }
};

memberController.create = async (req, res) => {
    // #swagger.tags = ['members']
    // #swagger.description = 'Create a new member.'
    try {
        const member = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            role: req.body.role
        };
        const result = await membersModel.create(member);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Failed to create member" });
    }
};

memberController.update = async (req, res) => {
    // #swagger.tags = ['members']
    // #swagger.description = 'Update an existing member by ID.'
    try {
        const updatedMember = await membersModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                role: req.body.role
            },
            { new: true, runValidators: true }
        );
        if (!updatedMember) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.status(200).json(updatedMember);
    } catch {
        res.status(500).json({ error: "Failed to update member" });
    }
};

memberController.delete = async (req, res) => {
    // #swagger.tags = ['members']
    // #swagger.description = 'Delete a member by ID.'
    try {
        const result = await membersModel.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.status(200).json({ message: "Member soft deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete member" });
    }
};

module.exports = memberController;