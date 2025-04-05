import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
        <h1>404 Error</h1>
        <p>Page not found</p>
        <Link to="/dashboard">Go back to Home</Link>
    </section>       
    
  )
}

export default NotFound;