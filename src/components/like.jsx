import React from 'react';

const Like = (props) => {
    let classes="fa fa-heart"
    classes+= props.liked===true ? "" : "-o"
    return ( 
<i className={classes} onClick={()=>props.onClick(props.movie)}></i>
     );
}
 
export default Like;