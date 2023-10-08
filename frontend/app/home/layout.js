// components/Layout.js
import SideNavbar from './sidenavbar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <SideNavbar />
            {children}
        </div>
    );
};

export default Layout;
