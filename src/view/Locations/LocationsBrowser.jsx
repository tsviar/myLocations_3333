//import React, { Component } from "react";
import React, { useContext } from "react";
// import { Route, Switch } from "react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import { createBrowserHistory } from "history";

import { StateDataManager } from "../../stateProvider/DataManager";
import * as api from "../../services/StorageService";
import marker from '@ajar/marker';

import {
  GoogleMapContainer,
  // LocationsMap ,
} from "../GoogleMapsApi/GoogleMapEmbed";

import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import RemoveLocation from "./RemoveLocation";
import ViewLocation from "./ViewLocation";

import LocationsMenu from "./LocationsMenu";
import LocationsTopBar from "./LocationsTopBar";

import List from "./LocationsList";
import Filter from "./FilterLocations";
//import Profile from "../Profile";

import main_palete_theme from '../../style.lib/PalleteStyles';

//import "../styles.css";
//import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';
//import marker from '@ajar/marker'; 




const LocationsBrowser = () => {
  const { loading_lists } = useContext(StateDataManager);

  const {
    selected_map_location,
    update_selected_map_location
  } = useContext(StateDataManager);

  //console.log(`LocationsBrowser prpos `, props);
  console.log(`LocationsBrowser selected_map_location `, selected_map_location);

  const setUserPickedCoordinates = ({ lat, lng }) => {
    update_selected_map_location({ lat: lat, lng: lng });
  };

  const setUserPickedAddress = (str) => {
    update_selected_map_location({ address: str });
  };

  // const history = createBrowserHistory();

  let location = useLocation();
  marker.obj(location, `LocationsBrowser location `);

  let history = useHistory();

  /* 
   TBD:
    Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    in AddLocation (at LocationsBrowser.jsx:158)    

    index.js:1437 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    in AddLocation (at LocationsBrowser.jsx:165)
  */


  return (
    // <div >
    //   <ContentBox>
    //       <LocationsMap 
    //           lat={selected_map_location.lat}
    //           lng={selected_map_location.lng}
    //           zoom={selected_map_location.zoom}
    //           setCoordinates={setUserPickedCoordinates}
    //           setAddress={setUserPickedAddress}           
    //         />
    //   </ContentBox>
    // </div>


    <MainBox >
      {loading_lists === false ? (
        <div>
          <Filter />

          <ContentBox>

            <MenuContentBox>

              <MenuBox>
                <LocationsTopBar>
                  <LocationsMenu />
                </LocationsTopBar>
              </MenuBox>


              {/* <Switch>                    
                  <Route exact path="/locations"  children={  
                    () => <ManageLocationsBox>
                            <ViewLocation />  
                            <GoogleMapContainer /> 
                          </ManageLocationsBox> 
                   } />  
                  <Route exact path="/locations/view"  children={  
                    () => <ManageLocationsBox>
                            <ViewLocation />  
                            <GoogleMapContainer /> 
                          </ManageLocationsBox> 
                   } />  
                  <Route exact path="/locations/add" children={  
                    () => <ManageLocationsBox>
                            <AddLocation />  
                            <GoogleMapContainer /> 
                          </ManageLocationsBox> 
                   } />   
                  <Route exact path="/locations/edit"  children={  
                    () => <ManageLocationsBox>
                            <EditLocation />  
                            <GoogleMapContainer /> 
                          </ManageLocationsBox> 
                   } />  
                  <Route exact path="/locations/remove"  children={  
                    () => <ManageLocationsBox>
                            <RemoveLocation />  
                            <GoogleMapContainer /> 
                          </ManageLocationsBox> 
                             
                   } />              
                 </Switch> */}


              {/* <ModalBox> */}
              {/* <Profile/> */}
              {/* </ModalBox> */}


              <ManageLocationsBox>

                {
                  ("/locations/view" === location.pathname
                    || "/locations" === location.pathname) ? <ViewLocation />
                    : ("/locations/add" === location.pathname) ? <AddLocation />
                      : ("/locations/edit" === location.pathname) ? <EditLocation />
                        : ("/locations/remove" === location.pathname) ? <RemoveLocation />
                          : `location.pathname= ${location.pathname}`

                }

                <GoogleMapContainer />


              </ManageLocationsBox>

            </MenuContentBox>

            <List />

          </ContentBox>
        </div>
      ) : (
          <h1>... Loding ...</h1>
        )}

    </MainBox>



    // </Router>

  );
};
export default LocationsBrowser;

//===============================================================
// local styling
//===============================================================

const MainBox = styled('div')({
  height: 'fit-content',

  width: '100%',
  minWidth: '100rem',
  maxWidth: '100vw',


  margin: 'auto',


  backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  // background: 'Cornsilk',

  borderRadius: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0.4rem 1.5rem DimGrey',
  position: 'relative',
  padding: '7.0rem 1.5rem 1.5rem',
  // marginTop: '3rem',
  fontSize: '1.5rem',

  // padding: '8.5rem 1.5rem 1.5rem','
  // margin-top: '10rem',' 
  // font-size: '3rem',' 
});

const ContentBox = styled('div')({

  //border:red solid 2px;
  borderRadius: '5px',

  display: 'flex',
  alignItems: 'center',
  // alignItems: 'space-between',   //
  // alignItems: 'flex-start', 
  justifyContent: 'space-around',   //'flex-start',
});



const MenuBox = styled('div')({
  width: '70rem',
});


const MenuContentBox = styled('div')({
  height: '70vh',
  // height: 'fit-content',
  maxHeight: '70rem',
  minHeight: '70vh',

  width: '70rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',   //'flex-start', 
  justifyContent: 'center',   //'space-around',   //'flex-start',
});

const ManageLocationsBox = styled('div')({

  // maxHeight: '80vh',
  // height: '65vh',
  height: 'fit-content',
  // width: 'fit-content',
  margin: 'auto',
  // marginTop: 0,
  // paddingTop: 0,

  width: '70rem',
  // width: '60rem',

  // borderRadius: '0.8rem',
  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',   //'flex-start', 
  justifyContent: 'space-around',   //'flex-start',

  // alignItems: 'space-between',   //'flex-start', 
  // justifyContent: 'space-between',   //'flex-start',  
});


const ModalBox = styled('div')({
  position: "absolute",

  backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  // background: "#fff",
  top: 28,
  left: "10%",
  right: "10%",
  padding: 15,


  width: '60rem',
  height: '75vh',
  // borderRadius: '0.8rem',
  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',
  //background: 'rgba(0, 0, 0, 0.15)',

  display: 'flex',
  flexDirection: 'row',
  // alignItems: 'center',   
  alignItems: 'flex-start',
  justifyContent: 'space-around',   //'flex-start',
});

/*
  return (
    <div className="app">
      <Filter />
      <div className="content-box">
        <Profile />
        <List />
      </div>
    </div>
  );
  */
