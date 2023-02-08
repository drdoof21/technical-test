import { Button, Checkbox, Typography, InputLabel, Stack, styled, TextField, Box } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledForm = styled('form')({
  display:'flex',
  flexDirection:'row',
  width:'100%',
  alignItems:'flex-end',
  gap: '20px'
})

const Home = () => {
  const [dataJob, setDataJob] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [filterInput, setFilterInput] = useState({
    location: "",
    type: ""
  })

  let user = Cookies.get('user')

  useEffect(() => {
    let fetchData = async () => {
      setDisplay(true);
      let {data} = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`);
      setDisplay(false);
      setDataJob(data);
    }

    if(fetchStatus) {
      fetchData()
      setFetchStatus(false)
    }

  },[dataJob])

  const handleChange = (e) => {
    let value = e.target.value;
    setSearch(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${search}&location=${filterInput.location}&type=${filterInput.type}`)
    .then((response) => {
      setDataJob(response.data)
    })

  }

  const handleChangeFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(name === 'type') {
      value = (value == '' ? 'Full Time' : '')
    }
    setFilterInput({...filterInput, [name]: value});
    console.log(filterInput.type)
  }

  const handleDetail = (e) => {
    e.preventDefault()
    alert('mantab')
  }


  return (
    <Stack direction='column' gap={2} alignItems='center' p={5}>
      <StyledForm onSubmit={handleSubmit}>
        <div style={{flex:'4'}}>
          <InputLabel sx={{color:'black'}}>
            Job Description
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            variant="outlined" 
            onChange={handleChange}
            value={search}
            placeholder="Filter by title, benefits, companies, expertise"
            sx={{width:'100%', padding:'0px'}} 
          />
        </div>
        <div style={{flex:'3'}}>
          <InputLabel sx={{color:'black'}}>
            Location
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            name="location"
            variant="outlined"  
            sx={{width:'100%'}}
            onChange={handleChangeFilter}  
            value={filterInput.location}
          />
        </div>
        <Stack sx={{display:'flex', flexDirection:'row', gap:'5px', alignItems:'center'}}>
          <Checkbox name="type" onChange={handleChangeFilter} value={filterInput.type} />
          <p>Full Time Only</p>
          <Button type="submit" variant="contained" sx={{textTransform:'none', backgroundColor:'gray', height:'40px'}}>Search</Button>
        </Stack>
      </StyledForm>
      <Box sx={{padding:'25px', border:'1px groove gray' , width:'95%'}}>
        <Typography variant="h4">List Job</Typography>
        <hr/>
        {dataJob.map((item) => {
          return(
            <div>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', marginBottom:'5px'}}>
                <Typography variant='span' color='primary' sx={{fontWeight:'bold'}}>
                  <Link style={{textDecoration:'none'}} to={`detail-job/${item.id}`}>
                    {item.title}
                  </Link>
                  </Typography>
                <Typography variant='span'>{item.location}</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'flex-end'}}>
                <div>
                  <Typography variant='span'>{item.company} - </Typography>
                  <Typography variant='span' sx={{color:'green', fontWeight:'bold'}}>{item.type}</Typography>
                </div>
                <div>
                  <Typography variant='span'>{item.created_at}</Typography>
                </div>
              </Box>
              <hr/>
            </div>
          )
        })}
      </Box>
    </Stack>
  )
}

export default Home
