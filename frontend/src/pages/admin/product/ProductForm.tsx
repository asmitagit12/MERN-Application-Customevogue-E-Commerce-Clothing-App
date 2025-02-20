import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import ImageUpload from '../../../components/controls/ImageUpload'
import { useCallback, useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ListAltIcon from '@mui/icons-material/ListAlt'
import {
  addProduct,
  getSingleProduct,
  updateProduct
} from '../../../services/admin/productServices'
import {
  getAllCategories,
  getSubCategories
} from '../../../services/admin/categoryServices'
import { uploadImages } from '../../../services/admin/imageUploadService'
import toast from 'react-hot-toast'

type Category = {
  _id: string
  name: string
}
const productSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  description: z.string().nonempty('Description is required'),
  category: z.string().nonempty('Category is required'),
  subCategory: z.string().nonempty('Subcategory is required'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  stock: z.number().min(0, 'Stock must be a positive number').default(0),
  sizes: z
    .array(
      z.object({
        size: z.string().nonempty('Size is required'),
        stock: z.number().min(0, 'Stock cannot be negative')
      })
    )
    .min(1, 'At least one size must be added'), // Ensure at least one size // Default to an empty array if not provided
  images: z.array(z.instanceof(File)).optional() // Define images as an array of File
})
// Define the TypeScript type
type ProductFormData = z.infer<typeof productSchema>

const ProductForm = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  // useForm setup
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      subCategory: '',
      price: undefined,
      stock: undefined,
      sizes: [],
      images: []
    }
  })

  const links = [
    { label: 'Home', href: '/admin' },
    { label: `Products`, href: '/admin/products' },
    { label: `Product Details` }
  ]

  const [size, setSize] = useState<string>('') // For storing the current size input
  const [stock, setStock] = useState<number>(0) // For storing the current stock input
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>([]) // Array to hold added sizes
  const [isListVisible, setIsListVisible] = useState(false) // State to manage visibility of the list
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [subCategoryList, setSubCategoryList] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')
  const [product, setProduct] = useState<any>(null)

  // Calculate total stock from sizes
  const totalStock = sizes.reduce((sum, item) => sum + item.stock, 0)

  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (productId) {
        try {
          const response = await getSingleProduct(productId || '')
          if (response?.data) {
            const productData = response.data
            setProduct(productData)
            getRowData({
              ...productData
              // category: productData.category?._id, // Pass only _id for category
              // subCategory: productData.subCategory?._id // Pass only _id for subCategory
            })
            setSelectedCategory(productData.category?._id || '') // Set selected category
            setSelectedSubCategory(productData.subCategory?._id || '') // Set selected subcategory
            setSizes(productData?.sizes || []) // Set sizes
          }
        } catch (error: any) {
        }
      }
    }
    fetchSingleProduct()
  }, [productId])

  const getRowData = useCallback(
    (data: ProductFormData) => {
      Object.entries(data).forEach(([key, val]) => {
        if (key in productSchema.shape) {
          // Process each key
          if (key === 'category' && typeof val === 'object' && val !== null) {
            setValue(
              key as keyof ProductFormData,
              (val as unknown as { _id: string })._id || ''
            )
          } else if (
            key === 'subCategory' &&
            typeof val === 'object' &&
            val !== null
          ) {
            setValue(
              key as keyof ProductFormData,
              (val as unknown as { _id: string })._id || ''
            )
          } else if (key === 'sizes' && Array.isArray(val)) {
            setValue(
              key as keyof ProductFormData,
              val as { size: string; stock: number }[]
            )
          } else if (key === 'images' && Array.isArray(val)) {
            setValue(key as keyof ProductFormData, val as File[]) // Ensure images are Files
          } else if (typeof val === 'string' || typeof val === 'number') {
            setValue(key as keyof ProductFormData, val)
          }
        }
      })
    },
    [setValue]
  )

  useEffect(() => {
    if (totalStock !== undefined) {
      setValue('stock', totalStock)
    }
  }, [totalStock])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        const categoryData: Category[] = response?.data
        if (categoryData && categoryData.length > 0) {
          setCategoryList(categoryData)
        }
      } catch (error: any) {
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getSubCategories(selectedCategory || '') // Ensure `selectedCategory` is provided

        if (!response?.data || response?.data.length === 0) {
          setSubCategoryList([]) // Handle empty response

          return
        }

        const subCategoryData: Category[] = response?.data || [] // Safely access data

        setSubCategoryList(subCategoryData) // Store the fetched subcategories
      } catch (error: any) {
      }
    }
    fetchSubCategories()
  }, [selectedCategory])

  const handleAddSize = () => {
    if (size && stock > 0) {
      // Add size and stock to the list
      const updatedSizes = [...sizes, { size, stock }]
      setSizes(updatedSizes) // Update local sizes state
      setValue('sizes', updatedSizes) // Update form state with sizes
      setSize('') // Reset size input
      setStock(0) // Reset stock input
    }
  }

  const handleImagesChange = (newImages: File[]) => {
    setValue('images', newImages) // Update form state with the combined images

  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (product && product._id) {
        // Update Product
        const payload = {
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          subCategory: data.subCategory,
          stock: data.stock,
          sizes: data.sizes,
          productId: product._id
        }


        const res = await updateProduct(payload)

        if (res?.data) {
          const productId = res.data._id
          const newImages = data.images || []
          const existingImages = product.images || [] // Ensure existing images are considered

          if (newImages.length > 0) {
            await uploadImages(newImages, productId)
          }

          // Merge existing and new images for consistent state
          // const updatedImages = [...existingImages, ...newImages]

          toast.success('Product and images successfully updated!')
          navigate('/admin/products')
        }
      } else {
        // Add Product

        const res = await addProduct(data)

        if (res?.data) {
          const productId = res.data._id
          const newImages = data.images || []

          if (newImages.length > 0) {
            await uploadImages(newImages, productId)
          }

          toast.success('Product and images successfully added!')
          navigate('/admin/products')
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Operation failed'
      toast.error(errorMessage)
    } finally {
      reset()
      clearErrors()
    }
  }

  const handleRemoveSize = (index: number) => {
    // Remove the size at the specified index
    const updatedSizes = sizes.filter((_, i) => i !== index)
    setSizes(updatedSizes)
    setValue('sizes', updatedSizes) // Update form state with the new sizes array
  }

  const handleToggleList = () => {
    setIsListVisible(!isListVisible) // Toggle list visibility
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={12}
          mt={1}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          columnGap={1}
        >
          <BreadcrumbsComponent links={links} size={15} />
        </Grid>
        <Grid item xs={12} lg={12} sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        placeholder='Product name'
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        placeholder='Description'
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>
                {/* Category Select */}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Controller
                    name='category'
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        size='small'
                        error={!!errors.category}
                      >
                        <Select
                          {...field}
                          value={selectedCategory}
                          onChange={e => {
                            const value = e.target.value
                            setSelectedCategory(value)
                            field.onChange(value)
                            setSelectedSubCategory('') // Reset subcategory on category change
                          }}
                          displayEmpty
                        >
                          <MenuItem value='' disabled>
                            Select Category
                          </MenuItem>
                          {categoryList.map(category => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.category?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* SubCategory Select */}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Controller
                    name='subCategory'
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        size='small'
                        error={!!errors.subCategory}
                      >
                        <Select
                          {...field}
                          value={selectedSubCategory}
                          onChange={e => {
                            const value = e.target.value
                            setSelectedSubCategory(value)
                            field.onChange(value)
                          }}
                          displayEmpty
                          disabled={
                            !selectedCategory || subCategoryList.length === 0
                          }
                        >
                          <MenuItem value='' disabled>
                            Select SubCategory
                          </MenuItem>
                          {subCategoryList.map(subCategory => (
                            <MenuItem
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.subCategory?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Controller
                    name='price'
                    control={control}
                    defaultValue={0} // Set a default value
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        placeholder='Price'
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        type='number'
                        value={field.value || ''} // Ensure it always has a value
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        } // Ensure numeric value
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Controller
                    name='stock'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        placeholder='Total Stock'
                        fullWidth
                        disabled
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
                        type='number'
                        value={totalStock}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    {/* Two Inputs for Size and Stock */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box display='flex' gap={2} mb={2}>
                        {/* Size Input */}
                        <TextField
                          size='small'
                          placeholder='Size (e.g., S, M, L)'
                          fullWidth
                          value={size}
                          helperText={
                            sizes.length < 0 &&
                            'At least one size must be added'
                          }
                          onChange={e => setSize(e.target.value.toUpperCase())}
                        />
                        {/* Stock Input */}
                        <TextField
                          size='small'
                          type='number'
                          placeholder='Stock'
                          fullWidth
                          value={stock}
                          onChange={e =>
                            setStock(parseInt(e.target.value) || 0)
                          }
                        />
                        <Stack direction={'row'} spacing={1}>
                          <Tooltip title='Add Size'>
                            {/* Add Button */}
                            <IconButton
                              color='primary'
                              size='large'
                              onClick={handleAddSize}
                              sx={{ m: 0, p: 0 }}
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                          {/* Toggle List Visibility Icon */}
                          <Tooltip title='Sizes List'>
                            <IconButton
                              color='primary'
                              size='large'
                              onClick={handleToggleList}
                              sx={{ m: 0, p: 0 }}
                            >
                              <ListAltIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    </Grid>

                    {/* List of Sizes */}
                    {isListVisible && (
                      <Grid item xs={12}>
                        <Paper>
                          <List>
                            {sizes.map((item, index) => (
                              <ListItem
                                key={index}
                                secondaryAction={
                                  <IconButton
                                    edge='end'
                                    onClick={() => handleRemoveSize(index)}
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </IconButton>
                                }
                              >
                                <ListItemText
                                  primary={`${item.size} - ${item.stock}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {/* Image Upload Component */}
              <ImageUpload
                onImagesChange={handleImagesChange}
                initialImages={product?.images || []} // Pass existing images if editing
                productId={product?._id || ''}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={4}>
          <Box display='flex' justifyContent='flex-end' gap={2}>
            <Button type='button' onClick={()=>{navigate('/admin/products')}} variant='outlined' color='primary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductForm

