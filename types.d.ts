/**
 * Only availabe on renovate app dashboard
 */
declare let generateSidebarLists: (...args: unknown[]) => void;
/**
 * Only availabe on renovate app dashboard
 */
declare let hashState: { platform: string; owner: string };

/**
 * Only availabe on gitea
 */
declare let config: {
  /**
   * csrf token for postback's
   */
  csrf: string;
};
