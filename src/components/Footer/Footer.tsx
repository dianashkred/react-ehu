import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoIcon from '../../assets/icons/logo.svg';
import instagramIcon from '../../assets/icons/social-instagram.svg';
import twitterIcon from '../../assets/icons/social-twitter.svg';
import youtubeIcon from '../../assets/icons/social-youtube.svg';

const FooterContainer = styled.footer`
  height: 590px;
  padding: 6rem;
  background-color: var(--background-color-footer);
  position: relative;
  overflow: hidden;
  background-image: var(--background-footer);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;

`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  align-items: flex-start;
  gap: 15rem;
`;

const FooterLogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterLogo = styled.img`
  height: 50px;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: var(--text-color);
  line-height: 1.5;
  margin-top: 0.5rem;
  font-size: 16px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.36px;
  text-align: start;
  margin: 0;
  max-width: 240px;
`;

const FooterLinksSection = styled.div`
  display: flex;
  gap: 5rem;
  flex: 2;
  justify-content: space-between;
`;

const FooterLinksGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.p`
  color: var(--text-color-black);
  font-size: 13px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  line-height: 20px;
  letter-spacing: 1.5px;
  font-weight: 400;
`;

const FooterLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  line-height: 20px;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 28px;
  transition: all 0.2s ease-in;

  &:hover {
    color: var(--text-color-hover);
  }
`;

const FooterLinkBottom = styled(Link)`
  color: var(--text-color-turquoise);
  text-decoration: none;

 &:hover {
    color: var(--text-color-hover);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 3rem;
  border-top: 1px solid #ddd;
  color: var(--text-color-footer-bottom);
  font-size: 0.9rem;
  margin-top: 70px;

`;

const FooterBottomText = styled.p`
  margin: 0;
  color: var(--text-color-footer-bottom);
  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-icon);
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;
  background-color: var(--background-color-icon);


  &:hover {
    background-color: none;
    transform: scale(1.1);
    opacity: 1;
  }
`;
const SocialIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogoSection>
          <FooterLogo src={logoIcon} alt="Logo" />
          <FooterDescription>
            Takeaway & Delivery template for small - medium businesses.
          </FooterDescription>
        </FooterLogoSection>
        <FooterLinksSection>
          <FooterLinksGroup>
            <FooterHeading>Company</FooterHeading>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="order">Order</FooterLink>
            <FooterLink to="#">FAQ</FooterLink>
            <FooterLink to="#">Contact</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Template</FooterHeading>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Style Guide
            </FooterLink>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Changelog
            </FooterLink>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Licence
            </FooterLink>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Webflow University
            </FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Flowbase</FooterHeading>
            <FooterLink to="#">More Cloneables</FooterLink>
          </FooterLinksGroup>
        </FooterLinksSection>
      </FooterContent>
      <FooterBottom>
        <FooterBottomText>
          Built by <FooterLinkBottom to="#">Flowbase</FooterLinkBottom> · Powered by{' '}
          <FooterLinkBottom to="#">Webflow</FooterLinkBottom>
        </FooterBottomText>
        <SocialIcons>
          <SocialIconLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={instagramIcon} alt="Instagram" />
          </SocialIconLink>
          <SocialIconLink href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={twitterIcon} alt="Twitter" />
          </SocialIconLink>
          <SocialIconLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={youtubeIcon} alt="YouTube" />
          </SocialIconLink>
        </SocialIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;