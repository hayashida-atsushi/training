import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import { AutoStories, Collections, Mode } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import logoMemo from "../../assets/logomemo.svg";

const AutoStoriesStyles = styled(AutoStories)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.primary.main,
}));
const CustomSVGStyles = styled(logoMemo)(({ theme }) => ({
  width: 100,
  height: 100,
  color: theme.palette.primary.main,
}));
const ModeStyles = styled(Mode)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.primary.main,
}));

type FeatureItem = {
  title: string;
  Svg: ReactNode;
  description: JSX.Element;
  uri: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Study 📖",
    Svg: (
      <>
        <AutoStoriesStyles />
        <ModeStyles />
      </>
    ),
    description: <>学習したことや役に立ったことをまとめてます。</>,
    uri: "/docs/study/intro",
  },
  {
    title: "Docusaurus メモ",
    Svg: <CustomSVGStyles />,
    description: <>本ページで使っているdocusaurusの技術メモ</>,
    uri: "/docs/docusaurus-memo/intro",
  },
];

const Feature = ({ title, Svg, description, uri }: FeatureItem) => {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">{Svg}</div>
      <div className="text--center padding-horiz--md">
        <Link className="button button--secondary button--lg" to={uri}>
          {title}
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
