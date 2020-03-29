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

        <div
          aria-label="Categories Table Div"
          id="Categories_Table_Div"
          name="Categories_Table_Div"
          role="application"
        >
          < ContentBox
            aria-label="Categories Content Box"
            id="Categories_Content_Box"
            name="Categories_Content_Box"
            role="directory"
          >

            < MaterialTable
              style={TableStyle}

              aria-label="Categories Material Table"
              id="Categories_Material_Table"
              name="Categories_Material_Table"
              //role="tree"
              role="table"


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
        </div>


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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '0.4rem',
  boxShadow: '0 0.4rem 1.5rem DimGrey',

  //fontSize: '1.5rem',

  // Desktop 1st

  //  What is the max width for mobile? 480px
  //  Most mobile phones have a device-width of 480px or lower, including the popular iPhone 4 (with 
  //  device- width: 320px), despite it technically having a 640 x 960 

  // tablet and up
  //--------------------------

  //height: 'auto',
  height: '100%',
  //maxHeight: '100rem',
  minHeight: '100vh',

  width: '100%',
  //width: 'auto',
  //maxWidth: '100vw',
  minWidth: '100vw',

  //top right bottom left
  margin: '20px 10px 20px 10px',
  // padding: '1px 10px 50px 10px',
  padding: '30rem 10rem 30rem 10rem',

  // marginBottom: 40,
  //top right bottom left
  // margin: '0px 0px 40px 0px',
  // margin: 'auto',
  //padding: 'auto',


  //background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${Image}) `,

  '@media (orientation: landscape)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageLarge}) `,

    //top right bottom left
    margin: '20px 10px 20px 10px',
    // padding: '1px 10px 50px 10px',
    padding: '30rem 10rem 30rem 11rem',
  },

  // Pixel 2
  '@media (orientation: landscape) and (max-device-width:823px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / scale-down no-repeat url(${ImageHighLarge}) `,

    //top right bottom left
    margin: '20rem 0px 0rem 0px',
    // padding: '1px 10px 50px 10px',
    padding: '15rem 0px 5rem 0rem',

    height: '100%',
    minHeight: '150vh',
    mixWidth: '100vw',
  },

  // Glaxy S5
  '@media (orientation: landscape) and (max-device-width:640px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / fill no-repeat url(${ImageLarge}) `,

    //top right bottom left
    margin: '25rem 0px 10px 25px',
    // padding: '1px 10px 50px 10px',
    padding: '20rem 0px 35px 10rem',

    height: '100%',
    minHeight: '130vh',
    width: 'auto',
    maxWidth: '120rem',
    minWidth: '140vw',
  },

  // IPhone4
  '@media (orientation: landscape) and (max-device-width:480px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / scale-down no-repeat url(${ImageLarge}) `,

    //top right bottom left
    margin: '25rem 0px 10px 0px',
    // padding: '1px 10px 50px 10px',
    padding: '20rem 4rem 3rem 7rem',

    height: '100%',
    minHeight: '100vh',

    width: '100%',
    //width: 'auto',
    //maxWidth: '100rem',
    minWidth: '100vw',
  },

  '@media (orientation: portrait) and (max-device-width:3000px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighLarge}) `,
  },

  //Pixel 2 , 2 XL (411px)
  '@media (orientation: portrait) and (max-device-width:800px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighMed}) `,
    marginTop: '10px',
    marginBottom: '5px',
    paddingTop: '15rem',
    paddingBottom: '6rem',

  },


  /*
    //LG Optimus L70
    '@media (orientation: portrait) and (device-height: 640px) and (max-device-width:384px)': {
      background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighSmall}) `,
  
      //top right bottom left
      margin: '3rem 2px 10px 2px',
      // padding: '1px 10px 50px 10px',
      padding: '10rem 1rem 3rem 1.5rem',
  
      height: 'auto',
      width: '100%',
      maxWidth: '60rem',
      minWidth: '100vw',
    },
  */
  //IPhone 6/7/8 / 8Plus / Iphone X / LG Optimus L70
  //  '@media (orientation: portrait) and (max-device-width:384px)': {
  '@media (orientation: portrait) and (max-device-width:414px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighSmall}) `,

    //top right bottom left
    margin: '3px 1px 10px 1px',
    // padding: '1px 10px 50px 10px',
    padding: '10rem 7rem 3rem 7rem',

    height: '100%',
    width: '80%',
    maxWidth: '10rem',
    minWidth: '100vw',
    /*
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / fill no-repeat url(${ImageHighSmall}) `,

    //top right bottom left
    margin: '3rem 2px 10px 2px',
    // padding: '1px 10px 50px 10px',
    padding: '10rem 4rem 3rem 5.5rem',

    height: 'auto',
    width: '90%',
    maxWidth: '50rem',
    minWidth: '105vw',
     */
  },



  //IPhone 6/7/8 / 8Plus / Iphone X 
  '@media (orientation: portrait) and (max-device-width:375px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighSmall}) `,

    //top right bottom left
    margin: '3px 1px 10px 1px',
    // padding: '1px 10px 50px 10px',
    padding: '20rem 10rem 4rem 10rem',

    height: '100%',
    width: '10%',
    //maxWidth: '10rem',
    //minWidth: '110vw',
  },


  // Glaxy S5
  '@media (orientation: portrait) and (max-device-width:360px)': {
    background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${ImageHighSmall}) `,

    //top right bottom left
    margin: '3rem 1px 20px 1px',
    // padding: '1px 10px 50px 10px',
    padding: '13rem 5rem 4rem 12rem',

    //height: 'auto',
    height: '100%',
    //maxHeight: '190vh',
    minHeight: '104vh',

    width: '100%',
    // width: 'auto',
    maxWidth: '150rem',
    minWidth: '135vw',

  },

  //IPhone 5/SE IPhone 4
  '@media (orientation: portrait) and (max-device-width:320px)': {
    // background: `${main_palete_theme.palette.surface_background.regular_medium} center /cover no-repeat url(${ImageHighSmall}) `,

    //top right bottom left
    //margin: '10rem 0px 10px 7.5rem',
    //padding: '18rem 1rem 50px 3rem',
    margin: '10px 1px 10px 2px',
    padding: '28rem 12rem 4rem 23rem',

    //height: 'auto',
    height: '100%',
    //  maxHeight: '250rem',
    //minHeight: '130vh',

    width: '150%',
    //width: 'auto',
    //maxWidth: '150rem',
    //minWidth: '100vw',

  },

  //moto 360 (max-device-width:218px) not supported


  // background: `${main_palete_theme.palette.surface_background.regular_medium}  center / 100% no-repeat url(${Image}) `,

  //background: `${main_palete_theme.palette.surface_background.regular_medium}  center / cover no-repeat url(${Image}) `,

  //background: 'Cornsilk',
  // backgroundImage: `url(${Image})`,
  // backgroundSize: 'cover',
  //backgroundPosition: 'strech', //'center',
  //backgroundRepeat: `no-repeat`,


});


const ContentBox = styled('div')({

  display: 'flex',
  alignItems: 'center',
  ///alignItems: 'space-between',   
  ///alignItems: 'flex-start', 
  justifyContent: 'center',
  //justifyContent: 'flex-start',

  margin: 'auto',
  padding: 'auto',
  //top right bottom left
  //padding: '0 0 2 0',



});



const TableStyle = {

  margin: 'auto',
  padding: 'auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  //overflow: 'auto', 
  overflow: 'none',

  width: 'auto',
  maxWidth: 'inherit',

  height: '100%',
  maxHeight: 'inherit',



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
  justifyContent: 'center',
  //justifyContent: 'space-around',
  flexWrap: 'wrap',

}

const TableTitleDivStyle = {
  display: 'flex',
  //flexWrap: 'wrap',
  flexBasis: '31%',
  flexGrow: 1,

  margin: 0,
  marginRight: 10,
  paddingRight: 10,

  '@media (maxWidth: 320px)': {
    display: 'none',
    width: 0,
    margin: 0,
    padding: 0,
  },
}

const TableTitleStyled = styled('h4')({

  color: `${main_palete_theme.palette.header.text_color}`,
  "&:hover": {
    color: `${main_palete_theme.palette.header.text_hoover_color}`,
  },

  fontSize: '1.2rem',

  display: 'flex',
  flexWrap: 'wrap',
  flexBasis: '30%',
  flexGrow: 1.5,
  flexShrink: 1,

  '@media (maxWidth: 650px)': {
    //fontSize: '1.1rem',
    marginRight: '20',
    //paddingRight: '20',

    //flexBasis: '45%',

  },


  '@media (maxWidth: 320px)': {
    display: 'none',
    width: 0,
    margin: 0,
    padding: 0,
    //width: '2rem',
  },
});

const TableSearchFieldStyle =
{
  // background: 'white',
  background: `${main_palete_theme.palette.table_search_field.main}`,
  borderRadius: '0.5rem',

  display: 'flex',
  flexBasis: '50%',
  flexGrow: 2,
  flexShrink: 1,

  '@media (maxWidth: 650px)': {
    //width: '3em',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,
  },

  '@media (maxWidth: 320px)': {
    display: 'flex',
    flexGrow: 5,
    flexShrink: 1,
  },


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

  '@media (maxWidth: 650px)': {
    fontSize: '1px',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 2,
  },
}

*/
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
object-fit can be set with one of these five values:

fill: this is the default value which stretches the image to fit the content box, regardless of its aspect-ratio.
contain: increases or decreases the size of the image to fill the box whilst preserving its aspect-ratio.
cover: the image will fill the height and width of its box, once again maintaining its aspect ratio but often cropping the image in the process.
none: image will ignore the height and width of the parent and retain its original size.
scale-down: the image will compare the difference between none and contain in order to find the smallest concrete object size.
*/