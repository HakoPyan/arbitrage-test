up:
	docker compose -f docker-compose.yml up -d

build:
	docker compose -f docker-compose.yml build

down:
	docker compose -f docker-compose.yml down

up-dev:
	docker compose -f docker-compose.dev.yml up -d

build-dev:
	docker compose -f docker-compose.dev.yml build

down-dev:
	docker compose -f docker-compose.dev.yml down