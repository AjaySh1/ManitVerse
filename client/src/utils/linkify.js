export default function linkify(text) {
  // Convert URLs to links
  let replacedText = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="post-link">$1</a>'
  );
  // Convert hashtags to links (optional: link to a search or just style)
  replacedText = replacedText.replace(
    /#(\w+)/g,
    '<span class="hashtag">#$1</span>'
  );
  return replacedText;
}