import React from 'react';
import { SvgIcon, ISvgProps } from '@muya-ui/theme-light';

export const ${ iconName } = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="${ viewBox }" {...props}>
    ${ iconPath }
  </SvgIcon>
));

export default ${ iconName };
