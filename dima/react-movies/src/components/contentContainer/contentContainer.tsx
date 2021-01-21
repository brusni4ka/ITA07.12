import * as React from "react";
import "./contentContainer.css";
interface ContainerProps {
  children: React.ReactChild[] | React.ReactChild | JSX.Element | JSX.Element[];
}
const ContentContainer = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};
export default ContentContainer;
