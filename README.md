# Intro

This project is whohasdied.
Admin can manage the died people list.

## Available Scripts

In the project directory, you can run test:

### `npm run dev`

or

### `yarn dev`

### Deployment

Sytemd units:
`frontend.service` - running the frontend application on port 3000.
`backend.service` - running the backend application on port 4000.
`gitpush.service` - running github webhook to automatically reflect changes.

### Deployment Workdir

`/root/whohasdied/` - frontend and backend.
`/root/conf/` - nginx vhosts.
`/root/webhooks/` - webhook configs.

### `npm run build` fails to minify
