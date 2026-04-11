const router = require("express").Router();
const { loansController } = require("../controllers");
const { validateLoan } = require("../validation");
const { authenticate } = require("../middleware/authentication");

//GET ALL
router.get(
    "/",
    /* #swagger.description = 'Get all loans.'
    #swagger.tags = ['loans']
 */
    loansController.getAll
);

router.get(
    "/:id",
    /* #swagger.description = 'Get one loan by ID.'
    #swagger.tags = ['loans']
    #swagger.parameters['id'] = {
       in: 'path',
       description: 'loan ID',
       required: true,
       type: 'string'
    }
 */
    loansController.get
);

router.post(
    "/",
    authenticate,
    validateLoan.create,
    /* #swagger.description = "Create a new loan."
    #swagger.tags = ["loans"]
    #swagger.parameters['body'] = {
       in: 'body',
       description: 'loan data',
       required: true,
       schema: {
           $memberId: "",
           $bookId: "",
           loanDate: "",
           $dueDate: "",
           returnDate: "",
           $status: {"@enum": ["borrowed", "returned", "overdue"]}
       }
    }
 */
    loansController.create
);

router.put(
    "/:id",
    authenticate,
    validateLoan.update,
    /* #swagger.description = "Update loan by ID."
    #swagger.tags = ["loans"]
    #swagger.parameters['id'] = {
       in: 'path',
       description: 'loan ID',
       required: true,
       type: 'string'
    }
    #swagger.parameters['body'] = {
       in: 'body',
       schema: {
           $memberId: "",
           $bookId: "",
           loanDate: "",
           $dueDate: "",
           returnDate: "",
           $status: {"@enum": ["borrowed", "returned", "overdue"]}
       }
    }
 */
    loansController.update
);

router.delete(
    "/:id",
    authenticate,
    /* #swagger.description = 'Delete loan by ID.'
    #swagger.tags = ['loans']
    #swagger.parameters['id'] = {
       in: 'path',
       description: 'loan ID',
       required: true,
       type: 'string'
    }
 */
    loansController.delete
);

module.exports = router;
