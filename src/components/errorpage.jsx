import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function WithHeaderStyledExample() {
  return (
    <div className="errorboundrypageparemt">
      <Card className="errorboundrypage">
        <Card.Header as="h5">ارور</Card.Header>
        <Card.Body>
          <Card.Title>در صفحه مشکلی به وجود اومده </Card.Title>
          <Card.Text>لطفا صبور باشید</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default WithHeaderStyledExample;
