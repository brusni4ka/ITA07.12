import React from "react";
import "./contentContainer.css";
interface ContainerProps {
  children: React.ReactNode;
}
const ContentContainer = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};
export default ContentContainer;
