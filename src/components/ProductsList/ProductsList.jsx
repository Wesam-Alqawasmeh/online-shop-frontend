import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "../ItemCard/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productsSlice";
import cookies from "react-cookies";

function ProductsList() {
  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.user);

  const dispatcher = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await cookies.load("token");
      if (token) {
        dispatcher(getProducts());
      }
    })();
  }, [dispatcher, user.status]);

  return (
    <Container style={{ margin: "100px auto" }}>
      <Row style={{ rowGap: "20px" }}>
        {products.map((item) => (
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ItemCard
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              category={item.category}
              id={item.id}
              owner_id={item.owner_id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsList;
