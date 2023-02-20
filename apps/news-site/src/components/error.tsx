import React from 'react';

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

export type ErrorProps = {
  statusCode: number
  title?: string
  withDarkMode?: boolean
}

const styles: { [k: string]: React.CSSProperties } = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  desc: {
    display: 'inline-block',
    textAlign: 'left',
  },
  
  h1: {
    display: 'inline-block',
    margin: '0 20px 0 0',
    paddingRight: 23,
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: 'top',
    lineHeight: '49px',
  },
  
  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '49px',
    margin: 0,
  },
}

/**
 * `Error` component used for handling errors.
 */
export default function Error(props: ErrorProps) {
  const { statusCode, withDarkMode = true } = props;
  const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

  return (
    <div style={styles.error}>
      {/*<title>*/}
      {/*  {statusCode ? `${statusCode}: ${title}` : 'Application error: a client-side exception has occurred'}*/}
      {/*</title>*/}
      <div>
        <style
          dangerouslySetInnerHTML={{
            /* CSS minified from
              body { margin: 0; color: #000; background: #fff; }
              .next-error-h1 {
                border-right: 1px solid rgba(0, 0, 0, .3);
              }
              ${
                withDarkMode
                  ? `@media (prefers-color-scheme: dark) {
                body { color: #fff; background: #000; }
                .next-error-h1 {
                  border-right: 1px solid rgba(255, 255, 255, .3);
                }
              }`
                  : ''
              }
             */
            __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}${
              withDarkMode
                ? '@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}'
                : ''
            }`,
          }}
        />

        {statusCode ? (
          <h1 className="next-error-h1" style={styles.h1}>
            {statusCode}
          </h1>
        ) : null}
        <div style={styles.desc}>
          <h2 style={styles.h2}>
            {props.title || statusCode ? (
              title
            ) : (
              <>
                Application error: a client-side exception has occurred (see the browser console for more information)
              </>
            )}
            .
          </h2>
        </div>
      </div>
    </div>
  );
}
