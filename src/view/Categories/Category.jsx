import React, { useContext } from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import marker from '@ajar/marker'; 

const Category= ({ name }) => {
  // console.log('name:',name)
  //	console.log('props:',props)

  const [name, set_name] = React.useState({
        name: 'Cat in the Hat',
    });   

  return (
    <Box>
      <TextsBox>
        <Title> {name}  </Title>
      </TextsBox>
    </Box>
  );
};

export default Category;

const Box = styled.div`
  padding: 2rem 2.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: paleturquoise;
    ${Image} {
      box-shadow: 0 0.4rem 1.5rem DimGrey;
      margin-bottom: 3rem;
      padding-bottom: 1rem;
    }
  }

  &:hover {
    background: paleturquoise;
  }
  &:active {
    background: skyblue;
    color: white;
  }
`;

const TextsBox = styled.div`
  padding-left: 2.8rem;
`;

const Title = styled.h1`
  font-family: "Expletus Sans";
  text-align: left;
  /* font-size: 2.8rem; */
  font-size: 1.4rem;
`;

 
