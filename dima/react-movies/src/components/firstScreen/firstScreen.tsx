import * as React from "react";
import "./firstScreen.css";
interface FirstScreenProps {
  children: React.ReactChild;
}
const FirstScreen = ({ children }: FirstScreenProps) => {
  return <div className="wrapper">{children}</div>;
};
export default FirstScreen;
