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
  Collapse
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../services/admin/userServices'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]) // State to store user data
  const [headers, setHeaders] = useState<string[]>([]) // State to store table headers
  const [page, setPage] = useState(0) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page
  const [open, setOpen] = useState(false) // State to manage dialog box
  const [selectedUser, setSelectedUser] = useState<any>(null) // State to store selected user
  const [openRow, setOpenRow] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()
        const userData = response?.data

        if (userData && userData.length > 0) {
          const excludedFields = ['_id', '__v', 'password', 'role', 'addresses']
          const filteredHeaders = Object.keys(userData[0]).filter(
            key => !excludedFields.includes(key)
          )

          setUsers(userData)
          setHeaders(filteredHeaders) // Extract headers dynamically from first user object
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch users'
      }
    }
    fetchUsers()
  }, [])

  const links = [
    { label: 'Home', href: '/admin' },
    { label: 'Users List' } // No href for current page
  ]

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle dialog open
  const handleOpenDialog = (user: any) => {
    setSelectedUser(user)
    setOpen(true)
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  const handleToggleRow = (userId: string) => {
    setOpenRow(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // Paginated users
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12} pt={1}>
        <BreadcrumbsComponent links={links} size={15} />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            height: '80vh',
            display: 'grid',
            gridTemplateRows: '1fr auto'
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: '#E5E4E2', fontWeight: 550 }} />
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
                {paginatedUsers.map((user, index) => (
                  <React.Fragment key={user._id}>
                    {/* Main Row */}
                    <TableRow hover>
                      {/* Expand Icon Cell */}
                      <TableCell sx={{ p: 0 }}>
                        <IconButton onClick={() => handleToggleRow(user._id)} size="small">
                          {openRow[user._id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>

                      {/* Sr. No */}
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>

                      {/* User Fields */}
                      {headers.map(header => (
                        <TableCell key={`${index}-${header}`}>{user[header]}</TableCell>
                      ))}

                      {/* Actions */}
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton onClick={() => handleOpenDialog(user)} size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    {/* Expandable Address Row */}
                    <TableRow>
                      <TableCell colSpan={headers.length + 3} sx={{ p: 0 }}>
                        <Collapse in={openRow[user._id]} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            {user.addresses && user.addresses.length > 0 ? (
                              <Table size="small" aria-label="user-addresses">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Street</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Pin</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Type</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {user.addresses.map((address: any, addrIndex: number) => (
                                    <TableRow key={addrIndex}>
                                      <TableCell>{address.name}</TableCell>
                                      <TableCell>{address.streetAddress}</TableCell>
                                      <TableCell>{address.city}</TableCell>
                                      <TableCell>{address.state}</TableCell>
                                      <TableCell>{address.pinCode}</TableCell>
                                      <TableCell>{address.country}</TableCell>
                                      <TableCell>{address.addressType}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <Box sx={{ p: 2, fontStyle: 'italic', color: 'gray' }}>
                                No addresses available.
                              </Box>
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

          {/* Table Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
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
        </TableContainer>
      </Grid>


      {/* Dialog to show user details */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
        <DialogTitle>
          User Details
          {/* Close Icon */}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant='middle' />
        <DialogContent>
          {selectedUser && (
            <Box>
              {headers.map(header => (
                <p key={header}>
                  <strong style={{ textTransform: 'capitalize' }}>
                    {header}:
                  </strong>{' '}
                  {selectedUser[header]}
                </p>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default UserList
