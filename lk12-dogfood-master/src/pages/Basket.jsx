import { useState, useContext, Fragment } from "react";
import { Container, Row, Col, Table, ButtonGroup, Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import Ctx from "../ctx";
import { Link } from "react-router-dom";

const Basket = () => {
  const { basket, setBasket, baseData } = useContext(Ctx);
  const ids = basket.map((b) => b.id);
  const filteredData = baseData.filter((el) => ids.includes(el._id));

  const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0);
  const sumDiscount = basket.reduce(
    (acc, el) => acc + (el.price * el.cnt * ((100 - el.discount) / 100)),
    0
  );
  const inc = (id) => {
    setBasket((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.cnt++;
        }
        return el;
      })
    );
  };
  const dec = (id) => {
    setBasket((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.cnt--;
        }
        return el;
      })
    );
  };
  const del = (id) => {
    setBasket((prev) => prev.filter((el) => el.id !== id));
  };

  const renderBasketItems = () => {
    return basket.map((el) => (
      <tr key={el.id}>
        {filteredData
          .filter((f) => f._id === el.id)
          .map((d) => (
            <Fragment key={d._id}>
              <td className="align-middle">
                <img src={d.pictures} alt={d.name} height="38px" />
              </td>
              <td className="align-middle">
                <Link to={`/product/${el.id}`}>{d.name}</Link>
              </td>
              <td className="align-middle">
                <ButtonGroup>
                  <Button
                    variant="warning"
                    disabled={el.cnt === 1}
                    onClick={() => dec(el.id)}
                  >
                    -
                  </Button>
                  <Button variant="light" disabled>
                    {el.cnt}
                  </Button>
                  <Button variant="warning" onClick={() => inc(el.id)}>
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td className="align-middle">
                <Trash3
                  onClick={() => del(el.id)}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="align-middle">{el.price} ₽</td>
              <td style={{ verticalAlign: "middle" }}>
                {el.discount > 0 ? (
                  <>
                    <span className="text-danger">
                      {Math.ceil(
                        el.price * el.cnt * ((100 - el.discount) / 100)
                      )}{" "}
                      ₽
                    </span>
                    <del className="ms-2 small text-secondary d-inline-block">
                      {el.price * el.cnt} ₽
                    </del>
                  </>
                ) : (
                  <span>{el.price * el.cnt} ₽</span>
                )}
              </td>
            </Fragment>
          ))}
      </tr>
    ));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          {basket.length === 0 ? (
            <div className="text-center">
              <h1 className="fw-bold">0 товаров в корзине</h1>
              <FontAwesomeIcon
                icon={faFrown}
                style={{ color: "#808080", fontSize: "48px" }}
              />
              <p className="fw-bold">В корзине нет товаров</p>
              <p>
                Добавьте товар, нажав на кнопку "В корзину" в карточке товара
              </p>
              <Button
                as={Link}
                to="/"
                style={{
                  color: "black",
                  background: "#fff",
                  maxWidth: "6cm",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  border: "1px solid #808080",
                }}
              >
                На главную
              </Button>
            </div>
          ) : (
            <div>
              <h1 className="text-center">4 товара в корзине</h1>
              <Table>
                <tbody>{renderBasketItems()}</tbody>
                <tfoot>
                  
                </tfoot>
              </Table>
            </div>
          )}
        </Col>
        <Col md={4}>
          <div className="blog-block">
            <h4>Ваш заказ</h4>
            <p>Общая стоимость:</p>
            <p className="fw-bold">
              {sumDiscount === sum ? (
                <span>{sum} ₽</span>
              ) : (
                <>
                  <span className="text-danger">
                    {Math.ceil(sumDiscount)} ₽
                  </span>
                  <del className="ms-2 small text-secondary d-inline-block">
                    {sum} ₽
                  </del>
                </>
              )}
            </p>
            {/* Здесь можете добавить дополнительное содержимое блока "Ваш заказ" */}
            <Button variant="warning" className="w-100 mt-3">
              Оформить заказ
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;
