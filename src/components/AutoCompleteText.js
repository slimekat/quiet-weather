import React from "react";
// import './AutoCompleteText.css';
export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 3) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }));
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)} key={item}>{item}</li>)}
            </ul>
        );
    }

    onSubmit(e){
        e.preventDefault();
        this.props.getWeather(this.state.text);
        this.setState(() =>({
            text:'',
            suggestions:[],
        }))
    }

    render() {
        const { text } = this.state;
        // const { getWeather } = this.props;
        return (
            <div className="AutoCompleteText">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input value={text} onChange={this.onTextChanged} placeholder="City..." type="text" />
                    {this.renderSuggestions()}
                    <button className="AutoCompleteText__submit-btn">Get Weather</button>
                </form>
            </div>

        )
    };
}

// export default AutoCompleteText;