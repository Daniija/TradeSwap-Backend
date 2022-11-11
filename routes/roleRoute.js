const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router
    .route('/')
    .post(roleController.createRole)
    .get(roleController.getAllRoles)

router
    .route('/:id')
    .get(roleController.getRoleById)
    .patch(roleController.updateRole)
    .delete(roleController.deleteRole);

module.exports = router;