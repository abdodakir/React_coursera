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
            return comments.map((comm) => {
                const options = {day: 'numeric', month: 'short', year: 'numeric'};
                const date = new Date(comm.date).toLocaleDateString('en-Us', options);
                return (
                    <li key={comm.id} className="mb-3">
                        {comm.comment}
                        <div className="mt-3">
                            -- {comm.author}, {date}
                        </div>
                    </li>
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
                            <ul className="list-unstyled">
                                {this.renderComments(dish.comments)}
                            </ul>
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