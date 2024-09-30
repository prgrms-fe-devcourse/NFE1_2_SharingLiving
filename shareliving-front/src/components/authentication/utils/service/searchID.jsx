import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class search_id extends Component {
  render() {

    return (
        <div>
            <Modal visible={this.props.search_id_modal} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
                This is Search ID
            </Modal>
        </div>
    );
  }
}

export default search_id;