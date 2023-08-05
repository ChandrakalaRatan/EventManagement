import React, { useEffect, useState } from 'react';
import DisplayEvents from './DisplayEvents';
import CreateEvent from './CreateEvent';
import axios from "axios";
import {
  Grid,
  Button,
  Typography
} from '@mui/material';
//import Moment from 'moment';
import moment from 'moment-timezone';
import UpdateEvent from './UpdateEvent';



interface Event {
  eventId: string;
  eventName: string;
  eventDesc: string;
  startDate: string;
  endDate: string;
  timezone: string;
  // Add more properties as needed
}
const EventMangementHome = () => {
  const [allEventsArr, setAllEventsArr] = useState<any[]>([]);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      
      await axios.get('http://localhost:32167/api/fetchAllEvent')
      .then((res) =>{
        const eventData = res.data;
          let allEvents: any = [];
          eventData != undefined && eventData.length> 0 && eventData?.forEach((item: any) => {
            allEvents.push({
              eventId: item.EventId??'',
              eventName: item.EventName??'',
              eventDesc: item.EventDesc??'',
              startDate: item.StartDate,
              endDate: item.EndDate,
              timezone:item.TimeZone??'',
            });
          });
          setAllEventsArr(allEvents);
      }).catch((err) =>{ 
        console.log("db error")
      });
      
    } catch (error) {
      console.error('Error fetching events:');
    }
  };

  const handleCreateButton =()=>{
    setOpenCreateModal(true)
  }
  const closeCreateModalFunction=()=>{
    setOpenCreateModal(false)
  }
  const UpdateEvent =(allEventsArr:any)=>{
    let allEvents: any = [];
    allEventsArr != undefined && allEventsArr.length> 0 && allEventsArr?.forEach((item: any) => {
        allEvents.push({
          eventId: item.EventId??'',
          eventName: item.EventName??'',
          eventDesc: item.EventDesc??'',
          startDate: item.startDate,
          endDate: item.endDate,
          timezone:item.TimeZone??'',
        });
    });
    setAllEventsArr(allEvents);
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
  }, [allEventsArr]);
  
  return (
    <div>
      <Grid container sx={{height: '100%'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '70px', color:'white', backgroundColor:'#fa8682'}}>
          <Typography variant="h3" style={{textAlign:'center', color:'white', fontWeight:'bold', fontFamily: 'var(--primary-font)', justifyContent:'center' }}>
              Event Management
          </Typography>
        </Grid>
        <Grid item justifyContent="flex-end" xs={12} sm={12} md={12} lg={12} xl={12} style={{height: '50px',}}>
          <Button size="large"  style={{alignSelf:'right'}} onClick={handleCreateButton} >
              Create New Event
          </Button>
        </Grid>

        {allEventsArr && allEventsArr.length> 0? 
          (<Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{height: '50px',  backgroundColor:'lightblue',justifyContent:'right' }}>
            <DisplayEvents allEvents={allEventsArr}  fetchAllEvents ={fetchEvents}/>
          </Grid>)
          :(
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h6" style={{textAlign:'left', color:'var(--primary-color)', fontWeight:'bold', fontFamily: 'var(--primary-font)' }}>
                  {'No Events to Display'}
              </Typography>
            </Grid> 
        )}
      </Grid>
          
      {openCreateModal ?(<CreateEvent 
          openCreateModal={openCreateModal}  
          closeCreateModal={closeCreateModalFunction} 
          fetchAllEvents={UpdateEvent}/> ):null
        }
    </div>
  );
};
export default EventMangementHome;
