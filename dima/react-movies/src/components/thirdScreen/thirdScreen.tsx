import * as React from "react";
import Footer from "../footer";
import "./thirdScreen.css";
interface ThirdScreenProps {
  children: React.ReactChild | React.ReactChild[];
}
const ThirdScreen = ({ children }: ThirdScreenProps) => {
  return (
    <>
      <div className="third-screen">{children}</div>
      <Footer />
    </>
  );
};

export default ThirdScreen;
