import React, {Component} from 'react';
import {Button, Row, Col, CardGroup, Container, ButtonGroup} from 'react-bootstrap';
import Tutor from './Tutor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllTutors, filterTutorsByCity, setTutors} from '../actions';
import _ from 'lodash';

class TutorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortedName: true,
            sortedCity: false,
            filterBy: '',
            show: 8
        };
        this.createCardRows = this.createCardRows.bind(this);
        this.createFilterByButtons = this.createFilterByButtons.bind(this);
    }

    /**
     * To get all tutors
     */
    componentWillMount() {
        this.props.getAllTutors();

    }

    /**
     * To create buttons for filter according to city
     * @returns {*}
     */
    createFilterByButtons() {
        let lst = _.cloneDeep(this.props.cityList);
        let _filterButtonList = [];
        for (let i = 0; i < lst.length; i++) {
            _filterButtonList.push(
                <Button key={lst[i]} name={lst[i]}
                        className="default-btn-color"
                        onClick={(e) => this.filterBy(e, lst[i])}>
                    {lst[i]}
                </Button>
            );
        }
        return <ButtonGroup>{_filterButtonList}</ButtonGroup>;

    }

    /**
     * To create tutor cards
     * @returns {Array}
     */
    createCardRows() {
        let cards = [];
        let _arry = _.cloneDeep(this.props.filteredTutors);

        // only show upto the current limit
        let allData = _arry.length;
        let showUntil = allData <= this.state.show ? allData : this.state.show;

        // Adaptively decide the width of the columns
        for (let i = 0; i < showUntil; i++) {
            cards.push(
                <Col lg={3} key={i} xs={12} sm={6} md={3}>
                    <Tutor tutor={this.props.filteredTutors[i]}/>{' '}<br/>
                </Col>
            );
        }

        return cards;
    }

    /**
     * Filter method for filtering according to city
     * @param _city
     */
    filterBy(event, _city) {
        let el = event.target;

        let _newList = [];

        // Remove current filter if already clicked
        if (this.state.filterBy === _city) {
            _newList = _.cloneDeep(this.props.tutorList);
            this.props.filterTutorsByCity(_newList);

            this.setState({
                filterBy: ''
            });

            el.classList.remove('active');
        } else {
            let _tutorList = _.cloneDeep(this.props.tutorList);
            _newList = _tutorList.filter(function (item) {
                return item.city === _city;
            });

            this.setState({
                filterBy: _city
            });

            // Remove active state of other button and set the current as active
            let activeFilterDOMElements = el.parentElement.getElementsByClassName("active");
            if (activeFilterDOMElements.length > 0) {
                activeFilterDOMElements[0].classList.remove('active');
            }

            el.classList.add('active');
        }

        this.props.filterTutorsByCity(_newList);
    }

    /**
     * Sort method for sorting by name and city
     * @param _param
     */
    sortBy(_param) {
        let _list = _.cloneDeep(this.props.filteredTutors);
        let _newSortedList = _list.sort((a, b) => (a[_param] > b[_param]) ? 1 : -1);
        _param === 'name' ? this.setState({sortedName: true, sortedCity: false}) : this.setState({
            sortedName: false,
            sortedCity: true
        });
        this.props.filterTutorsByCity(_newSortedList);
    }

    /**
     * To get all Tutor list
     */
    getAllData() {
        if (this.state.filterBy !== '') {
            let _activeFilteredButtons = document.getElementsByName(this.state.filterBy);
            _activeFilteredButtons[0].classList.remove('active');
        }

        this.setState({
            filterBy: '',
            show: this.props.tutorList.length
        });

        this.props.getAllTutors();
    }

    render() {
        return (
            <Container className="wide-container">
                <Row noGutters>
                    <Col sm={1}></Col>
                    <Col sm={10} className="tutor-info">
                        <h3><b>Our Tutors</b></h3>
                        <h6>We have more than 100 tutors from various disciplines ready to match with you.</h6>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row noGutters>
                    <Container className="wide-container">
                        <Row noGutters>
                            <Col sm={12}>

                                <Row noGutters className="tutor-separator">
                                    <Col md={6} sm={12} xs={12} xl={6}>
                                        <Container className="container-align-filter tutor-separator">
                                            <Row noGutters>
                                                <div className="form-inline">
                                                    <div className="form-group">
                                                <span className="label-font table-header-label "
                                                > Filter by:</span>
                                                    </div>
                                                    <div className="form-group">
                                                        {this.createFilterByButtons()}
                                                    </div>
                                                </div>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col md={6} sm={12} xs={12} xl={6}>
                                        <Container className="container-align-sort tutor-separator">
                                            <Row noGutters>
                                                <div className="form-inline">
                                                    <div className="form-group">
                                                <span className="label-font table-header-label "
                                                > Sort by:</span>
                                                    </div>
                                                    <div className="form-group">
                                                        <ButtonGroup>
                                                            <Button
                                                                className={this.state.sortedName ? 'btn btn-success' : 'default-btn-color'}
                                                                onClick={() => this.sortBy('name')}>Name</Button>
                                                            <Button
                                                                className={this.state.sortedCity ? 'btn btn-success' : 'default-btn-color'}
                                                                onClick={() => this.sortBy('city')}>City</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                                <hr className="horizontal-divider"/>
                            </Col>
                        </Row>
                        <Row noGutters>
                            <Col sm={12}>
                                <CardGroup>
                                    {this.createCardRows()}
                                </CardGroup>
                            </Col>
                        </Row>
                        <Row noGutters className="tutor-separator">
                            <Col sm={12}>
                                <div>
                                    <Button className="default-btn-color" onClick={() => this.getAllData()}>See all
                                        Tutors</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        tutorList: state.tutors.tutorList,
        filteredTutors: state.tutors.filteredTutorList,
        cityList: state.tutors.cityList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTutors,
        filterTutorsByCity,
        setTutors
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TutorList);
