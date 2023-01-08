import { React, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ShowcaseComponent from "../components/ShowcaseComponent/ShowcaseComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import LocationComponent from "../components/LocationComponent/LocationComponent";
import TestimonialsComponent from "../components/TestimonialsComponent/TestimonialsComponent";
import HomepageReservationComponent from "../components/HomepageReservationComponent/HomepageReservationComponent";
import FooterComponent from '../components/FooterComponent/FooterComponent'
import HomepageOrderComponent from "../components/HomepageOrderComponent/HomepageOrderComponent";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <NavbarComponent />
      <ShowcaseComponent />
      <LocationComponent />
      <HomepageOrderComponent />
      <TestimonialsComponent />
      <HomepageReservationComponent />
      <FooterComponent />
    </>
  );
};

export default Home;
