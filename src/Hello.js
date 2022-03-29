import React from "react";

class Hello extends React.Component {
    render () {
        return (
            <div>
                <p>Welcome back, {this.props.name}.</p>
                <p><img title={this.props.name} alt={this.props.avatarSrc} src={this.props.avatarSrc}></img></p>
            </div>
        );
    }
}
export default Hello;

Hello.defaultProps = {
    avatarSrc: 'https://minttusardiinilumi.carrd.co/assets/images/image01.jpg?v=4e8b69b3',
};