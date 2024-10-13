/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import Box from "@mui/material/Box";

const squareStyle = css`
  width: 20px; /* Square size */
  height: 20px;
  position: absolute;
`;

const progressBarContainerStyle = css`
  position: absolute;
  bottom: 20px; /* プログレスバーを下に配置 */
  width: 80%; /* プログレスバーの幅 */
  height: 10px; /* プログレスバーの高さ */
  background-color: rgba(255, 255, 255, 0.3); /* 背景色 */
  border-radius: 5px; /* 角を丸く */
  overflow: hidden; /* オーバーフローを隠す */
`;

const progressBarStyle = css`
  height: 100%;
  width: 0; /* 初期幅を0に */
  background-color: rgba(241, 196, 15, 0.8); /* プログレスバーの色 */
  border-radius: 5px; /* 角を丸く */
`;

const colors = [
  "rgba(241, 196, 15, 0.8)", // Bright Yellow
  "rgba(52, 152, 219, 0.8)", // Blue
  "rgba(241, 196, 15, 0.8)", // Yellow
];

const LoadingAnimation = () => {
  const squareRefs = useRef([]);
  const progressBarRef = useRef(null); // プログレスバーの参照

  useEffect(() => {
    // スクロールを無効にする
    document.body.style.overflow = "hidden";
    // Animate squares
    anime.timeline({ loop: false }).add({
      targets: squareRefs.current,
      opacity: [
        { value: 0, duration: 800, easing: "easeInOutQuad" },
        { value: 1, duration: 800, easing: "easeInOutQuad" },
      ],
      scale: [
        { value: 1.5, duration: 1000, easing: "easeInOutQuad" },
        { value: 1, duration: 1000, easing: "easeInOutQuad" },
      ],
      rotate: {
        value: "1turn",
        easing: "easeInOutSine",
        duration: 1200,
      },
      translateX: [
        {
          value: () => anime.random(-300, 300),
          duration: 1200,
          easing: "easeInOutQuad",
        },
      ],
      translateY: [
        {
          value: () => anime.random(-300, 300),
          duration: 1200,
          easing: "easeInOutQuad",
        },
      ],
      delay: anime.stagger(50), // Shorter delay for quicker movements
    });

    // Animate progress bar
    anime({
      targets: progressBarRef.current,
      width: "100%", // 幅を100%に
      duration: 3000, // アニメーションの持続時間
      easing: "easeInOutQuad",
    });

    return () => {
      document.body.style.overflow = "auto"; // アンマウント時に元に戻す
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      position="relative"
      bgcolor="#1e1e1e"
    >
      {Array.from({ length: 50 }).map((_, index) => (
        <Box
          key={index}
          css={[
            squareStyle,
            {
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
            },
          ]}
          ref={(el) => (squareRefs.current[index] = el)}
        />
      ))}
      <Box css={progressBarContainerStyle}>
        <Box css={progressBarStyle} ref={progressBarRef} />
      </Box>
    </Box>
  );
};

export default LoadingAnimation;
