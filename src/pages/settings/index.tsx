import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useSettings } from "@site/src/hooks/useSettings";

// localStorageから取得
const Component: React.FC = () => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("showLoadingEffect"))
  );
  useEffect(() => {
    const showLoadingEffect = JSON.parse(
      localStorage.getItem("showLoadingEffect")
    );
    if (showLoadingEffect) {
      setChecked(showLoadingEffect);
    }
  });

  const handleSetting = () => {
    localStorage.setItem("showLoadingEffect", JSON.stringify(!checked));
    setChecked(!checked);
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
