import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";

import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    ListItemText, ListItemSecondaryAction, IconButton, Checkbox, ListItemIcon,
    Link, ListItem, Button, List
} from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from "@material-ui/icons/Edit";


const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            display: 'block',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        buttonLink: {
            fontSize: 'small',
            textDecoration: 'underline',
            marginRight: '0.5em',
            cursor: 'pointer',
            '&$disabled': {
                color: 'gray',
            },
            '&$enabled': {
                color: 'blue',
            },
        },
        disabled: {},
        enabled: {},
        inputbox: {
            width: '100%',
        },
    }))
;

function Properties() {
    const dispatch = useDispatch();
    const classes = useStyles();
    //
    const chartSelected = useSelector(state => op.get(state, `handyProps.chartSelected`));
    const chartList = useSelector(state => op.get(state, `handyProps.chartList`));
    const chartNames = useSelector(state => op.get(state, `handyProps.chartNames`));
    const loaded = useSelector(state => op.get(state, `handyProps.loaded`));
    //
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        // const isChecked = op.get(gridColumns, `${value}.visible`);
        dispatch({type: act.hpSetState, toSet: {chartSelected: value}})
    };

    return (
        <div className={classes.root}>
            <List dense>
                <ListItem
                    dense
                > <Button
                    className={classes.buttonLink}
                    onClick={() => {
                    }}
                >Novo Gráfico</Button></ListItem>
                {chartNames.map(
                    v => (
                        <ListItem key={v}
                                  dense
                            // button
                                  onClick={handleToggle(v)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={chartSelected === v}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={v}
                                primary={chartList[v].name}
                                secondary={
                                    `${chartList[v].axisX} vs ${chartList[v].axisY}`
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Comments">
                                    <EditIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );
}

export default Properties;