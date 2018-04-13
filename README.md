# vue-cli Express plugin

Currently a replication for [vue-cli#]().

Will later be (most likely) turned into a more useful vue-cli plugin that will include Express with some nice best-practices covered:
- Logging (winston & morgan)
- `helmet` for security headers
- `helmet-csp` for [Content-Security Policies](https://developer.mozilla.org/en-US/docs/Glossary/CSP)
- session store (`redis` or file-based)

Every feature is opt-in.

TODO:
- Add a prompt for what to use as Express session store (file vs redis for example)
- Remove inlining of webpack manifest chunk (see [this issue]())
- Add app name and description to `manifest.json` of interface plugin dynamically based on global prompts/options
- Create logger helper
