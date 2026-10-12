import React from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';

const isLocal = h =>
  h === 'localhost' || h === '::1' || /^127\.\d+\.\d+\.\d+$/.test(h);

const host =
  typeof window !== 'undefined'
    ? window.location.hostname.replace(/^www\./, '')
    : '';

export default function DocVersionBanner() {
  const isBrowser = useIsBrowser();
  const {
    siteConfig: {
      customFields: {
        mainHost,
        currentDocsUrl,
        docVersion,
        isNext: configIsNext,
      },
    },
  } = useDocusaurusContext();

  const isNext = configIsNext || host.startsWith('next.') || isLocal(host);

  if (!isBrowser || (!isNext && host === mainHost)) return null;

  return (
    <div
      className={`theme-doc-version-banner alert alert--${isNext ? 'info' : 'warning'} margin-bottom--md`}
      role="alert"
    >
      <div>
        {isNext
          ? 'This is unreleased documentation for Actual Budget (Next).'
          : `This is documentation for v${docVersion} of Actual Budget.`}{' '}
        For the current release, see the{' '}
        <Link to={currentDocsUrl}>latest version</Link>.
      </div>
    </div>
  );
}
