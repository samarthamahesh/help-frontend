import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { view } from 'react-easy-state';

import { UIActions, UIStore } from "../stores/ui";
import * as api from "../api";


export const SubmitRequestModal = view(() => {

    const languages = ["English", "Telugu", "Hindustani"];
    const services = ["Medical Emergency", "Grocery", "Food", "Money", "Utilities"];

    const [citizenName, setCitizenName] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const [service, setService] = useState(services[0]);
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [requestID, setRequestID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitRequest = async () => {
        let requestID: string;
        try {
            requestID = await api.submitRequest(citizenName, language, service, address, comment);
        } catch (e) {
            return setErrorMessage(e.response.data || e.statusText || e.status);
        }
        setErrorMessage('');
        setRequestID(requestID);
    };

    return (
        <Modal show={UIStore.activeModal === "submit"} onHide={UIActions.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Submit Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    { errorMessage && <Alert variant="danger">{ errorMessage }</Alert> }
                    <Form.Group>
                        <Form.Label>Citizen Name</Form.Label>
                        <Form.Control type="text" placeholder="Who needs help" value={citizenName}
                                      onChange={(e: any) => setCitizenName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Language</Form.Label>
                        <Form.Control as="select"
                                      onChange={(e: any) => setLanguage(e.target.value)}>
                            {languages.map(l => <option key={l} value={l}>{l}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Service</Form.Label>
                        <Form.Control as="select" value={service}
                                      onChange={(e: any) => setService(e.target.value)}>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" placeholder="Address" value={address}
                                      onChange={(e: any) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" placeholder="Additional notes" value={comment}
                                      onChange={(e: any) => setComment(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                { requestID &&
                <Alert className="w-100 text-center" variant="success">
                    { `Request ${requestID} submitted! :)` }
                </Alert> }
                { !requestID && <Button variant="success" onClick={submitRequest}>Submit Request</Button> }
             </Modal.Footer>
        </Modal>
    )
});