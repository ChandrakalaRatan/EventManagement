
import React, {  useState,useCallback} from "react";
import {Dialog ,DialogActions,DialogContent,DialogTitle,Input, TextareaAutosize,Grid, Button, Paper,IconButton,CardHeader,CardContent,Typography} from "@mui/material";
 import Close from '@mui/icons-material/Close';
 import axios, { AxiosResponse } from 'axios';
 import Draggable from "react-draggable";

 import TimezoneSelect, { allTimezones } from 'react-timezone-select'
 //import { v4 as uuidv4 } from 'uuid';
  /**
  * 
  * @param props 
  * @returns 
  */
 const PaperComponent=(props:any)=> {
    return ( <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
            <Paper id="paperContainer" {...props} />
        </Draggable> );
}
interface CreateEventProps {
  openCreateModal:boolean;
  fetchAllEvents:(e:any) => void;
  closeCreateModal: () => void;
}

interface Event {
  eventId:string;
  eventName: string;
  eventDesc: string;
  startDate: string;
  endDate: string;
  timezone: string;
  // Add more properties as needed
}
const CreateEvent = ({openCreateModal, fetchAllEvents,closeCreateModal}: CreateEventProps) => {
  const [eventName, setEventName] = useState<any>();
  const [eventDesc, setEventDesc] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [selectedTimezone, setSelectedTimezone] =useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const createEventApi =async (dataObject: Event): Promise<any> => {
    try {

        await axios.post('http://localhost:32167/api/createOrUpdateEvent',dataObject)
        .then((res) =>{
           const eventData = res.data;
            closeCreateModal()
            alert('created new event successfull')
            fetchAllEvents(eventData);

        }).catch(err =>{ 
          console.log("db error" , err)
        });
    } catch (err) {
      console.error('Error Creating an event:', err);
    }
  }
  const handleCreateEvent = async () => {

      const dataObject :any=  {
          eventId: Math.random().toString(),
          eventName,
          eventDesc,
          startDate: new Date(startDate),
          endDate:new Date(endDate),
         // TimeZone:selectedTimezone?selectedTimezone:'Etc/GMT+1'
         TimeZone:'Etc/GMT+1'
      }
      createEventApi(dataObject)
  };
  const handleEventName =(e:React.ChangeEvent<HTMLInputElement>)=>[
    setEventName(e.target.value)
  ]

  const handleEventDesc =(e:React.ChangeEvent<HTMLTextAreaElement>)=>[
    setEventDesc(e.target.value)
  ]
  const handleStartDate =(e:React.ChangeEvent<HTMLInputElement>)=>[
    setStartDate(e.target.value)
  ]
  const handleEndDate =(e:React.ChangeEvent<HTMLInputElement>)=>[
    setEndDate(e.target.value)
  ]
  // const handleTimeZone =(e:React.ChangeEvent<HTMLInputElement>)=>[
  //   setTimezone(e.target.value)
  // ]
  const handleTimezoneChange = (timezone:any) => {
    setSelectedTimezone(timezone);
  };

  return(<div>
    <Dialog 
      id="dialogContainer"
      open={openCreateModal}
      onClose={closeCreateModal}
      maxWidth="md"
      fullWidth
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: 'move', padding:'0px' }} id="draggable-dialog-title">
            <CardHeader
                style={{ textAlign:'center',backgroundColor:'#fa8682', padding:'5px'}}
                action={
                        <IconButton onClick={closeCreateModal} size="large">
                            <Close style={{color: "black" }} />
                        </IconButton>
                    }
                titleTypographyProps={{ variant: 'h6', color:"white" }}
                title={'Create New Event'}  >        
            </CardHeader>
          </DialogTitle>
          <DialogContent style={{padding:'10px',overflow:'hidden', height:'95%'}}> 
            <CardContent   style={{padding:'10px', overflow:'hidden', height:'100%'}}>
              <Grid item container  xs={12}   style={{ justifyContent:'center',padding:'10px'}}>
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding:'10px'}}>
                    <Grid item>
                        <Typography variant="subtitle1">
                          Event Name:
                        </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding:'10px'}}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Event Description:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextareaAutosize
                        placeholder="Event Desc"
                        value={eventDesc}
                        onChange={(e) =>{setEventDesc(e.target.value)} }
                        onBlur={(e) =>{ setEventDesc(e.target.value)}}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding:'10px'}}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Event StartDate:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        type="datetime-local"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding:'10px'}}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Event EndDate:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        type="datetime-local"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  {/* <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding:'10px'}}>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Event TimeZone:
                        </Typography>
                      </Grid>
                      <Grid item>
                         <TimezoneSelect
                          value={selectedTimezone}
                          onChange={()=>setSelectedTimezone}
                          timezones={{
                            ...allTimezones,
                            'America/Lima': 'Pittsburgh',
                            'Europe/Berlin': 'Frankfurt',
                          }}
                        />
                      </Grid>
                  </Grid> */}
                  <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ justifyContent:'center',padding:'10px'}}>
                    <Grid item>
                      <Button type="button" onClick={handleCreateEvent}>
                        {'Create'}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="button" onClick={closeCreateModal}>
                        {'Cancel'}
                      </Button>
                    </Grid>
                  </Grid>
              </Grid>
            </CardContent>
          </DialogContent>
    </Dialog></div>);
};
export default CreateEvent;