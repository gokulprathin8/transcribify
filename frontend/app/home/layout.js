// components/Layout.js
import SideNavbar from './SideNavbar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <SideNavbar />
            {children}
        </div>
    );
};

export default Layout;
