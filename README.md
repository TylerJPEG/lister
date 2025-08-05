# lister
Grim Lister

## Development

Authentication uses a server-side login API. Set the `AUTH_EMAIL` and
`AUTH_PASSWORD` environment variables before building or running the app:

```
AUTH_EMAIL=user@example.com AUTH_PASSWORD=secret npm run dev
```

These values are only checked on the server and are never exposed to the client.
