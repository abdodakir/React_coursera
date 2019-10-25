import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Label, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors, } from 'react-redux-form';

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
};

function RenderComments({comments, addComment, dishId}) {
    if (comments != null ){
        const options = {day: 'numeric', month: 'short', year: 'numeric'};
        return(
            <div className="col-12 col-md-5 m-1" > 
                <h4>Comments</h4>
                <ul className="list-unstyled" >
                    {comments.map((comm) => {
                        const date = new Date(comm.date).toLocaleDateString('en-Us', options);
                        return (
                            <li key={comm.id}>
                                <p>{comm.comment}</p>
                                <p>-- {comm.author}, {date}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }else{
        return (
            <div></div>
        );
    }
};

const DishdetailComponent = (props) => {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
            />
        </div>
        </div>
    );
}

export default DishdetailComponent;

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    };

    render(){
        return (
            <>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"> Submit Comment</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlfor="rating">Rating</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label htmlfor="author">Your Name</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".author" 
                                        id="author"
                                        name="author" 
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Label htmlfor="comment">Comment</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            <></>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}