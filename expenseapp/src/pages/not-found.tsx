import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary-lighter">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-primary-medium mb-8">Page Not Found</p>
        <p className="text-lg text-primary-medium mb-4">
          The page you are looking for might be in another dimension.
        </p>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-medium focus:outline-none focus:shadow-outline-blue">
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
