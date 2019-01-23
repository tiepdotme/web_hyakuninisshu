import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { navigate } from 'gatsby';
import {
  mapDispatchToProps,
  mapStateToProps,
  OwnProps,
  Props,
  TrainingQuestions,
} from '@src/containers/TrainingQuestions';
import TrainingInitializer from '@src/containers/TrainingInitializer';
import QuestionView from '@src/components/QuestionView';
import QuestionCorrect from '@src/components/QuestionCorrect';
import ErrorMessage from '@src/components/ErrorMessage';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions';
import { initialState as uiState } from '@src/state/ui';
import { ROUTE_PATHS } from '@src/constants';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { Answer, Color, Karuta, Kimariji, Question, ToriFuda, YomiFuda } from '@src/types';
import { ANSWER_QUESTION_NAME, CONFIRM_CORRECT_NAME, OPEN_NEXT_QUESTION_NAME } from '@src/actions/questions';
import { create } from '@test/factories';
import { mockAppStoreCreateor } from '@test/helpers';

const createQuestion = (id: number) => {
  const yomiFuda = create<YomiFuda>('yomiFuda', {
    questionId: id,
  });

  const toriFudas = [...Array(4).keys()].map(_ =>
    create<ToriFuda>('toriFuda', {
      questionId: id,
    })
  );

  return create<Question>('question', {
    id,
    toriFudas,
    yomiFuda,
  });
};

describe('<TrainingQuestions />', () => {
  describe('components', () => {
    let wrapper: ShallowWrapper;
    let baseProps: Props;

    beforeEach(() => {
      const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
        create<Karuta>('karuta', {
          color: (i < 20 ? 'blue' : 'pink') as Color,
          id: (i + 1).toString(),
          no: i + 1,
          kimariji: ((i % 5) + 1) as Kimariji,
        })
      );

      const submitTime = 1000;

      baseProps = {
        rangeFrom: RangeFromCondition.One,
        rangeTo: RangeToCondition.OneHundred,
        kimariji: KimarijiCondition.None,
        color: ColorCondition.None,
        kamiNoKuStyle: KarutaStyleCondition.KanaOnly,
        shimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
        questionAnim: QuestionAnimCondition.Normal,
        karutas,
        submitTime,
        totalCount: 0,
        currentPosition: 0,
        dulation: 0.6,
        onClickToriFuda: jest.fn(),
        onClickResult: jest.fn(),
        onClickGoToNext: jest.fn(),
        onClickGoToResult: jest.fn(),
      };
    });

    describe('when question is not started', () => {
      it('should render TrainingInitializer', () => {
        wrapper = shallow(<TrainingQuestions {...baseProps} />);
        expect(wrapper.find(TrainingInitializer).length).toBe(1);
      });
    });

    describe('when question is empty', () => {
      it('should render ErrorMessage', () => {
        const props = { ...baseProps, lastStartedTime: 11000, totalCount: 0 };
        wrapper = shallow(<TrainingQuestions {...props} />);
        expect(wrapper.find(ErrorMessage).length).toBe(1);
      });
    });

    describe('when in answer', () => {
      it('should render QuestionView', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.InAnswer,
          question: createQuestion(1),
          totalCount: 1,
        };
        wrapper = shallow(<TrainingQuestions {...props} />);
        expect(wrapper.find(QuestionView).length).toBe(1);
      });
    });

    describe('when after answered', () => {
      it('should render QuestionCorrect', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.ConfirmCorrect,
          question: createQuestion(1),
          totalCount: 1,
        };
        wrapper = shallow(<TrainingQuestions {...props} />);
        expect(wrapper.find(QuestionCorrect).length).toBe(1);
      });
    });

    describe('when finished', () => {
      it('should render TrainingResult', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.Finished,
          question: createQuestion(1),
          totalCount: 1,
        };
        wrapper = shallow(<TrainingQuestions {...props} />);
        expect(wrapper.find(QuestionCorrect).length).toBe(1);
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should convert state to props', () => {
      const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
        create<Karuta>('karuta', {
          color: (i < 20 ? 'blue' : 'pink') as Color,
          id: (i + 1).toString(),
          no: i + 1,
          kimariji: ((i % 5) + 1) as Kimariji,
        })
      );

      const submitTime = 1000;
      const props: OwnProps = {
        rangeFrom: RangeFromCondition.One,
        rangeTo: RangeToCondition.OneHundred,
        kimariji: KimarijiCondition.None,
        color: ColorCondition.None,
        kamiNoKuStyle: KarutaStyleCondition.KanaOnly,
        shimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
        questionAnim: QuestionAnimCondition.Normal,
        karutas,
        submitTime,
      };

      const state: GlobalState = {
        questions: {
          ...questionsState,
          answers: [create<Answer>('answer')],
          lastStartedTime: 11000,
          questionState: QuestionState.Finished,
          questions: [createQuestion(1)],
        },
        ui: uiState,
      };

      expect(mapStateToProps(state, props)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    let mockStore: MockStore<GlobalState>;

    beforeEach(() => {
      mockStore = mockAppStoreCreateor()({
        questions: { ...questionsState, questions: [createQuestion(1)] },
        ui: uiState,
      });
    });

    it('should dispatch openNextQuestion action when onClickGoToNext fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickGoToNext();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(OPEN_NEXT_QUESTION_NAME);
    });

    it('should dispatch confirmCorrect action when onClickResult fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickResult();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(CONFIRM_CORRECT_NAME);
    });

    it('should dispatch answerQuestion action when onClickToriFuda fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickToriFuda(mockStore.getState().questions.questions[0].toriFudas[0]);
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(ANSWER_QUESTION_NAME);
    });

    it('should navigate to result when onClickGoToResult fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickGoToResult();
      expect(navigate).toHaveBeenCalledWith(ROUTE_PATHS.TRAINING_RESULT, { replace: true });
    });
  });
});
