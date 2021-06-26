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
import {Link} from "@material-ui/core";

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

function DataSource() {
    // const dataSize = useSelector(state => op.get(state, `handyProps.dataSize`));
    // const clicks = useSelector(state => op.get(state, `handyProps.clicks`));
    const dispatch = useDispatch();
    const processing = useSelector(state => op.get(state, `handyProps.processing`));
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const loaded = useSelector(state => op.get(state, `handyProps.loaded`));
    const urlDSListDefault = useSelector(state => op.get(state, `handyProps.DS.urlDSListDefault`));
    const urlDSListState = useSelector(state => op.get(state, `handyProps.DS.urlDSList`));
    const [urlDSList, setUrlDSList] = useState(urlDSListState);
    const classes = useStyles();

    const reset = () => {
        setUrlDSList(urlDSListDefault);
        dispatch({type: act.hpSetState, toSet: {DS: {urlDSList: urlDSListDefault}}})
    };
    // useEffect(() => {
    //     let p = {
    //         type: act.hp.loadDataSources,
    //         // payload: apiActs.list({}),
    //     };
    //     dispatch(p);
    // }, []);


    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Onde Buscar Dados</Typography>
                </AccordionSummary>
                <AccordionDetails
                    className={classes.root}
                >
                    <div className={classes.heading}>Endereço na Internet:</div>
                    <div><input className={classes.inputbox} value={urlDSList}
                                onChange={(e) => {
                                    setUrlDSList(e.target.value);
                                }}/></div>
                    {urlDSList !== urlDSListState ? <div>
                        <Link
                            href=''
                            className={classes.buttonLink}
                            onClick={() => setUrlDSList(urlDSListState)}
                        >Cancelar</Link>
                        <Link href=''
                              onClick={() => dispatch({type: act.hpSetState, toSet: {DS: {urlDSList}}})}
                              className={classes.buttonLink}>Salvar</Link>
                    </div> : <div>
                        <Link
                            href=''
                            className={classes.buttonLink}
                            onClick={() => reset()}
                            hidden={urlDSListDefault === urlDSList}
                        >Restaurar Padrão</Link>
                        <Link
                            href=''
                            onClick={() => dispatch({
                                type: act.hp.getDataSource,
                                url: urlDSListState,
                            })}
                            disabled={processing}
                            className={classes.buttonLink}
                        >Atualizar</Link>
                    </div>}

                </AccordionDetails>
            </Accordion>
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}*/}
            {/*        aria-controls="panel2a-content"*/}
            {/*        id="panel2a-header"*/}
            {/*    >*/}
            {/*        <Typography className={classes.heading}>Bases Encontradas</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            {/*        <>*/}
            {/*            {loaded && <>*/}
            {/*                <button*/}
            {/*                    onClick={() => dispatch({type: act.hp.loadData})}*/}
            {/*                    disabled={processing}*/}
            {/*                >Carregar Base de Dados*/}
            {/*                </button>*/}
            {/*            </>}*/}
            {/*            {processing && <><p/><CircularProgress*/}
            {/*                size={20}*/}
            {/*            /></>}*/}
            {/*        </>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Informação</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <>
                        <center> {loaded ? <>
                            {`${data.length} materiais carregados`}
                        </> : "Não Há Dados Carregados"}</center>
                        {processing && <><p/><CircularProgress
                            size={20}
                        /></>}
                    </>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

export default DataSource;