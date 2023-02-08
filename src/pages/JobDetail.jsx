import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import axios from 'axios';

const JobDetail = () => {

  const {slug} = useParams()
  const [jobDetail, setJobDetail] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if(slug !== undefined){
      let fetchData = async () => {
        setDisplay(true);
        let {data} = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${slug}`);
        setDisplay(false);
        setJobDetail({...data});
      }
  
      if(fetchStatus) {
        fetchData()
        setFetchStatus(false)
      }
    }
  },[])


  return (
    <Stack direction='column' sx={{padding:'25px'}}>
      <Typography variant='span' sx={{fontWeight:'bold', marginBottom:'20px'}} color='primary'>
        <Link to={`/`} style={{textDecoration:'none'}}>Back</Link>
      </Typography>
      <Stack direction='column' sx={{padding:'20px', border:'1px groove gray'}}>
        <Stack direction='column'>
          <Typography variant='span' sx={{color:'gray'}}>{jobDetail.type} / {jobDetail.location}</Typography>
          <Typography variant='h4' sx={{fontWeight:'bold'}}>{jobDetail.title}</Typography>
          <hr/>
          <Stack direction='row'>
            <Stack direction='column' flex={3}>
              <div dangerouslySetInnerHTML={{__html: jobDetail.description}}></div>
            </Stack>
            <Stack direction='column' flex={2} sx={{padding:'10px'}}>
              <div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <div>
                    <Typography variant='span'>{jobDetail.company}</Typography>
                  </div>
                  <Button sx={{backgroundColor:'gray', width:'100px', height:'30px', textTransform:'none', textDecoration:'none'}}>1 other job</Button>
                </div>
                <hr/>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <img src={jobDetail.company_logo} width="400px" height="400px"/>
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <Typography variant="span"><a>{jobDetail.company_url}</a></Typography>
                </div>
              </div>
              <div>
                <Typography variant='span'>How to Apply</Typography>
                <hr/>
                <div dangerouslySetInnerHTML={{__html: jobDetail.how_to_apply}}></div>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

    </Stack>
  )
}

export default JobDetail
