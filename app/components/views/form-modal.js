import React from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const FormModal = React.createClass({
    render: function(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {this.props.children}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

export default FormModal;