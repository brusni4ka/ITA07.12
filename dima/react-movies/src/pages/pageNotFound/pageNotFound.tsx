import React from "react";
import ContentContainer from "../../components/contentContainer";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./pageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="not-found">
      <div className="first-screen-wrapper first">
        <ContentContainer>
          <Header />
          <h2 className="page-info">Sorry, this page doesn't exist.</h2>
        </ContentContainer>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default PageNotFound;
