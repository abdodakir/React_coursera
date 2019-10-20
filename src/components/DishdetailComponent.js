import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishdetailComponent extends Component {
    constructor(props){
        super(props);
    };

    renderDish = (dish) => {
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

    renderComments = (comments) => {
        if (comments.length > 0 ){
            console.log(comments)
            return comments.map((comm) => {
                return (
                    <div key={comm.id}>
                        <CardText>{comm.comment}</CardText>
                        <CardText>{"-- "+comm.author}, {new Date(comm.date).toDateString()}</CardText>
                        <CardText></CardText>
                    </div>
                );
            })
        }else{
            return (
                <div></div>
            );
        }
    };

    render() {
        const dish = this.props.dish;
        return (
            <div className="row" >
                {dish !== null ? 
                    <>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(dish.comments)}
                        </div>
                    </>
                :
                    <div></div>
                }
            </div>
        );
    }
}

export default DishdetailComponent;