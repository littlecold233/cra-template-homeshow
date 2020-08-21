import styled from 'styled-components';
import React, { forwardRef, useMemo, useEffect } from 'react';
import { ILinkProps } from './types';
import { useSiderContext } from './SiderContext';
import { MenuItem } from '@muya-ui/core';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';

const StyledMenuItem = styled(MenuItem)`
    && a {
        &:focus,
        &:active,
        &:hover {
            text-decoration: none;
            color: inherit;
        }

        text-decoration: none;
        color: inherit;
    }
`;

const Link = React.memo(
    forwardRef<HTMLDivElement, ILinkProps>((props, ref) => {
        const {
            strict,
            exact,
            sensitive,
            to,
            replace,
            matchers,
            children,
            eventKey,
            ...other
        } = props;
        const { setSelectedKey } = useSiderContext();
        const location = useLocation();

        const path = useMemo(() => {
            if (typeof to === 'string') {
                return to;
            }
            if (typeof to === 'function') {
                const res = to(location);
                if (typeof res === 'string') {
                    return res;
                }
                if (res.pathname) {
                    return res.pathname;
                }
            }
            if (typeof to === 'object' && to.pathname) {
                return to.pathname;
            }
            return '';
        }, [location, to]);

        useEffect(() => {
            // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
            const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

            const match = escapedPath
                ? matchPath(location.pathname, {
                      path: escapedPath,
                      exact,
                      sensitive,
                      strict
                  })
                : null;

            const matchersMatch = matchers
                ? matchers.some((matcher) => {
                      if (typeof matcher === 'string') {
                          return matchPath(location.pathname, {
                              path: matcher,
                              exact: true,
                              strict: false
                          });
                      }
                      return matchPath(location.pathname, matcher);
                  })
                : false;

            if (match || matchersMatch) {
                setSelectedKey(eventKey!);
            }
        }, [eventKey, location.pathname, sensitive, strict, exact, path, setSelectedKey, matchers]);

        return (
            <StyledMenuItem ref={ref} eventKey={eventKey} {...other}>
                <RouterLink to={to} replace={replace}>
                    {children}
                </RouterLink>
            </StyledMenuItem>
        );
    })
);

Link.displayName = 'MenuItem';

export default Link;
