
import React, { memo, useEffect, useState} from "react";
import {CardHeader,CardContent, Typography, Input, TextareaAutosize} from '@mui/material';
 import {Dialog ,DialogActions,DialogContent,DialogTitle,Paper,IconButton,Grid,Button} from "@mui/material";
 import Close from '@mui/icons-material/Close';
 import axios, { AxiosResponse } from 'axios';
 import Draggable from "react-draggable";
 import Moment from "moment";

 import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import { userInfo } from "os";

  /**
  * 
  * @param props 
  * @returns 
  */
 const PaperComponent=(props:any)=> {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
            <Paper id="paperContainer" {...props} />
        </Draggable>
    );
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
interface UpdateEventProps {
  selectedEventVal:any | undefined;
  openUpdateModal:boolean;
  fetchAllEvents:(e:any) => void;
  closeUpdateModal: () => void;
}


const UpdateEvent= ({selectedEventVal, openUpdateModal, fetchAllEvents,closeUpdateModal}: UpdateEventProps) => {
  const [eventId, setEventId] = useState<any>();
  const [eventName, setEventName] = useState<any>();
  const [eventDesc, setEventDesc] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [selectedTimezone, setSelectedTimezone] =useState(Intl.DateTimeFormat().resolvedOptions().timeZone.toString());

  useEffect(() => {
    setSelectedEvent(selectedEventVal)
  }, [selectedEventVal]);

  const updateEventApi = async (dataObject: any): Promise<any> => {
    try {

      await axios.post('http://localhost:32167/api/createOrUpdateEvent',dataObject)
      .then((res) =>{
          const eventData = res.data;
          closeUpdateModal()
          alert('updated an event successfull')
          fetchAllEvents(eventData);
      }).catch(err =>{ 
          console.log("db error" , err)
      });
    
    } catch (err) {
      console.error("Error updating an event:", err);
    }
  };
  const handleUpdateEvent = async () => {
    const dataObject: any = {
      eventId,
      eventName,
      eventDesc,
      startDate: new Date(startDate),
      endDate:new Date(endDate),
      //timezone:selectedTimezone,
      timezone:'Etc/GMT+1'
    };
    updateEventApi(dataObject);
  };


  const handleTimezoneChange = (timezone:any) => {
    setSelectedTimezone(timezone);
  };

  const convertToDateTimeFormat = (dateTime:any) => {
    // Convert "YYYY-MM-DDTHH:mm" to "YYYY-MM-DD HH:mm:ss"
    return Moment(dateTime, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD HH:mm:ss");
  };

  const convertToInputFormat = (dateTime:any) => {
    // Convert "YYYY-MM-DD HH:mm:ss" to "YYYY-MM-DDTHH:mm"
    return Moment(dateTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm");
  };

  const handleStartDateChange = (e:any) => {
    const inputValue = e.target.value;
    const formattedValue = convertToDateTimeFormat(inputValue);
    setStartDate(formattedValue);
  };
  const handleEndDateChange = (e:any) => {
    const inputValue = e.target.value;
    const formattedValue = convertToDateTimeFormat(inputValue);
    setEndDate(formattedValue);
  };
  
  useEffect(() => {
    setEventId(selectedEvent?.eventId ?? '')
    setEventName(selectedEvent?.eventName?? '')
    setEventDesc(selectedEvent?.eventDesc?? '')
    setStartDate(selectedEvent?.startDate?? null)
    setEndDate(selectedEvent?.endDate??null)
    setSelectedTimezone(selectedEvent?.timezone??'')
  }, [selectedEvent]);


  return (<div> 
     <Dialog 
        id="dialogContainer"
        open={openUpdateModal}
        onClose={closeUpdateModal}
        maxWidth="md"
        fullWidth
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move', padding:'0px' }} id="draggable-dialog-title">
                <CardHeader
                    style={{ textAlign:'center',backgroundColor:'#fa8682', padding:'5px'}}
                    action={
                            <IconButton onClick={closeUpdateModal} size="large">
                                <Close style={{color: "black" }} />
                            </IconButton>
                        }
                    titleTypographyProps={{ variant: 'h6', color:"white" }}
                    title={'Update Existing Event'}  >        
                </CardHeader>
            </DialogTitle>
            <DialogContent style={{padding:'10px',overflow:'hidden', height:'95%'}}> 
                <CardContent   style={{padding:'0px', overflow:'hidden', height:'100%'}}>
                    {selectedEvent ? 
                    ( <Grid item container  xs={12}   style={{ padding:'10px', justifyContent:'center'}}>
                          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:'10px'}}>
                              <Grid item>
                                <Typography variant="subtitle1">
                                  Event ID:
                                </Typography>
                                </Grid>
                              <Grid item>
                            <Input
                              type="text"
                              placeholder="Event id"
                              disabled={true}
                              value={eventId}
                              onChange={(e) => setEventId(e.target.value)}
                            />
                            </Grid>
                        </Grid>
                          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:'10px'}}>
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
                        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:'10px'}}>
                          <Grid item>
                                <Typography variant="subtitle1">
                                  Event Description:
                                </Typography>
                            </Grid>
                          <Grid item>
                            <TextareaAutosize
                              placeholder="Event Desc"
                              value={eventDesc}
                              onChange={(e) =>{setEventDesc(e.target.value) }}
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
                              value={convertToInputFormat(startDate)}
                              onChange={handleStartDateChange}
                            />
                            {/* <Input
                              type="datetime-local"
                              placeholder="Start Date"
                              defaultValue={Moment(startDate).format('YYYY-MM-DDTHH:mm')
                                // Moment(startDate, "YYYY-MM-DD HH:mm:ss").isValid()
                                //   ? Moment(startDate).format("YYYY-MM-DDTHH:mm")
                                //   : ''
                              }
                              onChange={(e) => setStartDate(e.target.value)}
                            />  */}
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
                              value={convertToInputFormat(endDate)}
                              onChange={handleEndDateChange}
                            />
                            {/* <Input
                              type="datetime-local"
                              placeholder="End Date"
                              defaultValue={ endDate
                                // Moment(endDate, "YYYY-MM-DD HH:mm:ss").isValid()
                                //   ? Moment(endDate).format("YYYY-MM-DDTHH:mm")
                                //   : ''
                              }
                              onChange={(e) => setEndDate(e.target.value)}
                            /> */}
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
                              }}/>

                          </Grid>
                        </Grid> */}
                      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{justifyContent:'center', padding:'10px'}}>
                          <Grid item>
                            <Button type="button" onClick={handleUpdateEvent}>
                              Update
                            </Button>
                            </Grid>
                          <Grid item>
                            <Button type="button" onClick={closeUpdateModal}>
                              Cancel
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>):null }
                </CardContent>
            </DialogContent>
      </Dialog>
    </div>);
};
export default UpdateEvent;