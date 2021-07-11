import React, {Component} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux'
import Dialog from "rc-dialog";
import "./assets/dialog.css";
import * as op from 'object-path';
//
const {modelList, txt, act} = require('./modconf');

const EditDialog = (propx) => {
        const dispatch = useDispatch();
        const onAct = (p) => {
            return dispatch({
                type: act.EditDialog, ...p
            });
        };
        const props = useSelector(state => ({
            onAct,
            ...propx,
            ...op.get(state, 'handyProps.editDialog', {})
        }));
        const visible = useSelector(state => op.get(state, 'handyProps.editDialog', false));
        // const onChangeRename = (ev) => {
        //     let p = {
        //         // act: 'validRename',
        //         id: props.id,
        //         name: op.get(ev, 'target.value', null),
        //     };
        //     // this.props.onAct(p, apiActs.askRename(p));
        //     props.onAct({...p, act: 'changeRename'});
        //
        // };

        return (
            <Dialog
                visible={visible}
                animation="zoom"
                maskAnimation="fade"
                closable
                // onClose={props.onClose || (() => props.onAct({act: props.closeAct}))}
                destroyOnClose
                zIndex={2000}
                style={{display:visible?'block':'none'}}
            >
                <div
                    //className='dialog dialog-input'

                >
                    <p>{props.txt}
                    </p>
                    <div style={{width: '100%'}}>
                        < textarea
                            style={{width: '100%'}}
                            autoFocus
                            // onChange={props.onChange || onChangeRename}
                            value={props[props.inputP]}
                        /></div>
                    <div>
                        < button
                            disabled={props.yesDisabled || op.get(props, props.yesDisP, false)}
                            onClick={(
                                ev) => (
                                props.clickYes ? (ev) => props.clickYes(props, ev) :
                                    (() => props.onAct({act: props.yesAct})))
                            }> Confirmar
                        </button>
                        < button
                            onClick={
                                props.clickNo ? (ev) => props.clickNo(props, ev) :
                                    (() => props.onAct({act: props.closeAct}))
                            }> Cancelar
                        </button>
                    </div>
                </div>
            </Dialog>
        );
    }
;

export default EditDialog;