import VideoCallImage from "@assets/images/videocallImage.png";
import {
  Box,
  Button,
  //Container,
  Stack,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Toolbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { convert } from "hangul-romanization";
import { Header, HEADER_HEIGHT } from "@components/index";
import avatarSonny from "@assets/images/avatar_sonny.png";
import avatarkarina from "@assets/images/avatar_karina.png";
import avatarChloe from "@assets/images/avatar_chloe.png";
import avatarDohyung from "@assets/images/avatar_dohyung.png";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewSessionRequest } from "@store/ai/aiConsultSlice";
import styled from "styled-components";
// import avatarJungkook from "@assets/images/avatar_jungkook.png";
import hallwayChloeVideo from "@assets/videos/hallway_chloe.mp4";
import hallwayDohyungVideo from "@assets/videos/hallway_dohyung.mp4";
import hallwaySonnyVideo from "@assets/videos/hallway_sonny.mp4";
import hallwayKarinaVideo from "@assets/videos/hallway_karina.mp4";

// SweetAlert2 임포트
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AiConsultEntryPageRe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리 파라미터에서 uname과 phoneNumber 가져오기
  const queryParams = new URLSearchParams(location.search);
  const unameParam = queryParams.get("uname") || "";
  const phoneNumberParam = queryParams.get("phoneNumber") || "";

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 비디오 재생 상태 및 선택된 비디오
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hallwayVideo, setHallwayVideo] = useState(null);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar((prev) => (prev === avatar ? null : avatar));
  };

  const onClickStart = async () => {
    if (!unameParam || !phoneNumberParam) {
      MySwal.fire({
        title: "오류",
        text: "이름과 전화번호가 필요합니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    let unameToUse = unameParam;
    const containsKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(unameParam);
    if (containsKorean) {
      unameToUse = convert(unameParam).replace(/\s+/g, "");
    }

    console.log(
      "uname: ",
      unameToUse,
      ", phoneNum: ",
      phoneNumberParam,
      ", selectedAvatar: ",
      selectedAvatar
    );

    const formData = new FormData();
    formData.append("uname", unameToUse);
    formData.append("phoneNumber", phoneNumberParam);
    formData.append("selectedAvatar", selectedAvatar);

    try {
      await dispatch(uploadNewSessionRequest(formData)).unwrap();
    } catch (error) {
      console.error("세션 업로드 실패:", error);
      MySwal.fire({
        title: "오류",
        text: "세션 업로드에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    let hallwayVideoSrc;
    switch (selectedAvatar) {
      case "sonny":
        hallwayVideoSrc = hallwaySonnyVideo;
        break;
      case "karina":
        hallwayVideoSrc = hallwayKarinaVideo;
        break;
      case "chloe":
        hallwayVideoSrc = hallwayChloeVideo;
        break;
      case "dohyung":
        hallwayVideoSrc = hallwayDohyungVideo;
        break;
      default:
        hallwayVideoSrc = null;
    }

    if (hallwayVideoSrc) {
      setHallwayVideo(hallwayVideoSrc);
      setIsVideoPlaying(true);
    } else {
      // 아바타가 선택되지 않았거나 해당 비디오가 없는 경우 네비게이트
      navigate(
        `/ai-consult/${unameToUse}?phoneNumber=${phoneNumberParam}&selectedAvatar=${selectedAvatar}`
      );
    }
  };

  const onVideoEnded = () => {
    let unameToUse = unameParam;
    const containsKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(unameParam);
    if (containsKorean) {
      unameToUse = convert(unameParam).replace(/\s+/g, "");
    }
    navigate(
      `/ai-consult/${unameToUse}?phoneNumber=${phoneNumberParam}&selectedAvatar=${selectedAvatar}`
    );
  };

  // 비디오 재생 상태에 따른 버튼 활성화 로직
  useEffect(() => {
    const isNameValid = unameParam !== "";
    const isPhoneValid = /^[0-9]{11}$/.test(phoneNumberParam);
    const isAvatarSelected = selectedAvatar !== null;
    setIsButtonEnabled(isNameValid && isPhoneValid && isAvatarSelected);
  }, [unameParam, phoneNumberParam, selectedAvatar]);

  // 뒤로 가기 막기
  useEffect(() => {
    // Replace the initial history state
    if (!window.history.state) {
      window.history.replaceState({ preventPop: true }, "");
    }

    // Push an additional state to the history stack
    window.history.pushState({ preventPop: true }, "");

    const handlePopState = (event) => {
      // Always prevent back navigation and show the popup
      MySwal.fire({
        title: "알림",
        html: "우측 하단의 나가기 버튼(문 모양)을 사용해<br>종료 후 처음부터 시작해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        allowOutsideClick: false,
      }).then(() => {
        // Push the state back to prevent further back navigation
        window.history.pushState({ preventPop: true }, "");
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Container>
      <Header />
      {/* <Toolbar/> */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        //height="100vh"
        //sx={{ paddingTop: { xs: '40px', md: '80px' }, backgroundColor: "#b0e977t1" }}
      >
        <Stack spacing={{ xs: 3, md: 4 }} alignItems="center" width="100%">
          {/* <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              required
              error={uname.error}
              value={uname.value}
              helperText={
                uname.error ? "이름은 숫자, 영문, 한글만 가능합니다." : ""
              }
              label="이름을 입력해주세요."
              onChange={onChangeUname}
              inputProps={{}}
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                width: { xs: "70%", sm: "70%", md: "70%" },
                maxWidth: "400px",
                mb: 2,
              }}
            />
            <TextField
              required
              error={phoneNumber.error}
              value={phoneNumber.value}
              helperText={
                phoneNumber.error
                  ? "전화번호는 11자리의 숫자만 입력 가능합니다."
                  : ""
              }
              label="전화번호를 입력해주세요."
              onChange={onChangePhoneNumber}
              inputProps={{
                pattern: "[0-9]{11}",
                maxLength: 11,
                inputMode: "numeric",
              }}
              placeholder="01012345678"
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                width: { xs: "70%", sm: "70%", md: "70%" },
                maxWidth: "400px",
              }}
            />
          </Box> */}

          <Box display="flex" justifyContent="center" gap={4}>
            {[
              { name: "dohyung", src: avatarDohyung },
              { name: "chloe", src: avatarChloe },
              { name: "sonny", src: avatarSonny },
              { name: "karina", src: avatarkarina },
            ].map((avatar) => (
              <Box
                key={avatar.name}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxWidth: { xs: "150px", sm: "220px", md: "240px" },
                    cursor: "pointer",
                    border:
                      selectedAvatar === avatar.name
                        ? "5px solid #3399FF"
                        : "none",
                    // borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  alt={`Avatar ${avatar.name}`}
                  src={avatar.src}
                  onClick={() => handleAvatarClick(avatar.name)}
                />
              </Box>
            ))}
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              onClick={onClickStart}
              disabled={!isButtonEnabled}
              variant="contained"
              sx={{
                fontFamily: "SUIT Variable",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "25px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out, background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "scale(1.03)",
                },
                padding: { xs: "6px 14px", sm: "8px 16px", md: "10px 20px" },
                fontWeight: "bold",
                fontSize: { xs: "14px", sm: "16px", md: "20px" },
              }}
            >
              상담 시작하기
            </Button>
          </Box>
        </Stack>
      </Box>
      {/* 영상 오버레이 */}
      {isVideoPlaying && hallwayVideo && (
        <VideoOverlay>
          <TransitionVideo
            src={hallwayVideo}
            autoPlay
            onEnded={onVideoEnded}
            controls={false}
          />
        </VideoOverlay>
      )}
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

// 영상 오버레이 스타일
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

// 영상 스타일
const TransitionVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default AiConsultEntryPageRe;
