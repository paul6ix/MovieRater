import React, {Component} from "react";


class Footer extends Component {
    state = {
        year: "",
        age: 25
    }

    componentDidMount() {
        this.setState({year: '1995'})
    }

    changed = (evt) => {
        this.setState({year: evt.target.value})
    }

    render() {
        return <div>
            <h3>Copyrights | All rights reserved</h3>
            <input type="text" value={this.state.year} onChange={this.changed}/>
        </div>

    }
}

export {Footer}