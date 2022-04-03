import { Alert } from "@/_components";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import aboutUs from "../images/undraw_about_us.svg";
import aboutUsDark from "../images/undraw_about_us_dark.svg";

function About() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkTheme] = useLocalStorage("darkTheme", defaultDark ? true : false);

  return (
    <>
      <Alert />
      <div className="About container mx-auto mt-4 px-4 container-1 pt-20 pb-12">
        <div className="flex flex-wrap ">
          <div className="image-container pr-4 pl-4 ">
            <img
              alt=""
              src={darkTheme ? aboutUsDark : aboutUs}
              className="img-responsive max-w-full h-auto"
            />
          </div>
          <article className="py-8 px-4 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
            <h3 className="h1 mt-2">About</h3>
            <p className="text-xl font-light">This is a practice website.</p>
            <p>
              For website documentation and code, please visit{" "}
              <a
                href="https://github.com/The-Professor99/ecommerce_practise2"
                target="_blank"
                className="text-blue-200"
              >
                The Github Repo.
              </a>{" "}
              You can also check{" "}
              <a
                href="https://ihechifestus9.web.app/"
                target="_blank"
                className="text-blue-200"
              >
                my portfolio website
              </a>{" "}
              for more of my work.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}

export { About };
