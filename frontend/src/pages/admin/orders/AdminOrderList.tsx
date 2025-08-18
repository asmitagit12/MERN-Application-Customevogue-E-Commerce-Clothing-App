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
    Divider,
    Tooltip,
    Collapse,
    Typography
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'

import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import { getAllUserOrders } from '../../../services/admin/orderServices'

const AdminOrderList: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([])
    const [headers, setHeaders] = useState<string[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    // ✅ Expansion state per order._id
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllUserOrders()
                const orderData = response

                if (orderData && orderData.length > 0) {
                    const fields = ['_id', 'userId', 'totalAmount', 'status', 'paymentMethod', 'createdAt']
                    setHeaders(fields)
                    setOrders(orderData)
                }
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || error.message || 'Failed to fetch orders'
                console.log(errorMessage)
            }
        }
        fetchOrders()
    }, [])

    const links = [
        { label: 'Home', href: '/admin' },
        { label: 'Orders List' }
    ]

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpenDialog = (order: any) => {
        setSelectedOrder(order)
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
        setSelectedOrder(null)
    }

    const toggleRow = (id: string) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <Grid container>
            <Grid item xs={12} pt={1}>
                <BreadcrumbsComponent links={links} size={15} />
            </Grid>

            <Grid item xs={12}>
                <TableContainer
                    component={Paper}
                    sx={{ height: '80vh', display: 'grid', gridTemplateRows: '1fr auto' }}
                >
                    <Box sx={{ overflow: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ bgcolor: '#E5E4E2', fontWeight: 550 }}>Sr.</TableCell>
                                    {headers.map(header => (
                                        <TableCell
                                            key={header}
                                            sx={{
                                                bgcolor: '#E5E4E2',
                                                textTransform: 'capitalize',
                                                fontWeight: 550
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                    <TableCell sx={{ bgcolor: '#E5E4E2', fontWeight: 550 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedOrders.map((order, index) => (
                                    <React.Fragment key={order._id}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => toggleRow(order._id)}>
                                                    {expandedRows[order._id] ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                                {index + 1 + page * rowsPerPage}
                                            </TableCell>
                                            {headers.map(header => (
                                                <TableCell key={header}>
                                                    {header === 'userId'
                                                        ? order.userId?.email
                                                        : header === 'createdAt'
                                                            ? new Date(order[header]).toLocaleString()
                                                            : order[header]}
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                <IconButton onClick={() => handleOpenDialog(order)}>
                                                    <Tooltip title="View">
                                                        <VisibilityIcon sx={{ fontSize: 20 }} />
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={headers.length + 2} sx={{ py: 0 }}>
                                                <Collapse in={expandedRows[order._id]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 2, bgcolor: '#f9f9f9', borderRadius: 2, p: 2 }}>
                                                        {order.items?.length > 0 && (
                                                            <>
                                                                <Table size="small" sx={{ mt: 1 }}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell sx={{
                                                bgcolor: '#E5E4E2',
                                                textTransform: 'capitalize',
                                                fontWeight: 550
                                            }}>Product Name</TableCell>
                                                                            <TableCell sx={{
                                                bgcolor: '#E5E4E2',
                                                textTransform: 'capitalize',
                                                fontWeight: 550
                                            }}>Quantity</TableCell>
                                                                            <TableCell sx={{
                                                bgcolor: '#E5E4E2',
                                                textTransform: 'capitalize',
                                                fontWeight: 550
                                            }}>Price</TableCell>
                                                                            <TableCell sx={{
                                                bgcolor: '#E5E4E2',
                                                textTransform: 'capitalize',
                                                fontWeight: 550
                                            }}>Total</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {order.items.map((item: any, idx: number) => (
                                                                            <TableRow key={idx}>
                                                                                <TableCell>{item.productId?.name || '-'}</TableCell>
                                                                                <TableCell>{item.quantity}</TableCell>
                                                                                <TableCell>₹{item.price}</TableCell>
                                                                                <TableCell>₹{item.quantity * item.price}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Collapse>


                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={orders.length}
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
                            height: 45
                        }}
                    />
                </TableContainer>
            </Grid>

            <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    Order Details
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{ position: 'absolute', right: 8, top: 8, color: '#888' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    {selectedOrder && (
                        <Box>
                            {headers.map(header => (
                                <p key={header}>
                                    <strong style={{ textTransform: 'capitalize' }}>{header}:</strong>{' '}
                                    {header === 'userId'
                                        ? selectedOrder.userId?.email
                                        : selectedOrder[header]?.toString()}
                                </p>
                            ))}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default AdminOrderList
