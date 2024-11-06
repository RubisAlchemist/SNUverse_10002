import React, { useState, useRef } from "react";
//import { Box, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "@components/index";
import homeImage from "@assets/images/homeImage.png";
import styled, { keyframes } from "styled-components";
//import { Container } from '@mui/material';

import transitionVideo from "@assets/videos/SNUVERSE_home.mp4";

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ResponsiveImage = styled.img`
  /* max-height: 150px; */
  /* max-width: 700px; */
  object-fit: cover;
  margin-bottom: 20px;

  @media all and (min-width: 1280px) {
    max-height: 400px;
  }

  /* 노트북 & 테블릿 가로 (해상도 1024px ~ 1279px)*/
  @media all and (min-width: 1024px) and (max-width: 1279px) {
    max-height: 400px;
  }

  /* 테블릿 가로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    max-height: 250px;
  }

  /* 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    max-height: 250px;
  }

  /* 모바일 가로 (해상도 ~ 479px)*/
  @media all and (min-width: 376px) and (max-width: 479px) {
    max-height: 230px;
  }

  @media all and (max-width: 376px) {
    max-height: 150px;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  const [isTransitioning, setIsTransitioning] = useState(false); // 전환 상태 관리
  const videoRef = useRef(null); // 비디오 참조

  const onClickNavigate = () => {
    setIsTransitioning(true); // 버튼 클릭 시 전환 상태 활성화
  };

  const handleVideoEnded = () => {
    navigate("/ai-consultEntry"); // 영상 재생 완료 시 네비게이션
  };

  // const onClickNavigate = () => navigate("/AvatarChoosePage");
  //const onClickNavigate = () => navigate("/ai-consultEntry");
  const onClickLogo = () => navigate("/");

  return (
    <Container>
      <Header />
      <Content>
        <AnimatedText>
          🌈 마음의 상처를 치유할 시간💡
          <br />
          여기서 잠시 머물러 쉬어가세요
        </AnimatedText>
        <ResponsiveImage src={homeImage} alt="Home Image" />
        <ActionButton onClick={onClickNavigate}>
          AI 심리상담소 입장하기
        </ActionButton>
      </Content>
      <Footer />

      {/* 비디오 미리 로드 */}
      <video style={{ display: "none" }} src={transitionVideo} preload="auto" />

      {/**메타버스 */}
      {isTransitioning && (
        <VideoOverlay>
          <TransitionVideo
            ref={videoRef}
            src={transitionVideo}
            autoPlay
            onEnded={handleVideoEnded}
            controls={false}
          />
        </VideoOverlay>
      )}
      {/**메타버스 */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  //background-color: yellow;
  //padding-top: HEADER_HEIGHT;
  height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1; /* 남은 공간을 차지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //position: relative; /* AnimatedText의 애니메이션을 위한 상대 위치 */
  //padding: 20px; /* 필요에 따라 패딩 조정 */
  //background-color: pink;
`;

const AnimatedText = styled.div`
  //font-size: 30px;
  font-weight: 800;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  //transform: translate(-50%, -50%);
  text-align: center;
  margin-bottom: 20px;
  //position: absolute;
  //left: 50%;
  //top: 15vh;
  //width: 100%;
  /* margin-bottom: 50px;
  margin-top: 30px; */
  cursor: default;
  letter-spacing: 1px;

  @media all and (min-width: 1280px) {
    font-size: 30px;
    //margin-top: 120px;
  }

  /* 노트북 & 테블릿 가로 (해상도 1024px ~ 1279px)*/
  @media all and (min-width: 1024px) and (max-width: 1279px) {
    font-size: 28px;
    //margin-top: 100px;
  }

  /* 테블릿 가로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 25px;
    //margin-top: 60px;
  }

  /* 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 22px;
    margin-top: 50px;
  }

  /* 모바일 가로 (해상도 ~ 479px)*/
  @media all and (min-width: 376px) and (max-width: 479px) {
    font-size: 18px;
    margin-top: 40px;
  }

  @media all and (max-width: 376px) {
    font-size: 16px;
    margin-top: 40px;
  }
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  background-color: #1976d2; /* 원하는 색상으로 변경 */
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  //font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, background-color 0.3s;

  &:hover {
    background-color: #1565c0;
    transform: scale(1.03);
  }

  @media all and (min-width: 1280px) {
    font-size: 20px;
  }

  /* 노트북 & 테블릿 가로 (해상도 1024px ~ 1279px)*/
  @media all and (min-width: 1024px) and (max-width: 1279px) {
    font-size: 20px;
  }

  /* 테블릿 가로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 20px;
  }

  /* 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 14px;
  }

  /* 모바일 가로 (해상도 ~ 479px)*/
  @media all and (min-width: 376px) and (max-width: 479px) {
    font-size: 12px;
  }

  @media all and (max-width: 376px) {
    font-size: 10px;
  }
`;

// 메타버스
// 전환 영상 오버레이 스타일링
const VideoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* 배경색을 검정으로 설정하여 영상이 더욱 돋보이게 함 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 다른 모든 요소보다 위에 표시 */
`;

// 전환 영상 스타일링
const TransitionVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default HomePage;
