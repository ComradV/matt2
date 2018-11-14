// import React from 'react';
// import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
        this.handleChange = (selectedOption) => {
            this.setState({ selectedOption });
            console.log(`Option selected:`, selectedOption);
        }
    }
    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}


const e = React.createElement;


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(Selector), domContainer);