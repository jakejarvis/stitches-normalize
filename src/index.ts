/*! stitches-normalize | MIT License | https://github.com/jakejarvis/stitches-normalize */
/*! modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

import type * as Stitches from "@stitches/react";

export interface Options {
  /**
   * Include the [default system font stacks](https://github.com/sindresorhus/modern-normalize/issues/3) (sans-serif
   * fonts for `html`, monospace fonts for `code`, `kbd`, `samp`, and `pre`.)
   *
   * @default true
   */
  readonly systemFonts?: boolean;

  /**
   * Include non-standard WebKit compatibility rules for older Safari versions on iOS and macOS.
   *
   * @default true
   */
  readonly webkitPrefixes?: boolean;

  /**
   * Include non-standard Mozilla compatibility rules for older Firefox versions.
   *
   * @default true
   */
  readonly mozPrefixes?: boolean;
}

/**
 * @returns A Stitches-compatible version of [modern-normalize.css](https://github.com/sindresorhus/modern-normalize).
 *
 * @example
 * ```
 * import { globalCss } from "./stitches.config";
 * import normalizeCss from "stitches-normalize";
 *
 * const globalStyles = globalCss(
 *   ...normalizeCss({
 *     // default options, see below:
 *     fontFamilies: true,
 *     webkitPrefixes: true,
 *     mozPrefixes: true,
 *   }), {
 *   // you can put the rest of your global styles here if necessary.
 *   // these rules will override stitches-normalize's.
 *   body: {
 *     fontFamily: "'Comic Sans MS', sans-serif",
 *   },
 * });
 *
 * const App = () => {
 *   globalStyles();
 *   return <h1>Hello, normalized world!</h1>;
 * };
 * ```
 */
const normalizeCss = (options: Options = {}): Record<string, Stitches.CSSProperties>[] => {
  options = {
    // all options default to true, which returns the complete modern-normalize.css equivalent
    systemFonts: true,
    webkitPrefixes: true,
    mozPrefixes: true,
    ...options,
  };

  const baseStyles: Record<string, Stitches.CSSProperties> = {
    "*, ::before, ::after": {
      boxSizing: "border-box",
    },
    html: {
      lineHeight: 1.15,
      tabSize: 4,
    },
    body: {
      margin: 0,
    },
    hr: {
      height: 0,
      color: "inherit",
    },
    "abbr[title]": {
      textDecoration: "underline dotted",
    },
    "b, strong": {
      fontWeight: "bolder",
    },
    "code, kbd, samp, pre": {
      fontSize: "1em",
    },
    small: {
      fontSize: "80%",
    },
    "sub, sup": {
      fontSize: "75%",
      lineHeight: 0,
      position: "relative",
      verticalAlign: "baseline",
    },
    sub: {
      bottom: "-0.25em",
    },
    sup: {
      top: "-0.5em",
    },
    table: {
      textIndent: 0,
      borderColor: "inherit",
    },
    "button, input, optgroup, select, textarea": {
      fontFamily: "inherit",
      fontSize: "100%",
      lineHeight: 1.15,
      margin: 0,
    },
    "button, select": {
      textTransform: "none",
    },
    "button, [type='button'], [type='reset'], [type='submit']": {},
    legend: {
      padding: 0,
    },
    progress: {
      verticalAlign: "baseline",
    },
    summary: {
      display: "list-item",
    },
    "[type='search']": {
      outlineOffset: -2,
    },
  };

  // append default system font stacks
  if (options.systemFonts) {
    baseStyles["html"].fontFamily = "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
    baseStyles["code, kbd, samp, pre"].fontFamily = "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace";
  }

  // `-webkit` compatibility properties and rules
  if (options.webkitPrefixes) {
    // @ts-ignore
    baseStyles["html"].WebkitTextSizeAdjust = "100%";
    // @ts-ignore
    baseStyles["button, [type='button'], [type='reset'], [type='submit']"].WebkitAppearance = "button";
    // @ts-ignore
    baseStyles["[type='search']"].WebkitAppearance = "textfield";

    baseStyles["::-webkit-search-decoration"] = {
      // @ts-ignore
      WebkitAppearance: "none",
    };
    baseStyles["::-webkit-inner-spin-button, ::-webkit-outer-spin-button"] = {
      height: "auto",
    };
    baseStyles["::-webkit-file-upload-button"] = {
      font: "inherit",
      // @ts-ignore
      WebkitAppearance: "button",
    };
  }

  // `-moz` compatibility properties and rules
  if (options.mozPrefixes) {
    baseStyles["::-moz-focus-inner"] = {
      borderStyle: "none",
      padding: 0,
    };
    baseStyles[":-moz-focusring"] = {
      outline: "1px dotted ButtonText",
    };
    baseStyles[":-moz-ui-invalid"] = {
      boxShadow: "none",
    };
  }

  return [baseStyles];
};

export default normalizeCss;
