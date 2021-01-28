import React from 'react'
import { withRouter, useLocation, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'

const Post = (props) => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const migajas = useSelector(store => store.user.breadcrumbs)
    
    React.useEffect(()=>{
        dispatch(AddBreadcrum("Post", path))
    },[])
    return (
        <div>
            ESTAS EN EL POST <br/>
            {useLocation().pathname} <br/>
            {console.log(props.history)}
            {
                migajas.map(item => <Link to={item.path}>{item.name}</Link>)
            }
        </div>
    )
}

export default withRouter(Post)
