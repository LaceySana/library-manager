const router = require("express").Router();
const { membersController } = require("../controllers");
const { validateMember } = require("../validation");
const { authenticate } = require("../middleware/authentication");

// DEBUG ROUTE (shows ALL members including soft deleted)
router.get(
    "/debug/all",
    /* #swagger.tags = ['debug']
     #swagger.description = 'Get ALL members including soft deleted (debug only)'
  */
    async (req, res) => {
        try {
            const membersModel = require("../models/members");
            const members = await membersModel.find({});
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: "Error fetching debug data", error });
        }
    }
);

//GET ALL
router.get(
    "/",
    /* #swagger.description = 'Get all members.'
     #swagger.tags = ['members']
  */
    membersController.getAll
);

router.get(
    "/:id",
    /* #swagger.description = 'Get one member by ID.'
     #swagger.tags = ['members']
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'member ID',
        required: true,
        type: 'string'
     }
  */
    membersController.get
);

router.post(
    "/",
    authenticate,
    validateMember.create,
    /* #swagger.description = "Create a new member."
     #swagger.tags = ["members"]
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'member data',
        required: true,
        schema: {
            $firstName: "",
            $lastName: "",
            $phone: "",
            $email: "",
            $password: "",
            $status: {"@enum": ["active", "inactive"]},
            $role: {"@enum": ["member", "admin"]}
        }
     }
  */
    membersController.create
);

router.put(
    "/:id",
    authenticate,
    validateMember.update,
    /* #swagger.description = "Update member by ID."
     #swagger.tags = ["members"]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'member ID',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $firstName: "",
            $lastName: "",
            $phone: "",
            $email: "",
            $password: "",
            $status: {"@enum": ["active", "inactive"]},
            $role: {"@enum": ["member", "admin"]}
        }
     }
  */
    membersController.update
);

router.delete(
    "/:id",
    authenticate,
    /* #swagger.description = 'Delete member by ID.'
     #swagger.tags = ['members']
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'member ID',
        required: true,
        type: 'string'
     }
  */
    membersController.delete
);

module.exports = router;
