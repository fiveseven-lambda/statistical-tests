import * as React from 'react';
import katex from 'katex';

export const KaTeX = ({ text }) => (
  <span dangerouslySetInnerHTML={{
    __html: katex.renderToString(text)
  }}/>
);