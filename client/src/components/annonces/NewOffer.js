import React, { Component } from 'react'
import { Button,Form, Modal, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addOffer } from '../../actions/offerActions'


export class NewOffer extends Component {
    constructor(props){
        super(props);
        this.state = {
            prix: 0,
            message: ''
        };
    }

    handleSubmit = () => {
        this.props.onclose();
        const offer = {
          prix: this.state.prix,
          message: this.state.message,
          user: this.props.user,
          annonce: this.props.annonce._id
        }
     
        this.props.addOffer(offer, this.props.annonce.user._id);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
    return (
      <div>
        <Modal dimmer={'blurring'} open={this.props.open} onClose={this.close}>
          <Modal.Header>
              Placer une offre
          </Modal.Header>
          <Modal.Content>
              <Form>
                <Form.Group>
                  <Input
                      label={{ basic: true, content: 'DH' }}
                      labelPosition='right'
                      placeholder='Votre prix'
                      name="prix"
                      onChange={this.onChange}
                  />
                </Form.Group>
                    <Form.TextArea label="Message" name="message" placeholder="Votre message.." onChange={this.onChange}></Form.TextArea>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.props.onclose}>
              Annuler
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Confirmer"
              onClick={this.handleSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {addOffer})(NewOffer)
