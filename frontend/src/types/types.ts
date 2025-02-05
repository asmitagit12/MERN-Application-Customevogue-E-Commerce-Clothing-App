// src/types/types.ts
export interface ProductFormData {
  productId?: string
  name: string
  price: number
  description: string
  category: string
  subCategory: string
  stock: number
  sizes: Array<{
    size: string
    stock: number
  }>
  images?: File[]
}
