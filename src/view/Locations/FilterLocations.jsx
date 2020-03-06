import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import { StateDataManager } from "../../stateProvider/DataManager";
//import * as api from "../../services/StorageService";

//import TableSortLabel from '@material-ui/core/TableSortLabel';

import main_palete_theme from '../../style.lib/PalleteStyles';
import { makeStyles, withStyles, styled, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {
  SortRounded,
  CategoryRounded,
  Search,
  FilterList,
  //Sort,
  //SortByAlphaTwoTone,
} from '@material-ui/icons/';

import { Tooltip, Fab, } from '@material-ui/core';

// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

//import "../styles.css";
// import styled from "styled-components";

import marker from "@ajar/marker";


const FilterLocations = () => {

  // const { original_list, filtered_list, update_filtered_list } = useContext(StateDataManager);
  const {
    filtered_Locations_list, update_Locations_filtered_list,
    original_Locations_list,
    locations_filter_text, set_locations_filter_text,
    locations_edited_flag,
    set_error_message,
    locations_sort_order, set_locations_sort_order,
    locations_sort_by_category, set_locations_sort_by_category
  } = useContext(StateDataManager);



  ///pay attention to [] !!!!
  const [num_elements, set_num_elements] = useState(0);
  // const [filter_text, set_filter_text] = useState("");

  //const classes = useStyles();

  let items_count = filtered_Locations_list.length || original_Locations_list.length;

  marker.green(`Filter num_elements 1 ${num_elements}`);

  //------------------------------------------------------------------------------
  //          Ssort and category icons handlers
  //------------------------------------------------------------------------------

  const handleRequestSort = event => {

    const is_asc = ('asc' === locations_sort_order);
    marker.red(`handleRequestSort BEFORE
                locations_sort_order = ${locations_sort_order} 
                is_asc                = ${is_asc}\n`);


    set_locations_sort_order(is_asc ? 'desc' : 'asc');


    // Note that here we have to force the new order, cause it wasn't updated yet.
    sortList(filtered_Locations_list, (is_asc ? 'desc' : 'asc'), locations_sort_by_category);

  };


  const handleRequestGroupByCategory = event => {

    const by_category = locations_sort_by_category;

    const is_asc = ('asc' === locations_sort_order);
    marker.red(`handleRequestGroupByCategory BEFORE
                locations_sort_order = ${locations_sort_order} 
                is_asc                = ${is_asc}\n`);


    set_locations_sort_by_category(locations_sort_by_category ? false : true);

    // Note that here we have to force the new order, cause it wasn't updated yet.
    sortList(filtered_Locations_list, locations_sort_order, (by_category ? false : true));

  };



  //------------------------------------------------------------------------------
  //          Sort asc or desc, by category or not
  //------------------------------------------------------------------------------

  const sortList = (curr_filtered_Locations_list, new_order, by_category) => {

    const is_asc = ('asc' === new_order);
    marker.red(`sortList() BEFORE
    locations_sort_order = ${locations_sort_order} 
    new_order            = ${new_order}
    is_asc               = ${is_asc}
    by_category          = ${by_category}\n`);


    console.log(`sortList() BEFORE FilterLocations list `, curr_filtered_Locations_list);

    let filtered_list = curr_filtered_Locations_list;

    // sort the temporary list
    //-------------------------------------------------------------
    filtered_list.sort(
      (a, b) => {
        marker.red(`sortList() a.name "${a.name}" `);
        marker.red(`sortList() b.name "${b.name}" `);
        marker.red(`sortList() result ${((a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (is_asc ? 1 : -1))} `);

        //trim white spaces at satrt and end, it affects sort
        // If compareFunc returns 0 then the elements are treated as equal
        // If compareFunc returns 1 then b is sorted before a
        // If compareFunc returns -1 then a is sorted before b

        let keyA = "", keyB = "";

        if (by_category) {
          keyA = a.category.trim().toLowerCase() + a.name.trim().toLowerCase();
          keyB = b.category.trim().toLowerCase() + b.name.trim().toLowerCase();
        }
        else {
          keyA = a.name.trim().toLowerCase();
          keyB = b.name.trim().toLowerCase();
        }

        if (keyA < keyB) return (-1 * (is_asc ? 1 : -1));
        if (keyA > keyB) return (1 * (is_asc ? 1 : -1));
        return 0;

        // localCompare doesnt seem to work...
        // marker.red(`sortList() result ${(is_asc === 'asc'  ? (a.name.toLowerCase().localeCompare( b.name)) : -( a.name.toLowerCase().localeCompare( b.name))) }`);

        // return ( is_asc === 'asc'  ?  (a.name.toLowerCase().localeCompare( b.name)) : -( a.name.toLowerCase().localeCompare( b.name)) );

        // return ( (a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (is_asc ? 1 : -1) );


      });


    update_Locations_filtered_list(filtered_list);

    console.log(`sortLiat() AFTER FilterLocations filtered_list `, filtered_list);
    console.log(`sortLiat() AFTER FilterLocations filtered_Locations_list `, filtered_Locations_list);


    //===========================
    // a small example to show how sort works:
    //---------------------------------------
    // let users = [
    //   {name: 'Scotty', age: '18'},
    //   {name: 'Tommy', age: '21'},
    //   {name: 'Sally', age: '71'},
    //   {name: 'Billy', age: '18'},
    //   {name: 'Timmy', age: '21'}
    // ];

    // console.log(`sortLiat() users 1 `, users);

    // users.sort((a, b) => {
    //   let keyA = a.age + a.name;
    //   let keyB = b.age + b.name;
    //   if (keyA < keyB) return (-1 * (is_asc ? 1 : -1));
    //   if (keyA > keyB) return (1 * (is_asc ? 1 : -1));
    //   return 0;
    // });

    // console.log(`sortLiat() users 2 `, users);
    //===========================

  };

  marker.blue(`FilterLocations current order = ${locations_sort_order}\n`);
  console.log(`FilterLocations current filtered_Locations_list \n`, filtered_Locations_list);



  //-----------------------------------------------------------------------------
  //      Update the filtered list
  //-----------------------------------------------------------------------------

  const updateFilteredList = event => {
    const txt = event.target.value;

    // set_filter_text(txt);
    set_locations_filter_text(txt);

    const filtered_list = original_Locations_list.filter(item =>
      item.category.toLowerCase().includes(txt.toLowerCase())
    );

    sortList(filtered_list, locations_sort_order, locations_sort_by_category);

    // update_Locations_filtered_list(filtered_list);
    //marker.green(`updateList: num_elements 2 ${num_elements}`);
    set_num_elements(filtered_Locations_list.length);
    // marker.green(`updateList num_elements 3 ${num_elements}`);

    // marker.magenta (`updateList filtered_list.length ${filtered_list.length}`);
  };



  // Update upon original_Locations_list change

  useEffect(() => {

    marker.red(`FilterLocations useEffect() on original_Locations_list\n`);
    console.log(`FilterLocations useEffect() original_Locations_list \n`, original_Locations_list);
    console.log(`FilterLocations useEffect() filtered_Locations_list \n`, filtered_Locations_list);
    marker.red(`FilterLocations useEffect() locations_filter_text ${locations_filter_text}\n`);


    const filtered_list = original_Locations_list.filter(
      item => item.category.toLowerCase().includes(locations_filter_text.toLowerCase())

    );

    sortList(filtered_list, locations_sort_order, locations_sort_by_category);

    set_num_elements(filtered_Locations_list.length);

    console.log(`FilterLocations original_Locations_list  2 `, original_Locations_list);
    console.log(`FilterLocations filtered_Locations_list 2 `, filtered_Locations_list);

  }, [original_Locations_list.length, locations_edited_flag]);


  // Update upon original_Locations_list change

  useEffect(() => {
    const filtered_list = filtered_Locations_list;

    marker.green(`useEffect() sort_order or sort_by_category or filtered_Locations_list length changed\n`);
    marker.green(`locations_sort_order           = ${locations_sort_order} 
                  filtered_Locations_list.length = ${filtered_Locations_list.length}\n`);

    sortList(filtered_list, locations_sort_order, locations_sort_by_category);

    console.log(`useEffect() FilterLocations filtered_Locations_list changed `, filtered_Locations_list);

  }, [locations_sort_order, locations_sort_by_category, filtered_Locations_list.length]);


  //marker.green(`Filter num_elements 4 ${num_elements}`);

  //marker.blue(`items_count 1 ${items_count}`);
  items_count = filtered_Locations_list.length;
  // marker.blue(`items_count 2 ${items_count}`);

  return (

    <Header>
      <Title>{items_count} items filtered</Title>

      {/* <ToolbarTooltip title="Filter list"  */}
      <Tooltip title="Filter list by category"
        placement='bottom-start'
        //placement="top"

        PopperProps={{
          popperOptions: {
            modifiers: {
              offset: {
                enabled: true,
                offset: '9px, 2px',
                // offset: '9px, 9px',
              },
            },
          },
        }}
      >
        <SearchBar >
          <Search style={{ fontSize: 30, }} />
          {/* <FilterList style={{fontSize: 30,}} /> */}
          <Input onChange={updateFilteredList} />
          {/* <TableSortLabel
                active={true}
                direction={order }
                onClick={handleRequestSort}
              /> */}
          {/* <Button variant="contained" color="primary" disableElevation>  </Button>
        */}
        </SearchBar>

      </Tooltip>
      {/* </ToolbarTooltip>  */}

      <ActionsBar>

        <Tooltip title="Sort list alphabetically"  >
          <Fab
            style={{
              background: 'inherit',
              color: `${main_palete_theme.palette.header.text_color}`,
            }}

            variant="contained"
            // className={classes.button}
            // color="darkred" 
            //color= "primary"
            aria-label="sort list"
            onClick={event => handleRequestSort(event)}
            size="small"
          >

            <SortRounded />
            {/* Sort */}
          </Fab>
        </Tooltip>


        <Tooltip title="Sort list by Category"  >
          {/* <IconButton 
                style={{ color: `${main_palete_theme.palette.header.text_color}`, }}  */}
          <Fab
            style={{
              background: 'inherit',
              color: `${main_palete_theme.palette.header.text_color}`,
            }}
            variant="contained"
            // className={classes.button}
            // color="darkred" 
            //color= "primary"
            aria-label="By Category"
            onClick={event => handleRequestGroupByCategory(event)}
            size="small"
          >

            <CategoryRounded />
            {/* By Category */}

          </Fab>
          {/* </IconButton> */}

        </Tooltip>
        {/* </ToolbarTooltip> */}


      </ActionsBar>

    </Header>

  );
};
export default FilterLocations;


//==============================================================================
//            Styling 
//==============================================================================

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    //color: 'darkred',
    color: '#FFF',
    //backgroundColor: '#01579b',
    // backgroundColor: '#039be5',

  },
}));

// const filterLocatios_theme = createMuiTheme({
//   palette: {
//     primary: {
//       main:  '#FFF',//'#8b0000', //'darkred', //'#4caf50',
//     },
//     secondary: {
//       main: '#ff9100',
//     },
//   },

// });

const Header = styled('div')({
  backgroundColor: `${main_palete_theme.palette.header.main}`,
  // backgroundColor: '#01579b',
  // backgroundColor: '#039be5',
  //background: 'lightsalmon',
  // backgroundColor: '#039be5',   

  color: `${main_palete_theme.palette.header.text_color}`,
  // color: '#FFF',  

  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  padding: 'auto',
  borderRadius: '0.4rem 0.4rem 0 0',
  height: '5rem',
  /* height: '9rem', */
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const Title = styled('h4')({
  fontFamily: "Expletus Sans",
  textAlign: 'left',
  /* fontSize: '2rem', */
  fontSize: '1.3rem',
  fontWeight: 400,
  //color: `${main_palete_theme.palette.header.text_color}`,
  //color:  '#FFF', //'darkred',
});

const Input = styled('input')({
  height: '1.75rem',
  /* height: 3.5rem, */
  width: '24rem',
  outline: 'none',
  borderRadius: '0.5rem',
  border: 'white 2px solid',
  transition: 'border 0.5s',
  padding: '1rem',

  '&:focus': {
    border: `${main_palete_theme.palette.secondary.main} 2px solid`,
  }
});

const ActionsBar = styled('div')({
  backgroundColor: `${main_palete_theme.palette.header.main}`,
  // backgroundColor: '#01579b',
  // backgroundColor: '#039be5',
  //background: 'lightsalmon',
  // backgroundColor: '#039be5',   

  color: `${main_palete_theme.palette.header.text_color}`,
  //color: '#FFF',

  borderRadius: '0.4rem 0.4rem 0 0',
  height: '5rem',
  width: '16rem',
  /* height: '1.75rem', */
  /* height: '9rem', */
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const SearchBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const ToolbarTooltip = withStyles({
  tooltip: {
    color: `${main_palete_theme.palette.header.text_color}`,
    //backgroundColor: "transparent",
    backgroundColor: `${main_palete_theme.palette.header.main}`,
    fontSize: `1rem`,
  }
})(Tooltip);

/*
const Header = styled.div`
  background: lightsalmon;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 5rem;
  //  height: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h4`
  font-family: "Expletus Sans";
  text-align: left;
  // font-size: 2rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: darkred;
`;

const Input = styled.input`
  height: 1.75rem;
  // height: 3.5rem;
  width: 24rem;
  outline: none;
  border-radius: 0.5rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;

  &:focus {
    border: tomato 2px solid;
  }
`;

const ActionsBar = styled.div`
  background: lightsalmon;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 5rem;
  width: 16rem;
  // height: 1.75rem;
  // height: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: space-around;
`;
*/
/*
return (
  <div className="header">
    <h4 className="filter_title">{items_count} items filtered</h4>
    <input className="filter" onChange={update_list} />
  </div>
);
*/
