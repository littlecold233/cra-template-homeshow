import { colorUtils, createTheme, createThemeColors } from '@muya-ui/theme-light';

function createHomeshowTheme(withMenu = false) {
    const spec = {
        safe1: 'rgba(10,204,156,1)',
        safe2: 'rgba(22,217,168,1)',
        safe3: 'rgba(46,230,184,1)',
        safe4: 'rgba(69,230,189,1)',
        lightSafe1: 'rgba(218,249,241,1)',
        lightSafe2: 'rgba(224,250,245,1)',
        lightSafe3: 'rgba(237,252,248,1)',
        lightSafe4: 'rgba(245,254,252,1)',
        neutral1: {
            normal: 'rgba(46,51,56,1)',
            hover: 'rgba(72,76,81,1)',
            click: 'rgba(24,30,37,1)'
        },
        neutral2: {
            normal: 'rgba(96,101,108,1)',
            hover: 'rgba(72,76,81,1)',
            click: 'rgba(46,51,56,1)'
        },
        neutral3: {
            normal: 'rgba(147,152,159,1)',
            hover: 'rgba(120,126,135,1)',
            click: 'rgba(96,101,108,1)'
        },
        neutral4: {
            normal: 'rgba(174,178,183,1)',
            hover: 'rgba(147,152,159,1)',
            click: 'rgba(120,126,135,1)'
        },
        neutral5: {
            normal: 'rgba(200,203,208,1)',
            hover: 'rgba(174,178,183,1)',
            click: 'rgba(147,152,159,1)'
        },
        neutral6: {
            normal: 'rgba(222,224,228,1)',
            hover: 'rgba(210,214,218,1)',
            click: 'rgba(200,203,208,1)'
        },
        neutral7: {
            normal: 'rgba(239,240,242,1)',
            hover: 'rgba(222,224,228,1)',
            click: 'rgba(210,214,218,1)'
        },
        neutral8: {
            normal: 'rgba(243,244,246,1)',
            hover: 'rgba(233,234,237,1)',
            click: 'rgba(222,224,228,1)'
        },
        neutral9: {
            normal: 'rgba(245,246,248,1)',
            hover: 'rgba(239,240,242,1)',
            click: 'rgba(233,234,237,1)'
        },
        neutral10: {
            normal: 'rgba(248,249,251,1)',
            hover: 'rgba(243,244,246,1)',
            click: 'rgba(239,240,242,1)'
        }
    };

    const pattern = {
        icon: {
            normal: spec.neutral3.normal,
            hover: spec.neutral3.hover,
            click: spec.neutral3.click
        }
    };

    return createTheme(
        {
            themeName: 'muya-theme-homeshow',
            prefix: 'muya-homeshow',
            colors: createThemeColors(spec, pattern),
            typography: {
                spec: {
                    global: {
                        fontSize: 13
                    },
                    fontSize: {
                        s1: 13
                    }
                }
            }
        },
        ({ colors, opacity, spacing, typography }) => {
            const { spec: colorsSpec, pattern: colorsPattern } = colors;
            const { spec: opacitySpec } = opacity;
            const { spec: spacingSpec } = spacing;
            const { fontWeight } = typography.spec;
            return {
                Menu: withMenu
                    ? {
                          wrapper: {
                              background: colorsSpec.neutral8.normal,
                              borderRadius: '0px',
                              inlineCollapsedWidth: 56
                          },
                          background: colorsSpec.neutral8.normal,
                          iconColor: colorUtils.transparentize(
                              opacitySpec.s2,
                              colorsPattern.text.text
                          ),
                          highlightIconColor: colorUtils.transparentize(
                              opacitySpec.s1,
                              colorsPattern.text.text
                          ),
                          height: 40,
                          group: {
                              itemPaddingInGroup: spacingSpec.s7,
                              paddingHorizontal: spacingSpec.s7,
                              indent: spacingSpec.s7,
                              indentWithIcon: 34,
                              height: 40,
                              paddingTop: spacingSpec.s6,
                              color: colorsPattern.text.secondary
                              // background: colorsSpec.neutral8.normal,
                          },
                          item: {
                              indent: spacingSpec.s11,
                              indentWithIcon: 54,
                              marginVertical: spacingSpec.s1,
                              fontWeight: {
                                  selected: fontWeight.regular
                              },
                              color: {
                                  normal: colorsPattern.text.text,
                                  hover: colorsPattern.text.text,
                                  clicked: colorsPattern.text.text,
                                  selected: colorsPattern.text.title,
                                  selectedHover: colorsPattern.text.title,
                                  selectedClicked: colorsPattern.text.title,
                                  disabled: colorsPattern.text.disabled
                              },
                              marginHorizontal: 0,
                              paddingHorizontal: spacingSpec.s7,
                              background: {
                                  // normal: colorsSpec.neutral8.normal,
                                  hover: colorUtils.transparentize(
                                      opacitySpec.s10,
                                      colorsSpec.neutral1.normal
                                  ),
                                  clicked: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  ),
                                  selected: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  ),
                                  selectedHover: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  ),
                                  selectedClicked: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  )
                              }
                          },
                          subMenu: {
                              indent: spacingSpec.s7,
                              indentWithIcon: 34,
                              fontWeight: {
                                  selected: fontWeight.regular
                              },
                              color: {
                                  normal: colorsPattern.text.text,
                                  hover: colorsPattern.text.text,
                                  clicked: colorsPattern.text.text,
                                  selected: colorsPattern.text.title,
                                  selectedHover: colorsPattern.text.title,
                                  selectedClicked: colorsPattern.text.title,
                                  disabled: colorsPattern.text.text
                              },
                              background: {
                                  // normal: colorsSpec.neutral8.normal,
                                  hover: colorUtils.transparentize(
                                      opacitySpec.s10,
                                      colorsSpec.neutral1.normal
                                  ),
                                  clicked: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  ),
                                  selected: 'transparent',
                                  selectedHover: colorUtils.transparentize(
                                      opacitySpec.s10,
                                      colorsSpec.neutral1.normal
                                  ),
                                  selectedClicked: colorUtils.transparentize(
                                      opacitySpec.s9,
                                      colorsSpec.neutral1.normal
                                  )
                              }
                          }
                      }
                    : {},
                Button: {
                    typeBgColor: {
                        normal: {
                            ...colorsSpec.neutral8
                        },
                        strong: {
                            ...colorsSpec.neutral8
                        },
                        secondary: {
                            ...colorsSpec.neutral9
                        },
                        weak: {
                            ...colorsSpec.neutral9
                        }
                    },
                    textColor: {
                        strong: colorsSpec.neutral1.normal,
                        normal: colorsSpec.neutral2.normal,
                        secondary: colorsSpec.neutral3.normal,
                        weak: colorsSpec.neutral3.normal
                    }
                },
                Skeleton: {
                    backgroundColor: colorUtils.transparentize(
                        opacitySpec.s9,
                        colorsSpec.neutral1.normal
                    )
                },
                Tree: {
                    nodeHeight: {
                        s: 32,
                        m: 32,
                        l: 36,
                        xl: 36
                    },
                    contentMargin: 2
                },
                Pagination: {
                    background: {
                        current: colorUtils.transparentize(opacitySpec.s7, colorsSpec.brand),
                        hover: colorUtils.transparentize(opacitySpec.s6, colorsSpec.brand),
                        clicked: colorUtils.transparentize(opacitySpec.s5, colorsSpec.brand)
                    },
                    numberColor: {
                        current: colorsSpec.brand,
                        hover: colorsSpec.brand
                    },
                    arrowColor: {
                        hover: colorsSpec.brand
                    }
                }
            };
        }
    );
}

export const muyaThemeHomeshow = createHomeshowTheme();
export const muyaThemeHomeshowMenu = createHomeshowTheme(true);

export default muyaThemeHomeshow;
