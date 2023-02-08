
import propTypes from 'prop-types'
import { Button } from './Button';
import { useLocation } from 'react-router-dom';



function Header({title, onAdd, showAdd}) {

    Header.defaultProps = {
        title: 'Task track',
    }
    Header.propTypes = {
        title: propTypes.string.isRequired
    }
        const location = useLocation()
    return(

        <header className='header'>
             <h1>{title}</h1>
             {location.pathname === '/' &&   <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close task' :'Create task'} onClick={onAdd}/>}
          
        </header>
       
    )
    
   
}


export default Header;