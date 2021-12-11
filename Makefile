
# target: 
#     @echo "test0"
#     @echo "test1"
help: ## serve for development
	@echo "Usage: make [options] [target] ..."; \
	echo "Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|: ' '{printf "%40s %s\n", $$1, $$3}
	' | fgrep -v fgrep';

dev: ## serve for development
	@echo "strating Dev enviroment"
	@cd frontend && npm start &
	@cd backend && php artisan serve
