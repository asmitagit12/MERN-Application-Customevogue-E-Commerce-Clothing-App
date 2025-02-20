import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
  Divider,
  Tooltip,
  LinearProgress,
  Stack,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  deleteProduct,
  getAllProducts
} from '../../../services/admin/productServices'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import NoImage from '../../../assets/no-image.png'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import toast from 'react-hot-toast'
import ConfirmationDialog from '../../../components/controls/ConfirmationDialog'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const baseUrl = import.meta.env.VITE_BASEURL

const ProductList = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = React.useState('list');
  const itemsPerPage = view === 'list' ? 8 : 6
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [openConfirm, setOpenConfirm] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = {
          category: '',
          subCategory: '',
          minPrice: 0,
          maxPrice: 0,
          size: '',
          stock: false,
          search: ''
        }

        const response = await getAllProducts(filters)
        const productData = response?.data
        if (productData && productData.length > 0) {
          setProductList(productData)
        }
      } catch (error: any) {
      }
    }
    fetchProducts()
  }, [])

  const handleChangePage = (
    page: number
  ) => {
    setCurrentPage(page)
  }

  const links = [{ label: 'Home', href: '/admin' }, { label: 'All Products' }]
  // Paginated Data
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = productList.slice(startIndex, endIndex)

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    product: any
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedProduct(product)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    navigate(`/admin/update-product/${selectedProduct?._id}`)
    handleMenuClose()
  }

  const handleOpen = () => {
    setOpenConfirm(true)
  }

  // Handle closing the confirmation dialog
  const handleClose = () => {
    setOpenConfirm(false)
    setSelectedProduct(null)
  }

  // Handle confirmation action
  const handleConfirm = async () => {
    try {
      const payload = {
        productId: selectedProduct?._id
      }
      const response = await deleteProduct(payload)

      if (response && response.status === 200) {
        toast.success(response.data.message || 'Product deleted successfully')

        // Reflect changes in the table
        setProductList(prev =>
          prev.filter(product => product._id !== selectedProduct?._id)
        )
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to delete'
      toast.error(errorMessage)
    }
    setOpenConfirm(false) // Close the dialog after confirmation
    setSelectedProduct(null)
  }

  const handleDelete = () => {
    handleOpen()
    handleMenuClose()
  }


  return (
    <Box>
      <Grid
        item
        xs={12}
        lg={12}
        mt={1}
        display='flex'
        flexWrap={'wrap'}
        justifyContent='space-between'
        alignItems='center'
        columnGap={1}
      >
        <BreadcrumbsComponent links={links} size={15} />
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Box display='flex' whiteSpace={'nowrap'} justifyContent='center' alignItems='center'>
            <Pagination
              count={Math.ceil(productList.length / itemsPerPage)}
              page={currentPage}
              onChange={() => handleChangePage}
              color='primary'
              sx={{ whiteSpace: 'nowrap' }}
            />
          </Box>
          <Button
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            color='primary'
            sx={{ whiteSpace: 'nowrap' }}
            onClick={() => {
              navigate('/admin/add-product')
            }}
          >
            Add New Product
          </Button>
          <ToggleButtonGroup
            orientation="horizontal"
            value={view}
            sx={{ height: 35 }}
            size="small"
            exclusive
            onChange={(nextView: unknown) => {
              if (typeof nextView === "string") setView(nextView);
            }}
            
          >
            <ToggleButton value="list" aria-label="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Grid>
      <Divider variant='fullWidth' sx={{ m: 1, mb: 2 }} />

      
      {/* Product View */}
      <Grid container spacing={3}>
        {view === 'list' ? (
          // Table View
          <Grid item xs={12}>
            <TableContainer component={Paper}
              sx={{
                height: '80vh',
                p: 0
              }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ p: 0, m: 0 }}>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>#</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>Image</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550, textTransform: 'capitalize' }}><strong>Product Name</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550, textTransform: 'capitalize' }}><strong>Category</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>Subcategory</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>In Stock</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>Stock Count</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>Price</strong></TableCell>
                    <TableCell sx={{ p: 0.6, m: 0, textAlign: 'center', bgcolor: '#E5E4E2', pl: 2, fontWeight: 550 }}><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedProducts.map((product, index) => (
                    <TableRow key={product._id} sx={{ p: 0 }}>
                      {/* Serial Number */}
                      <TableCell sx={{ p: 0.6, m: 0 }}>#{String(index + 1).padStart(3, '0')}</TableCell>

                      {/* Image */}
                      <TableCell sx={{ p: 0.6, m: 0 }}>
                        <CardMedia
                          component="img"
                          style={{ width: 50, height: 50, borderRadius: '4px' }}
                          image={`${baseUrl}/uploads/${product.images[0]}` || NoImage}
                          alt={product.name}
                        />
                      </TableCell>

                      {/* Product Name */}
                      <TableCell sx={{ textTransform: 'capitalize' }}>{product.name}</TableCell>

                      {/* Category */}
                      <TableCell>{product.category?.name || 'N/A'}</TableCell>

                      {/* Subcategory */}
                      <TableCell>{product.subCategory?.name || 'N/A'}</TableCell>

                      {/* In Stock */}
                      <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>

                      {/* Stock Count */}
                      <TableCell>
                        {product.sizes?.length > 0
                          ? `${product.sizes.reduce((acc: any, size: { stock: any }) => acc + size.stock, 0)} in stock`
                          : `${product.stock} in stock`}
                      </TableCell>

                      {/* Price */}
                      <TableCell>₹{product.price?.toFixed(2)}</TableCell>

                      {/* Actions */}
                      <TableCell sx={{ textAlign: 'center', justifyContent: 'center', p: 0.5 }}>
                        <Stack direction="row" spacing={0} sx={{ width: 'auto', display: 'flex', justifyContent: 'center' }}>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => navigate(`/admin/update-product/${product._id}`)}>
                              <EditIcon sx={{ fontSize: 22 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={handleDelete}>
                              <DeleteIcon sx={{ fontSize: 22 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View Details">
                            <IconButton onClick={() => navigate(`/admin/product-info/${product._id}`)}>
                              <InfoIcon sx={{ fontSize: 22 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          // Grid View
          paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={product._id}>
              <Card
                sx={{
                  height: '90%',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Stack
                  direction={'row'}
                  spacing={1}
                  alignItems={'start'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  pt={1}
                >
                  <Stack direction={'row'} spacing={1}>
                    <CardMedia
                      component="img"
                      style={{ width: 80, height: 'auto' }}
                      image={`${baseUrl}/uploads/${product.images[0]}` || NoImage}
                      alt={product.name}
                    />
                    <Stack>
                      <Typography
                        sx={{
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          textTransform: 'capitalize',
                        }}
                        fontWeight="bold"
                      >
                        {product?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product?.category?.name}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" marginTop={1}>
                        ₹{product?.price?.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Tooltip title="More Actions">
                    <IconButton onClick={(event) => handleMenuOpen(event, product)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <CardContent
                  sx={{ marginTop: 'auto', width: '100%', height: 'auto' }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1, textTransform: 'capitalize' }}
                  >
                    {product?.description}
                  </Typography>
                  <Stack
                    spacing={0.5}
                    sx={{
                      mt: 1,
                      border: '1px solid gray',
                      borderRadius: 3,
                      p: 2,
                    }}
                  >
                    <Stack
                      direction={'row'}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2" fontWeight="bold">
                        Sales
                      </Typography>

                      <Typography variant="body2" color="primary">
                        ↑ {Math.floor(Math.random() * 5000)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction={'row'}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" fontWeight="bold">
                        Remaining Products
                      </Typography>
                      <Typography variant="body2">{product.stock}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(product.stock / 100) * 100}
                        sx={{ marginTop: 1, width: 40 }}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>


      {/* Menu for MoreVertIcon */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{ fontSize: 14 }} onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: 19 }} /> Edit
        </MenuItem>
        <MenuItem sx={{ fontSize: 14 }} onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, fontSize: 19 }} /> Delete
        </MenuItem>
        <MenuItem
          sx={{ fontSize: 14 }}
          onClick={() => {
            navigate(`/admin/product-info/${selectedProduct?._id}`)
          }}
        >
          <InfoIcon sx={{ mr: 1, fontSize: 19 }} />
          Details
        </MenuItem>
      </Menu>

      {/* ConfirmationBox Component */}
      <ConfirmationDialog
        open={openConfirm}
        title='Confirm Action'
        content={
          <Stack spacing={1}>
            <Typography>
              Are you sure you want to delete this product?
            </Typography>
            <Typography>
              <strong>Product Name:</strong> {selectedProduct?.name}
            </Typography>

            <Typography color='error' variant='caption'>
              Deleting this product is irreversible and will permanently remove
              it from the system, including all associated data.
            </Typography>
          </Stack>
        }
        handleClose={handleClose}
        confirmTitle='Yes, Confirm'
        handleConfirm={handleConfirm}
        zIndex={1300} // Optional, default Material UI z-index
      />
    </Box >
  )
}

export default ProductList
