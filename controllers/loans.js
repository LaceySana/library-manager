const loansModel = require("../models/loan");
const loanController = {};

loanController.getAll = async (req, res) => {
    // #swagger.tags = ['loans']
    // #swagger.description = 'Get all loans in the collection.'
    try {
        const loans = await loansModel.find({});
        res.status(200).json(loans);
    } catch {
        res.status(500).json({ error: "Failed to get loans" });
    }
};

loanController.get = async (req, res) => {
    // #swagger.tags = ['loans']
    // #swagger.description = 'Get a loan by ID.'
    try {
        const loan = await loansModel.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
        }
        res.status(200).json(loan);
    } catch {
        res.status(500).json({ error: "Failed to get loan" });
    }
};

loanController.create = async (req, res) => {
    // #swagger.tags = ['loans']
    // #swagger.description = 'Create a new loan.'
    try {
        const loan = {
            memberId: req.body.memberId,
            bookId: req.body.bookId,
            loanDate: req.body.loanDate,
            dueDate: req.body.dueDate,
            returnDate: req.body.returnDate,
            status: req.body.status
        };
        const result = await loansModel.create(loan);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Failed to create loan" });
    }
};

loanController.update = async (req, res) => {
    // #swagger.tags = ['loans']
    // #swagger.description = 'Update an existing loan by ID.'
    try {
        const updatedLoan = await loansModel.findByIdAndUpdate(
            req.params.id,
            {
                memberId: req.body.memberId,
                bookId: req.body.bookId,
                loanDate: req.body.loanDate,
                dueDate: req.body.dueDate,
                returnDate: req.body.returnDate,
                status: req.body.status
            },
            { new: true, runValidators: true }
        );
        if (!updatedLoan) {
            return res.status(404).json({ error: "Loan not found" });
        }
        res.status(200).json(updatedLoan);
    } catch {
        res.status(500).json({ error: "Failed to update loan" });
    }
};

loanController.delete = async (req, res) => {
    // #swagger.tags = ['loans']
    // #swagger.description = 'Delete a loan by ID.'
    try {
        const result = await loansModel.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Loan not found" });
        }
        res.status(200).json({ message: "Loan deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete loan" });
    }
};

module.exports = loanController;