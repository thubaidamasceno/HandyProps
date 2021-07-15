import React, {useEffect, useRef, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import * as op from "object-path";
import './assets/tree.css';

import Tree, {TreeNode} from 'rc-tree';
import FileSaver from "file-saver";


function TreeView() {
    const ref = useRef(null);
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const [forSave, forSave_] = useState([]);
    const dck = [];
    const deepIn = v => {
        dck.push(v._id);
        return ({
            key: v._id,
            title: v.Name,
            data: v,
            children: data.filter(w => w.Parent === v._id).map(deepIn),
        })
    };
    let treeData = data.filter(v => !v.Parent.length).map(deepIn);

    const onCheck = (checkedKeys, info) => {
        //console.log('onCheck', checkedKeys, info);
        forSave_(info.checkedNodes.map(v => v.data));
    };

    return (
        <div>
            < button
                // disabled={props.yesDisabled || op.get(props, props.yesDisP, false)}
                onClick={() => {

                    let gBlob = new Blob([JSON.stringify(forSave)],
                        {type: "application/json"});
                    FileSaver.saveAs(gBlob, "HandyPropsData.json");
                }}>Exportar *.json
            </button>
            <Tree
                ref={ref}
                onCheck={onCheck}
                checkable
                treeData={treeData}
                defaultCheckedKeys={dck}
            />
        </div>
    );
}

export default TreeView;