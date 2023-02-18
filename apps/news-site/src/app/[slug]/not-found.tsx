import React from 'react';
import ErrorPage from 'next/error';

export default function Page() {
  return <ErrorPage statusCode={404} />;
}
