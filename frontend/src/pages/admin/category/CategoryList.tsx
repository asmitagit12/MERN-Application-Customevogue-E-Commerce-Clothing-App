import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tooltip,
  TextField,
  Typography,
  Stack
} from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from '../../../services/admin/categoryServices'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'
import ConfirmationDialog from '../../../components/controls/ConfirmationDialog'
import { useNavigate } from 'react-router-dom'

// Define validation schema using zod
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required')
})

type CategoryFormData = z.infer<typeof categorySchema>

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [filteredCategories, setFilteredCategories] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    reset,
    setValue,
   
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: ''
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        const categoryData = response?.data

        if (categoryData && categoryData.length > 0) {
          const excludedFields = ['_id', '__v', 'subCategories']
          const filteredHeaders = Object.keys(categoryData[0]).filter(
            key => !excludedFields.includes(key)
          )

          setCategories(categoryData)
          setFilteredCategories(categoryData)
          setHeaders(filteredHeaders)
        }
      } catch (error: any) {
        console.error('Failed to fetch categories:', error.message)
      }
    }
    fetchCategories()
  }, [])

  const links = [{ label: 'Home', href: '/admin' }, { label: 'Category List' }]

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenDialog = (category?: CategoryFormData) => {
    setSelectedCategory(category || null)
    if (category) {
      setValue('name', category.name) // Populate the form with existing category data
    } else {
      reset() // Clear the form for a new category
    }
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setSelectedCategory(null)
    reset()
  }

  const onSubmit = async (data: CategoryFormData) => {
    if (selectedCategory) {
      try {
        const payload = {
          ...data,
          categoryId: selectedCategory._id
        }
        const response = await updateCategory(payload)

        if (response && response.data) {
          const updatedCategory = response.data

          // Update the category in the categories and filteredCategories states
          setCategories(prev =>
            prev.map(category =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          )
          setFilteredCategories(prev =>
            prev.map(category =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          )
        }

        toast.success(response.message || 'Category updated successfully')
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || 'Failed to update'
        console.error('update category error:', errorMessage)
        toast.error(errorMessage)
      }
    } else {
      try {
        const response = await addCategory(data)
        if (response && response.data) {
          setCategories(prev => [...prev, response.data])
          setFilteredCategories(prev => [...prev, response.data])
        }
        toast.success(response.message || 'Category added successfully')
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || 'Failed to add'
        console.error('add category error:', errorMessage)
        toast.error(errorMessage)
      }
    }
    handleCloseDialog()
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearch(value)
    setFilteredCategories(
      categories.filter(category => category.name.toLowerCase().includes(value))
    )
  }

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // Handle opening the confirmation dialog
  const handleOpen = (category: AnnotationStyle) => {
    setSelectedCategory(category || null)
    setOpenConfirm(true)
  }

  // Handle closing the confirmation dialog
  const handleClose = () => {
    setOpenConfirm(false)
  }

  // Handle confirmation action
  const handleConfirm = async () => {
    try {
      const payload = {
        categoryId: selectedCategory?._id
      }
      const response = await deleteCategory(payload)

      if (response && response.status === 200) {
        toast.success(response.data.message || 'Category deleted successfully')

        // Reflect changes in the table
        setCategories(prev =>
          prev.filter(category => category._id !== selectedCategory?._id)
        )
        setFilteredCategories(prev =>
          prev.filter(category => category._id !== selectedCategory?._id)
        )
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to delete'
      console.error('delete category error:', errorMessage)
      toast.error(errorMessage)
    }
    setOpenConfirm(false) // Close the dialog after confirmation
    setSelectedCategory(null)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ mt: 1 }}>
        <BreadcrumbsComponent links={links} size={15} />
      </Grid>
      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        columnGap={1}
      >
        <TextField
          variant='outlined'
          size='small'
          placeholder='Search categories...'
          value={search}
          onChange={handleSearch}
          sx={{ width: '90%' }}
        />
        <Button
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
          color='primary'
          sx={{ whiteSpace: 'nowrap', width: '10%' }}
          onClick={() => handleOpenDialog()}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            height: '65vh',
            display: 'grid',
            gridTemplateRows: '1fr auto'
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ bgcolor: '#E5E4E2', p: 0, pl: 2, fontWeight: 550 }}
                  >
                    Sr.
                  </TableCell>
                  {headers.map(header => (
                    <TableCell
                      key={header}
                      sx={{
                        bgcolor: '#E5E4E2',
                        p: 1,
                        m: 0,
                        textTransform: 'capitalize',
                        fontWeight: 550
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                  <TableCell sx={{ bgcolor: '#E5E4E2', p: 1, fontWeight: 550 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ p: 0, pl: 2, width: '10%' }}>
                      {index + 1}
                    </TableCell>
                    {headers.map(header => (
                      <TableCell
                        sx={{ p: 0.9, pl: 1, width: '60%' }}
                        key={`${index}-${header}`}
                      >
                        {category[header]}
                      </TableCell>
                    ))}
                    {/* Move Actions column to the end */}
                    <TableCell sx={{ p: 0, width: '20%', textAlign: 'left' }}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={0}
                      >
                        <Tooltip title='Add Subcategories'>
                          <IconButton
                            onClick={() =>
                              navigate(`/admin/sub-category/${category._id}`)
                            }
                          >
                            <PlaylistAddIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit'>
                          <IconButton
                            color='primary'
                            onClick={() => handleOpenDialog(category)}
                          >
                            <EditIcon sx={{ fontSize: 19 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>
                          <IconButton
                            color='inherit'
                            onClick={() => {
                              handleOpen(category)
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 19 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            width: '100%',
            bgcolor: '#E5E4E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 0,
            m: 0,
            height: 45,
            fontSize: 16,
            overflow: 'hidden'
          }}
        />
      </Grid>

      {/* Dialog for Add/Edit Category */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm'>
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <Typography sx={{ fontSize: 19 }}>
            {selectedCategory ? 'Update Category' : 'Add Category'}
          </Typography>
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* Name Field */}
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Name'
                  sx={{ width: 300 }}
                  size='small'
                  margin='normal'
                  variant='outlined'
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              {selectedCategory ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ConfirmationBox Component */}
      <ConfirmationDialog
        open={openConfirm}
        title='Confirm Action'
        content={
          <Stack spacing={1}>
            <Typography>
              Are you sure you want to delete this category?
            </Typography>
            <Typography>
              <strong>Category Name:</strong> {selectedCategory?.name}
            </Typography>
            <Typography color='error' variant='caption'>
              This action will also delete all subcategories associated with
              this category.
            </Typography>
          </Stack>
        }
        handleClose={handleClose}
        confirmTitle='Yes, Confirm'
        handleConfirm={handleConfirm}
        zIndex={1300} // Optional, default Material UI z-index
      />
    </Grid>
  )
}

export default CategoryList
