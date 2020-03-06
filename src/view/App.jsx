import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

//customize
// import styled from "styled-components";
//import "./styles.css";
import GlobalStyles from "../style.lib/globalStyles";
// customize with material-ui
import main_palete_theme from '../style.lib/PalleteStyles';



// Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles, styled } from '@material-ui/core/styles';
import marker from '@ajar/marker';

import { WrapperDataManager } from "../stateProvider/DataManager";
import HomePage from "./HomePage";

import CategoriesBrowser from "./Categories/CategoriesBrowser";

import LocationsBrowser from "./Locations/LocationsBrowser";


// since Links is exported as default,
// we can name it as we wish' hence, Menu
// import Menu from "./MainMenu";
// import TopBar from "./TopBar";
import MainBottomBar from "./MainBottomBar";


// let theme = createMuiTheme({
//   palette: {
//     primary: settings.theme.primaryColor.import,
//     secondary: settings.theme.secondaryColor.import,
//     type: settings.theme.type
//   }
// });



const history = createBrowserHistory();


const App = () => {


  // According to:
  // https://material-ui.com/customization/palette/#example

  const MainTheme = useMemo(
    () => createMuiTheme(
      main_palete_theme),
    [],
  );

  // According to:
  // https://material-ui.com/customization/palette/#example
  // const MainTheme = useMemo(
  //   () => createMuiTheme({
  //     palette:  main_palete_theme.palette,
  //     overrides: main_palete_theme.overrides,  

  //     }) ,
  //     [],
  //   );

  // const MainTheme = useMemo(
  // this creates a new empty object, great interview Q
  //   () => createMuiTheme({main_palete_theme}) ,
  //     [],
  //   );
  /*
  const [color, setColor] = React.useState('default');

  const blue_theme = React.useMemo(() => {
  if (color === 'blue') {
    return createMuiTheme({
      palette: {
        secondary: {
          main: blue[500],
          contrastText: '#fff',
        },
      },
    });
  }
  return createMuiTheme();
}, [color]);
*/

  // const table_theme = createMuiTheme({

  //  direction: direction,
  //   palette: {    
  //    type: 'light',
  //   },
  //   overrides: {
  //     MuiTooltip: {
  //       tooltip: {
  //         fontSize: 30,
  //         color: '#18ffff',
  //         backgroundColor: '#2962ff',
  //         margin: "150px",
  //       },
  //      },
  //   }
  // });


  //   console.log (`COLORRRRRRRRRRRR 
  // ============================================================================`,main_palete_theme);



  return (

    <Router history={history}>
      <MuiThemeProvider theme={MainTheme}>

        <AppBox>
          {/* <TopBar>
            <Menu />
          </TopBar> */}

          <Route exact path="/" component={HomePage} />

          <WrapperDataManager>

            <Switch>

              {/* <Route path="/locations" component={ProfilesBrowser} /> */}

              {/* <Route exact path="/categories" children={< AddLocation />} /> */}
              <Route exact path="/categories" children={< CategoriesBrowser />} />



              <Route exact path="/locations" children={<LocationsBrowser />} />
              {/* component={LocationsBrowser} /> */}

              <Route exact path="/locations/view"
                children={() => <LocationsBrowser />} />
              <Route exact path="/locations/add"
                children={() => <LocationsBrowser />} />
              <Route exact path="/locations/edit"
                children={() => <LocationsBrowser />} />
              <Route path="/locations/remove"
                children={() => <LocationsBrowser />} />
              {/* <Route path="/locations" children={<AddLocation />} /> */}


            </Switch>


          </WrapperDataManager>

          <MainBottomBar />

        </AppBox>
        <GlobalStyles />
      </MuiThemeProvider>
    </Router>
  );
};

export default App;



const AppBox = styled('div')({
  height: 'fit-content(100%)',
  //height: '100%',
  width: '100%',
  maxWidth: '100vw',
  minWidth: '60rem',

  '@media (min-width:1280px)': {
    // width: 'auto',
    minWidth: '100rem',
  },

  '@media (min-width:960px) and (max-width: 1279px) ': {//780px
    width: '80%',
    minWidth: '100rem',
  },
  '@media (min-width: 600px) and (max-width: 959px)': { //779px
    width: '80%',
    minWidth: '80vw',

  },
  '@media (min-width: 401px) and (max-width: 599px)': {
    width: '50%',
    inWidth: '50vw',
  },
  '@media (max-width: 400px)': {
    width: '50%',
    maxWidth: '50vw',
    minWidth: '50vw',
  },

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  margin: 'auto',
  //top right bottom left
  padding: '2rem 0rem 3rem 5rem',
  //padding: '3rem 7.5rem',
  //padding: '2rem 10rem 5rem 10rem', 
  //padding: '10.5rem 1.5rem 1.5rem',

  '@media (max-width: 780px)': {
    padding: '0 0 0 10rem',
  },
  '@media (max-width: 400px)': {
    padding: '2rem 0 0 0',
  },

});
