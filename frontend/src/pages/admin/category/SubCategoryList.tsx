import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  addSubCategory,
  deleteSubCategory,
  getAllCategories,
  getSubCategories
} from '../../../services/admin/categoryServices'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// Define validation schema using zod
const subCategorySchema = z.object({
  subCategory: z
    .array(z.string())
    .min(1, 'At least one subcategory is required') // Expecting an array of strings
})

type SubCategoryFormData = z.infer<typeof subCategorySchema>

const SubCategoryList = () => {
  const { categoryId } = useParams() // Correctly extract `categoryId` from params
  const [subCategories, setSubCategories] = useState<any[]>([])
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryId || ''
  )
  const [subCategoriesSelected, setSubCategoriesSelected] = useState<string[]>(
    []
  ) // Store added subcategories
  const [open, setOpen] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<SubCategoryFormData>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      subCategory: []
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        const categoryData = response?.data

        if (categoryData.length > 0) {
          // Find category by `categoryId`
          const foundCategory = categoryData.find(
            (category: any) => category._id === categoryId
          )

          // If found, set the category name as the selected value
          if (foundCategory) {
            setSelectedCategory(foundCategory.name)
          }

         
        }
      } catch (error: any) {
        console.error('Failed to fetch categories:', error.message)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getSubCategories(categoryId || '') // Ensure `categoryId` is provided
        console.log('API Response:', response) // Log response for debugging

        if (!response?.data || response?.data.length === 0) {
          console.warn('No subcategories found.')
          setSubCategories([]) // Handle empty response
          setFilteredSubCategories([])
          return
        }

        const subCategoryData = response.data // Safely access data
        const excludedFields = ['_id', '__v']
        const filteredHeaders = Object.keys(subCategoryData[0]).filter(
          key => !excludedFields.includes(key)
        )
        console.log('Filtered Headers:', filteredHeaders)

        setHeaders(filteredHeaders)
        setSubCategories(subCategoryData) // Store the fetched subcategories
        setFilteredSubCategories(subCategoryData) // Initialize filtered list
      } catch (error: any) {
        console.error('Failed to fetch subcategories:', error.message)
      }
    }
    fetchSubCategories()
  }, [categoryId])

 

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedSubCategories = filteredSubCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const onSubmit = async (data: SubCategoryFormData) => {
    if (!categoryId) {
      toast.error('Category ID is required')
      return
    }
    try {
      const payload = {
        categoryId: categoryId || '',
        subCategories: data.subCategory,
      };
      const response = await addSubCategory(payload);
    
      if (response && response.data) {
        const newSubCategories = Array.isArray(response.data) ? response.data : [];
    
        if (newSubCategories.length > 0) {
          // Ensure proper state update to trigger re-render
          setSubCategories((prev) => [...prev, ...newSubCategories]);
          setFilteredSubCategories((prev) => [...prev, ...newSubCategories]);
        } else {
          toast.error('No subcategories returned from the server');
        }
      }
    
      toast.success(response.message || 'SubCategory added successfully');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to add';
      console.error('add sub category error:', errorMessage);
      toast.error(errorMessage);
    }
    
    handleCloseDialog()
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    reset()
    setValue('subCategory', [])
  }

  const handleDeleteSubcategory = async (subcategory: any) => {
    try {
      const payload = {
        categoryId: categoryId || '',
        subCategoryId: subcategory?._id || ''
      }
      const response = await deleteSubCategory(payload)

      if (response && response.status === 200) {
        toast.success(
          response.data.message || 'Sub-Category deleted successfully'
        )

        // Reflect changes in the table
        setSubCategories(prev =>
          prev.filter(category => category._id !== subcategory?._id)
        )
        setFilteredSubCategories(prev =>
          prev.filter(category => category._id !== subcategory?._id)
        )
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to delete'
      console.error('delete sub category error:', errorMessage)
      toast.error(errorMessage)
    }
  }

  const links = [
    { label: 'Home', href: '/admin' },
    { label: `Category - (${selectedCategory})`, href: '/admin/category' },
    { label: `Subcategories` }
  ]

  return (
    <Grid container spacing={0}>
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
        <Button
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
          color='primary'
          sx={{ whiteSpace: 'nowrap' }}
          onClick={() => handleOpenDialog()} // Define the handler for adding a subcategory
        >
          Add
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ mt: 2, display: subCategories.length > 0 ? 'block' : 'none' }}
      >
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
                {paginatedSubCategories.map((category, index) => (
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
                        <Tooltip title='Edit'>
                          <IconButton
                            color='primary'
                            // onClick={() => handleOpenDialog(category)}
                          >
                            <EditIcon sx={{ fontSize: 19 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>
                          <IconButton
                            color='inherit'
                            onClick={() => {
                              handleDeleteSubcategory(category)
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
          count={subCategories.length}
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
      <Grid
        item
        xs={12}
        sx={{ mt: 8, display: subCategories.length > 0 ? 'none' : 'flex' ,justifyContent:'center'}}
      >
        <Typography>No Data Available</Typography>
      </Grid>

      {/* Dialog for Add/Edit Category */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <Typography sx={{ fontSize: 19 }}>
            {selectedCategory ? 'Update Category' : 'Add Category'}
          </Typography>
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Grid container width='100%' spacing={2}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                rowGap={1}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography sx={{ fontSize: 14 }}>Category</Typography>
                <TextField
                  size='small'
                  value={selectedCategory || ''}
                  disabled
                  fullWidth
                  placeholder='category'
                />
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                rowGap={1}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography sx={{ fontSize: 14 }}>Sub Categories</Typography>
                <Controller
                  name='subCategory'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      id='subcategories-autocomplete'
                      options={['T-Shirts & Polos', 'Shirts']} // Suggestion options
                      value={subCategoriesSelected}
                      onChange={(newValue: unknown) => {
                        setSubCategoriesSelected(newValue as string[]);
                        setValue("subCategory", newValue as string[]);
                      }}
                      
                     
                      renderInput={params => (
                        <TextField
                          {...params}
                          size='small'
                          variant='outlined'
                          placeholder='Add categories here...'
                          error={!!errors.subCategory}
                          helperText={errors.subCategory?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default SubCategoryList
