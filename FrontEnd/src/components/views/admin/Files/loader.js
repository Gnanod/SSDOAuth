import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Alert from '@material-ui/lab/Alert';
//loader when file uploading
export const ProgressLoader = ({message})=>{

    return(
        <div>
                <Alert icon={false} variant="filled" severity="info">
                    <div >
                        <CircularProgress
                            size={15}
                            className="text-light text-center"
                            style={{marginRight:"25px"}}
                        />
                        {" "}
                        <span style={{float : "center"}}  className="text-center" > {message} </span>
                    </div>

                </Alert>
        </div>

    )
};
