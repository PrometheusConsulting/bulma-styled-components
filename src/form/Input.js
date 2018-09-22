import React, { PureComponent } from 'react'
import { css as emotion_css } from 'emotion'
import { rgba } from 'polished'
import { Consumer } from '../base'
import Vars from '../utilities/vars'
import { placeholder } from '../utilities/mixins'
import {
  control,
  control_small,
  control_medium,
  control_large,
} from '../utilities/controls'

Vars.addDerivedDefault(vars => ({
  'input-color': vars['grey-darker'],
  'input-background-color': vars['white'],
  'input-border-color': vars['grey-lighter'],
  'input-shadow': `inset 0 1px 2px ${rgba(vars['black'], 0.1)}`,

  'input-hover-color': vars['grey-darker'],
  'input-hover-border-color': vars['grey-light'],

  'input-focus-color': vars['grey-darker'],
  'input-focus-border-color': vars['link'],
  'input-focus-box-shadow-size': '0 0 0 0.125em',
  'input-focus-box-shadow-color': rgba(vars['link'], 0.25),

  'input-disabled-color': vars['text-light'],
  'input-disabled-background-color': vars['background'],
  'input-disabled-border-color': vars['background'],
}))

export const InputStyle = theme => emotion_css`
  ${control}
  background-color: ${theme['input-background-color']};
  border-color: ${theme['input-border-color']};
  color: ${theme['input-color']};
  ${placeholder`
    color: ${rgba(theme['input-color'], 0.3)};
  `}
  &:hover,
  &.is-hovered {
    border-color: ${theme['input-hover-border-color']};
  }
  &:focus,
  &.is-focused,
  &:active,
  &.is-active {
    border-color: ${theme['input-focus-border-color']};
    box-shadow: ${theme['input-focus-box-shadow-size']} ${theme['input-focus-box-shadow-color']};
  }
  &[disabled] {
    background-color: ${theme['input-disabled-background-color']};
    border-color: ${theme['input-disabled-border-color']};
    box-shadow: none;
    color: ${theme['input-disabled-color']};
    ${placeholder`
      color: ${rgba(theme['input-disabled-color'], 0.3)};
    `}
  }
`
const ITSharedColorClasses = theme => Object.entries(theme['colors']).reduce((acc, [name, [color]]) => emotion_css`
  ${acc}
  &.is-${/* sc-custom 'blue' */name} {
    border-color: ${color};
    &:focus,
    &.is-focused,
    &:active,
    &.is-active {
      box-shadow: ${theme['input-focus-box-shadow-size']} ${rgba(color, 0.25)};
    }
  }
`, '')
export const InputTextareaShared = theme => emotion_css`
  ${InputStyle}
  box-shadow: ${theme['input-shadow']};
  max-width: 100%;
  width: 100%;
  &[readonly] {
    box-shadow: none;
  }
  /* Colors */
  ${ITSharedColorClasses(theme)}
  /* Sizes */
  &.is-small {
    ${control_small}
  }
  &.is-medium {
    ${control_medium}
  }
  &.is-large {
    ${control_large}
  }
  /* Modifiers */
  &.is-fullwidth {
    display: block;
    width: 100%;
  }
  &.is-inline {
    display: inline;
    width: auto;
  }
`
export const InputClass = theme => emotion_css`
  ${InputTextareaShared(theme)}
  &.is-rounded {
    border-radius: ${theme['radius-rounded']};
    padding-left: 1em;
    padding-right: 1em;
  }
  &.is-static {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
    padding-left: 0;
    padding-right: 0;
  }
`
export class Input extends PureComponent {
  static ClassName = 'INPUT'
  static defaultProps = {
    as: 'input',
    className: '',
  }

  render() {
    const { as, className, ...props } = this.props
    return (
      <Consumer>
        {theme => React.createElement(as, {
          ...props,
          className: [
            Box.ClassName,
            InputClass(theme, as),
            className,
          ].join(' '),
        })}
      </Consumer>
    )
  }
}