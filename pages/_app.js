import { TuneProvider } from "../provider/tuneprovider";

import "../styles/globals.css";
import GLoberPlayer from "../components/GLoberPlayer";
import SideDrawer from "../components/SideDrawer";
import ErrorBoundry from "../error/ErrorBoundry";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <ErrorBoundry>
      <TuneProvider>
        <Component {...pageProps} />
        <GLoberPlayer />
        <SideDrawer />
      </TuneProvider>
    </ErrorBoundry>
  );
}

export default MyApp;
