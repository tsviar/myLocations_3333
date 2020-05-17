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
        <MainMenuContentWrapper>
          <Filter />

          <MainContentBox>

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
                  || "/locations" === location.pathname) ? <ViewLocation />
                  : ("/locations/add" === location.pathname) ? <AddLocation />
                    : ("/locations/edit" === location.pathname) ? <EditLocation />
                      : ("/locations/remove" === location.pathname) ? <RemoveLocation />
                        : `location.pathname= ${location.pathname}`

              }
            </LocationBox>

            <MapBox>
              <GoogleMapContainer />
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

  ///border: '1rem dashed green',

  fontSize: '1.5rem',

  height: '100%',
  //width: '100vw',
  width: 'fit-content',
  minWidth: '100vw',

  margin: 'auto',
  // marginLeft: '1.6rem',

  // padding: '1px',
  '@media all and (min-width: 550px)': {
    // minWidth: '100vw',

  },

  '@media all and (min-width: 700px)': {
    marginTop: '1rem',

  },



  // '@media(orientation: portrait) and(max-device-width: 320px) and (max-device-height:600px) ': {

  //   width: '200rem',
  // },
  // '@media(orientation: portrait) and(max-device-width: 320px) and (max-device-height:480px)': {

  //   width: '100rem',
  // },
  /*
    //display: 'flex',
    //flexDirection: 'column',
    //justifyContent: 'strech',
    //alignItems: 'center',
  
    position: 'relative',
    margin: 'auto',
    // marginTop: '3rem', 
    // margin-top: '10rem',' 
  
    // padding: '7.0rem 1.5rem 1.5rem',
    // padding: '8.5rem 1.5rem 1.5rem','
  
    fontSize: '1.5rem',
    // font-size: '3rem',' 
  
  
    '@media (orientation: landscape)': {
      height: '100%',
      width: '100%',
      //minWidth: '80rem',
      maxWidth: '100vw',
    },
  
    '@media (orientation: portrait)': {
      //height: 'fit-content',
      height: '100%',
      width: '100%',
      minWidth: '100rem',
      maxWidth: '100vw',
    },
  
    '@media (orientation: portrait) and (max-device-width:1024px)': {
      height: '100%',
      width: '90%',
      minWidth: '90rem', //81rem
      maxWidth: '100vw',
  
      //top right bottom left
      // margin: 'auto',
      //  padding: 'auto',
      // padding: '1rem 0rem 1rem 4rem',
      // paddingLeft: '6rem',
      // paddingLeft: '16rem',
      // paddingRight: '1rem',
  
    },
  
    '@media (orientation: landscape) and (max-device-width:768px)': {
      height: 'auto',
      width: '50%',
      minWidth: '50rem', //81rem
      maxWidth: '50vw',
  
      //top right bottom left
      margin: '10rem 10rem 10 rem 0rem',
      // padding: 'auto',
      padding: '1rem 14rem 1rem 0rem',
      // paddingLeft: '6rem',
      //paddingRight: '16rem',
      // paddingRight: '1rem',
  
    },
    '@media (orientation: portrait) and (max-device-width:768px)': {
      height: 'auto',
      width: '50%',
      minWidth: '50rem', //81rem
      maxWidth: '50vw',
  
      //top right bottom left
      margin: '10rem 10rem 10rem 0rem',
      // padding: 'auto',
      padding: '1rem 14rem 1rem 0rem',
      // paddingLeft: '6rem',
      //paddingRight: '16rem',
      // paddingRight: '1rem',
  
    },
    */
});

const MainMenuContentWrapper = styled('div')({

  //border:red solid 2px;
  borderRadius: '5px',
  /// border: '1rem dashed black',

  margin: 'auto',
  padding: 0,
  //margin: 0,

  // margin: '20px 1px 20px 1px',
  //padding: '1rem 10px 10px 10px',
  // padding: '7.0rem 0.5rem 1.5rem 0.5rem',

  //display: 'flex',
  //flexDirection: 'column',
  //justifyContent: 'flex-start',
  //alignItems: 'space-between',   //

  /*
    display: 'flex',
    flexDirection: 'column',
  
    justifyContent: 'flex-start',
    // justifyContent: 'strech',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    alignItems: 'space-between',   //
    // alignItems: 'flex-start', 
  
  
    margin: 'auto',
    // top right bottom left
    // padding: '7.0rem 1.5rem 1.5rem',
    padding: '7.0rem 0.5rem 1.5rem 0.5rem',
    // padding: 'auto',
  
    height: 'inherit',
    width: 'inherit',
  
    '@media (orientation: landscape) and (max-device-width:768px)': {
      height: 'auto',
      width: '50%',
      minWidth: '50rem', //81rem
      maxWidth: '50vw',
  
      //top right bottom left
      margin: '10rem 10rem 10rem 0rem',
      // padding: 'auto',
      padding: '1rem 14rem 1rem 0rem',
      // paddingLeft: '6rem',
      //paddingRight: '16rem',
      // paddingRight: '1rem',
  
    },
  */
});


const MainContentBox = styled('div')({

  borderRadius: '5px',
  /// border: '1rem dashed deeppink',

  position: 'relative',

  '&::before': {
    content: ".container ccc",
    // content: "♥",

    position: 'absolute',
    top: '-4rem',
    left: '0.5rem',
    // top: '40rem',
    // left: '0.5rem',

    //position: 'fixed',
    //top: 2,
    //left: 12,

    //fontSize: '2rem',
    // fontWeight: '600',
  },

  '& > *': {
    fontSize: '1.5rem',
    fontWeight: '600',
    //  color: 'white',
    // background: 'darkmagenta',
    // padding: '3rem',

    // display:'flex',
    // justifyContent: 'center',
    // alignItems: 'center',

    // display: 'grid',
    // justifyItems:  'center',
    // alignItems:  'center',


  },

  display: 'grid',
  gridGap: '4px',

  height: '100%',
  minHeight: '80vh',
  width: '100%',
  minWidth: '15vw',

  margin: 'auto',
  marginTop: '62rem',
  marginBottom: '3rem',
  //padding: '1px',


  //margin: '13rem 1px 1rem 1px',

  // padding: '1px',

  gridTemplateColumns: '0.1fr',
  gridTemplateRows: '0.15fr 0.05fr 0.3fr 0.3fr',
  gridTemplateAreas: `
  "ListBox"
  "MenuBox"
  "LocationBox"
  "MapBox"`,

  //gridTemplateRows: '0.2fr 1fr 1fr 1fr',
  // gridTemplateColumns: '2fr 4fr 2.8fr',
  //gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',

  '@media all and (min-width: 270px)': {
    marginTop: '58rem',
    // marginBottom: '3rem',
  },

  '@media all and (min-width: 375px)': {
    marginTop: '55rem',
    // marginBottom: '3rem',

  },

  '@media all and (min-width: 411px)': {
    //marginTop: '53rem',
    marginTop: '20rem',
    marginBottom: '5rem',
    // paddingBottom: "1rem",

    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
    gridTemplateAreas: `
    "ListBox ListBox"
    "MenuBox MenuBox"
    "LocationBox MapBox"
    "LocationBox MapBox"`,
  },

  '@media all and (min-width: 550px)': {
    marginLeft: 0,
    marginTop: '21rem',
    paddingBottom: "2rem",

    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
    gridTemplateAreas: `
    "ListBox ListBox"
    "MenuBox MenuBox"
    "LocationBox MapBox"
    "LocationBox MapBox"`,
  },

  '@media all and (min-width: 700px)': {
    //margin: 'auto',
    // marginTop: 0,
    marginTop: '6rem',
    // paddingTop: '1rem',
    marginBottom: "3rem",
    //gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateColumns: '1.5fr 2.5fr 2.5fr',
    gridTemplateRows: '0.1fr 0.7fr 0.1fr 0.1fr',
    gridTemplateAreas: `
    "ListBox MenuBox MenuBox"
    "ListBox LocationBox MapBox"
    "ListBox LocationBox MapBox"
    "ListBox LocationBox MapBox"`,
  },

  '@media all and (min-width: 745px)': {

    gridTemplateRows: '0.1fr 4.5fr 0.1fr 0.1fr',

  },




  /*
  '@media all and (min-height: 430px)': {
     marginTop: '0.5rem',

  },
  '@media all and (min-height: 470px)': {
    marginTop: 320,

  },
  '@media all and (min-height: 550px)': {
    marginTop: 240,

  },
  '@media all (min-height: 600px)': {
    marginTop: 200,

  },

  '@media all and (min-height: 650px)': {
    marginTop: 150,

  },

  /*
  '@media all and (orientation: landscape) and (min-height: 320px)': {
    marginTop: '44rem',

  },

  '@media all and (orientation: landscape) and (min-height: 360px)': {
    marginTop: '42rem',

  },

  '@media all and (orientation: landscape) and (min-height: 411px)': {
    marginTop: '40rem',

  },

  '@media all and (orientation: landscape) and (min-height: 450px)': {
    marginTop: '36rem',

  },

  '@media all and (orientation: landscape) and (min-height: 480px)': {
    marginTop: '32rem',

  },

  '@media all and (orientation: landscape) and (min-height: 520px)': {
    marginTop: '30rem',
  },
  '@media all and (orientation: landscape) and (min-height: 550px)': {
    marginTop: '28rem',
  },

  '@media all and (orientation: landscape) and (min-height: 600px)': {
    marginTop: '24rem',
  },
  '@media all and (orientation: landscape) and (min-height: 650px)': {
    marginTop: '20rem',
  },
  '@media all and (orientation: landscape) and (min-height: 700px)': {
    marginTop: '15rem',
  },
  '@media all and (orientation: landscape) and (min-height: 750px)': {
    marginTop: '13rem',
  },

  '@media all and (orientation: landscape) and (min-height: 810px)': {
    //marginTop: '5rem',
    marginTop: 80,
  },
  /*
  
    '@media all and (orientation: landscape)': {
      marginLeft: 0,
      marginTop: '63rem',
      marginBottom: '5rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"wd 
      "LocationBox MapBox"`,
    },
  
  
    '@media all and (orientation: landscape) and (min-height: 233px)': {
      marginLeft: 0,
      marginTop: '60rem',
      marginBottom: '5rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
    
    '@media all and (orientation: landscape) and (min-height: 375px)': {
      marginLeft: 0,
      marginTop: '54rem',
      marginBottom: '3rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
    '@media all and (orientation: landscape) and (max-height: 800px) and (max-width: 812px)': {
      marginLeft: 0,
      marginTop: '57rem',
      marginBottom: '5rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
    '@media all and (orientation: landscape) and (max-height: 800px) and (max-width: 812px)': {
      marginLeft: 0,
      marginTop: '57rem',
      marginBottom: '5rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
    '@media all and (orientation: landscape) and (max-height: 500px) and (max-width: 812px)': {
      marginLeft: 0,
      marginTop: '44rem',
      marginBottom: '5rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.3fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
  
    '@media all and (orientation: landscape) and (max-height: 375px)': {
      marginLeft: 0,
      marginTop: '54rem',
      marginBottom: '3rem',
  
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '0.5fr 0.1fr 1fr 1fr',
      gridTemplateAreas: `
      "ListBox ListBox"
      "MenuBox MenuBox"
      "LocationBox MapBox"
      "LocationBox MapBox"`,
    },
  
  */

});

const MenuLocationMapBox = styled('div')({
  /* 
    // as an item
    flexBasis: '69%',
  
    width: '69vw',
    minWidth: '69vw', //'30rem'
    maxWidth: '69vw', //'40vw'
  
    //height: '70vh',
    //height: '10vh',
    //height: 'fit-content',
    // height: 'fit-content(70vh)',
    // maxHeight: '80rem',
    //minHeight: '70vh',
  
    // as a container
    display: 'flex',
    // flexDirection: 'column',
    flexDirection: 'row',
    flexWrap: 'wrap',
  
    alignItems: 'flex-start',
    //alignItems: 'space-evenly',
    // alignItems: 'center',
    //alignItems: 'space-around',
    //justifyContent: 'space-around',  
    justifyContent: 'flex-start',
    // justifyContent: 'center',
  
  
    marginTop: 0,
    marginLeft: '1px',
    paddingLeft: 0,
    marginRight: '1px',
    paddingRight: '10px',
  
    //paddingRight: '1.5rem',
  
  
  */

});

const ListBox = styled('div')({
  gridArea: 'ListBox',

  height: '100%',
  minHeight: '25vh',
  //height: '78vh',
  //minHeight: 'fit-content',
  //width: 'inherit',
  //minWidth: '90%',
  minWidth: '80vw',

  '@media all and (min-width: 375px)': {
    //height: '16vh',
    minHeight: '19vh',
    //width: '100vw',
    minWidth: 'fit-content(80vw)',

  },
  '@media all and (min-width: 414px)': {
    //height: '16vh',
    minHeight: '20vh',
    //width: '100vw',
    minWidth: 'fit-content(80vw)',

  },
  // '@media all and (min-width: 550px)': {
  //   //height: '16vh',
  //   minHeight: '20vh',
  //   //width: '100vw',
  //   minWidth: 'fit-content(80vw)',

  // },

  '@media all and (min-width: 700px)': {
    height: '100%',
    minHeight: '80vh',
    minWidth: '100%',

  },


  '@media all and (orientation: landscape) and (max-height: 800px) and (max-width: 812px)': {
    //height: '16vh',
    minHeight: '40vh',
    //width: '100vw',
    minWidth: 'fit-content(80vw)',
  },

  // '@media all and (min-width: 810px)': {
  //   height: '48vh',
  // },
  // '@media all and (min-width: 1014px)': {
  //   height: '78vh',
  // },

  /*
  flexBasis: '29.5%',
  width: '29.5vw',
  // width: 'fit-content',

  minWidth: '29vw', //'30rem'
  maxWidth: '29.5vw', //'40vw'
  //'35%'


  height: '63vh',
  //height: 'fit-content',
  paddingRight: 0,
  marginRight: 0,
*/

});


const MenuBox = styled('div')({

  gridArea: 'MenuBox',

  height: '5%',
  width: '100%',
  //flexBasis: '100%',


});

const LocationMapBox = styled('div')({

  // paddingLeft: '20px',
  // paddingRight: '20px',

  /*
  flexBasis: '100%',
  width: '100%',
  // width: 'fit-content',
  //width: '70vw',
  // width: '60rem',

  // maxHeight: '80vh',
  //height: 'inherit',
  // height: 'fit-content',
  height: '93%',

  margin: 'auto',
  padding: 'auto',
  // marginTop: 0,
  // paddingTop: 0,
  //paddingRight: '10rem',

  // borderRadius: '0.8rem',
  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',   //'flex-start',
  alignItems: 'flex-start',   //'strech', 


  // alignItems: 'space-between',   //'flex-start', 
  // justifyContent: 'space-between',   //'flex-start',  
  */
});


const LocationBox = styled('div')({

  gridArea: 'LocationBox',
  marginLeft: '0.1rem',


  // paddingLeft: '3px',

  //flexBasis: '40%',

});

const MapBox = styled('div')({

  gridArea: 'MapBox',
  //height: '70vh',

  marginRight: 0,
  marginLeft: '0.3rem',

  // flexBasis: '40%',
  // '@media all and (min-width: 550px)': 
  '@media all and (min-width: 411px)': {
    marginRight: '0.5rem',
    marginleft: 0,
  },

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
