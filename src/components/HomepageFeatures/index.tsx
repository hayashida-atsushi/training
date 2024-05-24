import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import { AutoStories, Collections, Mode } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const AutoStoriesStyles = styled(AutoStories)(({theme}) => ({
    fontSize: 100,
    //TODO:色変える
    color: theme.palette.primary.main,
})); 
const ModeStyles = styled(Mode)(({theme}) => ({
  fontSize: 100,
  color: theme.palette.primary.main,
})); 
 
type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  uri: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Study 📖',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        学習したことや役に立ったことをまとめてます。
      </>
    ),
    uri: '/docs/study/intro',
  },
  /** TODO:
  {
    title: 'Blog',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        ITに関するブログを書こうと思ってます。(※重要：思っているだけ)
      </>
    ),
    uri: '/blog',
  },
  */
];

const Feature = ({title, Svg, description,uri}: FeatureItem) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <AutoStoriesStyles />
        <ModeStyles />
      </div>
      <div className="text--center padding-horiz--md">
        <Link
            className="button button--secondary button--lg"
            to={uri}>
            {title}
          </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

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
