import { ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Person } from "../types/person"
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import { log } from "console";

interface Props {
  person: Person;
  selectedFormName: string | null;
  setSelectedFormName: Dispatch<SetStateAction<string | null>>;
}

const Listing: React.FC<Props> = ({ person, selectedFormName, setSelectedFormName }: Props) => {
  const currentTime = moment().format('HH:mm');
  const [time, setTime] = useState<string>(currentTime);
  const [customerName, setCustomerName] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    setSelectedFormName(selectedFormName !== person.name ? person.name : null);
  };

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
              <Button variant="primary">Check In</Button>
            </Card.Body>
          </Card>
        </Row>
      )}
    </>
  );
}

export default Listing;