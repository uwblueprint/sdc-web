import React from 'react';

export default class Card extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                flow chart {this.props.data.id}
            </div>
        )
    }
}