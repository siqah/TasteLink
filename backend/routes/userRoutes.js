const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authenticate'); // Import the auth middleware
const {upload, uploadImageToCloudinary} = require('../middlewares/cloudinary'); // Import the upload middleware


// Importing controller functions

const { postUser, getUsers,getUserById,
        updateUser,deleteUser,uploadProfileImage,
        getProfileImage
      } = require('../controllers/userController');

const { getChefs, getChefById,createChef,
        updateChef,deleteChef } = require('../controllers/chefController');

const {
        createCustomer,
        getCustomers,
        getCustomerById,
        updateCustomer,
        deleteCustomer
      } = require('../controllers/customerController'); 
    
   

//Route to handle User operations
router.route('/')
    .post(upload.single('image'), postUser)
    .get(upload.single('image'), getUsers);

router.route('/').post(postUser)

// Route to handle operations on a specific user by ID
router.route('/:id')
    .get( getUserById)
    .put( updateUser)
    .delete(deleteUser); 



// POST route to upload profile image
router.post('/profileImage',authMiddleware, upload.single('image'), uploadProfileImage);

router.get('/profileImage/:id', getProfileImage);

// Route to get all chefs
router.route('/chefs').get(getChefs);
router.route('/chef').post(createChef);
router.route('/chef/:id').get(getChefById).put(updateChef).delete(deleteChef);

// Route to get all customers
router.route('/customers').get(getCustomers);
router.route('/customer').post(createCustomer);
router.route('customer/:id').get(getCustomerById).put(updateCustomer).delete(deleteCustomer);


module.exports = router;
