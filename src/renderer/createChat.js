const React = require('react')
const {ipcRenderer} = require('electron')

const Back = require('./back')

class CreateChat extends React.Component {
  handleError (err) {
    this.setState({error: err.message})
  }

  shouldComponentUpdate (nextProps, nextState) {
    // we don't care about the props for now, really.
    return (this.state !== nextState)
  }

  createContact () {
    this.props.changeScreen('CreateContact')
  }

  chooseContact (contact) {
    var chatId = ipcRenderer.sendSync('dispatchSync', 'createChatByContactId', contact.id)
    if (!chatId) return this.handleError(new Error(`Invalid contact id ${contact.id}`))
    this.props.changeScreen('ChatView', {chatId})
  }

  render () {
    const {deltachat} = this.props

    return (
      <div>
        <div>
          <Back onClick={this.props.changeScreen} />
          <button onClick={this.createContact.bind(this)}>Create Contact</button>
        </div>
        <div>
          {deltachat.contacts.map((contact) => {
            return (<div onClick={this.chooseContact.bind(this, contact)}>
              {contact.nameAndAddr}
            </div>)
          })}
        </div>
      </div>
    )
  }
}
module.exports = CreateChat
