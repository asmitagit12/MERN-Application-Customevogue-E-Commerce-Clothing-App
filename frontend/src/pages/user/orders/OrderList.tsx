import React, { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  Divider
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GradeIcon from '@mui/icons-material/Grade'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
interface Order {
  id: number
  name: string
  color: string
  price: number
  deliveredDate: string
  status: string
  image: string
}

const ordersData: Order[] = [
  {
    id: 1,
    name: 'MONISTRY Men Trendy, Casual Tan Artificial Wallet',
    color: 'Tan',
    price: 454,
    deliveredDate: 'Dec 13, 2023',
    status: 'Delivered',
    image:
      'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120'
  },
  {
    id: 2,
    name: 'FEMEO excellent new superb combo pack 3 Watches',
    color: 'Black',
    price: 437,
    deliveredDate: 'Jul 30, 2021',
    status: 'Delivered',
    image:
      'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120'
  }
]

const OrderList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(ordersData)

  const handleSearch = () => {
    const filtered = ordersData.filter(order =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredOrders(filtered)
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account' },
    { label: 'My Orders' } // No href for current page
  ]

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Breadcrumb */}
      <BreadcrumbsComponent links={links} size={12}/>

      <Grid container spacing={2}>
        {/* Filters Section */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper sx={{ padding: '16px' }}>
            <Typography gutterBottom sx={{ fontSize: 20, fontWeight: 550 }}>
              Filters
            </Typography>
            <Divider sx={{ mb: 1 }} />

            {/* Order Status Section */}
            <Box sx={{ marginBottom: '16px' }}>
              <Typography
                variant='subtitle1'
                sx={{ fontSize: '14px', fontWeight: 'bold' }}
              >
                ORDER STATUS
              </Typography>
              <List sx={{ p: 0 }}>
                {['On the way', 'Delivered', 'Cancelled', 'Returned'].map(
                  (status, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      sx={{ p: 0, margin: 0 }}
                    >
                      <FormControlLabel
                        control={<Checkbox size='small' sx={{ p: 0.5 }} />}
                        label={status}
                        sx={{
                          margin: 0.3,
                          '.MuiFormControlLabel-label': {
                            fontSize: '15px' // Set label font size
                          }
                        }}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Box>

            {/* Order Time Section */}
            <Box>
              <Typography
                variant='subtitle1'
                sx={{ fontSize: '14px', fontWeight: 'bold' }}
              >
                ORDER TIME
              </Typography>
              <List sx={{ p: 0 }}>
                {['Last 30 days', '2023', '2022', '2021', '2020', 'Older'].map(
                  (time, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      sx={{ pt: 0.5, pb: 0.5, p: 0 }}
                    >
                      <FormControlLabel
                        control={<Checkbox size='small' sx={{ p: 0.5 }} />}
                        label={time}
                        sx={{
                          margin: 0.3,
                          '.MuiFormControlLabel-label': {
                            fontSize: '14px' // Set label font size
                          }
                        }}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} sm={8} md={9}>
          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}
          >
            <TextField
              variant='outlined'
              fullWidth
              size='small'
              placeholder='Search your orders here'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <Button
              variant='contained'
              color='primary'
              sx={{
                fontSize: 14,
                textTransform: 'capitalize',
                height: 35,
                whiteSpace: 'nowrap'
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
              Search Orders
            </Button>
          </Box>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <Paper
                key={order.id}
                sx={{
                  padding: '16px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  src={order.image}
                  alt={order.name}
                  style={{
                    width: '80px',
                    height: 'auto',
                    objectFit: 'cover',
                    marginRight: '16px'
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant='body1' fontWeight='bold'>
                    {order.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Color: {order.color}
                  </Typography>
                  <Typography variant='body2' fontWeight='bold'>
                    ₹{order.price}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='body2'
                    color='green'
                    fontWeight='bold'
                    gutterBottom
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: 16 }} /> Delivered on{' '}
                    {order.deliveredDate}
                  </Typography>
                  <Typography variant='body2'>
                    Your item has been delivered
                  </Typography>
                  <Button
                    sx={{
                      fontSize: 13,
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    color='primary'
                  >
                    <GradeIcon sx={{ fontSize: 16, pr: 0.5 }} /> Rate & Review
                    Product
                  </Button>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography
              variant='body2'
              color='textSecondary'
              textAlign='center'
            >
              No More Results To Display
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderList
