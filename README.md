# Ploutos: SIP8

In this Docker Compose project, there are 2 services:

- `pie`: This is the PIE, which coordinates data exchange between the other services.
- `machine-data-km`: This service maps the data from trekkerdata.nl.
  - It needs to be configured with an API key, which is read from `.env` (see instructions below)
- `asking-kb`: This service simply asks for the same data that `machine-data-km` provides every few seconds, and prints the results.

## How to run it

First, create the `.env` file.
```bash
cp .env.default .env
```

Then edit the `.env` file to your liking (add your API key).

Then, run it!

```bash
# start the services
docker compose up -d

# look at the `asking-kb` logs
docker compose logs -f asking-kb
```

You should see some data in the logs.
That means it works!   


