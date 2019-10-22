import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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

function RenderComments({comments}) {
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
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}

export default DishdetailComponent;