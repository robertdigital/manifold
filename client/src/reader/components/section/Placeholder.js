import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import HtmlClass from "hoc/html-class";

export default class SectionPlaceholder extends Component {
  static propTypes = {
    appearance: PropTypes.object
  };

  render() {
    const typography = this.props.appearance.typography;
    const colorScheme = this.props.appearance.colors.colorScheme;

    const readerAppearanceClass = classNames({
      "reader-window": true,
      "scheme-light": colorScheme === "light",
      "scheme-dark": colorScheme === "dark"
    });

    // Font selection may be handled differently later, but for now, variants are based
    // on class names
    let textSectionClass = classNames({
      "manifold-text-section text-section": true,
      "font-serif": typography.font === "serif",
      "font-sans-serif": typography.font === "sans-serif"
    });

    // Apply a font-size class to the text-section
    // This maps to a numbered class with responsive font declarations
    const fontSizeClass = `font-size-${typography.fontSize.current}`;
    textSectionClass += " " + fontSizeClass;

    // Apply a conditional container class that maps to a size in CSS
    const containerClass = `container-focus container-width-${typography.margins.current}`;

    return (
      <HtmlClass className={fontSizeClass}>
        <div
          ref={el => {
            this.el = el;
          }}
        >
          <section className={readerAppearanceClass}>
            <div className={containerClass}>
              <div
                data-id="body"
                id="manifold-text-section"
                className={textSectionClass}
              >
                <div style={{ minHeight: 400 }}>
                  <h1 style={{ paddingTop: 50 }}>Nothing to see here!</h1>
                  <p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    This text does not yet contain any text sections, so there's
                    nothing for Manifold to render in the reader.
                  </p>
                  <p>
                    This text was probably just created and is under active
                    development.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </HtmlClass>
    );
  }
}
