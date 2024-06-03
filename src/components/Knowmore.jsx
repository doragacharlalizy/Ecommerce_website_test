import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:50px;    

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftSide = styled.div`
  width: 100%;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    width: 40%;
    padding: 80px 100px;
  }
`;

const RightSide = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    width: 60%;
    margin-top: 0;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  outline: none;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
`;

const UnmuteSymbol = styled.span`
  font-size: 24px;
`;
const Paragraph=styled.div`
font-size:45px;
font-weight:500px;
text-align:left;
@media (max-width: 768px) {
  text-align:center;
  font-size:24px;

}
`;
const Knowmore = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleRightSideClick = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <Container>
      <LeftSide>
        <Paragraph >Explore further details about our website and enjoy our captivating video presentation!</Paragraph>
      </LeftSide>
      <RightSide onClick={handleRightSideClick}>
        <Video controls={false} ref={videoRef} autoPlay muted={isMuted}>
          <source src="/knowmore.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        {isMuted && (
          <PlayOverlay>
            <UnmuteSymbol>&#x1f507;</UnmuteSymbol>
          </PlayOverlay>
        )}
      </RightSide>
    </Container>
  );
};

export default Knowmore;
