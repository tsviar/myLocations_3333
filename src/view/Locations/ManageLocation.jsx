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

const ManageLocation = (props) => {
  // const ManageLocation Add = ({ match, history }) => {
  // marker.blue(`ManageLocation Add 
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
    update_selected_map_location,
    selected_location,
    update_selected_location,
    locations_edited_flag,
    set_locations_edited_flag,
    set_error_message,
    // selected_action,
  } = useContext(StateDataManager);


  const action_req = props.action;

  marker.blue(`ManageLocation action_req ${action_req} `);
  console.log("props ", props);

  //<Welcome action="Add" />

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
  // const MainTheme = useMemo(
  //   () => createMuiTheme({
  //     main_palete_theme
  //   }),
  //   [],
  // );

  marker.blue(`ManageLocation selected_location 
  id  ${selected_location.id}
  name  ${selected_location.name}
  address  ${selected_location.address}
  lat  ${selected_location.lat}
  lng:  ${selected_location.lng}
  category  ${selected_location.category}
  `);

  marker.blue(`ManageLocation new_location 
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
    /*
        marker.blue(`ManageLocation  ${action_req} useEffect ON Mount before\n`);
    
        marker.blue(`ManageLocation  ${action_req} useEffect selected_map_location: 
          address  ${selected_map_location.address}
          lat  ${selected_map_location.lat}
          lng  ${selected_map_location.lng}    
        `);
    
        marker.blue(`ManageLocation  ${action_req} useEffect ON Mount new_location
        address  ${new_location.address}
        lat  ${new_location.lat}
        lng:  ${new_location.lng}`);
    */

    set_new_location(({
      //...new_location,
      id: ("Add" === action_req) ? ((original_Locations_list.length) + 1) : selected_location.id,
      // id: selected_location.id, //original_Locations_list.length+1,
      name: selected_location.name, //'',
      address: selected_location.address, //'',
      lat: selected_location.lat, //31.776847698411576, 
      lng: selected_location.lng, //35.20543098449707, 
      category: selected_location.category,
    }));


    marker.blue(`ManageLocation  ${action_req} ON Mount new_location:  
      id ${new_location.id}
      name ${new_location.name}
      address ${new_location.address}
      lat  ${new_location.lat}
      lng  ${new_location.lng}
      category: ${new_location.category}
      ` );

    marker.blue(`ManageLocation  ${action_req} ON Mount selected_location :  
      id ${selected_location.id}
      name ${selected_location.name}
      address ${selected_location.address}
      lat  ${selected_location.lat}
      lng  ${selected_location.lng}
      category: ${selected_location.category}
      ` );

  }, []);


  // Update upon selected_map_location change

  useEffect(() => {

    const curr_id = ("Add" === action_req) ? ((original_Locations_list.length) + 1) : selected_location.id;

    set_new_location(({
      ...new_location,
      id: ("Add" === action_req) ? ((original_Locations_list.length) + 1) : selected_location.id,
      //  id: ((original_Locations_list.length) + 1),
      address: selected_map_location.address,
      lat: selected_map_location.lat,
      lng: selected_map_location.lng,
    }));


    marker.green(`ManageLocation ${action_req} useEffect on selected_map_location CHANGE\n`);

    marker.green(`ManageLocation ${action_req} useEffect selected_map_location:
      address  ${ selected_map_location.address}
      lat  ${ selected_map_location.lat}
      lng  ${ selected_map_location.lng}
      `);

    marker.green(`ManageLocation useEffect ${action_req} new_location
    address  ${ new_location.address}
    lat  ${ new_location.lat}
    lng: ${ new_location.lng}
    `);

  }, [selected_map_location]);




  // Update upon selected_location change

  useEffect(() => {

    /*
        marker.green(`ManageLocation useEffect ${action_req} on selected_location before\n`);
    
        marker.green(`ManageLocation useEffect ${action_req} selected_location:
        id  ${selected_location.id}
        name  ${selected_location.name}
        address  ${selected_location.address}
        lat  ${selected_location.lat}
        lng:  ${selected_location.lng}
        category  ${selected_location.category}
        `);
    
        marker.green(`ManageLocation useEffect ${action_req} new_location
        id  ${new_location.id}
        name  ${new_location.name}
        address  ${new_location.address}
        lat  ${new_location.lat}
        lng:  ${new_location.lng}
        category  ${new_location.category}
    
        `);
    */
    const curr_id = ("Add" === action_req) ? ((original_Locations_list.length) + 1) : selected_location.id;
    marker.green(`ManageLocation useEffect ${action_req} on selected_location before ${curr_id} \n`);

    set_new_location(({
      // ...new_location,
      id: ("Add" === action_req) ? ((original_Locations_list.length) + 1) : selected_location.id,
      //id: ((original_Locations_list.length) + 1),
      //id: selected_location.id,
      name: selected_location.name,
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
      category: selected_location.category,
    }));

    marker.green(`ManageLocation useEffect ${action_req} on selected_location after\n`);

    marker.green(`ManageLocation useEffect ${action_req} selected_location 2:
      id  ${ selected_location.id}
      name  ${ selected_location.name}
      address  ${ selected_location.address}
      lat  ${ selected_location.lat}
      lng: ${ selected_location.lng}
      category  ${ selected_location.category}
      `);

    marker.green(`ManageLocation useEffect new_location 2
      id  ${ new_location.id}
      name  ${ new_location.name}
      address  ${ new_location.address}
      lat  ${ new_location.lat}
      lng: ${ new_location.lng}
      category  ${ new_location.category}

    `);


    if (("View" === action_req) || ("Remove" === action_req)) {
      update_selected_map_location({
        address: selected_location.address,
        lat: selected_location.lat,
        lng: selected_location.lng,
      });
    }

    set_errors({
      ...errors,
      name: '',
      address: '',
      lat: '',
      lng: '',
      category: '',

    });


  }, [selected_location]);



  marker.green(`ManageLocation  ${action_req}  selected_map_location CURRENT\n`);

  marker.green(`ManageLocation  ${action_req}  selected_map_location:
    address  ${ selected_map_location.address}
    lat  ${ selected_map_location.lat}
    lng  ${ selected_map_location.lng}
  `);

  marker.green(`ManageLocation  ${action_req}  new_location CURRENT
    id  ${ new_location.id}
    name  ${ new_location.name}
    address  ${ new_location.address}
    lat  ${ new_location.lat}
    lng: ${ new_location.lng}
    category  ${ new_location.category}
  `);



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

    marker.i(`ManageLocation  ${action_req}   handleBlur`);


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
        marker.obj(original_Locations_list, `handleBlur original_Locations_list`);

        var exists = (element) => {
          marker.obj(element, `element`);
          marker.green(`value: ${value}`);
          // checks whether an element is even
          return element.name === value;
        };

        found = original_Locations_list.some(exists);
        marker.green(`handleBlur SOME nameFound: ${found}`);


        // found = findIfNameExists(value);
        // marker.red(`handleBlur found after search ${ found } `);   

        if (found) {

          if (("Add" === action_req) || (("Edit" === action_req) && (selected_location.name !== value))) {
            marker.red(`Location name ${value} already exists. `);

            error_msg = `Location name ${value} already exists. `;
            //set_errors({...errors, [ name ]: `Location name ${ value } already exists`}); 
            set_new_location(({ ...new_location, [name]: '', }));
          }

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
      const validName = ("Add" === action_req) ? (validateField('name') && !nameFound) : validateField('name');
      marker.red(`validateForm nameFound ${nameFound} validName ${validName}`);

      const validAddress = validateField('address');
      const validLat = validateField('lat');
      const validLng = validateField('lng');
      const validCategory = validateField('category');

      marker.obj(errors, `validateForm ${action_req} errors 1`);

      if (validName && validAddress && validLat && validLng && validCategory
        && !errors.name && !errors.address && !errors.coordinate_lat
        && !errors.coordinate_lng && !errors.category) {

        validation_success = true;// set_validation_success(true);
        set_errors({ ...errors, validation: `` });

        marker.green(`validateForm validation_success ${validation_success}`);
        marker.obj(new_location, `validateForm new_location`);
        marker.obj(errors, `validateForm errors 2`);
      }
      //only in add
      else if ("Add" === action_req) {
        validation_success = false;
        marker.red(`validateForm  ${action_req} validation_success ${validation_success}`);
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


  const validateNameExists = () => {

    marker.i(`ManageLocation  ${action_req}  validateName`);
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
        marker.obj(original_Locations_list, `handleBlur original_Locations_list`);

        var exists = (element) => {
          marker.obj(element, `element`);
          marker.green(`value: ${value}`);
          // checks whether an element is even
          return element.name === value;
        };

        found = original_Locations_list.some(exists);
        marker.green(`validateName SOME nameFound: ${found}`);

        // found = findIfNameExists(value);
        // marker.red(`handleBlur found after search ${ found } `);   

        if (found) {
          marker.red(`validateName Location name ${value} already exists. `);

          error_msg = `Location name ${value} already exists. `;
          //set_errors({...errors, [ name ]: `Location name ${ value } already exists`}); 
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
        marker.green(`validateName 4!found && validValue ${found} ${validValue}`);
        error_msg = '';
      }
      // marker.red(`set_errors error_msg ${ error_msg } `);  
      set_errors({ ...errors, name: error_msg });

    } catch (err) {
      marker.red(`validateName 6 caugt exception: ${err.message}`);
    }

    marker.green(`validateName 5 found && validValue ${found} ${validValue}`);
    return (found);

  };


  // const findIfNameExists = (value) => {
  //     marker.green(`findIfNameExists value = ${ value }`);   

  //     const names_list = original_Locations_list.map( item => item.name );
  //     marker.green( `handleBlur list: ${ names_list }` );
  //     const found1 =  names_list.includes(value); //('Demo Location');

  //     marker.green(`find result ${ found1 }`);
  //     return found1;
  //   };



  //==========================================================================

  marker.red(`ManageLocation submitting ${submitting}  ${submit_text}`);

  //------------------------------------------------
  //          SUBMIT
  //------------------------------------------------

  const handleSubmit = event => {
    event.preventDefault();// prevent form post
    // submitting = 'START'; 
    set_submitting('START');

    //marker.red(`ManageLocation  ${action_req}  handleSubmit start ` + submitting);
    //marker.green(`ManageLocation  ${action_req}  handleSubmit original_Locations_list.length ` + original_Locations_list.length);

    const new_id = ("Add" === action_req) ? (original_Locations_list.length + 2) : (selected_location.id);

    validateForm();

    if (true === validation_success) {

      console.log(new_location, `ManageLocation handleSubmit  ${action_req}  new_location before`);
      console.log(original_Locations_list, `ManageLocation handleSubmit  ${action_req} original_Locations_list before`);


      let new_list = original_Locations_list;

      if ("Add" === action_req) {

        console.log(`ManageLocation  ${action_req}  handleSubmit validName `);

        // new_id = (original_Locations_list.length + 2);

        set_new_location((
          {
            ...new_location,
            id: (original_Locations_list.length + 2),
          }));

        console.log(new_location, `ManageLocation handleSubmit  ${action_req}  new_location before`);

        //addLoaction();

        //new_list = [...original_Locations_list, new_location];
        new_list.push(new_location);

        // original_Locations_list is in the prev state yet, so increment by 2

      }

      else if ("Edit" === action_req) {

        // new_list = original_Locations_list;

        set_new_location((
          {
            ...new_location,
            id: selected_location.id,
          }));

        console.log(new_location, `ManageLocation handleSubmit  ${action_req}  new_location before`);

        const foundIndexEdit = new_list.findIndex(el => el.id === selected_location.id);
        console.log(`ManageLocation handleSubmit  ${action_req} foundIndex ${foundIndexEdit}`);

        new_list[foundIndexEdit] = new_location;
        //new_list[new_list.findIndex(el => el.id === selected_location.id)] = new_location;
        //new_id = selected_location.id;

      }

      else if ("Remove" === action_req) {

        set_new_location((
          {
            ...new_location,
            id: selected_location.id,
          }));

        console.log(new_location, `ManageLocation handleSubmit  ${action_req}  new_location before`);
        console.log(new_list, `ManageLocation handleSubmit  ${action_req} new_list before`);

        // new_list = original_Locations_list;
        const foundIndexRem = new_list.findIndex(el => el.id === new_location.id);
        console.log(`ManageLocation handleSubmit  ${action_req} foundIndex ${foundIndexRem}`);

        //new_list.splice((new_list.findIndex(el => el.id === new_location.id)), 1);

        new_list.splice(foundIndexRem, 1);

        //new_id = selected_location.id;


      }


      set_original_Locations_list(new_list);
      storeData('original_Locations_list', new_list);

      // marker.obj(original_Locations_list, `handleSubmit  ${action_req} original_Locations_list after`);



      if (("Edit" === action_req) || ("Add" === action_req)) {

        set_new_location({
          ...new_location,
          id: ("Add" === action_req) ? (original_Locations_list.length + 2) : (selected_location.id),
          // id: selected_location.id,
          //id: (original_Locations_list.length + 2),
          name: selected_location.name, //'', 
          address: selected_location.address, // '', 
          lat: selected_location.lat, //31.776847698411576, 
          lng: selected_location.lng, //35.20543098449707, 
        });


        update_selected_location(new_location);

        if ("Edit" === action_req) {
          const new_flag = ((locations_edited_flag + 1) % 2);
          set_locations_edited_flag(new_flag);

          //  const filtered_list = new_list.filter(item =>
          //   item.first_name.toLowerCase().includes(txt.toLowerCase())  );   
        }

      }

      console.log(new_location, `ManageLocation handleSubmit  ${action_req}  new_location after`);
      console.log(new_list, `ManageLocation handleSubmit  ${action_req} new_list after`);
      console.log(original_Locations_list, `handleSubmit  ${action_req} original_Locations_list 2`);


      // alert(`Lcation ${ new_location.name } was added succesfully`);
      set_submitting('END');
      //marker.red(`ManageLocation  ${action_req}  handleSubmit completed ` + submitting);



    } //true === validation_success

    setTimeout(() => {
      set_submitting('IDLE'); //set_submitting(false);
      //marker.red(`ManageLocation  ${action_req}  handleSubmit end ` + submitting);
    }, 1000);


    event.stopPropagation();
    //history.goBack(); //back to list view
    history.push("/locations");


  }


  marker.obj(new_location, `ManageLocation  ${action_req}  current new_location`);
  marker.obj(original_Locations_list, `ManageLocation  ${action_req}  original_Locations_list`);


  //----------------------------------------------------------
  // TODO: refine this one, doesnt show the Submitting new location..
  //----------------------------------------------------------
  useEffect(() => {

    if ('IDLE' === submitting) {
      setTimeout(() => {
        set_submit_text('');
        marker.green(`ManageLocation  ${action_req}  useEffect ${submit_text}`);
      }, 300);
    }
    if ('START' === submitting) {
      set_submit_text('Submitting location...');
      setTimeout(() => {
        set_submit_text('Submitting location...');
        marker.green(`ManageLocation  ${action_req}  useEffect end ${submit_text}`);
      }, 20);
      marker.green(`ManageLocation  ${action_req}  useEffect ${submit_text}`);
    }
    if ('END' === submitting) {
      set_submit_text('Submitted location successfully...');
      setTimeout(() => {
        set_submit_text('Submitted location successfully...');
        marker.green(`ManageLocation  ${action_req}  useEffect end ${submit_text}`);
      }, 20);
    }
    marker.green(`ManageLocation  ${action_req}  useEffect submit_text  ${submit_text}`);

  }, [submitting]);



  const restoreOriginalValuses = event => {

    set_new_location({
      id: selected_location.id,
      name: selected_location.name,
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
      category: selected_location.category,
    });

    update_selected_map_location({
      address: selected_location.address,
      lat: selected_location.lat,
      lng: selected_location.lng,
    });

    marker.red(`restoreOriginalValuses  selected_map_location: 
          address ${selected_map_location.address}
          lat  ${selected_map_location.lat}
          lng  ${selected_map_location.lng}      
          `);

    marker.red(`restoreOriginalValuses  new_location.lng:  
          id ${new_location.id}
          name ${new_location.name}
          address ${new_location.address}
          lat  ${new_location.lat}
          lng  ${new_location.lng}
          category: ${new_location.category}
      ` );

  };



  return (

    <MainBox>
      <FormBox>
        {/* <form style={{ width: "50%" }} onSubmit={handleSubmit} > */}
        <LocationForm onSubmit={handleSubmit} >
          {
            ("View" === action_req) ? (
              <MainBoxLabel>  Selected Location</MainBoxLabel>
            ) : (
                <MainBoxLabel>  {action_req} Location</MainBoxLabel>
              )
          }

          {/* <h2>Add Location</h2> */}

          <FormControl required margin="normal" fullWidth>
            <MyInputLabel htmlFor="name">Name</MyInputLabel>
            <MyInput
              id="name"
              name="name"
              type="text"
              value={new_location.name}
              placeholder="e.g: My New cool location 3"

              inputProps={{ readOnly: (("View" === action_req) || ("Remove" === action_req)) ? true : false }}
              onChange={("View" === action_req) ? (() => { }) : handleChange}
              onBlur={("View" === action_req) ? (() => { }) : handleBlur}


            />
          </FormControl>
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <FormControl required margin="normal" fullWidth>
            <MyInputLabel htmlFor="address">Address</MyInputLabel>
            <MyInput
              id="address"
              name="address"
              type="text"
              // disabled="true"
              value={new_location.address}
              // value={selected_map_location.address}                 
              placeholder="e.g: myStreet 3, New York"

              inputProps={{ readOnly: (("View" === action_req) || ("Remove" === action_req)) ? true : false }}
              onChange={("View" === action_req) ? (() => { }) : handleChange}
              onBlur={("View" === action_req) ? (() => { }) : handleBlur}
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
                <MyInputLabel htmlFor="lat">Latitude </MyInputLabel>
                <CoordinatesInput
                  id="lat"
                  name="lat"
                  type="number"
                  min="MIN_COORDINATES"
                  max="MAX_COORDINATES"
                  value={new_location.lat}
                  // value={selected_map_location.lat}
                  placeholder="-345.1"

                  inputProps={{ readOnly: (("View" === action_req) || ("Remove" === action_req)) ? true : false }}
                  onChange={("View" === action_req) ? (() => { }) : handleChange}
                  onBlur={("View" === action_req) ? (() => { }) : handleBlur}
                />
              </FormControl>
              {errors.lat && <ErrorText>{errors.lat}</ErrorText>}

              <FormControl required margin="normal" width="50%">
                <MyInputLabel htmlFor="lng" >Longitude</MyInputLabel>

                <CoordinatesInput
                  id="lng"
                  name="lng"
                  type="number"
                  min="MIN_COORDINATES"
                  max="MAX_COORDINATES"
                  value={new_location.lng}
                  // value={selected_map_location.lng} 
                  placeholder="156.76"

                  inputProps={{ readOnly: (("View" === action_req) || ("Remove" === action_req)) ? true : false }}
                  onChange={("View" === action_req) ? (() => { }) : handleChange}
                  onBlur={("View" === action_req) ? (() => { }) : handleBlur}
                />
              </FormControl>
              {errors.lng && <ErrorText>{errors.lng}</ErrorText>}

              {/* </fieldset>       */}
            </CoordinatesInnerBox>
          </CoordinatesBox>

          <Tooltip title={toolTipText} open={(("View" === action_req) || ("Remove" === action_req)) ? false : tooltip_open}   >
            <FormControl margin="normal" fullWidth required>

              <MyInputLabel htmlFor="category" id="select-category-label">
                Category
              </MyInputLabel>

              <MySelect
                labelId="select-category-label"
                id='category-simple'
                name='category'
                value={new_location.category}
                defaultValue={selected_location.category}
                placeholder="Pick a Category from the list"
                autoWidth

                inputProps={{ readOnly: (("View" === action_req) || ("Remove" === action_req)) ? true : false }}
                onChange={("View" === action_req) ? (() => { }) : handleChange}
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

              </MySelect>
              <FormHelperText>required</FormHelperText>
            </FormControl>
          </Tooltip>


          {errors.category && <ErrorText>{errors.category}</ErrorText>}

          <SubmitText> {submit_text} </SubmitText>

          <SubmitBox action={action_req}>

            {
              ("Edit" === action_req) ? (
                <Button
                  variant="contained" color="primary" size="medium" margin="40px"
                  // type="submit"   
                  onClick={restoreOriginalValuses}
                >
                  Restore
                </Button>
              ) : (
                  <HiddenDiv></HiddenDiv>
                )

            }

            {
              (("Remove" === action_req) || ("Add" === action_req) || ("Edit" === action_req)) ? (

                <Button
                  disabled={
                    (("Add" === action_req) || ("Edit" === action_req)) ? (
                      (
                        errors.name === '' && errors.address === '' && errors.lat === ''
                        && errors.lng === '' && errors.category === ''
                        && errors.validation === ''
                        && submitting === 'IDLE'
                        && validation_success === true
                      ) ? false : true

                    ) : false

                  }

                  variant="contained" color="primary" size="medium" margin="40px" type="submit"   >
                  {action_req}
                </Button>

              ) : (
                  <HiddenDiv></HiddenDiv>

                )

            }

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



export default ManageLocation;

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
  height: '100%',

  // height: '60vh', 
  // maxHeight: '60rem',
  // minHeight: '60vh',

  // width: 'inherit',
  //width: 'fit-content',
  width: 'fit-content(50vw)',
  minWidth: 'inherit',
  ///maxWidth: 'inherit',

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

  padding: 0,
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
  lineHeight: '2.5rem',
});


const FormBox = styled(Box)({
  display: "flex",
  justifyContent: "center",

  // margin: 20,
  /// padding: 20,
  margin: 'auto',
  padding: 0,
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

const MyInputLabel = styled(InputLabel)({

  fontSize: 'calc(1.4rem + (2.5 - 1.4) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.4rem + (1.4 - 1.1) * ((100vw - 300px) / (1600 - 300)))',

  // fontWeight: '400',

});

const MyInput = styled(Input)({

  // font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))

  //   fontSize: 'calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.5rem + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)))',

  fontSize: 'calc(1.3rem + (2.4 - 1.3) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.4rem + (1.4 - 1.0) * ((100vw - 300px) / (1600 - 300)))',


  // fontSize: 'calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.3em + (1.2 - 1.1) * ((100vw - 300px) / (1600 - 300)))',

  //fontSize: '4.5rem',
  // fontWeight: '400',

});



const MySelect = styled(Select)({

  // fontSize: 'calc(15px + (26 - 15) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.5rem + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)))',
  fontSize: 'calc(1.2rem + (2.4 - 1.2) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.35rem + (1.3 - 1.0) * ((100vw - 300px) / (1600 - 300)))',

  //fontSize: '4.5rem',
  //fontWeight: '400',

});

const CoordinatesBoxLabel = styled(InputLabel)({
  //fontSize: '0.8rem',
  // fontWeight: 'inherit',
  textAlign: 'center',
  //color: 'inherit',
  color: 'gray',

  fontSize: 'calc(1.1rem + (2.1 - 1.1) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.2rem + (1.1 - 0.9) * ((100vw - 300px) / (1600 - 300)))',

  //fontWeight: '400',

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

const CoordinatesInputLabel = styled(InputLabel)({
  marginRight: 10,
  paddingRight: 15,

  // fontSize: 'calc(13px + (23 - 13) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.3rem + (1.3 - 1.0) * ((100vw - 300px) / (1600 - 300)))',

  fontSize: 'calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.3em + (1.2 - 1.1) * ((100vw - 300px) / (1600 - 300)))',



  //fontWeight: '400',
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
  ///maxWidth: "xl",

  // fontSize: 'calc(1.1rem + (2.4 - 1.2) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.35rem + (1.3 - 1.0) * ((100vw - 300px) / (1600 - 300)))',
  // fontSize: 'calc(13px + (20 - 13) * ((100vw - 300px) / (1600 - 300)))',
  // lineHeight: 'calc(1.3em + (1.2 - 1.1) * ((100vw - 300px) / (1600 - 300)))',

  fontSize: 'calc(1.3rem + (2.4 - 1.3) * ((100vw - 300px) / (1600 - 300)))',
  lineHeight: 'calc(1.4rem + (1.4 - 1.0) * ((100vw - 300px) / (1600 - 300)))',


  //fontWeight: '400',

});



//const SubmitBox = styled('p')({
const SubmitBox = styled(({ action, ...other }) => <div {...other} />)({
  display: 'flex',
  justifyContent: props => props.action === "Edit" ? "space-evenly" : "center",
  marginTop: 15, //30
  //marginLeft: 50,
  paddingTop: 15,

  '& > *': {
    fontSize: 'calc(1.2rem + (2.3 - 1.3) * ((100vw - 300px) / (1600 - 300)))',
    lineHeight: 'calc(1.4rem + (1.4 - 1.2) * ((100vw - 300px) / (1600 - 300)))',

  },

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


const HiddenDiv = styled('div')({
  display: "none",
});

  // const ToolbarTooltip = withStyles({
  //   // MuiTooltip: {
  //   tooltip: {
  //     color: `${ main_palete_theme.palette.header.text_color }`, 
  //     //backgroundColor: "transparent",
  //     backgroundColor: `${ main_palete_theme.palette.header.main }`,
  //     fontSize: `0.8rem`,
  //   // }
  //  }
  // })(Tooltip);

//const ManageLocation Add = () => <h1>Create a new Location</h1>;

//const CreateBot = () => <h1 className="create">Create a new Bot!</h1>;
//export default CreateBot;



