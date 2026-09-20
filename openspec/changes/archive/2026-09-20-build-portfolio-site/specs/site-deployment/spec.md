## Purpose

Ensures the site builds and ships as a fully static site under the owner's existing domain, with an update workflow simple enough for the owner to operate solo using only HTML/CSS/JS knowledge.

## ADDED Requirements

### Requirement: Static build output
The system SHALL build to static HTML/CSS/JS with no server-side runtime dependency required to serve the site.

#### Scenario: Site is built
- **WHEN** the project's build command is run
- **THEN** the output is static HTML/CSS/JS assets that can be served without a running application server

### Requirement: Automatic deployment on push
The system SHALL be deployed via a private GitHub repository connected to Cloudflare Pages, such that pushing to the main branch triggers a new deployment automatically, without manual upload.

#### Scenario: Commit pushed to main branch
- **WHEN** a commit is pushed to the main branch of the GitHub repository
- **THEN** Cloudflare Pages automatically starts and completes a new deployment of the site

### Requirement: Serves the existing custom domain
The system SHALL serve the site at `ryan-chiang.com`, fully replacing the previously deployed site at that domain. No redirect mapping from old URLs SHALL be required.

#### Scenario: Visitor requests the domain
- **WHEN** a visitor requests `https://ryan-chiang.com`
- **THEN** the new site is served, and the old site's content is no longer reachable at that domain
