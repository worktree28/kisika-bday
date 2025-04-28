# Birthday Party Invitation

A beautiful, interactive birthday party invitation website built with React and Vite.

## Features

- Responsive design with beautiful animations
- Interactive elements that respond to scrolling
- Countdown timer to the party date
- Party details with RSVP functionality
- Rotating decorative elements that follow mouse movement

## Deployment to GitHub Pages

This project is configured to be easily deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment with GitHub Actions

When you push changes to the `main` branch, GitHub Actions will automatically build and deploy your site to GitHub Pages.

1. Make sure your repository is set up with GitHub Pages:

   - Go to your repository settings
   - Navigate to "Pages"
   - Set the source to "GitHub Actions"

2. Push your changes to the `main` branch:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. GitHub Actions will automatically build and deploy your site to `https://<USERNAME>.github.io/<REPO>/`

### Manual Deployment

You can also deploy manually using the gh-pages package:

1. Install the gh-pages package if you haven't already:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Deploy the site:
   ```bash
   npm run deploy
   ```

## Development

To run the development server:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Customization

- Update the party details in `src/PartyDetails.jsx`
- Modify the countdown date in `src/CountdownTimer.jsx`
- Change colors and styles in `src/BirthdayStyles.css`
