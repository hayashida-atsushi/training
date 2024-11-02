import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import { Box, FormControlLabel, Switch } from "@mui/material";

// localStorageから取得
const Component: React.FC = () => {
  // TODO：初回のみtrueにしたい、工夫の余地あり。
  const [checked, setChecked] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const showLoadingEffect = JSON.parse(
        localStorage.getItem("showLoadingEffect")
      );
      if (showLoadingEffect) {
        setChecked(showLoadingEffect);
      }
    }
  });

  const handleSetting = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("showLoadingEffect", JSON.stringify(!checked));
      setChecked(!checked);
    }
  };

  // TODO:fontなどのレイアウトの整理
  return (
    <Layout>
      <Box>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleSetting} />}
          label="ホームのロードページを表示する"
        />
      </Box>
    </Layout>
  );
};

export default Component;
