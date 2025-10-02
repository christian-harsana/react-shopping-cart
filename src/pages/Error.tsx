import { Link } from "react-router";

function Error() {
    return (
        <div>
            <h1>Page not found</h1>
            <p>The page or route that you're looking for is missing or doesn't exist!</p>
            <Link to="/">Back to the Home page</Link>
        </div>
    )
}

export default Error;