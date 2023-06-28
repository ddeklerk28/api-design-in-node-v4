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
  body("title").isString(),
  body("body").isString(),
  body("status").isString(),
  body("version").isString().optional(),
  body("asset").isString().optional(),
];

router.get("/update", () => {});
router.get("/update/:id", updateValidator, handleInputErrors, () => {});

router.put(
  "/update/:id",
  [updateValidator, handleInputErrors],
  (req, res) => {}
);
router.post("/update", () => {});
router.delete("/update/:id", () => {});

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
