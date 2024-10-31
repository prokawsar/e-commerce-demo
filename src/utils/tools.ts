export const flattenUrls = (urls: string[]) => {
  return urls.map((url) => url.replaceAll(/^"|\["|"\]|"$/g, ""));
};
