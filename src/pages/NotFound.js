import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import notFound from "../images/undraw_searching.svg";
import notFoundDark from "../images/undraw_searching_dark.svg";

import "./NotFound.css";

function NotFound() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkTheme] = useLocalStorage("darkTheme", defaultDark ? true : false);

  return (
    <div className="NotFound container mx-auto mt-4 px-4 container-1 pt-20 pb-12">
      <div className="flex flex-wrap ">
        <div className="image-container pr-4 pl-4 ">
          <img
            alt=""
            src={darkTheme ? notFoundDark : notFound}
            className="img-responsive max-w-full h-auto"
          />
        </div>
        <article className="py-8 px-4 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
          <h3 className="h1 mt-2">404</h3>
          <h4 className="h3">Page Not Found</h4>
          <p className="text-xl font-light">
            Please bear with us as the page you requested could not be found.
          </p>
          <p>
            You can return to our{" "}
            <Link to="/" className="text-blue-200">
              home page
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="text-blue-200">
              contact us
            </Link>{" "}
            for more info
          </p>
        </article>
      </div>
    </div>
  );
}

export { NotFound };
