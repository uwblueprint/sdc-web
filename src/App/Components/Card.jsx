import React from 'react';

export default class Card extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                This is the card
            </div>
        )
    }
}