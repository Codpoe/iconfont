import * as prettier from 'prettier';
import renderSvg from './render-svg';

export default ($: CheerioStatic, name: string): string => {
  const component = `
    import React from 'react';

    export interface ${name}Props extends React.SVGAttributes<SVGElement> {
      color?: string;
      size?: string | number;
      className?: string;
      style?: React.CSSProperties;
    }

    const ${name}: React.SFC<${name}Props> = (props: ${name}Props): React.ReactElement => {
      const { color, size, ...restProps } = props;
      return (
        ${renderSvg($)}
      )
    };

    ${name}.defaultProps = {
      color: 'currentColor',
      size: '1em',
    }

    export default ${name};
  `;

  return prettier.format(component, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'es5',
  });
};