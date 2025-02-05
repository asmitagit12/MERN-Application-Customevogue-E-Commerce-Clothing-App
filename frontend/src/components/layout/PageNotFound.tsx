import { Box, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import pagenotfound from '../../assets/page-not-found.png'
import { useAuthContext } from '../../hooks/AuthContext'
const PageNotFound: React.FC = () => {
  const navigate = useNavigate()
  const { role } = useAuthContext()
  return (
    <>
      <Box mt={'96px'}>
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          display={{ xs: 'block', lg: 'flex', md: 'flex', sm: 'flex' }}
        >
          <Stack>
            <img alt='Page Not Found' src={pagenotfound} sizes='8x8' />
            <Stack mt={5} width={'100%'} display={'flex'} alignItems={'center'}>
              <Button
                variant='contained'
                onClick={() => {
                  role === 'admin' ? navigate('/admin') : navigate('/')
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default PageNotFound
