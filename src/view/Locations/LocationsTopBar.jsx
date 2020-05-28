import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled, { keyframes } from "styled-components";

import main_palete_theme from '../../style.lib/PalleteStyles';

// import { makeStyles, styled , keyframes} from '@material-ui/core/styles';
import { palette, spacing } from '@material-ui/system';
//import NoSsr from '@material-ui/core/NoSsr';
//import marker from '@ajar/marker'; 


// the children is the <Menu /> in App.js inside the  <TopBar> </TopBar>
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DO NOT ENVELOPE WITH A  <router></router> 
// THAT WILL OPEN A NEW ROUTER AND ALL 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const LocationsTopBar = ({ children }) => (
  <Box>
    <Text>{children}</Text>
    <Logo src="/icons/logo.svg" alt="logo" />
  </Box>

);

export default LocationsTopBar;

//================================================
//  Styling
//================================================


const Box = styled.div`
  /* ${palette}*/
  /* ${spacing}  */
    background:  ${main_palete_theme.palette.top_menu.main};  
  /* background: #00e676; */ 
  /* slategray; */

  /* width: 100%; */
  /* height: 100%;  */
  /* height: 50px; */
  height: inherit;
  /* 70px; */

  /* width: 70rem; */
  width: inherit;

  padding: 20px;
 
  /* position: fixed;
  top: 2;
  left: 12; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  
`;


const Text = styled.h1`
  cursor: pointer;
  user-select: none;
  position: relative;

  height: inherit;
  /* font-size: 3rem;
  line-height: 4rem; */
  font-size: 1.5rem;
  line-height:1.8rem; 
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  /* ${palette} */
  /* ${spacing} */
  /* height: 5rem; */
  
  height: inherit;

  animation: ${spin} 2s linear infinite;

  @media(max-width:460px) {
    display: none;
  };
`;



//https://material-ui.com/system/basics/

// Mesting Selectors https://material-ui.com/styles/basics/
// const useStyles = makeStyles({
//   root: {
//     padding: 16,
//     color: 'red',
//     '& p': {
//       color: 'green',
//       '& span': {
//         color: 'blue'
//       }
//     }
//   },
// });

/*
import React from "react";
import styled, { keyframes } from "styled-components/macro";

// the children is the <Menu /> in App.js inside the  <TopBar> </TopBar>
const TopBar = ({ children }) => (
  <Box>
    <Text>{children}</Text>
    <Logo src="/icons/logo.svg" alt="logo" />
  </Box>
);

export default TopBar;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Logo = styled.img`
  height: 5rem;
  animation: ${spin} 2s linear infinite;
`;

const Box = styled.div`
  background: slategray;
  width: 100%;
  height: 70px;
  padding: 20px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.h1`
  // font-size: 3rem;
  font-size: 1px;
  font-weight: normal;
  font-family: "Griffy", cursive;
  color: papayawhip;
  cursor: pointer;
  user-select: none;
  position: relative;
`;
*/