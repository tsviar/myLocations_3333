import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const main_palete_theme = {
  palette: {
    primary: {
      light: '#4791db',
      main: '#1976d2',
      dark: '#115293',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#e33371',
      main: '#dc004e',
      dark: '#9a0036',
      //contrastText: '#ffcc00',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      //contrastText: '#ffcc00',
    },

    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      //contrastText: '#ffcc00',
    },

    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      //contrastText: '#ffcc00',
    },

    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      //contrastText: '#ffcc00',
    },

    top_menu: {
      light: '#33eb91', //'#64b5f6',
      main: '#00e676', //'#2196f3',
      dark: '#00a152', //'#1976d2',  
      text_color: '#FFF',
      text_color_light: 'mintcream',
      text_color_dark: '#263238',
      //contrastText: '#ffcc00',
    },

    header: {
      light: '#5381ff',
      main: '#2962ff',
      dark: '#1c44b2',
      text_color: `#18ffff`, //'#FFF',   
      text_hoover_color: '#b2ff59',
    },

    add_button: {
      light: '#baffff',
      main: '#84ffff',
      dark: '#4bcbcc',
      // text_color: `#18ffff` , //'#FFF',   
      // text_hoover_color: '#b2ff59',           
    },

    table_search_field: {
      main: 'white',
    },

    table_row_style: {
      //selected: `#b9f6ca`, 
      selected: '#84ffff',
      regular: '#ecfffd', //'#f1f8e9',    
      regular_light: 'honeydew',
      very_light: 'white',
    },

    surface_background: {
      regular: 'oldlace',
      regular_light: '#fafafa', //...grayish
      regular_medium: 'Cornsilk',
      very_light: 'white',
    },

    home_page: {
      text_color: 'coral',
      background_start: 'gold',
      background_end: 'coral',
    },




    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    //contrastThreshold: 3,

    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,

  }, //pallete

  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
        color: '#673ab7',
        backgroundColor: '#40c4ff',
        // color: '#18ffff',
        // backgroundColor: '#2962ff',
        //margin: "150px",
      },
    },

    MTableToolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-around',
      justifyContent: 'center',
      //justifyContent: 'space-around',
      flexWrap: 'auto',
    }


  },
};


// According to:
// https://material-ui.com/customization/palette/#example


// const MainTheme = useMemo(
//     () => createMuiTheme({
//         palette: {
//           primary: {
//             light: '#4791db',
//             main: '#1976d2',
//             dark: '#115293', 
//             // contrastText: will be calculated to contrast with palette.primary.main
//           },
//           secondary: {
//             light: '#e33371',
//             main: '#dc004e',
//             dark: '#9a0036', 
//             //contrastText: '#ffcc00',
//           },
//           error: {
//             light: '#e57373',
//             main: '#f44336',
//             dark: '#d32f2f', 
//             //contrastText: '#ffcc00',
//           },

//           warning: {
//             light: '#ffb74d',
//             main: '#ff9800',
//             dark: '#f57c00', 
//             //contrastText: '#ffcc00',
//           },

//           info: {
//             light: '#64b5f6',
//             main: '#2196f3',
//             dark: '#1976d2', 
//             //contrastText: '#ffcc00',
//           },

//           success: {
//             light: '#81c784',
//             main: '#4caf50',
//             dark: '#388e3c', 
//             //contrastText: '#ffcc00',
//           },    

//           top_menu: {
//             light: '#33eb91', //'#64b5f6',
//             main: '#00e676', //'#2196f3',
//             dark: '#00a152', //'#1976d2',  
//             //contrastText: '#ffcc00',
//           },

//           header: {
//             light: '#5381ff', 
//             main: '#2962ff',
//             dark: '#1c44b2',              
//           },

//           // Used by `getContrastText()` to maximize the contrast between
//           // the background and the text.
//           contrastThreshold: 3,
//           // Used by the functions below to shift a color's luminance by approximately
//           // two indexes within its tonal palette.
//           // E.g., shift from Red 500 to Red 300 or Red 700.
//           tonalOffset: 0.2,

//         }
//       }) ,
//     [],
//   );




// goes with const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
// const theme1 = useMemo(
//     () =>
//       createMuiTheme({
//         palette: {
//           type: prefersDarkMode ? 'dark' : 'light',
//         },
//       }),
//     [prefersDarkMode],
//   );


// let theme2 = createMuiTheme({
//     palette: {
//       primary: settings.theme.primaryColor.import,
//       secondary: settings.theme.secondaryColor.import,
//       type: settings.theme.type
//     }
//   });
const theme3 = {
  palette: {
    primary: {
      light: '#4791db',
      main: '#1976d2',
      dark: '#115293',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#e33371',
      main: '#dc004e',
      dark: '#9a0036',
      //contrastText: '#ffcc00',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      //contrastText: '#ffcc00',
    },

    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      //contrastText: '#ffcc00',
    },

    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      //contrastText: '#ffcc00',
    },

    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      //contrastText: '#ffcc00',
    },

    top_menu: {
      light: '#33eb91', //'#64b5f6',
      main: '#00e676', //'#2196f3',
      dark: '#00a152', //'#1976d2',  
      text_color: '#FFF',
      //contrastText: '#ffcc00',
    },

    header: {
      light: '#5381ff',
      main: '#2962ff',
      dark: '#1c44b2',
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    type: "main",
  },
};

const theme33 = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const theme333 = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

// const theme = useMemo(
//     () =>
//       createMuiTheme({
//         palette: {
//           type: prefersDarkMode ? 'dark' : 'light',
//         },
//       }),
//     [prefersDarkMode],
//   );




export { main_palete_theme as default };
//export {main_palete_theme};