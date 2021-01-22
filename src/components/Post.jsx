import React from 'react'
import { withRouter, useLocation } from 'react-router-dom'

const Post = (props) => {
    return (
        <div>
            ESTAS EN EL POST <br/>
            {useLocation().pathname} <br/>
            {console.log(props.history)}
        </div>
    )
}

export default withRouter(Post)
