/**
 * Only availabe on renovate app dashboard
 */
declare var generateSidebarLists: (...args: any[]) => void;
/**
 * Only availabe on renovate app dashboard
 */
declare var hashState: { platform: string; owner: string };

/**
 * Only availabe on gitea
 */
declare var config: {
    /**
     * csrf token for postback's
     */
  csrf: string;
};
