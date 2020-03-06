import React, {  forwardRef,} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import main_palete_theme from '../../style.lib/PalleteStyles';
import { palette, spacing } from '@material-ui/system';
//import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';

import {
  AddLocationRounded,
  AddBox ,
  ArrowDownward ,
  Check  ,
  ChevronLeft ,
  ChevronRight ,
  Clear ,
  DeleteOutline ,
  Edit ,
  FilterList,
  FirstPage ,
  LastPage ,
  Remove ,
  SaveAlt ,
  Search,
  ViewColumn,
} from '@material-ui/icons/';



const LocationsMenu = () => {
  
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddLocationRounded {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

return(
  <Nav>
    <li>
      <StyledLink to="/locations"> <ChevronRight/> View</StyledLink>
    </li>   
     <li>
      <StyledLink to="/locations/add"> <AddLocationRounded/> Add</StyledLink>
    </li>
    <li>
      <StyledLink to="/locations/edit"> <Edit/> Edit</StyledLink>
    </li>
    <li>
      <StyledLink to="/locations/remove"> <DeleteOutline/> Remove</StyledLink>
    </li>

  </Nav>
);
}

export default LocationsMenu;

//Extending React Link
const StyledLink = styled(Link)`
 ${spacing} 
  /* color: #263238;  */
  /* color: mintcream; */
  color:  ${main_palete_theme.palette.top_menu.text_color};  
  /* color:  ${main_palete_theme.palette.top_menu.text_color_light};  */
  /* color:${main_palete_theme.palette.top_menu.text_color_dark}; */
  
  font-family: "Expletus Sans";
  /* font-family: "Yanone Kaffeesatz";  */
  /* font-family: "Griffy", cursive; */
  
  /* font-size: 1.3rem; */
  font-size: 1.2rem;

  font-weight: bold; 
  /* font-weight: 400; */
  /* font-weight: normal; */ 
  /* font-weight: 500; */

  letter-spacing: 1px;
  
  display: flex;  
  justify-content: space-between;
`;

const Nav = styled.ul`
  ${spacing} 
  list-style-type: none;

  /* letter-spacing: 1px; */

  /* font-size: 1.3rem;  */
  /* font-size: 2.8rem; */
  /* font-size: 1.2rem;  */

  /* font-weight: normal; */
  /* font-weight: 400; */
  /* font-weight: 500; */

  /* font-family: "Griffy", cursive; */
  /* font-family: "Yanone Kaffeesatz"; */
  /* font-family: "Expletus Sans"; */

  width: 25rem;
  /* width: 18rem; */
  /* width: 15rem; */

  display: flex;  
  justify-content: space-between;
`;
