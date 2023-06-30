import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Basket2, Plus, StarFill, Star, Heart, HeartFill, Truck, CheckCircle } from "react-bootstrap-icons";
import { Container, Row, Col, Table, Card, Button, Form } from "react-bootstrap";
import { Carousel } from 'react-bootstrap';
import BsCard from "../components/BsCard";
import Ctx from "../ctx";

const Product = ({
  discount,
    likes,
    name,
    pictures,
    price,
    tags,
    _id
 }) => {
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const { api, userId, setBaseData, basket, setBasket } = useContext(Ctx);
  const inBasket = basket.filter(el => _id === el.id).length > 0;
  const [data, setData] = useState({});
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState(0);
  const [hideForm, setHideForm] = useState(true);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const tableInfo = [
    {
      name: "wight",
      text: "Вес",
    },
    {
      name: "price",
      text: "Цена",
    },
    {
      name: "benefit",
      text: "Польза",
    },
  ];
  const reviewsSectionRef = useRef(null);

  const addReview = (e) => {
    e.preventDefault();
    api.setReview(data._id, {
      text: revText,
      rating: revRating,
    }).then((d) => {
      setData(d);
      setRevText("");
      setRevRating(0);
      setHideForm(true);
    });
  };

  const delReview = (id) => {
    api.delReview(data._id, id).then((d) => {
      console.log(data);
      setData(d);
    });
  };

  useEffect(() => {
    api.getSingleProduct(id).then((serverData) => {
      console.log(id, serverData);
      setData(serverData);
    });
  }, []);

  const delHandler = () => {
    api.delSingleProduct(id).then((data) => {
      console.log(data);
      setBaseData((prev) => prev.filter((el) => el._id !== id));
      navigate("/catalog");
    });
  };

  const getAverageRating = () => {
    const sum = data.reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / data.reviews.length;
    return average.toFixed(1);
  };

  const scrollToReviews = () => {
    reviewsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleMinusClick = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  const handlePlusClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleFavoriteClick = () => {
    setLiked(!liked);
  };

  const handlePhotoClick = () => {
    setIsPhotoExpanded(true);
  };
  
  const handleCloseClick = () => {
    setIsPhotoExpanded(false);
  };  

  const addToBasket = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBasket(prev => [...prev, {
        id: _id,
        price,
        discount,
        cnt: 1
    }])
}

  return (
    <Container style={{ gridTemplateColumns: "1fr" }}>
      <Row className="g-3">
        <Link to={`/catalog#pro_${id}`}> &lt; Назад</Link>
        {data.name ? (
          <>
            <Col xs={12}>
              <div>
                {data.author._id === userId && (
                  <Basket2 onClick={delHandler} />
                )}
              </div>
              <h1>{data.name}</h1>
              <div className="rating-reviews">
                <span>
                  Артикул: <b>2388907</b>
                </span>
                <span className="rating">
                  {[...Array(5)].map((_, index) => (
                    <StarFill
                      key={index}
                      size={20}
                      color={index < getAverageRating() ? "orange" : "gray"}
                    />
                  ))}
                </span>
                <span className="reviews">
                  (
                  <Link to={`/product/${id}`} onClick={scrollToReviews}>
                    {data.reviews.length} отзывов
                  </Link>
                  )
                </span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div style={{ position: "relative" }}>
                <img src={data.pictures} alt={data.name} className="w-100" onClick={handlePhotoClick}/>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                >
                  <Plus size={30} color="white" />
                </div>
              </div>
              {isPhotoExpanded && (
                <div className="expanded-photo">
                  <div className="close-button" onClick={handleCloseClick}>
                    &times;
                  </div>
                  <img
                    src={data.pictures}
                    alt={data.name}
                    className="expanded-photo-image"
                  />
                </div>
              )}
            </Col>
            <Col xs={12} md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className={`${data.discount ? "text-danger" : "text-secondary"} fw-bold fs-1`}>
                  {Math.ceil(data.price * (100 - data.discount) / 100)} ₽
                </h2>
                <div class="number">
                  <div className="number-controls">
                    <button className="number-minus" type="button" onClick={handleMinusClick}>
                      -
                    </button>
                    <button className="number-plus" type="button" onClick={handlePlusClick}>
                      +
                    </button>
                  </div>
					        <input type="number" min="0" value={quantity} readOnly style={{fontWeight: "bold"}}/>
					      </div>
                <Button className="w-100" style={{ color: "black", background: "#ffe44d", maxWidth: "6cm", borderRadius: "50px", fontWeight: "bold", border: "2px solid #ffe44d" }}
                disabled={inBasket}
                onClick={addToBasket}>
                  В корзину
                </Button>
                <div className="d-flex align-items-center" style={{color: "#000", color: "rgba(0, 0, 0, 0.5)", paddingTop:"15px"}}>
                  {liked ? (
                    <HeartFill
                      className="me-2"
                      size={24}
                      color="red"
                      onClick={handleFavoriteClick}
                    />
                  ) : (
                    <Heart
                      className="me-2"
                      size={24}
                      color="rgba(0, 0, 0, 0.5)"
                      onClick={handleFavoriteClick}
                    />
                  )}
                  В избранное
                </div>
                <div className="delivery-block" style={{ position: 'relative' }}>
                  <div className="delivery-icon" style={{ position: 'absolute', top: 10, left: 5 }}>
                    <Truck size={32} color="gray" />
                  </div>
                  <div className="delivery-text">
                    Доставка по всему Миру
                    <br/>
                    <span style={{ fontWeight: '300', display: 'block', marginTop: '10px' }}>
                      Доставка курьером — <span style={{ fontWeight: 'bold' }}>от 399 ₽</span>
                    </span>
                    <span style={{ fontWeight: '300', display: 'block', marginTop: '10px' }}>
                      Доставка в пункт выдачи — <span style={{ fontWeight: 'bold' }}>от 199 ₽</span>
                    </span>
                  </div>
                </div>
                <div className="verification-block" style={{ position: 'relative' }}>
                  <div className="verification-icon" style={{ position: 'absolute', top: 10, left: 5 }}>
                    <CheckCircle size={32} color="gray" />
                  </div>
                  <div className="verification-text">
                    Гарантия качества
                    <br />
                    <span style={{ fontWeight: '300', display: 'block', marginTop: '10px' }}>
                      Если Вам не понравилось качество нашей продукции, мы вернём деньги, либо <br /> сделаем всё возможное, чтобы удовлетворить ваши нужды.
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col
              xs={12}
              md={6}
              className={`${
                data.discount ? "text-danger" : "text-secondary"
              } fw-bold fs-1`}
            >
              <div className="description">
                <h4 style={{color: "black", fontWeight: "bold"}}>Описание</h4>
                <p style={{fontWeight: "300", fontSize: "15px"}}>{data.description}</p>
              </div>
            </Col>
            <Col xs={12}>
              <Table> 
                <h4 style={{color: "black", fontWeight: "bold"}}>Характеристики</h4>
                <tbody>
                  {tableInfo.map((el, i) => (
                    <tr key={i}>
                      <th className="fw-normal text-secondary small w-25">
                        {el.text}
                      </th>
                      <td>
                        {el.name === "author" ? (
                          <>
                            <span className="me-3">
                              Имя: {data[el.name].name}
                            </span>
                            <span>Адрес: {data[el.name].email}</span>
                          </>
                        ) : (
                          data[el.name]
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <h4 ref={reviewsSectionRef} style={{color: "black", fontWeight: "bold", paddingBottom: "10px"}}>Отзывы</h4>
              {hideForm && (
                  <Col>
                    <Button
                      onClick={() => setHideForm(false)}
                      style={{
                        background: "white",
                        color: "black",
                        borderRadius: "30px",
                        border: "1px solid gray",
                        fontWeight: "bold"
                      }}
                    >
                      Написать отзыв
                    </Button>
                  </Col>
                )}
                <h5 style={{paddingTop:"10px", fontWeight: "bold"}}>Фотографии наших покупателей</h5>
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="C:/Users/user/Downloads/lk12-dogfood-master/lk12-dogfood-master/src/assents/images/food1.png"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="C:/Users/user/Downloads/lk12-dogfood-master/lk12-dogfood-master/src/assents/images/food1.png"
                          alt="Second slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                {!hideForm && (
                  <Col xs={12} className="mt-5">
                    <h3>Новый отзыв</h3>
                    <Form onSubmit={addReview}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="rating">Рейтинг (0-5)</Form.Label>
                        <Form.Control
                          type="number"
                          id="rating"
                          min="0"
                          max="5"
                          step="0.5"
                          value={revRating}
                          onChange={(e) => setRevRating(parseFloat(e.target.value))}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="text">Текст отзыва</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="text"
                          rows={3}
                          value={revText}
                          onChange={(e) => setRevText(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="warning" type="submit">
                        Добавить отзыв
                      </Button>
                    </Form>
                  </Col>
                )}
              <Row className="g-3" style={{ paddingTop: "30px" }}>
                {data.reviews.map((el) => (
                  <Col xs={12} sm={6} md={4} key={el._id}>
                    <Card className="h-100">
                      <Card.Body>
                        <span className="d-flex w-100 align-items-center mb-2">
                          <span
                            style={{
                              width: "30px",
                              height: "30px",
                              display: "block",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundImage: `url(${el.author.avatar})`,
                              marginRight: "1rem",
                              borderRadius: "50%",
                            }}
                          />
                          <span>{el.author.name}</span>
                        </span>
                        <span>{new Date(el.createdAt).toLocaleDateString()}</span>
                        <Card.Title>
                          {[...Array(5)].map((_, index) => (
                            <span key={index}>
                              {index < el.rating ? (
                                <StarFill className="text-warning" />
                              ) : (
                                <Star className="text-warning" />
                              )}
                            </span>
                          ))}
                        </Card.Title>
                        <Card.Text className="fs-6 text-secondary">
                          {el.address}
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary">
                          {el.text}
                        </Card.Text>
                        {el.author._id === userId && (
                          <span className="text-danger position-absolute end-0 bottom-0 pe-3 pb-2">
                            <Basket2 onClick={() => delReview(el._id)} />
                          </span>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </>
        ) : (
          <Col>
            <p>Загрузка...</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Product;
