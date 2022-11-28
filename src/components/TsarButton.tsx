import React from 'react';
import Button from "@mui/material/Button";

type PropsType={
    sizze:string
}

const TsarButton = (props:PropsType) => {
    // @ts-ignore
    return (
        <>
            <button name={'knklm'}/>
            <div></div>
        </>

        // <Button size={props.sizze} variant={"contained"} color="success" onClick={()=>{}}>All</Button>
    );
};

export default TsarButton;