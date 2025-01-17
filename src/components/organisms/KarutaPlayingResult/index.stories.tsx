import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { create } from '@helper/factory';
import { KarutaPlayingResultPresenter, PresenterProps } from './index';
import { Answer } from '@src/types';

const answers = [...Array(100).keys()].map(_ => create<Answer>('answer'));

const props: PresenterProps = {
  answers,
  correctCount: 80,
  totalCount: 100,
  averageAnswerSecond: 5.8,
  onClickBack: action('onClickBack'),
  onClickRestart: action('onClickRestart'),
};

storiesOf('organisms/KarutaPlayingResult', module)
  .add('all correct', () => <KarutaPlayingResultPresenter {...props} correctCount={100} />)
  .add('has mistake', () => <KarutaPlayingResultPresenter {...props} />);
