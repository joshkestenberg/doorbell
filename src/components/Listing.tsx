import { ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Person } from "../types/person"
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import moment from 'moment';

interface Props {
  person: Person;
  selectedFormName: string | null;
  setSelectedFormName: Dispatch<SetStateAction<string | null>>;
  alertSuccess: (name: string) => void;
  alertFailure: (name: string) => void;
}

const Listing: React.FC<Props> = ({ person, selectedFormName, setSelectedFormName, alertSuccess, alertFailure }: Props) => {
  const currentTime = moment().format('HH:mm');
  const [time, setTime] = useState<string>(currentTime);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const twilioLambdaBaseUrl = "https://jahqgbuyjfxwpdvvqjmabctzla0bquye.lambda-url.us-east-2.on.aws/"  
  
  const handleClick = (e: React.MouseEvent) => {
    setSelectedFormName(selectedFormName !== person.name ? person.name : null);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    sendSms(person.phone, customerName, time);
    setSelectedFormName(null);
    setTime(currentTime);
    setCustomerName(null)
  };

  const sendSms = (phone: string, name:  string | null, time: string) => {
    fetch(twilioLambdaBaseUrl + `?number=${phone}&name=${name}&time=${time}`)
      .then(response => {
        if (response.ok) { 
          alertSuccess(person.name)
        } else {
          throw response
        }
      })
      .catch(_err => alertFailure(person.name));
  }

  useEffect(() => {
    if (selectedFormName === person.name && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [selectedFormName]);

  return (
    <>
      <ListGroupItem className="text-center py-3" onClick={handleClick}>
        {person.name}
      </ListGroupItem>
      {selectedFormName === person.name && (
        <Row className="justify-content-center">
          <Card ref={cardRef} className='w-75 bg-light my-3 text-center justify-content-center'>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="name" className="w-50 mx-auto" onChange={(e) => setCustomerName(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Time Of Appointment</Form.Label>
                    <Form.Control
                      type="time"
                      className="w-50 mx-auto"
                      defaultValue={time}
                      onChange={(e) => setTime(e.target.value)}
                      step={900}
                    />
                  </Form.Group>
                </Form>
              </Card.Text>
              <Button
                variant="primary"
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(event)}
              >Check In</Button>
            </Card.Body>
          </Card>
        </Row>
      )}
    </>
  );
}

export default Listing;