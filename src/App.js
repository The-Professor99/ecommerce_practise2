import { Outlet, Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";
import { Navbar, Footer, AdBanner, Alert } from "@/_components";
import {
  reducer,
  StateProvider,
  initialState,
  useStateValue,
} from "@/_helpers";

const stripePromise = loadStripe(
  "pk_test_51KjonjDzp3HKRv6T7gssQW10t5CSGWPqGcePxfWM8XVKnDEgvRyyg3Y3nhgU9vqtX0LxzBvH7whoyEPmNNd8RCH400bxmDh7wU"
);

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkTheme, setTheme] = useLocalStorage(
    "darkTheme",
    defaultDark ? true : false
  );

  const switchTheme = () => {
    setTheme(!darkTheme);
  };
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  useEffect(() => {
    executeScroll();
  });

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Elements stripe={stripePromise}>
        <div className="App" data-theme={darkTheme} ref={myRef}>
          <Navbar
            darkTheme={darkTheme}
            switchTheme={() => switchTheme(darkTheme)}
          />
          <main>
            {/* <AdBanner /> */}
            <div>
              <Outlet className="outlet" />
            </div>
          </main>
          <button
            onClick={executeScroll}
            className="mt-2 btn btn-primary scrollbtn center"
          >
            {" "}
            Back to top{" "}
          </button>
          <Footer />
        </div>
      </Elements>
    </StateProvider>
  );
}

export default App;
