import React, { useEffect, useState } from 'react'
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
import { getOrderByUserId } from '../../../services/user/orderService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

interface Order {
  id: string;
  name: string;
  price: number;
  quantity: number;
  deliveredDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  image: string;
  createdAt: string;
}

const baseUrl = import.meta.env.VITE_BASEURL

const OrderList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  // Filters
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  const user = useSelector((state: RootState) => state.auth.user)
  const userId = user?._id

  // ---------------------------
  // Fetch Orders
  // ---------------------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderByUserId(userId || '');
        const rawOrders = response;

        const transformedOrders: Order[] = rawOrders.flatMap((order: any) =>
          order.items.map((item: any) => ({
            id: item._id,
            name: item.productId?.name || 'Product Name',
            price: item.price,
            quantity: item.quantity,
            deliveredDate: new Date(order.createdAt).toLocaleDateString(),
            createdAt: order.createdAt,
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,
            totalAmount: order.totalAmount,
            image: `${baseUrl}api/uploads/${item.productId.images[0]}`
          }))
        );

        setOrders(transformedOrders);
        setFilteredOrders(transformedOrders);

      } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch orders");
      }
    };
    fetchOrders();
  }, [userId]);


  // ---------------------------
  // Apply All Filters
  // ---------------------------
  useEffect(() => {
    let updated = [...orders];

    // Search Filter
    if (searchQuery.trim() !== "") {
      updated = updated.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status Filter
    if (selectedStatuses.length > 0) {
      updated = updated.filter(order =>
        selectedStatuses.includes(order.status)
      );
    }

    // Year / Time Filter
    if (selectedYears.length > 0) {
      updated = updated.filter(order => {
        const year = new Date(order.createdAt).getFullYear();
        const days30 = (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24);

        if (selectedYears.includes("Last 30 days")) return days30 <= 30;
        if (selectedYears.includes(String(year))) return true;
        if (selectedYears.includes("Older")) return year < 2020;

        return false;
      });
    }

    setFilteredOrders(updated);

  }, [searchQuery, selectedStatuses, selectedYears, orders]);



  // ---------------------------
  // Checkbox handler
  // ---------------------------
  const toggleFilter = (value: string, setState: any) => {
    setState((prev: string[]) =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };


  const links = [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account' },
    { label: 'My Orders' }
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Breadcrumb */}
      <BreadcrumbsComponent links={links} size={12} />

      <Grid container spacing={2}>
        {/* Filters Section */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper sx={{ padding: '16px' }}>
            <Typography gutterBottom sx={{ fontSize: 20, fontWeight: 550 }}>
              Filters
            </Typography>
            <Divider sx={{ mb: 1 }} />

            {/* ORDER STATUS */}
            <Box sx={{ marginBottom: '16px' }}>
              <Typography variant='subtitle1' sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                ORDER STATUS
              </Typography>
              <List sx={{ p: 0 }}>
                {['On the way', 'Delivered', 'Cancelled', 'Returned'].map(
                  (status, index) => (
                    <ListItem key={index} disableGutters sx={{ p: 0, margin: 0 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size='small'
                            sx={{ p: 0.5 }}
                            checked={selectedStatuses.includes(status)}
                            onChange={() => toggleFilter(status, setSelectedStatuses)}
                          />
                        }
                        label={status}
                        sx={{ margin: 0.3, '.MuiFormControlLabel-label': { fontSize: '15px' } }}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Box>

            {/* ORDER TIME */}
            <Box>
              <Typography variant='subtitle1' sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                ORDER TIME
              </Typography>
              <List sx={{ p: 0 }}>
                {['Last 30 days', '2023', '2022', '2021', '2020', 'Older'].map(
                  (time, index) => (
                    <ListItem key={index} disableGutters sx={{ pt: 0.5, pb: 0.5, p: 0 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size='small'
                            sx={{ p: 0.5 }}
                            checked={selectedYears.includes(time)}
                            onChange={() => toggleFilter(time, setSelectedYears)}
                          />
                        }
                        label={time}
                        sx={{ margin: 0.3, '.MuiFormControlLabel-label': { fontSize: '14px' } }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
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
              sx={{ fontSize: 14, textTransform: 'capitalize', height: 35, whiteSpace: 'nowrap' }}
            >
              <SearchIcon /> Search Orders
            </Button>
          </Box>

          {/* Order List */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <Paper
                key={order.id}
                sx={{
                  padding: '16px',
                  marginBottom: '16px',
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start'
                }}
              >
                <img
                  src={order.image}
                  alt={order.name}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {order.name}
                  </Typography>

                  <Typography variant="body2">
                    Price: <b>₹{order.price}</b>
                  </Typography>

                  <Typography variant="body2">
                    Quantity: <b>{order.quantity}</b>
                  </Typography>

                  <Typography variant="body2">
                    Total Paid: <b>₹{order.totalAmount}</b>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: order.paymentStatus === "PAID" ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    Payment Status: {order.paymentStatus}
                  </Typography>

                  <Typography variant="body2" style={{ textTransform: 'uppercase' }}>
                    Payment Method: <b>{order.paymentMethod}</b>
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color:
                        order.status === "DELIVERED"
                          ? "green"
                          : order.status === "CANCELLED"
                            ? "red"
                            : "#ff9800"
                    }}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {order.status} – {order.deliveredDate}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {order.status === "PENDING"
                      ? "Your item is being processed"
                      : "Your item has been delivered"}
                  </Typography>

                  <Button
                    sx={{
                      fontSize: 13,
                      textTransform: "capitalize",
                      mt: 1,
                      display: "flex",
                      alignItems: "center"
                    }}
                    color="primary"
                  >
                    <GradeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Rate & Review Product
                  </Button>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant='body2' color='textSecondary' textAlign='center'>
              No More Results To Display
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderList
