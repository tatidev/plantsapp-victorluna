import {Link} from 'react-router-dom'

function Categories({links}) {
    return (
        <>
            {
                links.map((element, index) =>{
                    return <Link key={index} to={'/category/'+element.id} className="btn btn-outline-primary btn-sm">{element.name}</Link>
                })
            }
        </>
    )
}

export default Categories
