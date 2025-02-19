import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Divider,
  Stack,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LineChart from '../../components/chart/LineChart'

// import { Line } from "react-chartjs-2";

type CardData = {
  title: string
  value: string
  change: string
  comparison: string
  icon: React.ReactNode
}

type BestSeller = {
  name: string
  price: string
  sales: number
}

const AdminDashboard: React.FC = () => {
  const cards: CardData[] = [
    {
      title: 'Total Orders',
      value: '₹126.500',
      change: '34.7%',
      comparison: 'Compared to Oct 2023',
      icon: '🛒'
    },
    {
      title: 'Active Orders',
      value: '₹126.500',
      change: '34.7%',
      comparison: 'Compared to Oct 2023',
      icon: '🔄'
    },
    {
      title: 'Completed Orders',
      value: '₹126.500',
      change: '34.7%',
      comparison: 'Compared to Oct 2023',
      icon: '✅'
    },
    {
      title: 'Return Orders',
      value: '₹126.500',
      change: '34.7%',
      comparison: 'Compared to Oct 2023',
      icon: '🔙'
    }
  ]

  const bestSellers: BestSeller[] = [
    { name: 'Lorem Ipsum', price: '₹126.50', sales: 999 },
    { name: 'Lorem Ipsum', price: '₹126.50', sales: 999 },
    { name: 'Lorem Ipsum', price: '₹126.50', sales: 999 },
    { name: 'Lorem Ipsum', price: '₹126.50', sales: 999 },
  ]

  const chartData = {
    categories: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    series: [
      {
        name: 'Sales',
        data: [50, 100, 150, 200, 250, 400]
      }
    ]
  }

  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = today.toLocaleDateString('en-US', options)

  return (
    <Box pl={2} pr={2}>
      <Stack
        direction={'row'}
        sx={{ display: 'flex', justifyContent: 'space-between',flexWrap:'wrap' }}
      >
        <Stack>
          <Typography variant='h5' pb={0.5}>
            Dashboard
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Welcome to your admin dashboard.
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTodayIcon color='inherit' sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontWeight: 550, fontSize: 13 }}
            color='textSecondary'
          >
            {formattedDate}
          </Typography>
        </Box>
      </Stack>

      {/* Cards */}
      <Grid container spacing={2} mt={1}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant='elevation' elevation={3}>
              <CardContent>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mb={1}
                >
                  <Box>
                    <Typography variant='subtitle1'>{card.title}</Typography>
                    <Typography variant='h5' fontWeight='bold'>
                      {card.value}
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant='body2' color='success.main'>
                  {card.change} ⬆
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  {card.comparison}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sales Graph and Best Sellers */}
      <Grid container spacing={2} mt={3}>
        {/* Sales Graph */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                mb={2}
              >
                <Typography variant='h6'>Sales Graph</Typography>
                <Box display='flex' justifyContent='flex-end' gap={1}>
                  <Button variant='outlined' size='small'>
                    WEEKLY
                  </Button>
                  <Button variant='contained' size='small'>
                    MONTHLY
                  </Button>
                  <Button variant='outlined' size='small'>
                    YEARLY
                  </Button>
                </Box>
              </Stack>
              <Divider sx={{bgcolor:'#71797E'}}/>
              <Box mt={2}>
                <LineChart data={chartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Best Sellers */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' mb={1}>
                Best Sellers
              </Typography>
              <Divider />
              {bestSellers.map((seller, index) => (
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  py={1.5}
                  key={index}
                >
                  <Box display='flex' alignItems='center' gap={2}>
                    <Box
                      width={50}
                      height={50}
                      bgcolor='grey.300'
                      borderRadius='50%'
                    ></Box>
                    <Box>
                      <Typography variant='body1'>{seller.name}</Typography>
                      <Typography variant='caption' color='textSecondary'>
                        {seller.price}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant='body1' fontWeight='bold'>
                    {seller.sales} sales
                  </Typography>
                </Box>
              ))}
              <Button variant='contained' fullWidth sx={{mt:1}}>
                REPORT
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
