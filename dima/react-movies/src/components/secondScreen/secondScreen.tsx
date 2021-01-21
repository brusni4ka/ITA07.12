import * as React from "react";
import "./secondScreen.css";
interface SecondScreenProps {
  children: React.ReactChild | React.ReactChild[];
}
const SecondScreen = ({ children }: SecondScreenProps) => {
  return <div className="movies-panel">{children}</div>;
};

export default SecondScreen;
