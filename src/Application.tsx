import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './containers/Root';
import TrainingIndex from './containers/Training';
import ExamIndex from './containers/Exam';
import KarutasIndex from './containers/Karutas';
import KarutasShow from './containers/Karutas/Show';
import ExamMenuSection from './components/ExamMenuSection';
import MenuSection from './components/MenuSection';
import TrainingMenuSection from './components/TrainingMenuSection';
import { ROUTE_PATHS } from './constants';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={ROUTE_PATHS.ROOT} component={MenuSection} />
      <Route
        exact
        path={ROUTE_PATHS.TRAINING}
        component={TrainingMenuSection}
      />
      <Route
        exact
        path={ROUTE_PATHS.TRAINING_QUESTION}
        component={TrainingIndex}
      />
      <Route exact path={ROUTE_PATHS.EXAM} component={ExamMenuSection} />
      <Route exact path={ROUTE_PATHS.EXAM_QUESTION} component={ExamIndex} />
      <Route exact path={ROUTE_PATHS.KARUTAS} component={KarutasIndex} />
      <Route exact path={ROUTE_PATHS.KARUTAS_ID} component={KarutasShow} />
    </Switch>
  </Root>
);

export default Application;