// Single source for anything that is "about Brandon" rather than "about the site".
export const site = {
  name: 'Brandon Lang',
  tagline: 'Network operations, infrastructure, and the software that ties them together.',
  location: 'West Palm Beach, FL',
  email: 'BrandonScottLang@gmail.com',
  phone: '(616) 206-3516',
  domain: 'brandonscottlang.com',
  github: 'BSLang2006',
  githubUrl: 'https://github.com/BSLang2006',
  linkedinUrl: 'https://www.linkedin.com/in/brandon-lang-596b78215',
};

// Giscus reads these from giscus.app after you enable Discussions on the repo.
// Until repoId/categoryId are filled in, the comment box renders a setup notice
// instead of a broken widget.
export const giscus = {
  repo: 'BSLang2006/personalWebsite',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
};

export const configured = (): boolean => !!giscus.repoId && !!giscus.categoryId;
