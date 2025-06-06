import { z } from "zod/v4";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
  __v: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const cartItemSchema = productSchema.extend({
  productId: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const productInput = productSchema.omit({
  _id: true,
});

export type ProductInput = z.infer<typeof productInput>;

export const updateSetSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});

export type UpdateSet = z.infer<typeof updateSetSchema>;
