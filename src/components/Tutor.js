import React, {Component} from 'react';
import {Card, Row, Col, Image, Container} from 'react-bootstrap';
import userPhoto from '../images/user-photo.jpg';
import studentPhoto from '../images/student-photo.jpg';

class Tutor extends Component {
    constructor(props) {
        super(props);
        this.createStudentsSoFar = this.createStudentsSoFar.bind(this);
    }

    /**
     * To create student image according to tutor
     * @returns {Array}
     */
    createStudentsSoFar() {
        let _students = [];
        if (this.props.tutor !== undefined) {
            for (let i = 0; i < this.props.tutor.studentsSoFar; i++) {
                _students.push(
                  <Col key={i} xs={4} md={3}>
                    <Image key={i} src={studentPhoto} className="tutor-thumbnail"
                      alt={"Student id with: " + i} roundedCircle />
                  </Col>
                );
            }
        }

        return _students;
    }

    render() {
        return (
            <Card bg="light" className="tutor-card">
                <Card.Header className="no-padding">
                  <Card.Img variant="top" src={userPhoto} alt="User Logo" />
                </Card.Header>
                <Card.Body className="container-align-left">
                    <Container className="container-align-left no-padding">
                      <Row noGutters>
                        <Card.Title>
                          <b>
                            {this.props.tutor !== undefined ? this.props.tutor.name : ''}
                            {' '}
                            {this.props.tutor !== undefined ? this.props.tutor.surname : ''}
                          </b>
                        </Card.Title>
                      </Row>
                      <Row noGutters>
                        <Container className="container-align-left no-padding">
                          <Row noGutters>
                            <Col sm md={12} className="tutor-separator-mini">
                              <Card.Text>
                                  City
                              </Card.Text>
                            </Col>
                          </Row>
                          <Row noGutters>
                            <Col sm md={12} className="tutor-separator-mini">
                              <button className="btn outline-button" disabled>
                                      {this.props.tutor !== undefined ? this.props.tutor.city : ''}
                              </button>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                      <Row noGutters>
                        <Col sm={12}>
                          <Card.Text>
                              Students so Far
                          </Card.Text>
                        </Col>
                        <Col sm={12}>
                          <Container className="container-align-left no-padding">
                            <Row noGutters>
                              {this.createStudentsSoFar()}
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                </Card.Body>
            </Card>

        );
    }
}

export default Tutor;
