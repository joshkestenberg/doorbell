import { ListGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import directory from "../data/directory.json"
import Listing from "./Listing"
import Alert from "./CompletionAlert"
import { Person } from "../types/person"
import { useState } from "react";

const Directory: React.FC = () => {
  const [selectedFormName, setSelectedFormName] = useState<string | null> (null);
  const [showAlert, setShowAlert] = useState<boolean> (false);
  const [alertName, setAlertName] = useState<string | undefined> (undefined);
  const [alertType, setAlertType] = useState<string | undefined> (undefined);

  const alertSuccess = (name: string) => alert(name, "success")
  const alertFailure = (name: string) => alert(name, "danger")
  
  const alert = (name: string, type: string) => {
    setAlertName(name);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000)
  }

  const sortedDirectory = directory.sort((a: Person, b: Person): number => a.name.localeCompare(b.name));
  const listings = sortedDirectory.map((person: Person): JSX.Element => {
    return (
      <Listing
        person={person}
        selectedFormName={selectedFormName}
        setSelectedFormName={setSelectedFormName}
        alertSuccess={alertSuccess}
        alertFailure={alertFailure}
      />
    )
  });

  return (
    <>
      <div className="h-100 mb-5 position-absolute">
        <Row className="w-50 mx-auto">
          <Col>
            { !!showAlert && <Alert name={alertName} type={alertType}/> }
          </Col>
        </Row>
        <Row className="w-25 mx-auto">
          <Col>
            <Image src="/unit309logo.jpg" rounded fluid />
          </Col>
        </Row>
        <Row className="w-50 mx-auto mb-4">
          <Col>
            <h1 className="fw-bold text-center"> Who are you here to see? </h1>
          </Col>
        </Row>
        <Row className="w-50 mx-auto h-50 overflow-y-scroll">
          <Col>
            <ListGroup> {listings} </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  );
}
 
export default Directory;