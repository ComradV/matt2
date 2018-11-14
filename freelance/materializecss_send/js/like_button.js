'use strict';



const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        }
        this.handleChange = (selectedOption) => {
            this.setState({ selectedOption });
            console.log(`Option selected:`, selectedOption);
        }
    }
    
    render() {
        const { selectedOption } = this.state;
        const { handleChange } = this;

        return (
            e('Select', {
                value:selectedOption,
                onChange:handleChange,
                options
            })
        );
    }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(Selector), domContainer);