import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

// import styled from "styled-components/macro";
import main_palete_theme from '../../style.lib/PalleteStyles';
import { makeStyles, styled, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
  NativeSelect,
} from "@material-ui/core";

import { StateDataManager } from "../../stateProvider/DataManager";
import * as api from "../../services/StorageService";
// import { wrap } from "module";

const MIN_COORDINATES = -5000.000000;
const MAX_COORDINATES = 5000.000000;
//=================================================================================
//                       Add Location view
//=================================================================================

const AddLocation = () => {
  // const AddLocation = ({ match, history }) => {
  // marker.blue(`AddLocation 
  // match    ${match}
  // history  ${history}
  // `);

  // general apearence rules
  const classes = useStyles();

  // Global context states
  const {
    categories_list,
    original_Locations_list,
    set_original_Locations_list,
    selected_map_location,
    //update_selected_map_location,
    selected_location,
    set_error_message,
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

  let history = useHistory();



  // According to:
  // https://material-ui.com/customization/palette/#example
  const MainTheme = useMemo(
    () => createMuiTheme({
      main_palete_theme
    }),
    [],
  );

  marker.blue(`AddLocation selected_location 
  id  ${selected_location.id}
  name  ${selected_location.name}
  address  ${selected_location.address}
  lat  ${selected_location.lat}
  lng:  ${selected_location.lng}
  category  ${selected_location.category}
  `);

  marker.blue(`AddLocation new_location 
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

    marker.blue(`AddLocation useEffect on mount before\n`);

    marker.blue(`AddLocation useEffect selected_map_location: 
      address  ${selected_map_location.address}
      lat  ${selected_map_location.lat}
      lng  ${selected_map_location.lng}    
    `);

    marker.blue(`AddLocation useEffect new_location
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

    marker.green(`AddLocation useEffect on selected_map_location before\n`);

    marker.green(`AddLocation useEffect selected_map_location: 
      address  ${selected_map_location.address}
      lat  ${selected_map_location.lat}
      lng  ${selected_map_location.lng}    
    `);

    marker.green(`AddLocation useEffect new_location
    address  ${new_location.address}
    lat  ${new_location.lat}
    lng:  ${new_location.lng}`);


    set_new_location(({
      ...new_location,
      id: ((original_Locations_list.length) + 1),
      address: selected_map_location.address,
      lat: selected_map_location.lat,
      lng: selected_map_location.lng,
    }));


  }, [selected_map_location]);


  // Update upon selected_location change

  useEffect(() => {

    marker.green(`AddLocation useEffect on selected_map_location before\n`);

    marker.green(`AddLocation useEffect selected_map_location: 
    id  ${selected_location.id}
    name  ${selected_location.name}
    address  ${selected_location.address}
    lat  ${selected_location.lat}
    lng:  ${selected_location.lng}
    category  ${selected_location.category}
    `);

    marker.green(`AddLocation useEffect new_location
    id  ${new_location.id}
    name  ${new_location.name}
    address  ${new_location.address}
    lat  ${new_location.lat}
    lng:  ${new_location.lng}
    category  ${new_location.category}

    `);


    set_new_location(({
      ...new_location,
      id: ((original_Locations_list.length) + 1),
      name: selected_location.name,
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
      category: selected_location.category,
    }));


  }, [selected_location]);


  marker.green(`AddLocation selected_map_location CURRENT\n`);

  marker.green(`AddLocation selected_map_location: 
    address  ${selected_map_location.address}
    lat  ${selected_map_location.lat}
    lng  ${selected_map_location.lng}    
  `);

  marker.green(`AddLocation new_location CURRENT
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

    marker.i(`AddLocation handleBlur`);


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

  const storeData = async (list_name, list) => {
    try {
      await api.storeListLS(list_name, list);

    } catch (err) {
      set_error_message(err.message);
    }
  }


  //const addLoaction = ({ match, history }) => {
  const addLoaction = () => {
    const new_list = [...original_Locations_list, new_location];
    set_original_Locations_list(new_list);
    storeData('original_Locations_list', new_list);

    marker.obj(new_location, `handleSubmit Update new_location 2`);
    marker.obj(original_Locations_list, `handleSubmit original_Locations_list 2`);

    // alert(`Lcation ${new_location.name} was added succesfully`);
    set_submitting('END');
    marker.red('AddLocation handleSubmit completed ' + submitting);


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

    marker.i(`AddLocation validateName`);
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

  marker.red(`AddLocation submitting ${submitting}  ${submit_text}`);

  //------------------------------------------------
  //          SUBMIT
  //------------------------------------------------

  const handleSubmit = event => {
    event.preventDefault();// prevent form post
    // submitting = 'START'; 
    set_submitting('START');

    marker.red('AddLocation handleSubmit start ' + submitting);
    marker.green('AddLocation handleSubmit original_Locations_list.length ' + original_Locations_list.length);

    validateForm();

    if (true === validation_success) {
      marker.obj(new_location, `handleSubmit Update new_location 1`);
      marker.obj(original_Locations_list, `handleSubmit original_Locations_list 1`);


      marker.red('AddLocation handleSubmit ADD validName ');
      set_new_location((
        {
          ...new_location,
          id: (original_Locations_list.length + 2),
        }));

      addLoaction();


      //   set_original_Locations_list( [...original_Locations_list, new_location]);

      //   marker.obj( new_location , `handleSubmit Update new_location 2` );
      //   marker.obj( original_Locations_list , `handleSubmit original_Locations_list 2` );

      //  // alert(`Lcation ${new_location.name} was added succesfully`);
      //  set_submitting('END');
      //  marker.red('AddLocation handleSubmit completed '+ submitting );


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
      marker.red('AddLocation handleSubmit end ' + submitting);
    }, 1000);


    event.stopPropagation();
    //history.goBack(); //back to list view
    history.push("/locations");


  }


  marker.obj(new_location, `AddLocation current new_location`);
  marker.obj(original_Locations_list, `AddLocation original_Locations_list `);


  //----------------------------------------------------------
  // TODO: refine this one, doesnt show the Submitting new location..
  //----------------------------------------------------------
  useEffect(() => {

    if ('IDLE' === submitting) {
      setTimeout(() => {
        set_submit_text('');
        marker.green(`AddLocation useEffect ${submit_text}`);
      }, 300);
    }
    if ('START' === submitting) {
      set_submit_text('Submitting location...');
      setTimeout(() => {
        set_submit_text('Submitting location...');
        marker.green(`AddLocation useEffect end ${submit_text}`);
      }, 20);
      marker.green(`AddLocation useEffect ${submit_text}`);
    }
    if ('END' === submitting) {
      set_submit_text('Submitted location successfully...');
      setTimeout(() => {
        set_submit_text('Submitted location successfully...');
        marker.green(`AddLocation useEffect end ${submit_text}`);
      }, 20);
    }
    marker.green(`AddLocation useEffect submit_text  ${submit_text}`);

  }, [submitting]);




  return (



    <MainBox>
      <FormBox>
        {/* <form style={{ width: "50%" }} onSubmit={handleSubmit} > */}
        <LocationForm onSubmit={handleSubmit} >
          {/* <MainBoxLabel>Add Location</MainBoxLabel> */}
          <h1>Add Location</h1>

          <FormControl required margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              value={new_location.name}
              placeholder="e.g: My New cool location 3"
              onChange={handleChange}
              onBlur={handleBlur}
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
              onChange={handleChange}
              onBlur={handleBlur}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {errors.lng && <ErrorText>{errors.lng}</ErrorText>}

              {/* </fieldset>       */}
            </CoordinatesInnerBox>
          </CoordinatesBox>

          <Tooltip title={toolTipText} open={tooltip_open}   >
            <FormControl margin="normal" fullWidth required>

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
                autoWidth

                onChange={handleChange}
                onMouseEnter={() => set_tooltip_open(true)}
                onMouseLeave={() => set_tooltip_open(false)}
                onClick={() => set_tooltip_open(false)}
                onOpen={() => set_tooltip_open(false)}

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
              <FormHelperText>required</FormHelperText>
            </FormControl>
          </Tooltip>


          {errors.category && <ErrorText>{errors.category}</ErrorText>}

          <SubmitText> {submit_text} </SubmitText>

          <SubmitBox>
            <Button
              disabled={
                (
                  errors.name === '' && errors.address === '' && errors.lat === ''
                  && errors.lng === '' && errors.category === ''
                  && errors.validation === ''
                  && submitting === 'IDLE'
                  && validation_success === true
                ) ? false : true
              }
              variant="contained" color="primary" size="medium" margin="40px" type="submit"   >
              Submit
                </Button>
          </SubmitBox>
          {/* <button type="submit" >Add</button> */}
          {/* <button type="button"  onClick={reset}>  Clear Values   </button> */}
          {/* props: {
                color?: PropTypes.Color;
                disableFocusRipple?: boolean;
                fullWidth?: boolean;
                href?: string;
                size?: "small" | "medium" | "large";
                variant?: "text" | "outlined" | "contained";
            */}
        </LocationForm>
      </FormBox>
    </MainBox>




  );

}



export default AddLocation;

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

  margin: 'auto',
  // margin: 0,
  marginLeft: 30,
  padding: 10,
  paddingLeft: 10,

  // borderRadius: '0.4rem',
  // borderRadius: '0.8rem',
  // overflowX: 'hidden',
  // overflowY: 'scroll',
  // boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',   //'flex-start', 
  justifyContent: 'center',   //'flex-start', 
});

const MainBoxLabel = styled('h1')({
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
  // padding: 20,
  margin: 'auto',
  marginLeft: 20,
  paddingLeft: 10,

  height: 'fit-content',
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
  justifyContent: 'space-even',

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

//const AddLocation = () => <h1>Create a new Location</h1>;

//const CreateBot = () => <h1 className="create">Create a new Bot!</h1>;
//export default CreateBot;



