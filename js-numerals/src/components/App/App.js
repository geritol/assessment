import React, { Component } from "react"

import { spellOutNumber } from "../../logic/spellOutNumber"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 0, spelledOutValue: "" }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ value: parseInt(event.target.value, 10) })
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      const spelledOutValue = spellOutNumber(this.state.value)
      this.setState({ error: "", spelledOutValue })
    } catch (error) {
      this.setState({ error: error.message, spelledOutValue: "" })
    }
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            value={String(this.state.value)}
            onChange={this.handleChange}
          />
          <button type="submit">Spell Out</button>
        </form>
        <div>{this.state.error || this.state.spelledOutValue}</div>
      </div>
    )
  }
}

export default App
