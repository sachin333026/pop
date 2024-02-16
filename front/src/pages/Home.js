import React from "react";
import { Navbar, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import styled from "styled-components";

const Home = () => {
  const lapImg =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80";
  return (
    <>
      <div>
        <Navbar bg="primary" variant="dark">
          {/* <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link></Navbar.Brand> */}
          <Navbar.Brand style={{ marginLeft: "42px" }}>Home</Navbar.Brand>
        </Navbar>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <AdCard style={{ marginTop: "1rem", display: "flex" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={lapImg} />
            <Card.Body>
              <Card.Title>dell laptop</Card.Title>
              <Card.Text>
                <div>
                  <div className="d-flex flex-row">
                    <p>Price: 55k</p>

                    <a href="/" style={{ color: "red", marginLeft: "1rem" }}>
                      Out of Stock
                    </a>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={lapImg} />
            <Card.Body>
              <Card.Title>dell laptop</Card.Title>
              <Card.Text>
                <div>
                  <div className="d-flex flex-row">
                    <p>Price: 55k</p>

                    <a href="/" style={{ color: "red", marginLeft: "1rem" }}>
                      Out of Stock
                    </a>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={lapImg} />
            <Card.Body>
              <Card.Title>dell laptop</Card.Title>
              <Card.Text>
                <div>
                  <div className="d-flex flex-row">
                    <p>Price: 55k</p>

                    <a href="/" style={{ color: "red", marginLeft: "1rem" }}>
                      Out of Stock
                    </a>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </AdCard>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;

const AdCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  justify-items: center;
  grid-gap: 35px;

  padding: 1rem;
  @media screen and (min-width: 968px) {
    display: flex;

    justify-content: center;
  }

  @media screen and (max-width: 600px) {
    grid-gap: 26px;
    flex-direction: column;
    margin-left: 30px;
  }

  @media screen and (max-width: 335px) {
    grid-gap: 20px;
  }
`;