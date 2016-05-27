# You've Got Jamz
## A music-sharing community built on top of Spotify 
[![Stories in Ready](https://badge.waffle.io/jmhill/spotify-recommend-2.svg?label=ready&title=Ready)](http://waffle.io/jmhill/spotify-recommend-2)

### Project Description
Intent is to create an online community app that integrates tightly with the Spotify public API to provide a more social listening experience, improving the Spotify 'inbox' feature and allowing friends to more easily share music discoveries.

### Development Flow

_Set-up_: After cloning repo and `npm install`, run `grunt` from within project directory to start server using development configuration. Note: grunt-cli must be installed globally via npm.

_Workflow_:

1. Issues and status of work-in-progress can be viewed at https://waffle.io/jmhill/spotify-recommend-2. 
2. Issues are tagged with a label describing the type of work:
  - __feat__: new features and enhancements
  - __task__: maintenance, refactoring, and other general tasks
  - __bug__: problems in need of fixing
3. When starting work on an issue, create new branch (from `development`) with format `{issue-type}/{issue-number}-{description}`, e.g., `task/#1-description`. This format will automatically move the issue to 'in progress' on the waffle board.
4. When work on issue complete, create pull request to merge topic branch back into development. This will automatically create a review app on heroku for reviewing changes.
5. When ready for release, merge development back into master. Changes to master automatically update the staging app.
6. Once tested in staging app, promote to production from within heroku dashboard (or using heroku pipeline cli).

### Background

This project started as a simple demo for a node.js course that was offered through Thinkful. The demo project created a simple search form that returned a list of related artists and their top tracks. This demonstration was composed of a simple handlebars template combined with JQuery for fetching data from the server and updating the template. As an initial step, we extract the client-side logic into react components and create a Spotify service that will expose several middleware functions usable by the express app for sending data back to the client.
