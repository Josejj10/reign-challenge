# Reign Front End Developer Challenge

This is a simple project that extracts data from the [Hacker News API](https://hn.algolia.com/api) to show it in a frontend view using React. In this document I'll explain the technologies used and the analysis made in order to achieve it. Please keep in mind that, while there may be more simple ways to achieve this end product, this has been done like it is in order to showcase some of my abilities.

This project is being made as part of the technical assessment at Reign. The app is deployed in this [site](https://reign-challenge-josejj.netlify.app/), using Netlify.

## Technologies

As this is a light project that needed to be done in a short amount of time, I chose [Vite](https://vitejs.dev/) for its development (it really is lightning fast!).

![enter image description here](https://i.ibb.co/qBV51Js/vite.jpg)

**Following the requirements**, I used React and TypeScript, along with CSS only (even though I prefer using SASS), Netlify is being used for the continuous deployment of the app, and the [Hacker News API](https://hn.algolia.com/api) is used to get data.

I'm also using, [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) along with a pre-commit hooks using [Husky](https://typicode.github.io/husky/#/) to safely follow commit conventions. This also helps with checking formatting the code before committing (with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)).

![enter image description here](https://i.ibb.co/VJy4CbW/commit.jpg)

## Analysis

In order to complete any challenge, this one included, it is highly advised to make an ordered list of steps that will help to guide your efforts and keep you on track.

Here's this project's list done after inspecting both the Zeplin project and the challenge requirements:

1. ✅ Decide technologies to use

2. ✅ Create the github repo and configure CI with Netlify

3. ✅ Initialize project with Vite

4. ✅ Configure Jest and commits

5. ✅ Create issues and branches for components and functionalities

6. ✅ Make pull requests once each issue is finished

> This is aligned with the continuous delivery and integration mindset, because once a branch is merged to master, Netlify deploys automatically the new changes.

7. ✅ Test again before submitting

8. ✅ Submit!

## Stories

Before creating each issue for components and functionalities, I also made a list to keep them on track:

1. Add necessary assets(icons, colors and fonts)

2. Create the responsive layout

3. Integrate API calls to HackerNews

> This is done before even creating the components in order to have in-code the interface that will be helpful when defining the typed props of each component, and will also help with the continuous delivery mindset.

4. Create card component

5. Create dropdown component

6. Create tabs component

7. Configure local storage persistence for filters

8. Configure local storage persistence for favorites

9. Add infinite scrolling

## Testing

Projects are ever-changing by nature, and it is important that when you add a new feature, you are sure you aren't breaking another. For this challenge, I only had the time to write a really simple unit test for a button (it renders!), but there could be functional, integration and even E2E tests, that may expose potential issues before making a mistake (learnt by sad experiences).

# Development decisions

Here I'm going to write about some development decisions and why they've been made.

### Design tokens

I've used design tokens, setting variables in CSS, to make it easy to choose colors for the many needs the UI has. They also come in handy in projects when different themes are needed, and when there are a lot of colors in the design system to choose from.

### Mobile-first

Since one of the requirements for this app was for it to be responsive, I chose to embrace the mobile-first approach, styling first for mobile and using media queries to modify style for wider screens.

### Grid

Even though the main container and news container could've both been done with flexbox, grids are better suited to create layouts, since they work in both rows and columns.

### Animations

I added some animations and transitions (button, news-card, opacity, toggling favorite) to make the app feel more lively.

### Redux

Is it overkill for such a little app? Of course it is! Nevertheless, and as I've mentioned before, I chose to use this in order to showcase a bit of what I know about state containers and reactive programming. I also used the facade design pattern, creating a hook to make the actions to be dispatched and variables in store easy to access.

### Infinite scrolling

The app has infinite scrolling implemented, and I also added a button to load again from the first page, and some text to show the current page loaded and the initial page number that was saved in local storage. Usually infinite scrolling should be used with a tool like react-window or react-virtualized to avoid having a big number of items rendered at the same time, and it might be a good idea to add it to this project as a future feature.

---

And that's it! If you have any questions, feel free to reach me!
