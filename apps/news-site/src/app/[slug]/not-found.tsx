import React from 'react';
import Error from '../../components/error';

export default function NotFound() {
  return <Error statusCode={404} title={"This is awkward... we couldn't find that post"} />;
}
