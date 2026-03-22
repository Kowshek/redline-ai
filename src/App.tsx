import { Outlet } from '@tanstack/react-router'

// App is just a shell — it renders whatever page matches the current URL
function App() {
  return <Outlet />
}

export default App