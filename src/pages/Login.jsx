import { Box, Button, Card, CardContent, TextField, Typography} from '@mui/material'
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext'

const Login = () => {

  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  const {setLoginStatus} = useContext(UserContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({...input, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(username === input.username && password === input.password){
      Cookies.set('user', input.username, {expires:1})
      setLoginStatus(true);
      navigate('/')

    } else {
      alert('Username Atau Password Anda Salah');
    }
  }

  return (
    <Box sx={{widht:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} >
      <Card sx={{ minWidth: 275, margin: 5 }}>
        <CardContent>
          <Typography variant='h5' color="text.secondary" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              id="outlined-basic" 
              name="username"
              label="Usename" 
              variant="outlined" 
              sx={{width:'100%', marginBottom:'20px'}} 
              value={input.username}
              onChange={handleChange}
            />
            <TextField
              id="outlined-password-input"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{width:'100%', marginBottom:'20px'}}
              value={input.password}
              onChange={handleChange}
            />
            <Button type='submit' variant="contained">Submit</Button>

          </form>

        </CardContent>

      </Card>
    </Box>
  )
}

export default Login
