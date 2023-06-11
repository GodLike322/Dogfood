import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../ctx";

const Favorites = () => {
  const { userId, baseData, toggleFavorite } = useContext(Ctx);

  const handleFavoriteClick = (productId) => {
    toggleFavorite(productId);
  };

  return (
    <Container className="d-block">
      <Row className="g-4">
        <Col xs={12}>
          <h1 style={{ margin: 0, gridColumnEnd: "span 3" }}>Любимые товары</h1>
        </Col>
        {baseData
          .filter((el) => el.likes.includes(userId))
          .map((pro, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <BsCard
                img={pro.pictures}
                {...pro}
                user={userId}
                isFavorite={pro.likes.includes(userId)}
                handleFavoriteClick={() => handleFavoriteClick(pro._id)}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Favorites;
