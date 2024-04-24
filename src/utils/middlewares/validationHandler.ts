import { body, check } from 'express-validator';

export const validator = {
    email: body('email').notEmpty().withMessage('Email address is required!').isEmail().withMessage('Email address is invalid!'),
    mobileNumber: body('mobile_number').notEmpty().withMessage('Mobile number is required!').isMobilePhone('any', { strictMode: false }).withMessage('Mobile number is invalid!'),
    password: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    adminPassword: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 4 }).withMessage('Password must be at least 8 characters long!'),
    name: body('name').notEmpty().withMessage('Name is required!').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long!'),
    // lastName: body('lastName').notEmpty().withMessage('Last name is required!').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long!'),
    role: body('role').notEmpty().withMessage('Role is required!').isIn([1, 2]),

    // Items
    itemsArray: body('items').isArray().withMessage('Items must be an array'),
    itemsName: body('items.*.name').notEmpty().withMessage('Name is required!').isString().notEmpty().withMessage('Name must be a string'),
    itemsPrice: body('items.*.price').notEmpty().withMessage('Price is required!').isNumeric().withMessage('Price must be a number1'),
    itemsCategoryId: body('items.*.category_id').notEmpty().withMessage('Category ID is required!').isInt().withMessage('Category ID must be a number!'),
    itemsQuantity: body('items.*.quantity').notEmpty().withMessage('Quantity is required!').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),

    // Categories
    categoriesArray: body('categories').isArray().withMessage('Categories must be an array'),
    categoryName: body('categories.*.name').notEmpty().withMessage('Category name is required!').isString().withMessage('Category name must be a string'),
    categoryImageUrl: body('categories.*.image_url').notEmpty().withMessage('Image URL is required!').isURL().withMessage('Image URL must be a valid URL'),

    price: check('price').notEmpty().withMessage('Price is required!').isDecimal().withMessage('Price must be a decimal number'),
    category_id: check('category_id').notEmpty().withMessage("Category id is required!").isNumeric().withMessage('Category ID must be a number!'),
    quantity: check('quantity').notEmpty().withMessage('Quantity is required!').isNumeric().withMessage('Quantity must be a number!'),
    id: check('id').notEmpty().withMessage("Id is required!").isNumeric().withMessage('ID must be a number!'),

    // Cart
    ItemId: body('items.*.item_id').notEmpty().withMessage('Item id is required!').isNumeric().withMessage('item_id must be a string'),
    cartItemQuantity: body('items.*.quantity').notEmpty().withMessage('Quantity is required!').isInt({ min: 1 }).withMessage('Quantity must be a non-negative integer'),

    item_id: check('item_id').notEmpty().withMessage("Item id is required!").isNumeric().withMessage('Item id must be a number!'),
    cart_item_id: check('cart_item_id').notEmpty().withMessage("Cart item id is required!").isNumeric().withMessage('Cart item id must be a number!'),
}