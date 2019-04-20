import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

window.twttr = {
  widgets: {
    load: () => {}
  }
}

import typography from '@src/styles/typography';
typography.injectStyles()

import { ThemeProvider } from '@src/styles/styled-components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// MUIが生成するClassNameの差分をなくす対応
// @see https://github.com/mui-org/material-ui/issues/9492#issuecomment-410443974
import JssProvider from 'react-jss/lib/JssProvider';

import { appTheme, muiTheme } from '@src/styles/theme';

const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

addDecorator(story =>
  <ThemeProvider theme={appTheme}>
    <MuiThemeProvider theme={createMuiTheme(muiTheme)}>
      <JssProvider generateClassName={generateClassName}>
        {story()}
      </JssProvider>
    </MuiThemeProvider>
  </ThemeProvider>
)

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);