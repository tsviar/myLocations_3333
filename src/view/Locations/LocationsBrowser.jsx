//import React, { Component } from "react";
import React, { useContext, lazy, Suspense } from "react";

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

import ManageLocation from "./ManageLocation";

// import AddLocation from "./AddLocation";
// import EditLocation from "./EditLocation";
// import RemoveLocation from "./RemoveLocation";
// import ViewLocation from "./ViewLocation";

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

import ErrorBoundary from "../ErrorsHandling/ErrorBoundary";

// import {
//   GoogleMapContainer,
//   // LocationsMap ,
// } from "../GoogleMapsApi/GoogleMapEmbed";

// lazy loading: Expected the result of a dynamic import() call
// const GoogleMapContainer = lazy(() => import("./MyComponent.js"));
//const MyComponent = lazy(() => import('./MyComponent'))
const GoogleMapContainer = lazy(() => import("../GoogleMapsApi/GoogleMapEmbed.js"));



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


    <MainBox 
      aria-label="Locations Main Box"
      id="Locations_Main_Box"
      name="Locations_Main_Box"
      role="article"
      >
      {(loading_lists === false) ? (

        <MainMenuContentWrapper
          aria-label="Locations Wrapper Div"
          id="Locations_Wrapper_Div"
          name="Locations_Wrapper_Div"
          role="application"
          >
          < Filter />

          <MainContentBox
            aria-label="Locations Content Box"
            id="Locations_Content_Box"
            name="Locations_Content_Box"
            role="directory"
            >

            <ListBox>
              <List />
            </ListBox>

            {/* <MenuLocationMapBox> */}

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


            {/* <LocationMapBox> */}
            <LocationBox>
              {
                ("/locations/view" === location.pathname
                  || "/locations" === location.pathname) ?
                  <ManageLocation action="View" />
                  : ("/locations/add" === location.pathname) ?
                    <ManageLocation action="Add" />
                    : ("/locations/edit" === location.pathname) ?
                      <ManageLocation action="Edit" />
                      : ("/locations/remove" === location.pathname) ?
                        <ManageLocation action="Remove" />
                        : `location.pathname= ${location.pathname}`

              }
              {/*               
              {
                ("/locations/view" === location.pathname
                  || "/locations" === location.pathname) ? <ViewLocation />
                  : ("/locations/add" === location.pathname) ? <AddLocation />
                    : ("/locations/edit" === location.pathname) ? <EditLocation />
                      : ("/locations/remove" === location.pathname) ? <RemoveLocation />
                        : `location.pathname= ${location.pathname}`

              } 
*/}
            </LocationBox>

            <MapBox>
              <ErrorBoundary>
                <Suspense fallback={<EmptyMapBox>Loading Map...</EmptyMapBox>}>
                  <GoogleMapContainer />
                </Suspense>
              </ErrorBoundary>
            </MapBox>

            {/* </LocationMapBox> */}

            {/* </MenuLocationMapBox> */}


          </MainContentBox>
        </MainMenuContentWrapper>

      ) : (

          <h1>... Loding ...</h1>
        )
      }

    </MainBox >


    // </Router>

  );
};
export default LocationsBrowser;

//===============================================================
// local styling
//===============================================================

const MainBox = styled('div')({
  backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  // background: 'Cornsilk',

  borderRadius: '0.4rem',
  boxShadow: '0 0.4rem 1.5rem DimGrey',

  fontSize: '1.5rem',

  height: '100%',
  minHeight: '100rem',
  width: '100%',
  //minWidth: '90vw',
  //width: 'inherit',
  minWidth: 'inherit',

  margin: 'auto',
  // marginLeft: '1.6rem',

  padding: '1px',

  // fontSize: '1.5rem',
  // fontWeight: '600',

});

const MainMenuContentWrapper = styled('div')({


  backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,

  // content: "MainMenuContentWrapper",


  borderRadius: '5px',

  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,


  margin: 'auto',
  padding: '1px',

  // fontSize: '1.5rem',
  // fontWeight: '600',

});


const MainContentBox = styled('div')({


  position: 'relative',
  margin: 'auto',
  marginTop: '6rem',
  marginBottom: '3rem',

  padding: '1rem 0 8rem 0',
  // padding: 0,
  // paddingTop: 1,
  // paddingBottom: 30,

  borderRadius: '5px',


  height: '100%',
  minHeight: '95vh',
  //minHeight: '80%',
  width: '100%',
  ///minWidth: '15vw',
  //minWidth: '100vw',

  overflow: 'auto',
  //overflowY: 'auto',
  //overflowY: 'scroll',


  // font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))

  //   fontSize: 'calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.5rem + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)))',

  fontSize: 'calc(15px + (26 - 15) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.5rem + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)))',

  // fontSize: '1.5rem',
  fontWeight: '600',

  /*
    '&::before': {
      //   content: "MainContentBox",
      //   // content: "♥",
  
      //   position: 'absolute',
      //   // top: '-4rem',
      //   // left: '0.5rem',
      //   top: 30,
      //   left: 0,
      //   //  right: 0,
      //   bottom: 30,
  
      // backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  
      //   // position: 'fixed',
      //   // top: 2,
      //   // left: 12,
      //   // border: '1rem dashed green',
  
      //   // fontSize: '2rem',
      //   // fontWeight: '600',
    },
  
  '& > *': {


    // font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))

    // fontSize: 'calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))',
    // lineHeight: 'calc(1.5rem + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)))',

    //fontSize: '2.0rem',
    // lineHeight: '2.0rem',
    // fontSize: '1.5rem',
    // fontWeight: '600',
    //fontWeight: '400',


    ///margin: 'auto',
    ///padding: '3rem',
    ///paddingTop: '3rem',
    ///paddingBottom: '2rem',

    // display:'flex',
    // justifyContent: 'center',
    // alignItems: 'center',

    // display: 'grid',
    // justifyItems:  'center',
    // alignItems:  'center',


  },
*/

  display: 'grid',
  //gridGap: '4px',
  gridGap: '1px',

  ///margin: 'auto',
  /// marginTop: '62rem',
  /// marginBottom: '3rem',

  //margin: '13rem 1px 1rem 1px',

  // padding: '1px',

  gridTemplateColumns: '2fr 2fr 0.001fr',
  //gridTemplateRows: '0.15fr 0.05fr 0.3fr 0.3fr',
  gridTemplateRows: '0.20fr 0.09fr 1fr 1fr',
  gridTemplateAreas: `
  "ListBox"
  "MenuBox"
  "LocationBox"
  "MapBox"`,

  //gridTemplateRows: '0.2fr 1fr 1fr 1fr',
  // gridTemplateColumns: '2fr 4fr 2.8fr',
  //gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',

  //Small devices (tablets, 768px and up)
  //----------------------------------------
  '@media all and (min-width: 550px)': {

    // maxWidth: '767px',

    // gridTemplateColumns: '2fr 2fr',
    gridTemplateColumns: '10fr 6fr 0.001fr',
    // gridTemplateRows: '0.4fr 0.1fr 2fr 0.1fr',
    gridTemplateRows: '0.5fr 0.18fr 2fr 0.1fr',


    gridTemplateAreas: `
    "ListBox ListBox"
    "MenuBox MenuBox"
    "LocationBox MapBox"
    "LocationBox MapBox"`,

    justifyContent: 'center',
    // justifyContent: 'space-evenly',
    // alignContent: 'space-evenly',
  },

  // Large devices(large desktops, 1200px and up)
  //--------------------------------------------------
  // '@media all and (min-width: 850px)': {
  // maxWidth: '1200px',

  '@media all and (min-width: 700px)': {
    //margin: 'auto',

    //gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateColumns: '1.5fr 2.5fr 2.5fr',
    // gridTemplateRows: '0.1fr 0.7fr 0.1fr 0.1fr',
    // gridTemplateRows: '0.1fr 4.5fr 0.1fr 0.1fr',
    //gridTemplateRows: '0.1fr 0.01fr 0.8fr 0.2fr',
    gridTemplateRows: '0.1fr 0.5fr 2fr 0.01fr',
    gridTemplateAreas: `
    "ListBox MenuBox MenuBox"
    "ListBox LocationBox MapBox"
    "ListBox LocationBox MapBox"
    "ListBox LocationBox MapBox"`,

    // justifyContent: 'space-evenly',
    // alignContent: 'center',
  },


});


const ListBox = styled('div')({
  gridArea: 'ListBox',

  height: '100%',
  //minHeight: '23vh',
  minHeight: '15rem',


  //height: '78vh',
  //minHeight: 'fit-content',

  //width: 'inherit',
  //minWidth: '90%',  
  ///minWidth: '80vw',


});


const MenuBox = styled('div')({

  gridArea: 'MenuBox',

  ///height: '5%',
  height: "50px",
  width: '100%',
  //flexBasis: '100%',


});


const LocationBox = styled('div')({

  gridArea: 'LocationBox',
  //minWidth: '25vw',
  //marginLeft: '0.05rem',

  // paddingLeft: '3px',

  width: '100%',

});

const MapBox = styled('div')({

  gridArea: 'MapBox',
  //height: '70vh',

  marginRight: '1rem',
  marginLeft: '0.3rem',
  paddingRight: '1rem',


  width: '100%',
  //minWidth: '25vw',

  //height: '100%',
  // minHeight: '40rem',

  // flexBasis: '40%',

  //Small devices (tablets, 768px and up)
  //----------------------------------------
  '@media all and (min-width: 550px)': {
    marginRight: '0.5rem',
    marginleft: 0,

    paddingRight: '1rem',

    // minHeight: '45rem',
  },


});

const EmptyMapBox = styled('div')({

  //height: 'fit-content', //this sticks it in a fixed location, bad, bad, bad...
  height: '100%',
  width: 'fit-content',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: 'space-around',
  //alignItems: 'space-evenly',

  margin: 'auto',
  marginLeft: 1,

  //padding: '40rem 0 10 0',

});



/*
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
*/

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
