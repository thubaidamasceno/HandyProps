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
    // const dataSize = useSelector(state => op.get(state, `handyProps.dataSize`));
    // const clicks = useSelector(state => op.get(state, `handyProps.clicks`));
    const dispatch = useDispatch();
    const defaultProperties = useSelector(state => op.get(state, `handyProps.defaultProperties`));
    const customProperties = useSelector(state => op.get(state, `handyProps.customProperties`));
    const gridColumns = useSelector(state => op.get(state, `handyProps.gridColumns`));
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const loaded = useSelector(state => op.get(state, `handyProps.loaded`));
    const urlDSListDefault = useSelector(state => op.get(state, `handyProps.DS.urlDSListDefault`));
    const urlDSListState = useSelector(state => op.get(state, `handyProps.DS.urlDSList`));
    const [urlDSList, setUrlDSList] = useState(urlDSListState);
    const classes = useStyles();

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        const isChecked = op.get(gridColumns, `${value}.visible`);
        dispatch({type: act.hpSetState, toSet: {gridColumns: {[value]: {visible: !isChecked}}}})
    };

    return (
        <div className={classes.root}>
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}*/}
            {/*        aria-controls="panel1a-content"*/}
            {/*        id="panel1a-header"*/}
            {/*    >*/}
            {/*        <Typography className={classes.heading}>Propiedades Básicas</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails*/}
            {/*        className={classes.root}*/}
            {/*    >*/}
                    <List dense>

                        {defaultProperties.filter(
                            v => v.g
                        ).map(
                            v => (
                                <ListItem key={v.field}
                                          dense
                                    // button
                                          onClick={handleToggle(v.field)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={op.get(gridColumns,
                                                `${v.field}.visible`) ? true : false}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={v.field} primary={v.pt}
                                                  secondary={v.field}
                                    />
                                    {/*<ListItemSecondaryAction>*/}
                                    {/*    <IconButton edge="end" aria-label="Comments">*/}
                                    {/*        <CommentIcon/>*/}
                                    {/*    </IconButton>*/}
                                    {/*</ListItemSecondaryAction>*/}
                                </ListItem>
                            )
                        )}
                    </List>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}*/}
            {/*        aria-controls="panel1a-content"*/}
            {/*        id="panel2a-header"*/}
            {/*    >*/}
            {/*        <Typography className={classes.heading}>Propriedades Derivadas</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails*/}
            {/*        className={classes.root}*/}
            {/*    >*/}
            {/*        <Button>Criar Propriedade Derivada</Button>*/}
            {/*        <List dense>*/}
            {/*            <ListItem>*/}
            {/*                OK*/}
            {/*            </ListItem>*/}
            {/*            <ListItem>*/}
            {/*                xxx*/}
            {/*                <Button>excluir</Button>*/}
            {/*            </ListItem>*/}
            {/*        </List>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
        </div>
    );
}

export default Properties;