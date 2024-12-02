import React from 'react';
import styled from 'styled-components';

const HomeMainSection = () => {
  return (
    <Section>
      <Content>
        <Title>
          Beautiful food & takeaway, <Highlight>delivered</Highlight> to your door.
        </Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
        </Description>
        <Button>Place an Order</Button>
        <Review>
          <Star>⭐</Star>
          <ReviewText>4.8 out of 5 based on 2000+ reviews</ReviewText>
        </Review>
      </Content>
      <ImageWrapper>
        <MainImage src="/src/assets/images/home_page.png" alt="Food" />
      </ImageWrapper>
    </Section>
  );
};

export default HomeMainSection;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  flex-wrap: wrap;
`;

const Content = styled.div`
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  line-height: 1.4;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Highlight = styled.span`
  color: #00bfa6;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1rem;
  background-color: #00bfa6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #009b8a;
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Star = styled.span`
  font-size: 1.5rem;
  color: #ffcc00;
  margin-right: 10px;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 45%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 30px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
`;
