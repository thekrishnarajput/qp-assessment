import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";
import { addToCartController, getAllCartItemsController, removeCartItemController, updateQuantityController } from "../controllers/cart.controller";
import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";

export const cartRouter = Router();

// Add items to the cart
cartRouter.post("/add-to-cart",
    auth,
    permit([Roles.userRoleId]),  // Only user can add items to the cart
    validator.itemsArray,
    validator.ItemId,
    validator.cartItemQuantity,
    addToCartController);

// Get all categories list
cartRouter.get("/all-cart-items",
    auth,
    permit([Roles.userRoleId]),  // Only user can get items from their cart
    getAllCartItemsController);

// Update cart items quantity
cartRouter.post("/update-quantity/:item_id",
    auth,
    permit([Roles.userRoleId]),  // Only user can delete cart items
    validator.item_id,
    updateQuantityController);

// Delete the category
cartRouter.get("/remove-item/:cart_item_id",
    auth,
    permit([Roles.userRoleId]),  // Only user can delete cart items
    validator.cart_item_id,
    removeCartItemController);