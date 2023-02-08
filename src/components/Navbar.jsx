import { AppBar, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'


const StyledToolbar = styled(Toolbar)({
  display: 'flex'
})


const Navbar = () => {
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6'>
            Github
        </Typography>
        <Typography variant='h6'>
            Jobs
        </Typography>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
