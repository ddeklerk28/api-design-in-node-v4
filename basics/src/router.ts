import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/update";

// TODO: Look at using Joi.
const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
const updateValidator = [
  body("title").isString().optional(),
  body("body").isString().optional(),
  body("status").isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body("version").isString().optional(),
  body("asset").isString().optional(),
];

router.get("/update", getUpdates);
router.get("/update/:id", updateValidator, handleInputErrors, getUpdate);

router.put(
  "/update/:id",
  [updateValidator, handleInputErrors],
  updateUpdate
);
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("productId").isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */

const updatePointValidator = [
  body("name").isString().optional(),
  body("description").optional().isString(),
];

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", updatePointValidator, () => {});
router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
