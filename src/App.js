import React, {Fragment} from 'react';
import logo from './images/tutormatch-logo.png';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './styles/App.css';
import TutorList from './components/TutorList';


function App() {
    return (
        <Fragment>
            <Row className="header" noGutters>
              <Container className="no-padding wide-container">
                <Row className="header" noGutters>
                  <Col xs={6} className="container-align-left">
                    <img className="logo-image" src={logo} alt="logo"/>
                  </Col>
                  <Col xs={6} className="container-align-right">
                    <div className="column-right column-side">
                        <span className="tutor-separator">Become a Tutor</span>  {' '}
                        <Button variant="outline-dark">Sign In</Button>
                    </div>
                  </Col>
                </Row>
                <Row className="header" noGutters>
                  <Col xs={12}>
                    <div className="title card-header-separator">
                      <h2><b>The place where Tutors and Students meet</b></h2>
                    </div>
                    <div className="description card-header-separator">
                      <h6>Find out who can help you take your education to the next level.</h6>
                    </div>
                    <div className="button">
                      <Button variant="success">Get started now</Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
            <Row className="body" noGutters>
                <TutorList />
            </Row>
            <Row className="footer" noGutters></Row>
        </Fragment>
    );
}


export default App;
