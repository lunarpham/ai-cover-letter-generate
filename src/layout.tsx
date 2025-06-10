import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

interface MetaData {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

interface LayoutProps {
  children?: React.ReactNode;
  metadata?: MetaData;
}

const defaultMetadata: MetaData = {
  title: "AI Cover Letter Generator",
  description: "Generate personalized cover letters using AI",
  keywords: "cover letter, AI, job application, resume",
  author: "Your Name",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function Layout({ children, metadata = {} }: LayoutProps) {
  const mergedMetadata = { ...defaultMetadata, ...metadata };

  return (
    <>
      {/* React 19 native meta tag support */}
      <title>{mergedMetadata.title}</title>
      <meta name="description" content={mergedMetadata.description || ""} />
      <meta name="keywords" content={mergedMetadata.keywords || ""} />
      <meta name="author" content={mergedMetadata.author || ""} />
      <meta name="viewport" content={mergedMetadata.viewport || ""} />

      {/* Open Graph meta tags */}
      {mergedMetadata.ogTitle && (
        <meta property="og:title" content={mergedMetadata.ogTitle} />
      )}
      {mergedMetadata.ogDescription && (
        <meta
          property="og:description"
          content={mergedMetadata.ogDescription}
        />
      )}
      {mergedMetadata.ogImage && (
        <meta property="og:image" content={mergedMetadata.ogImage} />
      )}
      {mergedMetadata.ogUrl && (
        <meta property="og:url" content={mergedMetadata.ogUrl} />
      )}

      {/* Twitter Card meta tags */}
      {mergedMetadata.twitterCard && (
        <meta name="twitter:card" content={mergedMetadata.twitterCard} />
      )}
      {mergedMetadata.twitterTitle && (
        <meta name="twitter:title" content={mergedMetadata.twitterTitle} />
      )}
      {mergedMetadata.twitterDescription && (
        <meta
          name="twitter:description"
          content={mergedMetadata.twitterDescription}
        />
      )}
      {mergedMetadata.twitterImage && (
        <meta name="twitter:image" content={mergedMetadata.twitterImage} />
      )}

      <Toaster position="top-right" />
      <div className="h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1">
          <div>{children || <Outlet />}</div>
        </main>
      </div>
    </>
  );
}

// Component for setting metadata in any page
export function Meta({ metadata }: { metadata: MetaData }) {
  return (
    <>
      {metadata.title && <title>{metadata.title}</title>}
      {metadata.description && (
        <meta name="description" content={metadata.description} />
      )}
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords} />
      )}
      {metadata.author && <meta name="author" content={metadata.author} />}
      {metadata.ogTitle && (
        <meta property="og:title" content={metadata.ogTitle} />
      )}
      {metadata.ogDescription && (
        <meta property="og:description" content={metadata.ogDescription} />
      )}
      {metadata.ogImage && (
        <meta property="og:image" content={metadata.ogImage} />
      )}
      {metadata.ogUrl && <meta property="og:url" content={metadata.ogUrl} />}
      {metadata.twitterCard && (
        <meta name="twitter:card" content={metadata.twitterCard} />
      )}
      {metadata.twitterTitle && (
        <meta name="twitter:title" content={metadata.twitterTitle} />
      )}
      {metadata.twitterDescription && (
        <meta
          name="twitter:description"
          content={metadata.twitterDescription}
        />
      )}
      {metadata.twitterImage && (
        <meta name="twitter:image" content={metadata.twitterImage} />
      )}
    </>
  );
}

export type { MetaData };
