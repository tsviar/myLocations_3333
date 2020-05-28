import React from "react";
// import Thumb from "../Thumb";

import main_palete_theme from '../../style.lib/PalleteStyles';

// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';
import marker from '@ajar/marker';

const Location = ({ id, name, address, lat, lng, category }) => {
  // console.log('name:',name)
  //	console.log('props:',props)
  // coordinates = {
  //   lat: -34.397,
  //   lng: 150.644
  // };

  return (
    <Box>
      <TextsBox>
        <Title>{name}</Title>
        <Title2> Category: {category} </Title2>
        <MsgText>{address} </MsgText>
        {/* <MsgText><em>( lat ) </em> {lat} </MsgText> */}
        {/* <MsgText><em>( lng ) </em> {lng} </MsgText> */}

      </TextsBox>
    </Box>
  );
};

export default Location;


const Box = styled('div')({
  //padding: '2rem 0.8rem', //t+b, r+l
  padding: '1rem 0.8rem', //t+b, r+l
  // padding: '2rem 2.8rem',
  cursor: 'pointer',

  //display: 'flex',
  // alignItems: 'center',

  '&:hover': {
    // background: 'paleturquoise',
    background: `${main_palete_theme.palette.table_row_style.selected}`,
  },
  '&:active': {
    // background: 'skyblue',
    background: `${main_palete_theme.palette.table_row_style.selected}`,
    color: 'white',
    color: `${main_palete_theme.palette.secondary.main}`,
  },
});

const TextsBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  alignItems: 'space-between',
  //paddingLeft: '2.8rem',
});

const Title = styled('h1')({
  fontFamily: 'Expletus Sans',
  textAlign: 'left',
  // font-size: '2.8rem', 
  fontSize: '1.4rem',
});

const Title2 = styled('h3')({
  fontFamily: 'Expletus Sans',
  textAlign: 'left',
  // font-size: '2.8rem', 
  fontSize: '1.1rem',

  // '@media (orientation: portrait) and (max-device-width:414px)': {
  //   display: 'none',

  // },
});

const MsgText = styled('p')({

  color: `${main_palete_theme.palette.info.vdark}`,

  //mixBlendMode: 'difference',
  //mixBlendMode: 'hard-light',
  // mixBlendMode: 'soft-light',
  // mixBlendMode: 'normal',

  fontSize: 'calc(1.1rem + (2.0 - 1.1) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.2rem + (1.2 - 1.0) * ((100vw - 300px) / (1600 - 300)))',
  //fontSize: '1.0rem',




  textAlign: 'left',
  fontFamily: 'Raleway',

  // font-size: '1.4rem',
  maxWidth: 'fit-content', //'45rem',

  //Pixel 2 , 2 XL (411px)
  // '@media (max-device-width:800px)': {
  //   display: 'none',
  // },

});

