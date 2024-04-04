import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../base.css";

const ScrollableCards = () => {
  // Dummy data for scrollable cards
  const cards = [
    {
      id: 1,
      title: "Assignment 1",
      description: "Description for Assignment 1",
    },
    {
      id: 2,
      title: "Assignment 2",
      description: "Description for Assignment 2",
    },
    {
      id: 3,
      title: "Assignment 3",
      description: "Description for Assignment 3",
    },
    {
      id: 4,
      title: "Assignment 4",
      description: "Description for Assignment 4",
    },
    {
      id: 5,
      title: "Assignment 5",
      description: "Description for Assignment 5",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Scrollable Cards</h2>
      <Row>
        {cards.map((card) => (
          <Col key={card.id} sm={6} md={4} lg={3}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ScrollableCards;
