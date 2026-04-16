const router = require("express").Router();
const { membersController } = require("../controllers");
const { validateMember } = require("../validation");
const { authenticate } = require("../middleware/authentication");

router.get(
    "/",
    /* #swagger.tags = ['members']
       #swagger.description = 'Get all members in the collection.'
    */
    membersController.getAll
);

router.get(
    "/:id",
    /* #swagger.tags = ['members']
       #swagger.description = 'Get a member by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Member ID',
          required: true,
          type: 'string'
       }
    */
    membersController.get
);

router.post(
    "/",
    validateMember.create,
    /* #swagger.tags = ['members']
       #swagger.description = 'Create a new member.'
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Member data',
          required: true,
          schema: {
             $firstName: "John",
             $lastName: "Doe",
             $phone: "555-1234",
             $email: "john@example.com",
             $password: "secret123",
             status: "active",
             role: "member"
          }
       }
    */
    authenticate,
    membersController.create
);

router.put(
    "/:id",
    validateMember.update,
    /* #swagger.tags = ['members']
       #swagger.description = 'Update an existing member by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Member ID',
          required: true,
          type: 'string'
       }
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Member data',
          required: true,
          schema: {
             firstName: "John",
             lastName: "Doe",
             phone: "555-1234",
             email: "john@example.com",
             password: "secret123",
             status: "active",
             role: "member"
          }
       }
    */
    authenticate,
    membersController.update
);

router.delete(
    "/:id",
    /* #swagger.tags = ['members']
       #swagger.description = 'Soft delete a member by ID.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Member ID',
          required: true,
          type: 'string'
       }
    */
    authenticate,
    membersController.delete
);

module.exports = router;