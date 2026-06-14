import { useEffect } from "react";

const useSEO = ({ title, description, keywords, ogTitle, ogDescription }) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | News Guru`;
    } else {
      document.title = "News Guru | English News";
    }

    // Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description || "News Guru - English News, Politics, Sports, Cinema and Technology News"
      );
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        keywords || "English News, News Guru, Breaking News, Politics, Sports, Cinema, Technology"
      );
    }

    // OG Title
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", ogTitle || title || "News Guru");
    }

    // OG Description
    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute(
        "content",
        ogDescription || description || "Latest English News, Breaking News, Politics, Cinema, Sports and more."
      );
    }
  }, [title, description, keywords, ogTitle, ogDescription]);
};

export default useSEO;
