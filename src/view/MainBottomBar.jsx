import React from "react";
import { Link } from "react-router-dom";
//import styled from "styled-components";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlaceIcon from '@material-ui/icons/Place';
import CategoryIcon from '@material-ui/icons/Category';



const useStyles = makeStyles({

  BottomNavigation: {

    display: "flex",
    justifyContent: "center",
    // margin: 20,
    // padding: 20,

    width: '100%',
    minWidth: '100vw',
    maxWidth: '100%',
    //maxWidth: '35rem',

    height: 40,
    fontSize: "120rem",
    htmlFontSize: "1rem",
    fontfamily: "Yanone Kaffeesatz",
    fontweight: 400,
    position: "fixed",
    bottom: 0,
    left: 0,
  },
  icon: {
    fontsize: "30rem",
    textSizeAdjust: "auto",
    fontweight: "normal",
    cursor: "pointer",
  },

  actionButtonLabel: {
    fontSize: "14px",
  }

});

const MainBottomBar = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }


  return (

    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.BottomNavigation}
    >

      <BottomNavigationAction
        component={Link}
        to="/categories"
        label={<span className={classes.actionButtonLabel} >Categories</span>} //"Categories" 
        value="categories"
        icon={<CategoryIcon />}
      // classes={actionClasses} 
      //className={classes.icon} 
      />
      <BottomNavigationAction
        component={Link}
        to="/locations"
        label={<span className={classes.actionButtonLabel} >Locations</span>} //"Locations"
        value="locations"
        icon={<PlaceIcon />}
      // classes={actionClasses}
      //className={classes.icon} 
      />

    </BottomNavigation>

  );
}

export default withStyles(useStyles)(MainBottomBar);


/*
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20,
        width: "100rem",
      }}
        */

    //   label={<span style={{fontSize: '14px'}}>Categories</span>} //"Categories" 