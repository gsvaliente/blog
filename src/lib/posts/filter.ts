import type { SearchablePost } from "./types";

/**
 * Filters Posts by a keyword query (matched against title, description, tags,
 * and content) and by active tags. Multiple active tags intersect — a Post
 * must carry every active tag to match.
 */
export function filterPosts<T extends SearchablePost>(
  posts: T[],
  query: string,
  activeTags: string[] = []
): T[] {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    if (activeTags.length > 0 && !activeTags.every((tag) => post.tags.includes(tag))) {
      return false;
    }

    if (normalizedQuery) {
      const haystack = [post.title, post.description, ...post.tags, post.content ?? ""]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}