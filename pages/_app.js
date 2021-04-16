import React from "react";
import App from "next/app";

import '../src/styles/globals.css'
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.PUBLIC_MATOMO_SITE_ID;

class MyApp extends App {
  componentDidMount() {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp
