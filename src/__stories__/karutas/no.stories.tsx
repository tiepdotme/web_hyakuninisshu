import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import KarutasNoPage, { Props } from '@src/gatsbyPages/karutas/no';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const props: Props = {
  pageContext: {
    karuta: create<Karuta>('karuta'),
  },
};

storiesOf('pages/karutas/no', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <KarutasNoPage {...props} />);