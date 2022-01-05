include ./frontend/.env
export
# target: 
#     @echo "test0"
#     @echo "test1"
help: ## serve for development
	@echo "Usage: make [options] [target] ..."; \
	echo "Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|: ' '{printf "%40s %s\n", $$1, $$3}
	' | fgrep -v fgrep';

freshdb: ## reset db
	@echo "Reset DB"
	@cd backend && php artisan migrate:fresh && php artisan passport:install --force
	
dev: ## serve for development
	@echo "strating Dev enviroment"
	@cd frontend && npm start &
	@cd backend && php artisan serve

install: ## performs initial setup
	@echo "Installing libraries"
	@cd backend && composer update && composer install && cp .env.example .env
	@cd frontend && npm install