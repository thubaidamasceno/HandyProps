import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";
import fields, {filterOperations} from './fields';

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
import EditIcon from '@material-ui/icons/Edit';
import {Layout} from "flexlayout-react";
import EditDialog from "./EditDialog";


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
    const filterList = useSelector(state => op.get(state, `handyProps.filterList`));
    const filterNames = useSelector(state => op.get(state, `handyProps.filterNames`));
    const loaded = useSelector(state => op.get(state, `handyProps.loaded`));
    //
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        const isChecked = !op.get(filterList, [value, 'enabled']);
        dispatch({
            type: act.hpSetState,
            toSet: {
                filterList: {
                    [value]: {
                        enabled: isChecked
                    }
                }
            }
        })
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
                >Novo Filtro</Button></ListItem>
                {filterNames.map(
                    (v, i) => (
                        <ListItem key={v}
                                  dense
                                  onClick={handleToggle(v)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    checked={filterList[v].enabled}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={v}
                                primary={filterList[v].name}
                                secondary={filterList[v].expression}
                                // secondary={`${
                                //     op.get(filterOperations, [filterList[v].operator, 'name'], '')
                                // } a ${
                                //     filterList[v].value
                                // } ${
                                //     op.get(fields, [filterList[v].field, 'unid'])
                                // }`}
                            />

                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Comments"
                                            onClick={() => {
                                                dispatch({
                                                    type: act.hpSetState, toSet: {
                                                        editDialog: {
                                                            visible: true,
                                                            title: "Editar Filtro",
                                                            closeAct: 'editClose',
                                                            inputP: 'content',
                                                            content: JSON.stringify({
                                                                name: filterList[v].name,
                                                                // operator: filterList[v].operator,
                                                                // field: filterList[v].field,
                                                                // value: filterList[v].value,
                                                                expression: filterList[v].expression,
                                                                fields: filterList[v].fields,
                                                            }, undefined, 4),
                                                            path: `filterList.${v}`,
                                                            yesAct:'editFilterYes',
                                                        }
                                                    }
                                                })
                                            }}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    )
                )}
            </List>

            <EditDialog
                // txt={`Editar Filtro`}
                // visibleP='renaming'
                // yesDisP='invalidRename'
                // closeAct='editClose'
                // inputP='renameText'
                // noAct='renameClose'
                // errorTxt='renameErrors'
            />
        </div>
    );
}

export default Properties;