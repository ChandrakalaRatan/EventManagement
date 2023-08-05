import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,Popover,
    Typography
} from '@mui/material';
import {  Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import  UpdateEvent  from './UpdateEvent';
import  SimpleDialog  from './SimpleDialog';

import DeleteIcon from '@mui/icons-material/Delete';
import * as ReactTable from 'react-table'
import "react-table/react-table.css"; 
import axios from "axios";
import Moment from "moment";

interface Event {
    eventId: string;
    eventName: string;
    eventDesc: string;
    startDate: string;
    endDate: string;
    timezone: string;
    // Add more properties as needed
  }
interface DisplayEventsProps {
    allEvents: any[]; // Ensure that events is an array of Event objects
    fetchAllEvents: (e:any) => void;
}

const DisplayEvents = (props:DisplayEventsProps) => {
  const [allEvents, setAllEvents] = useState<any>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [tableColumn, setTableColumn] = useState<any[]>([]);

  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  
  const [anchorElement, setAnchorElement] = useState<any>(null);
  
  const handleDeleteButton =()=>{
    setDeleteFlag(true)
  }
  const SelectedEventFn =(event:any)=>{
    setSelectedEvent(event)
  }
  const handleUpdateButton =(event: any)=>{
    setOpenUpdateModal(true);
    setSelectedEvent(event)
  }
  const closeUpdateModalFunction=()=>{
    setOpenUpdateModal(false);
  }
  const handleDeleteEvent=(event: any)=>{
    setSelectedEvent(event)
    setDeleteFlag(true)
  }
  
  const DeleteEventApi = async (selectedEvent: any): Promise<any> => {
    try {
      await axios.put(`http://localhost:32167/api/deleteEvent`,{eventId:selectedEvent.eventId})
      .then((res) =>{
          const eventData = res.data;
          props.fetchAllEvents(eventData);
          alert('deleted an event successfully')
      }).catch(err =>{ 
        console.log("db error" , err)
      });
    } catch (err) {
      console.error("Error deleting an event:", err);
    }
  };

  const handleConfirmation =(value:boolean)=>{
    if(value){
      DeleteEventApi(selectedEvent)
      setDeleteFlag(false)
      setAnchorElement(null)
    }
    else{
      setDeleteFlag(false)
      setAnchorElement(null)
    }
  }

  const renderEditable = (cellInfo:any) => {
    return (<Button variant="outlined" color="primary" onClick={() => handleUpdateButton(cellInfo|| null)}>
      <EditIcon />
    </Button>
    );
}

const renderDelete = (cellInfo:any) => {
  return (<Button variant="outlined" color="primary" onClick={() => handleDeleteEvent(cellInfo|| null)}>
    <DeleteIcon />
  </Button>
  );
}

  const getTableColumn =(allEvents:any)=>{
    let tableColumn:any =[];
    Object.keys(allEvents).map((header)=>{
      tableColumn.push({
        Header: `${header}`.toUpperCase(),
        accessor: `${header}`,
        minResizeWidth: 50
      })
    })
    tableColumn.push({
      Header: 'Edit'.toUpperCase(),
      accessor: 'Edit',
      minResizeWidth: 50,
      Cell: renderEditable
    })
    tableColumn.push({
      Header: 'Delete'.toUpperCase(),
      accessor: 'Delete',
      minResizeWidth: 50,
      Cell: renderDelete
    })
    setTableColumn(tableColumn)
  }
  useEffect(() => {
    getTableColumn(props.allEvents[0])
    setAllEvents(props.allEvents)
  }, []);

  useEffect(() => {
    setAllEvents(props.allEvents)
  }, [props.allEvents]);


  return (<Grid id="displayContainder" container sx={{height: '100%'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ backgroundColor:'#ADD8E6'}}>
            <Typography variant="h4" style={{textAlign:'center', color:'white', fontWeight:'bold', fontFamily: 'var(--primary-font)' }}>
                Event List
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:'20px', border:'2px solid #ADD8E6'}}>
        <Grid item xs={12}>
            <Table aria-labelledby="C4ATableTitle" size="small" component="div" style={{ display: 'block' }}>
                <TableHead component="div" style={{ display: 'block' }}>
                    <TableRow component="div" style={{ display: 'flex' }}>
                        <TableCell component="div" className="content_center"
                            style={{ display: 'block', width: '10%', flexShrink: 0, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                          EventId
                    </TableCell>
                        <TableCell component="div"
                            style={{ display: 'block', width: '10%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                            Event Name
                    </TableCell>
                        <TableCell component="div"
                            style={{ display: 'block', width: '30%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                            Event Desc
                    </TableCell>
                        <TableCell component="div"
                            style={{ display: 'block', width: '15%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                            Start Date
                    </TableCell>
                        <TableCell component="div"
                            style={{ display: 'block', width: '15%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                            End Date
                    </TableCell>
                    {/* <TableCell component="div"
                            style={{ display: 'block', width: '10%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                          Time Zone
                    </TableCell> */}
                    <TableCell component="div"
                            style={{ display: 'block', width: '5%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                          Edit
                    </TableCell>
                    <TableCell component="div"
                            style={{ display: 'block', width: '5%', flexGrow: 1, fontSize: '14px', fontFamily: 'Trebuchet MS, sans-serif' }}
                        >
                          Delete
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="C4ATableBody" component="div"
                    style={{ display: 'block', maxHeight: '565px', overflow: 'scroll' }}
                >
                    {allEvents.length > 0 && allEvents.map((d: any) => (
                        <React.Fragment key={Math.random()}>
                            <TableRow key={Math.random()} component="div" style={{ display: 'flex' }}>
                                <TableCell component="div" style={{
                                    display: 'block', width: '10%', flexShrink: 0, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.eventId}
                                </TableCell>
                                <TableCell component="div" style={{
                                    display: 'block', width: '10%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.eventName}
                                </TableCell>
                                <TableCell component="div" style={{
                                    display: 'block', width: '30%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.eventDesc}
                                </TableCell>
                                <TableCell component="div" style={{
                                    display: 'block', width: '15%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.startDate? Moment(d.StartDate).format("YYYY-MM-DD HH:mm:ss") : "--"}
                                </TableCell>
                                <TableCell component="div" style={{
                                    display: 'block', width: '15%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.endDate ? Moment(d.EndDate).format("YYYY-MM-DD HH:mm:ss") : "--"}
                                </TableCell>
                                {/* <TableCell component="div" style={{
                                    display: 'block', width: '15%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                    {d.TimeZone }
                                </TableCell> */}
                                <TableCell component="div" style={{
                                    display: 'block', width: '10%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                        {renderEditable(d)}
                                    
                                </TableCell>
                                <TableCell component="div" style={{
                                    display: 'block', width: '10%', flexGrow: 1, fontSize: '13px', fontFamily: 'Trebuchet MS, sans-serif'
                                }}>
                                        {renderDelete(d)}
                                    
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Grid>

          {/* {allEvents?(<><ReactTable
                data={allEvents}
                columns={tableColumn}
                defaultPageSize={10}
                rowsText= {"rows"}
                pageText= {"Page"}
                nextText= {"Next"}
                previousText= {"Previous"}
                loadingText= {'Loading...'}
                noDataText= {'No rows found'}
                ofText= {'of'}
                getTheadProps={() => {
                  return {
                    className: {
                      backgroundColor: 'fa8682', 
                      color: 'white' 
                    }
                  };
                }}
                style={{ outline: '2px solid #ADD8E6' }} // Add this line for the outline
            /></>):<></>} */}
      </Grid>
      {openUpdateModal ? (<UpdateEvent 
        selectedEventVal={selectedEvent || undefined}  
        openUpdateModal={openUpdateModal}  
        closeUpdateModal={closeUpdateModalFunction} 
        fetchAllEvents={props.fetchAllEvents} />):null}
          {deleteFlag?   <SimpleDialog
                    open={deleteFlag}
                    handleConfirmation ={handleConfirmation}
                />:null}
  </Grid>);

};
export default DisplayEvents;



