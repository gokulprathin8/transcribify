// Layout.js
import SideNavbar from './sidenavbar';  // Assuming you have a SideNavbar component

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar /> {/* Here's where your navbar is placed */}
      <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
        {children} {/* This is where your actual page content will be rendered */}
      </main>
    </div>
  );
}
