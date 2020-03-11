import React,
{
    forwardRef,
}
    from "react";

import main_palete_theme from '../style.lib/PalleteStyles';

// Material-UI
import { styled, } from '@material-ui/core/styles';
import {
    //Tooltip,
    Fab,
} from '@material-ui/core';

import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
// import AddIcon from "@material-ui/icons/Add";
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
// import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
// import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';


const TableAddButton = forwardRef((props, ref) => {
    return (

        <AddButtonDiv
            aria-label="Add Category Div"
            id="Add_Category_Div"
            name="Add_Category_Div"
            role="directory"
        >
            <Fab
                style={TableAddButtonStyle}
                aria-label="Add Category"
                id="Add_Category"
                name="Add_Category"
                role="button"
            >

                <AddLocationRoundedIcon ref={ref} {...props}
                    style={TableAddLocationIconStyle}
                    aria-label="Add Category Icon"
                    id="Add_Category_Icon"
                    name="Add_Category_Icon"
                    role="img"
                />
                {/* <AddCircleRoundedIcon ref={ref} {...props} style={{ fontSize: 40 }} /> */}

            </Fab>
        </AddButtonDiv>

    );
});

export default TableAddButton;

const AddButtonDiv = styled('h4')({
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,

    '@media (maxWidth: 650px)': {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 2,
    },
});

const TableAddButtonStyle =
{
    background: `${main_palete_theme.palette.add_button.main}`,
    color: `${main_palete_theme.palette.primary.dark}`,

    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,

    '@media (maxWidth: 650px)': {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 2,

    },
}

const TableAddLocationIconStyle = {
    fontSize: 35,

    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,

    '@media (maxWidth: 650px)': {
        fontSize: '1px',
        display: 'flex',
        flexGrow: 1,
        flexShrink: 2,
    },
}