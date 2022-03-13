import * as React from "react"
import {useState} from "react"
import {Link} from "gatsby"

const HamburgerIcon = ({toggleSideBar}) => (
    <div className="barGroup" onClick={toggleSideBar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>
)
const CrossIcon = ({toggleSideBar}) => (
    <div className="barGroup" onClick={toggleSideBar}>
        <div className="bar cross1"></div>
        <div className="bar cross2"></div>
        <div className="bar cross3"></div>
    </div>
)

const Layout = ({location, children}) => {
    const [sidebar, toggle] = useState(false)
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath
    const hideFooterInTagsPage = location.pathname.includes("/tags")
    const toggleSideBar = () => {
        toggle(!sidebar)
    }

    const title = "TravelBerg"
    return (
        <div id="main">
            <div className="header">
                <div className="header-title">{title}</div>
                <div className="container">
                    {!sidebar ? <HamburgerIcon toggleSideBar={toggleSideBar}/> :
                        <CrossIcon toggleSideBar={toggleSideBar}/>}
                </div>
            </div>
            {sidebar && (
                <div id="mySidenav" className="sidenav">
                    <div className="">
                        <Link to="/" onClick={toggleSideBar}>
                            Blog
                        </Link>
                        <Link to="/tags" onClick={toggleSideBar}>
                            Tags
                        </Link>
                    </div>
                </div>
            )}
            <div className="global-wrapper" data-is-root-path={isRootPath}>
                {children}
            </div>
        </div>
    )
}

export default Layout
