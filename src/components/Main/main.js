import React from "react";
import Promo from './Promo/promo';
import AboutProject from './AboutProject/aboutProject';
import Techs from './Techs/techs';
import AboutMe from './AboutMe/aboutMe';
import Portfolio from './Portfolio/portfolio';

function Main() {
  return (
    <main>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
  );
};

export default Main;