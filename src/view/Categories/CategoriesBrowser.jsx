import React,
{
  useContext,
  useState,
  useEffect,
  useCallback,

  // using React.memo to turn a componenet into a memoized component. 
  //This will force React to never re-render it, unless some of its properties change
  // memo ,
  useMemo,
  //forwardRef,
} from "react";

// import { Route, Switch } from "react-router";
// import {
//   useHistory,
//   useLocation,
//   useParams,
// } from "react-router-dom";

// import { createBrowserHistory } from "history";

import { StateDataManager } from "../../stateProvider/DataManager";
import * as api from "../../services/StorageService";
import useSetState from "../../services/StateServices";
import marker from '@ajar/marker';


//import "../styles.css";
//import styled from "styled-components";
import main_palete_theme from '../../style.lib/PalleteStyles';
// import Image from '../../style.lib/images/table_background_1.jpg';
import Image from '../../style.lib/images/table_background_3.jpg';
import ImageSmall from '../../style.lib/images/table_background_small.jpg';
import ImageMed from '../../style.lib/images/table_background_med.jpg';
import ImageLarge from '../../style.lib/images/table_background_large.jpg';
import ImageHigh from '../../style.lib/images/table_background_high.jpg';
import ImageHighSmall from '../../style.lib/images/table_background_high_small.jpg';
import ImageHighMed from '../../style.lib/images/table_background_high_med.jpg';
import ImageHighLarge from '../../style.lib/images/table_background_high_large.jpg';

import localization_theme from "../../style.lib/localization";

// Material-UI
import {
  //makeStyles,
  styled,
  //withStyles,
  //createMuiTheme,
  //MuiThemeProvider,
} from '@material-ui/core/styles';

import tableIcons from "../TableIcons";

import MaterialTable, { MTableToolbar, } from 'material-table';


// 2 ways to update the table:
// 1) using useStateful,useSetState and the setting of columns and data is in the table
// 2) using useState( [.. here is the setting of columns and data])


/*
CategoriesBrowser categories_list  index.js:103 
Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}length: 4
__proto__: Array(0)

index.js:63 CategoriesBrowser 
local_categories_list                                                                       
Object
  setState: ƒ (v)
  state: Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}
length: 4
__proto__: Array(0)__proto__: Object

//====== CategoriesBrowser useSetState setState  ==========

                                                                                            
CategoriesBrowser onRowUpdate oldData  
Object
  name: "Mehmet"
  surname: "Baran"
  birthYear: 1987
  birthCity: 63
  tableData:
      id: 0
      editing: undefined
      __proto__: Object
  __proto__: Object

CategoriesBrowser onRowUpdate newData
Object
name: "new3333"
surname: "Baran"
birthYear: 1987
birthCity: 63__proto__: Object


*/

//========================================================================
//          CategoriesBrowser
//          using MaterialTable: 
//          URL: https://material-table.com/#/docs/features/editable
//========================================================================

const CategoriesBrowser = () => {

  const { loading_lists,
    categories_list, set_categories_list,
    set_error_message,
  } = useContext(StateDataManager);


  // using useState:
  //-----------------------------------------------------------------------
  const [local_categories_list, update_local_categories_list] = useState(
    {
      columns: [
        {
          title: 'Category',
          field: 'name', type: 'string',
          cellStyle: {
            //backgroundColor: '#039be5',
            //color: '#FFF',
            fontSize: `1.1rem`,

          },
        },

        // { title: 'Surname', field: 'surname' },
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ],

      data: categories_list,

    });

  // using useStateful,useSetState
  //----------------------------------------------------------
  //const local_categories_list = useSetState(categories_list);


  const [selected_row, set_selected_row] = useState(null);


  marker.red(`===== CategoriesBrowser render ${selected_row}======================\n`);
  console.log(`CategoriesBrowser categories_list\n`, categories_list);
  console.log(`CategoriesBrowser local_categories_list\n`, local_categories_list);
  console.log(`CategoriesBrowser selected_row\n`, selected_row);
  marker.red(`=======================================================\n`);


  // const location = useLocation();
  // marker.obj(location, `CategoriessBrowser location \n`);

  // const history = useHistory();

  //const classes = useStyles();


  // console.log (`COLORRRRRRRRRRRR 
  // ============================================================================`,main_palete_theme);

  const storeData = async (list_name, list) => {
    try {
      await api.storeListLS(list_name, list);

    } catch (err) {
      set_error_message(err.message);
    }
  }


  // need this when using useState()
  //-----------------------------------
  useEffect(() => {
    update_local_categories_list({ columns: local_categories_list.columns, data: categories_list });
    //},  []);  
  }, [categories_list, categories_list.length]);

  //================================================================
  // Table row manipulation:
  //================================================================

  // when using useState
  //--------------------------------------
  const addCategory = newData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        update_local_categories_list(prevState => {
          const list = [...prevState.data];
          // console.log(`CategoriesBrowser onRowAdd list prevState.data\n`, list);

          list.push(newData);
          set_categories_list(list);
          storeData('categories_list', list);

          marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);
          // console.log(`CategoriesBrowser onRowAdd newData\n`, newData);
          marker.obj(newData, `CategoriesBrowser onRowAdd newData\n`);

          // console.log(`CategoriesBrowser onRowAdd list\n`, list);
          // console.log(`CategoriesBrowser onRowAdd local_categories_list\n`, local_categories_list);
          // console.log(`CategoriesBrowser onRowAdd categories_list\n`, categories_list);
          marker.blue(`=======================================================\n`);

          return ({ columns: local_categories_list.columns, data: list });
          // return { ...prevState, list };
        });
      }, 600);
    })

  // when using useStateful,useSetState
  //--------------------------------------
  //   new Promise((resolve, reject) => {

  //     setTimeout(() => {
  //       {
  //         const list = categories_list; //this.state.data;
  //         list.push({name: newData.name});



  //         local_categories_list.setState(list, () => resolve());
  //         //local_categories_list.setState({list});

  //         storeData('categories_list', list);

  //         marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);   
  //         console.log(`CategoriesBrowser onRowAdd newData\n`,newData);
  //         marker.obj(newData, `CategoriesBrowser onRowAdd newData\n`);
  //         marker.obj(list, `CategoriesBrowser onRowAdd list\n`);
  //         console.log(`CategoriesBrowser onRowAdd list\n`,list);
  //         console.log(`CategoriesBrowser onRowAdd local_categories_list\n`,local_categories_list);
  //         console.log(`CategoriesBrowser onRowAdd categories_list\n`,categories_list);
  //         marker.blue(`=======================================================\n`);
  //       }
  //       resolve();                  
  //     }, 1000)
  //   })


  // when using useState
  //--------------------------------------
  const editCategory = (newData, oldData) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          update_local_categories_list(prevState => {
            const list = [...prevState.data];
            // console.log(`CategoriesBrowser onRowUpdate list prevState.data\n`, list);

            list[list.indexOf(oldData)] = newData;
            set_categories_list(list);
            storeData('categories_list', list);

            marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);
            // console.log(`CategoriesBrowser onRowUpdate newData\n`, newData);
            marker.obj(newData, `CategoriesBrowser onRowUpdate newData\n`);

            //console.log(`CategoriesBrowser onRowUpdate list\n`, list);
            // console.log(`CategoriesBrowser onRowUpdate local_categories_list\n`, local_categories_list);
            // console.log(`CategoriesBrowser onRowUpdate categories_list\n`, categories_list);
            marker.blue(`=======================================================\n`);

            return ({ columns: local_categories_list.columns, data: list });
            // return { ...prevState, list };
          });
        }
      }, 600);
    })


  // when using useStateful,useSetState
  //--------------------------------------
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       {
  //         const list = categories_list; ///this.state.data;
  //         const index = list.map(e => e.name).indexOf(oldData.name);
  //         list[index] = {name: newData.name};


  //         // Only a double callback (setState and an inner function call)
  //         // displays the current list
  //         // just like any of the 3 functions below would do
  //         //this.setState({ list }, () => resolve());
  //         local_categories_list.setState(list, () => resolve());
  //         //local_categories_list.setState({list});

  //         storeData('categories_list', list);

  //         marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${oldData}\n`);
  //         console.log(`onRowUpdate found index ${index}`);
  //         console.log(`CategoriesBrowser onRowUpdate oldData\n`,oldData);
  //         console.log(`CategoriesBrowser onRowUpdate newData\n`,newData);
  //         marker.obj(oldData, `CategoriesBrowser onRowUpdate oldData\n`);
  //         marker.obj(newData, `CategoriesBrowser onRowUpdate newData\n`);
  //         marker.obj(list, `CategoriesBrowser onRowUpdate list\n`);
  //         console.log(`CategoriesBrowser onRowUpdate list\n`,list);
  //         console.log(`CategoriesBrowser onRowUpdate local_categories_list\n`,local_categories_list);
  //         console.log(`CategoriesBrowser onRowUpdate categories_list\n`,categories_list);
  //         marker.blue(`=======================================================\n`);


  //       }
  //        resolve();
  //     }, 1000)
  //   })



  // when using usetState
  //--------------------------------------
  const removeCategory = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        update_local_categories_list(prevState => {
          const list = [...prevState.data];
          //console.log(`CategoriesBrowser onRowDelete list prevState.data\n`, list);

          list.splice(list.indexOf(oldData), 1);
          set_categories_list(list);
          storeData('categories_list', list);

          marker.blue(`===== CategoriesBrowser onRowDelete  ======================\n ${oldData}\n`);
          //console.log(`CategoriesBrowser onRowAdd newData\n`, oldData);

          // console.log(`CategoriesBrowser onRowDelete list\n`, list);
          // console.log(`CategoriesBrowser onRowDelete local_categories_list\n`, local_categories_list);
          // console.log(`CategoriesBrowser onRowDelete categories_list\n`, categories_list);
          marker.blue(`=======================================================\n`);

          return ({ columns: local_categories_list.columns, data: list });
          // return { ...prevState, list }; 
        });
      }, 600);
    })

  // when using useStateful,useSetState
  //--------------------------------------
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       {
  //         let list = categories_list; /// this.state.data;
  //         const index = list.map(e => e.name).indexOf(oldData.name);
  //         list.splice(index, 1);
  //         console.log(`onRowDelete list`, list);

  //         // Only a double callback (setState and an inner function call)
  //         // displays the current list
  //         // just like any of the 3 functions below would do
  //         //this.setState({ list }, () => resolve());
  //         local_categories_list.setState(list, () => resolve());
  //       //  local_categories_list.setState({list});

  //         storeData('categories_list', list);

  //       }
  //        resolve();
  //     }, 1000)
  //   })




  return (
    // <!--<MuiThemeProvider theme={MainTheme}> 

    <MainBox
      aria-label="Categories Main Box"
      id="Categories_Main_Box"
      name="Categories_Main_Box"
      role="article"
    >

      {loading_lists === false ? (

        <MainMenuContentWrapper
          aria-label="Categories Content Wrapper"
          id="Categories_Content_Wrapper"
          name="Categories_Content_Wrapper"
          role="application"
        >
            <ContentBox
            aria-label="Categories Content Table Box"
            id="Categories_Content_Table_Box"
            name="Categories_Content_Table_Box"
            role="directory"
          >
            <MaterialTable
              aria-label="Categories Material Table"
              id="Categories_Material_Table"
              name="Categories_Material_Table"
              role="table"              
              
              style={TableStyle}


              //title ="Categories list"
              title={
                //  <h4 className={classes.tableTitleStyle}>Categories list</h4>
                <div style={TableTitleDivStyle}
                  aria-label="Categories Table Title div"
                  id="Categories_Table_Title_div"
                  name="Categories_Table_Title_div"
                  role="directory"
                >
                  <TableTitleStyled
                    aria-label="Categories Table Title"
                    id="Categories_Table_Title"
                    name="Categories_Table_Title"
                    role="note"
                  >
                    Categories list
                  </TableTitleStyled>
                </div>
              }

              // when using useState
              //--------------------------------------
              columns={local_categories_list.columns}

              // when using useStateful,useSetState
              //--------------------------------------
              // columns={[
              //   { 
              //     title: 'Category',                    
              //     field: 'name', type: 'string',
              //     cellStyle: {
              //       //backgroundColor: '#039be5',
              //       //color: '#FFF',
              //       fontSize:`1.1rem`,

              //     }, 
              //   },

              // ]}

              // when using useStateful,useSetState
              //--------------------------------------
              // data={ categories_list }

              // when using useState
              //--------------------------------------
              data={local_categories_list.data}


              //...material-table/dist/material-table.js:278
              // _this.setState(
              //   { isLoading: true },
              //   function () {
              //       _this.props.data(query)
              //       .then(function (result) {
              //             query.totalCount = result.totalCount;
              //             query.page = result.page;
              // ...

              //  data={[
              //    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
              //    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
              //  ]}  


              components={{

                Toolbar: props => (
                  <div
                    //style={{ display: 'flex', alignItems: 'center', }}
                    style={MTableToolbarStyle}
                    aria-label="Categories Table Toolbar Div"
                    id="Categories_Table_Toolbar_Div"
                    name="Categories_Table_Toolbar_Div"
                    role="directory"
                  >
                    {/* <MainTableToolBar> */}
                    <MTableToolbar {...props}
                      aria-label="Categories Table Toolbar"
                      id="Categories_Table_Toolbar"
                      name="Categories_Table_Toolbar"
                      role="toolbar"
                    />
                    {/* </MainTableToolBar> */}
                  </div>
                ),

              }}


              onRowClick={((evt, selectedRow) => set_selected_row({ selectedRow }))}

              options={{

                sorting: true,

                pageSizeOptions: [5, 10], // more then that look awefull...

                searchFieldStyle: TableSearchFieldStyle,

                headerStyle: TableHeaderStyle,

                cellStyle: TableCellStyle,

                rowStyle: rowData => ({
                  backgroundColor:
                    (
                      selected_row && selected_row.selectedRow
                      && selected_row.selectedRow.tableData.id === rowData.tableData.id
                    ) ? //'#EEE' : '#FFF'
                      // 'blue' : //'honeydew':// '#FFF'
                      `${main_palete_theme.palette.table_row_style.selected}` :
                      `${main_palete_theme.palette.table_row_style.regular}`,   //'oldlace', //'#FFF',
                  height: TableRowStyle.height, //40,
                  textAlign: TableRowStyle.textAlign, //'left',
                  fontFamily: TableRowStyle.fontFamily, //'Expletus Sans',
                  fontSize: TableRowStyle.fontSize, //`3rem`,//'1.4rem',

                }),

              }} //options

              icons={tableIcons}

              localization={localization_theme.categories_table}

              editable={{

                onRowAdd: newData => addCategory(newData),
                onRowUpdate: (newData, oldData) => editCategory(newData, oldData),
                onRowDelete: oldData => removeCategory(oldData),

              }}

            />
            {/* MaterialTable */}

            {/* </MuiThemeProvider> */}

          </ContentBox>
        </MainMenuContentWrapper>


      ) : (
          <h1>... Loding ...</h1>
        )
      }

    </MainBox >

    //  </MuiThemeProvider>--> 

  );
};
export default CategoriesBrowser;

//===============================================================
// local styling
//===============================================================


// const useStyles = makeStyles({
//   colHeader: {
//      background: 'lightsalmon',
//      color: "darkred",
//      "&:hover": {
//        color: "blue"
//      },
//      fontSize:`1.2rem`,
//    },


//   tableTitleStyle: {   

//    color: `${main_palete_theme.palette.header.light}`, //'#FFF',
//    // color: 'white', //"blue",
//     "&:hover": {
//       color: `${main_palete_theme.palette.header.dark}`,
//       //color: 'lightblue',//"darkred",
//     }
//   }
// });



const MainBox = styled('div')({
  backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  // background: 'Cornsilk',

  borderRadius: '0.4rem',
  boxShadow: '0 0.4rem 1.5rem DimGrey',

  fontSize: '1.5rem',

  height: '100%',
  //minHeight: '100vh',
  minHeight: '120rem',

  //width: 'auto',
  //minWidth: '100em',
  // width: '100%',
  width: 'inherit',
 
  minWidth: 'inherit', 
  //minWidth: '90vw',

 '@media all and (min-width: 280px)': {
    width: '100%',
    minWidth: '100vw',
   },

  margin: 'auto',
  // marginLeft: '1.6rem',

  padding: '1px',

  // fontSize: '1.5rem',
  // fontWeight: '600',
  

 overflow: 'auto',
 // overflow: 'scroll',
 //overflow: 'hidden',



});

const MainMenuContentWrapper = styled('div')({


  // content: "MainMenuContentWrapper",

  borderRadius: '5px',

  // '&::before': {
   
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
   // bottom:0, 
   
  // },
  
  margin: 'auto',
  padding: '1px',



  // Background image
  //---------------------------------------------------------------

   height: '100%',
   //minHeight: '100%',
    
  minHeight: 'calc(38em + 20vh)',

  //'@media all and (min-height: 320px)': {
    
    //minHeight: 'calc(35em + 20vh)',
  //},

  '@media all and (min-height: 550px)': {
    
   // minHeight: '30em',
   minHeight: 'calc(35em + 20vh)',
  },

  '@media all and (min-height: 700px)': {
    
    minHeight: 'calc(5em +2vh)',
    
  },
   //minHeight: '50em',
   
   // width: 'auto',
    width: '120%', 
    minWidth: '100vw',
    
  '@media all and (min-width: 280px)': {
    
    width: '100%',
    minWidth: 'inherit',
    
  },




  // format
  //[ <bg-layer> , ]* <final-bg-layer>
  // where 
  //<bg-layer> = <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> 
  //             || /<box> || <box>
  //<final-bg-layer> = <'background-color'> || <bg-image> 
  //        || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>

  //where 
  // <bg-image> = none | <image>
  // <bg-position> = [ [ left | center | right | top | bottom | <length-percentage> ] 
  //                  | [ left | center | right | <length-percentage> ] 
  //                      [ top | center | bottom | <length-percentage> ] 
  //                  | [ center | [ left | right ] <length-percentage>? ] 
  //                      && [ center | [ top |  bottom ] <length-percentage>? ] ]
  // <bg-size> = [ <length-percentage> | auto ]{1,2} | cover | contain
  // <repeat-style> = repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}
  // <attachment> = scroll | fixed | local
  // <box> = border-box | padding-box | content-box




  background: `url(${ImageHighLarge}) center  center / 100% 100% no-repeat scroll content-box ${main_palete_theme.palette.surface_background.regular_medium}`,
 
  
  // Initial value	as each of the properties of the shorthand:
  //  background-image: none
  //  background-position: 0% 0%
  //  background-size: auto auto
  //  background-repeat: repeat
  //  background-origin: padding-box
  //  background-clip: border-box
  //  background-attachment: scroll
  //  background-color: transparent

  //backgroundImage: `url(${ImageLarge})`,

  //Background image doesn't tile
    //backgroundRepeat: 'no-repeat',

 //Background image is centered vertically and horizontally at all times
 // backgroundPosition: 'center center',
   ///ackgroundPosition: 'top 0 left 0 right 0 bottom 0',
   /// backgroundPosition: 'top 0 left 0 ',

/// backgroundAttachment: 'unset',
// The background is fixed relative to the viewport. 
// it doesn't move when the content's height is greater than the image's height
// Even if an element has a scrolling mechanism, the background doesn't move with the element
// or else we’ll either run out of image at the bottom

//backgroundAttachment: 'fixed',

 //The background is fixed relative to the element's contents. 
 // If the element has a scrolling mechanism, 
 // the background scrolls with the element's contents, 
 // and the background painting area and background positioning area 
 // are relative to the scrollable area 
 // of the element rather than to the border framing them.

 // backgroundAttachment: 'local',

 // The background is fixed relative to the element itself and does not scroll with its contents. 
 // (It is effectively attached to the element's border.)

 //backgroundAttachment: 'scroll',

// The cover value tells the browser to 
// automatically and proportionally scale the background image’s width and height 
// so that they are always equal to, or greater than, the viewport’s width/height.
// Use a media query to serve a smaller background image for mobile devices
// This is what makes the background image rescale based on the container's size
// This tells the browser to scale the background image proportionally 
// so that its width and height are equal to, or greater than, the width/height of the element. 
// (In our case, that’s body element.)
// "cover" value keeps the aspect ratio, and some part of the background image may be clipped:

 // backgroundSize: 'cover',
 //  backgroundSize: 'stretch',
/// backgroundSize: 'fill',
///backgroundSize: '100%',

//Set a background color that will be displayed while the background image is loading
  //backgroundColor: `${main_palete_theme.palette.surface_background.regular_medium}`,
  
  
    // background: `${main_palete_theme.palette.surface_background.regular_medium} center / contain  no-repeat url(${ImageLarge}) `, 
    // background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover  no-repeat url(${ImageLarge}) `, 


    // background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageSmall}) `,
    // background: `url(${ImageLarge}) no-repeat center center/ cover fixed`,
     //background: `url(${ImageLarge}) no-repeat center center/ contain fixed`,
    
    //  background: `url(${ImageSmall}) center center / cover no-repeat  ${main_palete_theme.palette.surface_background.regular_medium}`,

   //   background: `url(${ImageSmall}) center  center  / 100% 120% no-repeat scroll content-box ${main_palete_theme.palette.surface_background.regular_medium}`,

    // background: `url(${ImageSmall}) center  center / 100% 100% no-repeat scroll content-box ${main_palete_theme.palette.surface_background.regular_medium}`,


// object-fit can be set with one of these five values:

// fill: this is the default value which stretches the image to fit the content box, 
//       regardless of its aspect-ratio.
// contain: increases or decreases the size of the image to fill the box 
//           whilst preserving its aspect-ratio.
// cover: the image will fill the height and width of its box, 
//        once again maintaining its aspect ratio but often cropping the image in the process.
// none:  image will ignore the height and width of the parent and retain its original size.
// scale-down: the image will compare the difference between none and contain 
//             in order to find the smallest concrete object size.



});


const ContentBox = styled('div')({

position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  ///alignItems: 'space-between',   
  ///alignItems: 'flex-start', 
  justifyContent: 'center',
  //justifyContent: 'flex-start',

  margin: 'auto',
  padding: 'auto',

  '@media all and (min-height: 1000px)': {
    
   paddingTop: 150,
    
  },

  '@media all and (min-height: 1200px)': {
    
    paddingTop: 200,
    
  },

  '@media all and (min-height: 1300px)': {
    
   paddingTop: 280,
    
  },

   //top right bottom left
  //padding: 'auto auto 90 auto',

});



const TableStyle = {

  margin: 'auto',
  marginTop: 28,
  marginBottom: 180, // for 5 and 10 rows and add row
  padding: 'auto',


  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  //overflow: 'auto', 
  overflow: 'scroll', 
  //overflow: 'none',

  width: 'auto',
  minWidth: 'inherit',

  height: '100%',
  minHeight: 'inherit',


}


const MTableToolbarStyle = {
  backgroundColor: `${main_palete_theme.palette.header.main}`,
  // backgroundColor: '#01579b',
  // backgroundColor: '#039be5',

  color: `${main_palete_theme.palette.header.text_color}`, //'#FFF',  

  fontSize: `1.2rem`,

  display: 'flex',
  //flexDirection: 'column',
  alignItems: 'space-around',
  //justifyContent: 'center',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',

}


const TableTitleDivStyle = {

   //visibility: 'visible',
  display: 'flex',
  //flexWrap: 'wrap',
  flexBasis: '0%',
  flexGrow: 1,
   
 '@media all and (min-width: 320px)': {
      display: 'flex',
      flexBasis: '41%',
      margin: 0,        
      marginRight: 10,
      padding: 0,
      paddingRight: 10,
       flexGrow: 3,
    },

 }

const TableTitleStyled = styled('h4')({

  color: `${main_palete_theme.palette.header.text_color}`,
  "&:hover": {
    color: `${main_palete_theme.palette.header.text_hoover_color}`,
  },

    fontSize: '1.2rem',

    //visibility: 'hidden',
    display: 'none',
    //width: 0,
    margin: 0,
    padding: 0,
    //width: '2rem',


  '@media all and (min-width: 370px)': {

    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: '31%',
    flexGrow: 1.5,
    flexShrink: 1,
  },

  '@media all and (min-width: 650px)': {
    //fontSize: '1.1rem',
    marginRight: '20',
    //paddingRight: '20',

    //flexBasis: '45%',

  },



});

const TableSearchFieldStyle =
{
  // background: 'white',
  background: `${main_palete_theme.palette.table_search_field.main}`,
  borderRadius: '0.5rem',

 
  display: 'flex',
  flexGrow: 5,
  flexShrink: 1,

  '@media all and (min-width: 320px)': {
   //width: '3em',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,

  },

  '@media all and (min-width: 650px)': {
    display: 'flex',
    flexBasis: '50%',
    flexGrow: 2,
    flexShrink: 1,

  },

}

// TActions Category
const TableHeaderStyle =
{
  backgroundColor: `${main_palete_theme.palette.top_menu.main}`,
  // backgroundColor: '#01579b',
  // backgroundColor: '#039be5',
  color: `${main_palete_theme.palette.top_menu.text_color}`, //'#FFF',
  fontSize: `1.2rem`,

  width: 20,
  maxWidth: 20,
}

const TableRowStyle = {
  height: 40,
  textAlign: 'left',
  //fontFamily: `Roboto Condensed`, 
  fontFamily: 'Expletus Sans',
  fontSize: `3rem`,//'1.4rem',
}

const TableCellStyle = {
  width: 20,
  maxWidth: 20,
}

/*
const AddButtonDiv = styled('h4')({
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,

  '@media (maxWidth: 650px)': {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,
  },
});

const TableAddButtonStyle =
{
  background: `${main_palete_theme.palette.add_button.main}`,
  color: `${main_palete_theme.palette.primary.dark}`,

  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,

  '@media (maxWidth: 650px)': {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,

  },
}

const TableAddLocationIconStyle = {
  fontSize: 35,

  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,

  '@media (max-width: 650px)': {
    fontSize: '1px',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,
  },
}

*/

