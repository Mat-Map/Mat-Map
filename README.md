# Mat-Map 🚐📍

Mat-Map is a public transport companion app for Kenyan matatu/nganya routes, built on top of Google Maps' public transit data. It adds the context Google Maps doesn't give you: what a route will actually cost, how bad traffic is right now, how packed a stage is, and whether you want the loud nganya experience or a quieter ride.

## Why we're building this

Google Maps tells you _how_ to get somewhere on public transport, but not:

- How much it'll actually cost you
- Whether traffic will blow your ETA
- Whether the stage you're heading to is currently a crush of people
- Whether you'd rather ride an nganya or a quieter matatu

Mat-Map layers all of that on top of the routes and stages Google Maps already knows about.

## Core features (in build order)

| #   | Feature                                                                     | Status         |
| --- | --------------------------------------------------------------------------- | -------------- |
| 1   | **Base transit layer** — pull routes/stages from Google Maps Transit API    | 🚧 In progress |
| 2   | **Fare estimates** — per-route fare data (crowdsourced/manual dataset)      | 📋 Planned     |
| 3   | **Traffic-compensated ETAs** — live traffic overlay like Maps' driving mode | 📋 Planned     |
| 4   | **Stage busyness** — "how busy is this stage right now," like Popular Times | 📋 Planned     |
| 5   | **Nganya vs. Quiet mode** — filter routes by vibe/temperament               | 📋 Planned     |

See [Issues](../../issues) and [Milestones](../../milestones) for the live breakdown of what's being worked on.

## Tech stack

_(fill this in once decided — e.g. React Native / Flutter for frontend, Node/Express or Django for backend, PostgreSQL for data, Google Maps Platform APIs)_

- Frontend: TBD
- Backend: TBD
- Database: TBD
- APIs: Google Maps Platform (Directions/Routes, Places)

## Project structure

```
Mat-Map/
├── .github/
│   └── workflows/
├── apps/
│   ├── backend/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── app.js
│   │   ├── package.json
│   │   └── .env
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── styles/
│   │   ├── package.json
│   │   └── next.config.js
│   └── ml-service/
│       ├── app/
│       ├── data/
│       ├── notebooks/
│       └── requirements.txt
├── infra/
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── Dockerfile.ml
├── docs/
│   ├── api-spec.md
│   └── data-model.md
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── ImplementationPlan.md
├── package.json
└── README.md
```

## Getting started

1. Clone the repo:
   ```bash
   git clone git@github.com:micah1of1/Mat-Map.git
   cd mat-map
   ```
2. _(Add setup steps here once the stack is chosen — installing dependencies, env vars, API keys, running locally)_

## Contributing

New to the team or to Git collaboration? Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) — it walks through our full workflow (issue → branch → PR → merge) step by step.

**Quick rules:**

- Don't push directly to `main` — always work on a feature branch
- One feature/fix per branch and per PR
- Get at least one review before merging
- Link your PR to the issue it resolves

## Team

- Micah Ade Cedar — [@micah1of1](https://github.com/micah1of1)
- Fabiola Mukanzi — [@fabsies](https://github.com/fabsies)
- Britton Kinuthia — [@BrittonNK](https://github.com/BrittonNK)
- Ashley Miser - [@ashleymiser](https://github.com/ashleymiser)

## License

See [LICENSE](./LICENSE).
