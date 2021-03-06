import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import main_palete_theme from '../../style.lib/PalleteStyles';
// import styled from "styled-components/macro";
import { styled, makeStyles } from '@material-ui/core/styles';
import marker from '@ajar/marker';


import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Button,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
  Box,
  Tooltip,
} from "@material-ui/core";

import { StateDataManager } from "../../stateProvider/DataManager";
import { wrap } from "module";

const MIN_COORDINATES = -5000.000000;
const MAX_COORDINATES = 5000.000000;
//=================================================================================
//                       Add Location view
//=================================================================================

const ViewLocation = ({ match, history }) => {
  marker.blue(`ViewLocation 
  match    ${match}
  history  ${history}
  `);

  // general apearence rules
  const classes = useStyles();

  // Global context states
  const {
    categories_list,
    original_Locations_list,
    set_original_Locations_list,
    selected_map_location,
    update_selected_map_location,
    selected_location,
    // update_selected_location,
    selected_action,
  } = useContext(StateDataManager);



  // Local state

  // Note: marker.obj prints in alphabetical order not actual order...
  const [new_location, set_new_location] = useState(
    {
      id: selected_location.id, //original_Locations_list.length+1,
      name: selected_location.name, //'',
      address: selected_location.address, //'',
      lat: selected_location.lat, //31.776847698411576, 
      lng: selected_location.lng, //35.20543098449707, 
      category: selected_location.category, //categories_list[0].name,
    }
  );

  //   const [new_location, set_new_location] = useState({
  //     id: original_Locations_list.length+1,
  //     name: '',
  //     address: '',
  //     lat: 31.776847698411576, 
  //     lng: 35.20543098449707, 
  //     category: categories_list[0].name,
  //   });   

  const [errors, set_errors] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    category: '',
    validation: '',
  });

  //const [validation_success, set_validation_success] = useState(true);
  const [submitting, set_submitting] = useState('IDLE');
  const [submit_text, set_submit_text] = useState('');
  const [tooltip_open, set_tooltip_open] = useState(false);

  let validation_success = true;
  // let submitting = 'IDLE';


  marker.blue(`ViewLocation selected_location 
  id  ${selected_location.id}
  name  ${selected_location.name}
  address  ${selected_location.address}
  lat  ${selected_location.lat}
  lng:  ${selected_location.lng}
  category  ${selected_location.category}
  `);

  marker.blue(`ViewLocation new_location 
  id  ${new_location.id}
  name  ${new_location.name}
  address  ${new_location.address}
  lat  ${new_location.lat}
  lng:  ${new_location.lng}
  category  ${new_location.category}
  `);


  /*
    
    Choose onChange(): If you need latest state immediately after input change, for example:
    Search suggestion after each input (like Google search box)
    Then Validating input after every change

    Choose onBlur(): If you only need the latest state at the end of final input, for example:
    Every change triggers a fetch event that checks if entered username or email exists

    Your user filled all 3 registration inputs (name, password, email), but after the last   email input s/he directly click the send button (which is fired your signup method without updated email state). Since setState is asynchronous and not updated email state yet, you   might have problems about null email inputs.

    So, my unofficial suggestion is that, use onChange whenever you possible, use onBlur whenever you need.
  */


  // On Mounting

  useEffect(() => {

    marker.blue(`ViewLocation useEffect on mount before\n`);

    marker.blue(`ViewLocation useEffect selected_map_location: 
      address  ${selected_map_location.address}
      lat  ${selected_map_location.lat}
      lng  ${selected_map_location.lng}    
    `);

    marker.blue(`ViewLocation useEffect new_location
    address  ${new_location.address}
    lat  ${new_location.lat}
    lng:  ${new_location.lng}`);


    set_new_location(({
      ...new_location,
      id: selected_location.id, //original_Locations_list.length+1,
      name: selected_location.name, //'',
      address: selected_location.address, //'',
      lat: selected_location.lat, //31.776847698411576, 
      lng: selected_location.lng, //35.20543098449707, 
      category: selected_location.category,
    }));


  }, []);


  // Update upon selected_map_location change


  useEffect(() => {

    set_new_location(({
      ...new_location,
      // id: ((original_Locations_list.length) + 1),
      address: selected_map_location.address,
      lat: selected_map_location.lat,
      lng: selected_map_location.lng,
    }));

    marker.green(`ViewLocation useEffect on selected_map_location CHANGE\n`);

    marker.green(`ViewLocation useEffect selected_map_location: 
    address  ${selected_map_location.address}
    lat  ${selected_map_location.lat}
    lng  ${selected_map_location.lng}    
  `);

    marker.green(`ViewLocation useEffect new_location
  address  ${new_location.address}
  lat  ${new_location.lat}
  lng:  ${new_location.lng}`);

  }, [selected_map_location]);



  // Update upon selected_location change

  useEffect(() => {

    marker.green(`ViewLocation useEffect on selected_map_location before\n`);

    marker.green(`ViewLocation useEffect selected_map_location: 
    id  ${selected_location.id}
    name  ${selected_location.name}
    address  ${selected_location.address}
    lat  ${selected_location.lat}
    lng:  ${selected_location.lng}
    category  ${selected_location.category}
    `);

    marker.green(`ViewLocation useEffect new_location
    id  ${new_location.id}
    name  ${new_location.name}
    address  ${new_location.address}
    lat  ${new_location.lat}
    lng:  ${new_location.lng}
    category  ${new_location.category}

    `);


    set_new_location(({
      ...new_location,
      id: selected_location.id,
      name: selected_location.name,
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
      category: selected_location.category,
    }));

    update_selected_map_location({
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
    });

  }, [selected_location]);




  marker.green(`ViewLocation selected_map_location CURRENT\n`);

  marker.green(`ViewLocation selected_map_location: 
    address  ${selected_map_location.address}
    lat  ${selected_map_location.lat}
    lng  ${selected_map_location.lng}    
  `);

  marker.green(`ViewLocation new_location CURRENT
  address  ${new_location.address}
  lat  ${new_location.lat}
  lng:  ${new_location.lng}`);



  // Validating input after every change
  const handleChange = event => {

    try {
      const { name, value } = event.target; // destructure properties
      marker.green(`handleChange event.target ${name} = ${value}`);

      // do not disable it or u wont see any thing on screen and on related field
      set_new_location(({ ...new_location, [name]: value, }));

    } catch (err) {
      marker.red(`handleChange caugt exception: ${err.message}`);
    }
    marker.obj(new_location, `handleChange Updated new_location`);

  };



  //      Handle exit from field
  //------------------------------------
  const handleBlur = event => {

    marker.i(`ViewLocation handleBlur`);


    try {
      let error_msg = '';

      const { name, value } = event.target; // destructure properties
      marker.magenta(`handleBlur 1 event.target ${name} = ${value}`);

      let validValue = ((value !== ``) && (value !== 'undefined') && (value !== null));
      marker.magenta(`handleBlur 2 event.target ${name} ${value}`);

      if ((name === 'lat') || (name === 'lng')) {
        marker.red(`handleBlur 3 field ${name} ${value} `);

        if ((value <= MIN_COORDINATES) || (value >= MAX_COORDINATES)) {
          validValue = false;
          set_new_location(({ ...new_location, [name]: '', }));

          marker.red(`handleBlur 4 ${name}  validValue ${validValue} `);
        }
      }

      let found = false;
      marker.red(`handleBlur 5 found ${found} `);
      marker.blue(`handleCBlur 6  ${name} = ${value}`);

      // handlse name validation
      if (validValue && (name === 'name')) {
        marker.magenta(`handleCBlur 7  ${name} = ${value}`);

        // find if name exists in locations list
        marker.obj(original_Locations_list, `handleBlur original_Locations_list `);

        var exists = (element) => {
          marker.obj(element, `element `);
          marker.green(`value: ${value}`);
          // checks whether an element is even
          return element.name === value;
        };

        found = original_Locations_list.some(exists);
        marker.green(`handleBlur SOME nameFound: ${found}`);


        // found = findIfNameExists(value);
        // marker.red(`handleBlur found after search ${found} `);   

        if (found) {
          marker.red(`Location name ${value} already exists. `);

          error_msg = `Location name ${value} already exists. `;
          //set_errors({...errors, [ name ]: `Location name ${value} already exists`}); 
          set_new_location(({ ...new_location, [name]: '', }));
        }
        else {
          marker.red(`Location name ${value} does not exist. `);
          error_msg = '';
          //set_errors({name: ``});                
        }
      }

      if (!validValue) {
        error_msg = 'Empty field or Invalid value. ';
        marker.red(`error_msg ${error_msg} `);
      }

      marker.red(`exists ${found} `);
      marker.red(`handleBlur 2  validValue ${validValue} `);

      if (!found && validValue) {
        marker.green(`!found && validValue ${found} ${validValue}`);
        // do not disable it
        set_new_location(({ ...new_location, [name]: value, }));
        error_msg = '';
      }
      marker.red(`set_errors error_msg ${error_msg} `);
      set_errors({ ...errors, [name]: error_msg });

    } catch (err) {
      marker.red(`handleCBlure caugt exception: ${err.message}`);
    }
    marker.obj(new_location, `handleBlur Updated new_location`);
    marker.obj(errors, `handleBlur Updated errors`);

  };

  //-------------------------------- 
  //  Form validateion
  //--------------------------------   

  const validateField = field => {
    let validName = ((new_location[field] !== ``) && (new_location[field] !== 'undefined') && (new_location[field] !== null));

    if ((field === 'lat') || (field === 'lng')) {
      validName = validName && (!Number.isNaN(new_location[field]))
        && (new_location[field] >= MIN_COORDINATES)
        && (new_location[field] <= MAX_COORDINATES);
    }


    if (!validName) {
      set_errors({ ...errors, [field]: `Location ${field} is empty.` });
    }

    return validName;
  }

  const validateForm = () => {
    try {
      const nameFound = validateNameExists();
      const validName = validateField('name') && !nameFound;
      marker.red(`validateForm nameFound ${nameFound} validName ${validName}`);

      const validAddress = validateField('address');
      const validLat = validateField('lat');
      const validLng = validateField('lng');
      const validCategory = validateField('category');

      marker.obj(errors, `validateForm errors 1`);

      if (validName && validAddress && validLat && validLng && validCategory
        && !errors.name && !errors.address && !errors.coordinate_lat
        && !errors.coordinate_lng && !errors.category) {

        validation_success = true;// set_validation_success(true);
        set_errors({ ...errors, validation: `` });

        marker.green(`validateForm validation_success ${validation_success}`);
        marker.obj(new_location, `validateForm new_location`);
        marker.obj(errors, `validateForm errors 2`);
      }
      else {
        validation_success = false;
        marker.red(`validateForm validation_success ${validation_success}`);
        //set_errors({...errors, validation:`Validation Error`}); 
      }

    } catch (err) {
      validation_success = false; //set_validation_success(false);
      set_errors({ ...errors, validation: `Validation Error.` });
      marker.red(`validateForm caugt exception: ${err.message}`);
    }
    marker.obj(new_location, `validateForm Updated new_location`);

  }

  //====================================================================
  // Submitting Sub actions
  //====================================================================

  //const addLoaction = ({ match, history }) => {
  const addLoaction = () => {
    set_original_Locations_list([...original_Locations_list, new_location]);

    marker.obj(new_location, `handleSubmit Update new_location 2`);
    marker.obj(original_Locations_list, `handleSubmit original_Locations_list 2`);

    // alert(`Lcation ${new_location.name} was added succesfully`);
    set_submitting('END');
    marker.red('ViewLocation handleSubmit completed ' + submitting);


    // original_Locations_list is in the prev state yet, so increment by 2
    set_new_location((
      {
        ...new_location,
        id: (original_Locations_list.length + 2),
        name: selected_location.name, //'', 
        address: selected_location.address, // '', 
        lat: selected_location.lat, //31.776847698411576, 
        lng: selected_location.lng, //35.20543098449707, 
      }));

  }


  const validateNameExists = () => {

    marker.i(`ViewLocation validateName`);
    let found = false;
    let validValue = false;
    let error_msg = '';

    try {

      const value = new_location.name; // destructure properties

      validValue = ((value !== ``) && (value !== 'undefined') && (value !== null));


      marker.red(`validateName 1 found ${found} validValue ${validValue} `);

      // handlse name validation
      if (validValue) {
        marker.magenta(`validateName 2  ${value} is valid, `);

        // find if name exists in locations list
        marker.obj(original_Locations_list, `handleBlur original_Locations_list `);

        var exists = (element) => {
          marker.obj(element, `element `);
          marker.green(`value: ${value}`);
          // checks whether an element is even
          return element.name === value;
        };

        found = original_Locations_list.some(exists);
        marker.green(`validateName SOME nameFound: ${found}`);

        // found = findIfNameExists(value);
        // marker.red(`handleBlur found after search ${found} `);   

        if (found) {
          marker.red(`validateName Location name ${value} already exists. `);

          error_msg = `Location name ${value} already exists. `;
          //set_errors({...errors, [ name ]: `Location name ${value} already exists`}); 
          set_new_location(({ ...new_location, name: '', }));
        }
        else {
          marker.red(`Location name ${value} does not exist. `);
          error_msg = '';
          //set_errors({name: ``});                
        }
      }

      if (!validValue) {
        error_msg = 'Empty field or Invalid value. ';
        marker.red(`error_msg ${error_msg} `);
      }

      marker.red(`exists ${found} `);
      marker.red(`validateName 3  validValue ${validValue} `);

      if (!found && validValue) {
        marker.green(`validateName 4 !found && validValue ${found} ${validValue}`);
        error_msg = '';
      }
      // marker.red(`set_errors error_msg ${error_msg} `);  
      set_errors({ ...errors, name: error_msg });

    } catch (err) {
      marker.red(`validateName 6 caugt exception: ${err.message}`);
    }

    marker.green(`validateName 5 found && validValue ${found} ${validValue}`);
    return (found);

  };


  // const findIfNameExists = (value) => {
  //     marker.green(`findIfNameExists value= ${value}`);   

  //     const names_list = original_Locations_list.map( item => item.name );
  //     marker.green( `handleBlur list: ${names_list}` );
  //     const found1 =  names_list.includes(value); //('Demo Location');

  //     marker.green(`find result ${found1}`);
  //     return found1;
  //   };


  //==========================================================================

  marker.red(`ViewLocation submitting ${submitting}  ${submit_text}`);

  //------------------------------------------------
  //          SUBMIT
  //------------------------------------------------

  const handleSubmit = event => {
    event.preventDefault();// prevent form post
    // submitting = 'START'; 
    set_submitting('START');

    marker.red('ViewLocation handleSubmit start ' + submitting);
    marker.green('ViewLocation handleSubmit original_Locations_list.length ' + original_Locations_list.length);

    validateForm();

    if (true === validation_success) {
      marker.obj(new_location, `handleSubmit Update new_location 1`);
      marker.obj(original_Locations_list, `handleSubmit original_Locations_list 1`);


      marker.red('ViewLocation handleSubmit ADD validName ');
      set_new_location((
        {
          ...new_location,
          id: (original_Locations_list.length + 2),
        }));

      addLoaction();
      event.stopPropagation();
      //history.goBack(); //back to list view


      //   set_original_Locations_list( [...original_Locations_list, new_location]);

      //   marker.obj( new_location , `handleSubmit Update new_location 2` );
      //   marker.obj( original_Locations_list , `handleSubmit original_Locations_list 2` );

      //  // alert(`Lcation ${new_location.name} was added succesfully`);
      //  set_submitting('END');
      //  marker.red('ViewLocation handleSubmit completed '+ submitting );


      //   // original_Locations_list is in the prev state yet, so increment by 2
      //   set_new_location( ( 
      //     {...new_location, 
      //        id: (original_Locations_list.length +2),
      //       name: '', 
      //       address: '', 
      //       lat: 31.776847698411576, 
      //       lng: 35.20543098449707, 
      //     } )  );  

    }

    setTimeout(() => {
      set_submitting('IDLE'); //set_submitting(false);
      marker.red('ViewLocation handleSubmit end ' + submitting);
    }, 1000);


  }


  marker.obj(new_location, `ViewLocation current new_location`);
  marker.obj(original_Locations_list, `ViewLocation original_Locations_list `);


  //----------------------------------------------------------
  // TODO: refine this one, doesnt show the Submitting new location..
  //----------------------------------------------------------
  useEffect(() => {

    if ('IDLE' === submitting) {
      setTimeout(() => {
        set_submit_text('');
        marker.green(`ViewLocation useEffect ${submit_text}`);
      }, 300);
    }
    if ('START' === submitting) {
      set_submit_text('Submitting location...');
      setTimeout(() => {
        set_submit_text('Submitting location...');
        marker.green(`ViewLocation useEffect end ${submit_text}`);
      }, 20);
      marker.green(`ViewLocation useEffect ${submit_text}`);
    }
    if ('END' === submitting) {
      set_submit_text('Submitted location successfully...');
      setTimeout(() => {
        set_submit_text('Submitted location successfully...');
        marker.green(`ViewLocation useEffect end ${submit_text}`);
      }, 20);
    }
    marker.green(`ViewLocation useEffect submit_text  ${submit_text}`);

  }, [submitting]);




  return (

    <MainBox>
      <FormBox>
        {/* <form style={{ width: "50%" }} onSubmit={handleSubmit} > */}
        <LocationForm onSubmit={handleSubmit} >
          <MainBoxLabel>Selected Location</MainBoxLabel>
          {/* <h1>Selected Location</h1> */}

          <FormControl required margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              value={new_location.name}
              placeholder="e.g: My New cool location 3"
              //onChange={handleChange} 
              //onBlur={handleBlur}
              inputProps={{ readOnly: true }}
            />
          </FormControl>
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <FormControl required margin="normal" fullWidth>
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input
              id="address"
              name="address"
              type="text"
              // disabled="true"
              value={new_location.address}
              // value={selected_map_location.address}                 
              placeholder="e.g: myStreet 3, New York"
              // onChange={handleChange}
              //onBlur={handleBlur}
              inputProps={{ readOnly: true }}
            />
          </FormControl>
          {errors.address && <ErrorText>{errors.address}</ErrorText>}


          {/* <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="address">Type address here</InputLabel>
              <Input id="address" multiline rows={5} />
            </FormControl> */}

          {/* <FormControl margin="normal" fullWidth> */}
          {/* <CoordinatesInputLabel htmlFor="coordinates">Coordinates</CoordinatesInputLabel> */}

          <CoordinatesBox>
            <CoordinatesBoxLabel> Coordinates </CoordinatesBoxLabel>
            <CoordinatesInnerBox>
              {/* <fieldset width="100%"> */}

              <FormControl required margin="normal" width="50%">
                <InputLabel htmlFor="lat">Latitude </InputLabel>
                <CoordinatesInput
                  id="lat"
                  name="lat"
                  type="number"
                  min="MIN_COORDINATES"
                  max="MAX_COORDINATES"
                  value={new_location.lat}
                  // value={selected_map_location.lat}
                  placeholder="-345.1"
                  //onChange={handleChange}
                  //onBlur={handleBlur}
                  inputProps={{ readOnly: true }}
                />
              </FormControl>
              {errors.lat && <ErrorText>{errors.lat}</ErrorText>}

              <FormControl required margin="normal" width="50%">
                <InputLabel htmlFor="lng" >Longitude</InputLabel>

                <CoordinatesInput
                  id="lng"
                  name="lng"
                  type="number"
                  min="MIN_COORDINATES"
                  max="MAX_COORDINATES"
                  value={new_location.lng}
                  // value={selected_map_location.lng} 
                  placeholder="156.76"
                  //onChange={handleChange}
                  // onBlur={handleBlur}
                  inputProps={{ readOnly: true }}
                />
              </FormControl>
              {errors.lng && <ErrorText>{errors.lng}</ErrorText>}

              {/* </fieldset>       */}
            </CoordinatesInnerBox>
          </CoordinatesBox>


          <FormControl margin="normal" fullWidth required  >

            <InputLabel htmlFor="category" id="select-category-label">
              Category
              </InputLabel>

            <Select
              labelId="select-category-label"
              id='category-simple'
              name='category'
              value={new_location.category}
              defaultValue={selected_location.category}
              placeholder="Pick a Category from the list"
              //onChange={handleChange}
              inputProps={{ readOnly: true }}
              autoWidth

            // inputProps={{
            //     name: 'category',
            //     id: 'category-simple',
            // }}
            >
              {categories_list.map(item => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}

              {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}

            </Select>

          </FormControl>


          {errors.category && <ErrorText>{errors.category}</ErrorText>}

        </LocationForm>
      </FormBox>
    </MainBox>

  );

}



export default ViewLocation;

//===============================================================
// local styling
//===============================================================

const toolTipText = `Select an existing category from the list`;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: "sm",
  },
  tooltip: {
    fontSize: 15, //10,
    lineHeight: 25, //16,
    //height: 23, //17,
    // marginTop: 2,
    color: 'blue',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,

  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

// const ModalBox = styled('div')({
//   position: "absolute",
//   background: "#fff",
//   top: 25,
//   left: "10%",
//   right: "10%",
//   padding: 15,
// }); 


const MainBox = styled('div')({

  //height: 'inherit',
  //height: 'fit-content',
  height: '90%',

  // height: '60vh', 
  // maxHeight: '60rem',
  // minHeight: '60vh',

  // width: 'inherit',
  // width: 'fit-content',
  width: 'fit-content(50vw)',
  minWidth: 'inherit',
  maxWidth: 'inherit',

  //width: 'fit-content',
  // minWidth: '32rem', //'35rem',
  //maxWidth: '40vw', //'35rem',

  /*
  height: 'fit-content',
  //  height: '60vh',
  // height: '70vh',
  // maxHeight: '70rem',
  // minHeight: '70vh', 
  // maxHeight: '60rem',
  // minHeight: '60vh',

  width: 'fit-content',
  //   width: '35%',
  minWidth: '32rem', //'35rem',
  maxWidth: '40vw', //'35rem',
  // minWidth: '30rem', //'35rem',
  // maxWidth: '30rem', //'35rem',
*/

  margin: 'auto',
  // // margin: 0,
  // marginLeft: 5,
  // padding: 5,
  // paddingLeft: 10,

  // borderRadius: '0.4rem',
  // borderRadius: '0.8rem',
  // overflowX: 'hidden',
  // overflowY: 'scroll',
  // boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  // flexDirection: 'column',
  alignItems: 'flex-start',
  // alignItems: 'center',

  //justifyContent: 'center',
  justifyContent: 'flex-start',

});

const MainBoxLabel = styled('h2')({
  height: 'fit-content',
  display: 'flex',
  margin: 'auto',
  // margin: 0,
  padding: 0,
});


const FormBox = styled(Box)({
  display: "flex",
  justifyContent: "center",

  // margin: 20,
  /// padding: 20,
  margin: 'auto',
  // marginLeft: 1,
  //paddingLeft: 1,

  height: 'fit-content',
  width: '100%',
});


const LocationForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',

  margin: 'auto',
  //padding: 20,
  padding: '2rem',
  paddingBottom: 5, //20
  // marginTop: '1rem', //10,
  // paddingTop: '1rem', //10,

  height: 'fit-content',
  minHeight: '50vh',
  //width: 'fit-content',
  width: "100%",

});

const CoordinatesBoxLabel = styled(InputLabel)({
  //fontSize: 3,
  fontWeight: 'inherit',
  textAlign: 'center',
  color: 'inherit',
});

const CoordinatesBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  marginTop: 13,//21,    
  paddingTop: 10,
  paddingBottom: 3,
  width: "100%",

  //borderStyle: 'solid',
  //borderColor:'#d1e0e0',

  //font-family: "Expletus Sans";
  textAlign: "left",
  // color: "slategray",

  // fontWeight: 400,
});

const CoordinatesInnerBox = styled(Box)({

  display: 'flex',
  //flexFlow:['noWrap','noWrap','wrap'], 
  flexFlow: 'wrap',
  // flexDirection: ["row", 'row', 'column'],
  flexDirection: 'column',
  justifyContent: 'space-evenly',

  //marginTop: 12,
  marginLeft: 20,

  paddingleft: 20,
  paddingTop: 5,
  paddingBottom: 5,

  // width: "100%",
  width: [1, 1, 1 / 2],
  maxWidth: "sm",
  //font-family: "Expletus Sans";
  textAlign: "left",
  //color: "slategray",
  // fontWeight: 400,


});

const CoordinatesInput = styled(Input)({
  //marginTop: 20,
  marginRight: 10,
  paddingTop: 25,
  // paddingTop: 5,
  paddingleft: 25,
  //paddingRight: 25,
  //flexGrow:0,
  // flexBasis:['40%', '40%', '100%'],
  //width:[1/2, 1/2, 1],
  maxWidth: "xl",
});

const CoordinatesInputLabel = styled(InputLabel)({
  marginRight: 10,
  paddingRight: 15,
});


const SubmitBox = styled('p')({
  display: 'flex',
  justifyContent: "center",
  marginTop: 15, //30
  //marginLeft: 50,
  paddingTop: 15,
});

const ErrorText = styled('h5')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'left',

  margin: 'auto',
  padding: 'auto',
  marginTop: 3,
  //marginLeft: 50,
  paddingTop: 5,

  color: `${main_palete_theme.palette.error.main}`,
  //color: 'red',

  textAlign: 'left',
  wordWrap: 'break-word',
});


const SubmitText = styled('h5')({
  display: 'flex',
  justifyContent: "left",
  marginTop: 3,
  //marginLeft: 50,
  paddingTop: 5,

  // color: 'green',
  color: `${main_palete_theme.palette.success.main}`,

  textAlign: 'left',
});

  // const ToolbarTooltip = withStyles({
  //   // MuiTooltip: {
  //   tooltip: {
  //     color: `${main_palete_theme.palette.header.text_color}`, 
  //     //backgroundColor: "transparent",
  //     backgroundColor: `${main_palete_theme.palette.header.main}`,
  //     fontSize: `0.8rem`,
  //   // }
  //  }
  // })(Tooltip);

/*
const useStyles = makeStyles(theme => ({
  // container: {
  //  display: 'flex',
  //    flexWrap: 'wrap',
  //  maxWidth: "sm",
  // },
  tooltip: {
    fontSize: 10,
    lineHeight: 16,
    heigt: 17,
    // marginTop: 2,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,

  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


// const ModalBox = styled('div')({
//   position: "absolute",
//   background: "#fff",
//   top: 25,
//   left: "10%",
//   right: "10%",
//   padding: 15,
// });


const MainBox = styled('div')({

  //height: 'inherit',
  //height: 'fit-content',
  height: '100%',

  // height: '60vh',
  // maxHeight: '60rem',
  // minHeight: '60vh',

  // width: 'inherit',
  // width: 'fit-content',
  width: 'fit-content(50vw)',
  minWidth: 'inherit',
  maxWidth: 'inherit',

  //width: 'fit-content',
  // minWidth: '32rem', //'35rem',
  //maxWidth: '40vw', //'35rem',

  //   width: '35%',
  // minWidth: '30rem', //'35rem',
  // maxWidth: '30rem', //'35rem',

  // margin: 0,
  margin: 'auto',
  //marginRight: 30,
  // padding: 10,
  // paddingRight: 30,

  // borderRadius: '0.4rem',
  // borderRadius: '0.8rem',
  // overflowX: 'hidden',
  // overflowY: 'scroll',
  // boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  //flexDirection: 'column',
  // alignItems: 'center',   //'flex-start',
  justifyContent: 'center',
  // justifyContent: 'center',
  // // alignItems: 'strech',
  // alignItems: 'flex-start',


});

const MainBoxLabel = styled('h2')({
  height: 'fit-content',
  display: 'flex',
  // flexBasis: '100%',
  margin: 'auto',
  // margin: 0,
  padding: 0,
});

const FormBox = styled(Box)({
  display: "flex",
  //flexBasis: '100%',
  //flexDirection: 'column',
  justifyContent: "center",

  //margin: 20,
  margin: 'auto',
  // marginLeft: 20,
  // paddingLeft: 10,

  height: 'fit-content',
  // height: '50vh',
  // maxHeight: '50vh',
  // minHeight: '50vh',

  // height: '50%',
  // maxHeight: '50vh',
  // minHeight: '50rem',

});

const LocationForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',

  margin: 'auto',
  paddingBottom: 5, //20
  // marginTop: '1rem', //10,
  // paddingTop: '1rem', //10,
  width: 'fit-content',
  // width: "50%",
});

const CoordinatesBoxLabel = styled(InputLabel)({
  //fontSize: 3,
  fontWeight: 'inherit',
  textAlign: 'center',
  color: 'inherit',
});

const CoordinatesBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  marginTop: 13,//21,
  paddingTop: 10,
  paddingBottom: 3,
  width: "100%",

  //borderStyle: 'solid',
  //borderColor:'#d1e0e0',

  //font-family: "Expletus Sans";
  textAlign: "left",
  // color: "slategray",

  // fontWeight: 400,
});

const CoordinatesInnerBox = styled(Box)({

  display: 'flex',
  //flexFlow:['noWrap','noWrap','wrap'],
  flexFlow: 'wrap',
  // flexDirection: ["row", 'row', 'column'],
  flexDirection: 'column',
  justifyContent: 'space-evenly',

  //marginTop: 12,
  marginLeft: 20,

  paddingleft: 20,
  paddingTop: 5,
  paddingBottom: 5,

  // width: "100%",
  width: [1, 1, 1 / 2],
  maxWidth: "sm",
  //font-family: "Expletus Sans";
  textAlign: "left",
  // color: "slategray",
  // fontWeight: 400,


});

const CoordinatesInput = styled(Input)({
  //marginTop: 20,
  marginRight: 10,
  paddingTop: 25,
  // paddingTop: 5,
  paddingleft: 25,
  // paddingRight: 25,
  //flexGrow:0,
  // flexBasis:['40%', '40%', '100%'],
  //width:[1/2, 1/2, 1],
  maxWidth: "xl",
});

const CoordinatesInputLabel = styled(InputLabel)({
  marginRight: 10,
  paddingRight: 15,
});


const SubmitBox = styled('p')({
  display: 'flex',
  justifyContent: "center",
  marginTop: 15, //30
  //marginLeft: 50,
  paddingTop: 15,
});

const ErrorText = styled('h5')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'left',

  margin: 'auto',
  padding: 'auto',
  marginTop: 3,
  //marginLeft: 50,
  paddingTop: 5,

  color: `${main_palete_theme.palette.error.main}`,
  //color: 'red',

  textAlign: 'left',
  wordWrap: 'break-word',
});


const SubmitText = styled('h5')({
  display: 'flex',
  justifyContent: "left",
  marginTop: 3,
  //marginLeft: 50,
  paddingTop: 5,

  // color: 'green',
  color: `${main_palete_theme.palette.success.main}`,

  textAlign: 'left',
});

//const ViewLocation = () => <h1>Create a new Location</h1>;

//const CreateBot = () => <h1 className="create">Create a new Bot!</h1>;
//export default CreateBot;

*/

