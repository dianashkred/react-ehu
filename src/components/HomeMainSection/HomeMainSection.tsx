import { FC } from 'react';
import styled from 'styled-components';
import backgroundHome from '../../assets/background/home.svg';
import Button from '../Button/Button';
import trustpilotLogo from '../../assets/icons/trustpilot-logo.svg';
import foodImage from '/src/assets/images/home_page.png';

const HomeMainSection: FC = () => {
  return (
    <Section>
      <Content>
        <Title>
          Beautiful food & takeaway, <Highlight>delivered</Highlight> to your door.
        </Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500.
        </Description>
        <ButtonContainer>
          <Button
            label="Place an Order"
            isActive={true}
            style={{ width: '170px' }}
            onClick={() => console.log('Order button clicked')}
          />
        </ButtonContainer>
        <ReviewSection>
          <TrustpilotLogo src={trustpilotLogo} alt="Trustpilot Logo" />
          <ReviewDetails>
            <Rating>4.8 out of 5</Rating> based on 2000+ reviews
          </ReviewDetails>
        </ReviewSection>
      </Content>
      <ImageWrapper>
        <MainImage src={foodImage} alt="Food and Takeaway" />
      </ImageWrapper>
    </Section>
  );
};

export default HomeMainSection;

//#f4fcfe
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background-size: cover;
  background-position: center;
  background: url(${backgroundHome}) no-repeat  ;
  padding: 6rem 0 6rem 6rem;
`;



const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 20px;

`;

const Title = styled.h1`
  font-size: 57px;
  font-weight: 400;
  line-height: 60px;
  font-family: Inter, sans-serif;
`;

const Highlight = styled.span`
  color: #35b8be;
`;

const Description = styled.p`
  color: #546285;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TrustpilotLogo = styled.img`
  width: 110px;
  height: auto;
  margin-right: 1rem;
`;

const ReviewDetails = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Rating = styled.span`
  color: #35b8be;
  margin-right: 0.5rem;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;

`;

const MainImage = styled.img`
  height: auto;
  object-fit: cover;
`;
