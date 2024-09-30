import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class search_pw extends Component {
  render() {

    return (
        <div>
            <Modal visible={this.props.search_pw_modal} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
                This is Search PW
            </Modal>
        </div>
    );
  }
}

export default search_pw;