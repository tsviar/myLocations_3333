import React, { forwardRef, } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import main_palete_theme from '../../style.lib/PalleteStyles';
import { palette, spacing } from '@material-ui/system';
//import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';

import {
  AddLocationRounded,
  AddLocation,
  AddLocationSharp,
  //AddBox,
  //AddCircleOutline,

  // AddCircle,
  // AddCircleOutline,
  // ArrowDownward,
  // Check,
  // ChevronLeft,
  // ChevronRight,
  // Clear,
  DeleteOutline,
  Edit,
  Info,
  // FilterList,
  // FirstPage,
  // LastPage,
  // Remove,
  // SaveAlt,
  // Search,
  // ViewColumn,
} from '@material-ui/icons/';



const LocationsMenu = () => {

  return (
    <Nav>
      <NavLi>
        <StyledLink to="/locations">
          <IconDiv><Info style={MenuIconStyle} /></IconDiv> <TextDiv>View</TextDiv>
        </StyledLink>
      </NavLi>
      <NavLi>
        <StyledLink to="/locations/add">
          <IconDiv><AddLocationSharp style={MenuIconStyle} /></IconDiv><TextDiv>Add</TextDiv>
        </StyledLink>
      </NavLi>
      <NavLi>
        <StyledLink to="/locations/edit">
          <IconDiv><Edit style={MenuIconStyle} /></IconDiv> <TextDiv>Edit</TextDiv>
        </StyledLink>
      </NavLi>
      <NavLi>
        <StyledLink to="/locations/remove">
          <IconDiv><DeleteOutline style={MenuIconStyle} /></IconDiv> <TextDiv>Remove</TextDiv>
        </StyledLink>
      </NavLi>

    </Nav>
  );
}

export default LocationsMenu;



const Nav = styled.ul`
  /* ${spacing}  */
  list-style-type: none;

  /* Partial list of types 
    list-style-type: disc;
    list-style-type: circle;
    list-style-type: square;
    list-style-type: decimal;
    list-style-type: georgian;
    list-style-type: trad-chinese-informal;
    list-style-type: kannada;
*/

/* <string> value */
/*list-style-type: '-';*/


  /* letter-spacing: 1px; */

  /* font-size: 1.3rem;  */
  /* font-size: 2.8rem; */

  /* font-weight: normal; */
  /* font-weight: 400; */
  /* font-weight: 500; */

  /* font-family: "Griffy", cursive; */
  /* font-family: "Yanone Kaffeesatz"; */
  /* font-family: "Expletus Sans"; */

  height: inherit;
  /* height: 50px; */
  width: inherit;

  margin: auto;
  padding: 0.5rem;
  padding-left: 0;

  display: flex; 
  justify-content: flex-start;
  align-items: center;


    /* minWidth: 80vw; */
    /* width: 25rem; */
    /* width: 18rem; */
    /* width: 15rem; */
  
  @media all and (min-width:360px) {   
    minWidth: 100%;

    padding: 1rem;    

    justify-content: space-evenly;

  };

`;

const NavLi = styled.li`
 height: inherit;
 
`;

//Extending React Link
const StyledLink = styled(Link)`

 /* ${spacing}  */
  /* color: #263238;  */
  /* color: mintcream; */
  color:  ${main_palete_theme.palette.top_menu.text_color};  
  /* color:  ${main_palete_theme.palette.top_menu.text_color_light};  */
  /* color:${main_palete_theme.palette.top_menu.text_color_dark}; */

  /* line-height: 20.0rem;   */
  /* line-height: 1.8rem; */

  /* letter-spacing: 1px; */

  margin: auto;
  margin-left: 0;
  margin-right: 1rem;

  /* padding: 5rem; */
  padding-left: 1rem;
  padding-right: 0;
   
  height: inherit;

  display: flex;  
  justify-content: space-evenly;
 
  

  @media all and (min-width:343px) {  
    
    margin: auto;    
     /* margin-left: 0;
     margin-right: 0; */

     padding: 0.25rem;

     /* padding-left: 0;
     padding-right: 0; */
     
  };

`;

const IconDiv = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;

  height: inherit;

`;

const MenuIconStyle = {
  fontSize: "1.6rem",
  lineHeight: '1.8rem',

};

const TextDiv = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;

    
  font-family: "Expletus Sans";
  /* font-family: "Yanone Kaffeesatz";  */
  /* font-family: "Griffy", cursive; */
  
/* 
  font-size: 1.2rem;
  line-height: 1.2rem; */
  font-size: 1.5rem;
  line-height:1.8rem; 

  font-weight: bold; 
  /* font-weight: 400; */
  /* font-weight: normal; */ 
  /* font-weight: 500; */

  letter-spacing: 1.5px;

 color: inherit;

 height: inherit;

  @media(max-width:342px) {
    display: none;
  };

`;