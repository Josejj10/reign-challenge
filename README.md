# Reign Front End Developer Challenge
This project is being made as part of the technical assessment at Reign. In this document I'll explain the technologies used and the analysis made in order to achieve it. The app is deployed in this [site](https://reign-challenge-josejj.netlify.app/), using Netlify.

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
7. Test again before submitting
8. Submit!

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
Projects are ever-changing by nature, and it is important that when you add a new feature, you are sure you aren't breaking another. For this challenge, there will only be **unit tests** for the components, but there could be functional, integration and even E2E tests, that may expose potential issues before making a mistake (learnt by sad experiences).
