// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import Logo from  '../../../../assets/images/logo/logo.png'
import LogoWhite from  '../../../../assets/images/logo/logo_white.png'
import { Link } from 'react-router-dom'



const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
        <Link to='/Home' >
          <img height={30} src={skin=='light'?Logo:LogoWhite} />
        </Link>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
