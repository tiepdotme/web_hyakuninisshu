import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled, { StyledFunction } from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';
import { MenuType } from '../../enums';
import { APP_NAME } from '../../constants';

interface BodyProps {
  isDisplayNav: boolean;
}

const div: StyledFunction<BodyProps & React.HTMLProps<HTMLElement>> =
  styled.div;

export const Body = div`
  padding-top: 56px;
  padding-bottom: ${({ isDisplayNav }) => (isDisplayNav ? '56px' : '0')};
  text-align: center;
  background-color: #fffff0;
  min-height: 100vh;

  @media screen and (min-width: 768px) {
    padding-top: 64px;
    padding-bottom: 0;
    padding-left: ${({ isDisplayNav }) => (isDisplayNav ? '64px' : '0')};
  }
`;

export interface FrameProps {
  readonly subTitle: string;
  readonly canBack: boolean;
  readonly currentMenuType?: MenuType;
  readonly isDisplayNav: boolean;
  readonly description: string;
  readonly onClickBack: () => void;
}

const Frame: React.StatelessComponent<FrameProps> = ({
  canBack,
  children,
  subTitle,
  description,
  onClickBack,
  isDisplayNav,
  currentMenuType
}) => (
  <div>
    <Helmet>
      <meta name="keywords" content="百人一首,暗記,練習,ゲーム" />
      <meta name="description" content={description} />
      {!isDisplayNav && <meta name="robots" content="noindex,nofollow" />}
      <title>{`${APP_NAME} - ${subTitle} -`}</title>
    </Helmet>
    <Header subTitle={subTitle} canBack={canBack} onClickBack={onClickBack} />
    <Body isDisplayNav={isDisplayNav}>{children}</Body>
    {isDisplayNav && <Navigation currentMenuType={currentMenuType} />}
  </div>
);

export default Frame;
