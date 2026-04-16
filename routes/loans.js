const router = require("express").Router();
const { loansController } = require("../controllers");
const { validateLoan } = require("../validation");
const { authenticate } = require("../middleware/authentication");

router.get(
    "/",
    /* #swagger.tags = ['loans']
       #swagger.description = 'Get all loans in the collection.'
    */
    loansController.getAll
);

router.get(
    "/:id",
    /* #swagger.tags = ['loans']
       #swagger.description = 'Get a loan by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Loan ID',
          required: true,
          type: 'string'
       }
    */
    loansController.get
);

router.post(
    "/",
    validateLoan.create,
    /* #swagger.tags = ['loans']
       #swagger.description = 'Create a new loan.'
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Loan data',
          required: true,
          schema: {
             $memberId: "64a1b2c3d4e5f6a7b8c9d0e1",
             $bookId: "64a1b2c3d4e5f6a7b8c9d0e2",
             $dueDate: "2025-12-31",
             loanDate: "2025-01-01",
             returnDate: "2025-06-01",
             status: "borrowed"
          }
       }
    */
    authenticate,
    loansController.create
);

router.put(
    "/:id",
    validateLoan.update,
    /* #swagger.tags = ['loans']
       #swagger.description = 'Update an existing loan by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Loan ID',
          required: true,
          type: 'string'
       }
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Loan data',
          required: true,
          schema: {
             memberId: "64a1b2c3d4e5f6a7b8c9d0e1",
             bookId: "64a1b2c3d4e5f6a7b8c9d0e2",
             dueDate: "2025-12-31",
             returnDate: "2025-06-01",
             status: "returned"
          }
       }
    */
    authenticate,
    loansController.update
);

router.delete(
    "/:id",
    /* #swagger.tags = ['loans']
       #swagger.description = 'Delete a loan by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Loan ID',
          required: true,
          type: 'string'
       }
    */
    authenticate,
    loansController.delete
);

module.exports = router;